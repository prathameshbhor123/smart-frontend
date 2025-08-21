
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function DocumentManagementApp() {
  const API_BASE_URL = "http://localhost:8080/api/documents";
  const navigate = useNavigate();

  // State management
  const [documents, setDocuments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [formData, setFormData] = useState({
    documentName: '',
    documentDescription: '',
    documentFile: null
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [viewDocument, setViewDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch documents
  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      try {
        let backendType = '';
        if (filter === 'word') backendType = 'doc';
        else if (filter === 'excel') backendType = 'xls';
        else if (filter === 'images') backendType = 'img';
        else if (filter !== 'all') backendType = filter;

        const userId = 1;
        const response = await fetch(
          `${API_BASE_URL}?userId=${userId}&type=${backendType}&search=${searchQuery}`
        );

        if (!response.ok) throw new Error('Failed to load documents');

        const data = await response.json();
        const formattedDocs = data.map(doc => ({
          ...doc,
          size: (doc.size / 1024 / 1024).toFixed(2) + ' MB',
          date: new Date(doc.uploadDate).toISOString().split('T')[0]
        }));

        setDocuments(formattedDocs);
      } catch (error) {
        console.error("Error fetching documents:", error);
        Swal.fire('Error', 'Failed to load documents', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, [filter, searchQuery]);

  // Event handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, documentFile: e.target.files[0] }));
  };

  const handleAddDocument = async (e) => {
    e.preventDefault();

    if (!formData.documentName || !formData.documentFile) {
      Swal.fire('Error', 'Please fill in all required fields', 'error');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', formData.documentFile);
      formDataToSend.append('name', formData.documentName);
      formDataToSend.append('description', formData.documentDescription);
      formDataToSend.append('userId', 1);

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) throw new Error('Upload failed');

      const newDocument = await response.json();
      const formattedDoc = {
        ...newDocument,
        size: (newDocument.size / 1024 / 1024).toFixed(2) + ' MB',
        date: new Date(newDocument.uploadDate).toISOString().split('T')[0]
      };

      setDocuments([formattedDoc, ...documents]);
      setIsModalOpen(false);
      setFormData({
        documentName: '',
        documentDescription: '',
        documentFile: null
      });

      Swal.fire('Success', `${formData.documentName} added successfully`, 'success');
    } catch (error) {
      console.error("Error uploading document:", error);
      Swal.fire('Error', 'Failed to upload document', 'error');
    }
  };

  const deleteDocument = (docId) => {
    Swal.fire({
      title: 'Delete Document?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`${API_BASE_URL}/${docId}`, { method: 'DELETE' });
          setDocuments(documents.filter(doc => doc.id !== docId));
          Swal.fire('Deleted!', 'Document deleted successfully', 'success');
        } catch (error) {
          console.error("Error deleting document:", error);
          Swal.fire('Error', 'Failed to delete document', 'error');
        }
      }
    });
  };

  const handleDownload = () => {
    if (viewDocument) {
      window.open(`http://localhost:8080/uploads/${viewDocument.filePath}`, '_blank');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) {
      setFormData(prev => ({ ...prev, documentFile: e.dataTransfer.files[0] }));
      setIsModalOpen(true);
    }
  };

  // Document statistics
  const stats = {
    total: documents.length,
    pdf: documents.filter(doc => doc.type === 'pdf').length,
    doc: documents.filter(doc => doc.type === 'doc').length,
    img: documents.filter(doc => doc.type === 'img').length,
    xls: documents.filter(doc => doc.type === 'xls').length
  };

  const getDocumentTypeInfo = (type) => {
    switch (type) {
      case 'pdf': return { icon: 'fa-file-pdf', bg: 'bg-red-50', badgeColor: 'text-red-600' };
      case 'doc': return { icon: 'fa-file-word', bg: 'bg-blue-50', badgeColor: 'text-blue-600' };
      case 'xls': return { icon: 'fa-file-excel', bg: 'bg-green-50', badgeColor: 'text-green-600' };
      case 'img': return { icon: 'fa-file-image', bg: 'bg-amber-50', badgeColor: 'text-amber-600' };
      default: return { icon: 'fa-file-alt', bg: 'bg-gray-50', badgeColor: 'text-gray-600' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Integrated Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* <button 
            onClick={() => navigate('/admindashboard')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            <i className="fas fa-arrow-left mr-2"></i> Go Back
          </button>
           */}
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <div className="text-xl font-bold text-blue-600">
            Document Manager
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:-translate-y-1 hover:shadow-lg lg:col-span-1">
              <h2 className="text-xl font-semibold text-blue-600 mb-5 flex items-center gap-2">
                <i className="fas fa-chart-pie"></i>
                Document Stats
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <i className="fas fa-file-alt text-blue-600 text-2xl mb-2"></i>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <div className="text-gray-500 text-sm">Total Files</div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <i className="fas fa-file-pdf text-red-500 text-2xl mb-2"></i>
                  <div className="text-2xl font-bold">{stats.pdf}</div>
                  <div className="text-gray-500 text-sm">PDF Files</div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <i className="fas fa-file-word text-blue-400 text-2xl mb-2"></i>
                  <div className="text-2xl font-bold">{stats.doc}</div>
                  <div className="text-gray-500 text-sm">Word Docs</div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <i className="fas fa-file-image text-amber-500 text-2xl mb-2"></i>
                  <div className="text-2xl font-bold">{stats.img}</div>
                  <div className="text-gray-500 text-sm">Images</div>
                </div>
              </div>
            </div>

            {/* Upload Card */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:-translate-y-1 hover:shadow-lg lg:col-span-2">
              <h2 className="text-xl font-semibold text-blue-600 mb-5 flex items-center gap-2">
                <i className="fas fa-cloud-upload-alt"></i>
                Upload New Document
              </h2>

              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
                ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'}`}
                onClick={() => setIsModalOpen(true)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <i className="fas fa-cloud-upload-alt text-blue-600 text-4xl mb-4"></i>
                <h3 className="text-lg font-medium mb-2">Drag & Drop to Upload</h3>
                <p className="text-gray-500 mb-6">Supported formats: PDF, DOC, DOCX, XLS, JPG, PNG</p>
                {/* <button
                  className="bg-blue-600 text-white py-3 px-6 rounded-full font-medium flex items-center gap-2 mx-auto hover:bg-blue-700 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                >
                  <i className="fas fa-plus"></i>
                  Add Document
                </button> */}
                <button
  className="bg-[#00A3E1] text-white py-3 px-6 rounded-full font-medium flex items-center gap-2 mx-auto hover:bg-[#00AEEF] transition"
  onClick={(e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  }}
>
  <i className="fas fa-plus"></i>
  Add Document
</button>

              </div>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
                <i className="fas fa-folder-open"></i>
                My Documents
              </h2>

              <div className="flex flex-wrap gap-2">
                {['all', 'pdf', 'word', 'excel', 'images'].map((filterType) => (
                  <button
                    key={filterType}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition
                    ${filter === filterType
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setFilter(filterType)}
                  >
                    {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="py-12 text-center">
                <i className="fas fa-spinner fa-spin text-blue-600 text-3xl mb-4"></i>
                <p className="text-gray-600">Loading documents...</p>
              </div>
            ) : documents.length === 0 ? (
              <div className="py-12 text-center">
                <i className="fas fa-folder-open text-gray-300 text-5xl mb-4"></i>
                <h3 className="text-xl font-medium mb-2">No documents found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Try changing your filters or upload a new document
                </p>
                {/* <button
                  className="bg-blue-600 text-white py-2 px-6 rounded-full font-medium hover:bg-blue-700 transition"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add Your First Document
                </button> */}
                <button
  className="bg-[#00A3E1] text-white py-2 px-6 rounded-full font-medium hover:bg-[#00AEEF] transition"
  onClick={() => setIsModalOpen(true)}
>
  Add Your First Document
</button>

              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {documents.map(doc => {
                  const { icon, bg, badgeColor } = getDocumentTypeInfo(doc.type);
                  const typeName = doc.type === 'doc' ? 'DOC' :
                    doc.type === 'xls' ? 'XLS' :
                      doc.type.toUpperCase();

                  return (
                    <div key={doc.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                      <div className={`h-48 flex items-center justify-center relative ${bg}`}>
                        <i className={`fas ${icon} text-5xl opacity-50`}></i>
                        <span className={`absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-medium shadow-sm ${badgeColor}`}>
                          {typeName}
                        </span>
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold truncate">{doc.name}</h3>
                        <p className="text-gray-600 text-sm mt-2 h-12 overflow-hidden">{doc.description}</p>

                        <div className="flex justify-between text-gray-500 text-xs mt-4">
                          <span>{doc.size}</span>
                          <span>{doc.date}</span>
                        </div>

                        <div className="flex gap-2 border-t border-gray-100 mt-3 pt-3">
                          <button
                            className="flex-1 text-center py-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                            onClick={() => setViewDocument(doc)}
                          >
                            <i className="fas fa-eye mr-1"></i> View
                          </button>
                          <button
                            className="flex-1 text-center py-2 rounded-md bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition"
                            onClick={() => deleteDocument(doc.id)}
                          >
                            <i className="fas fa-trash mr-1"></i> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Document Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md animate-fade-in">
            <div className="bg-blue-600 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <i className="fas fa-plus"></i> Add New Document
              </h3>
              <button
                className="text-xl"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddDocument} className="p-6">
              <div className="mb-5">
                <label htmlFor="documentName" className="block font-medium mb-2">
                  Document Name *
                </label>
                <input
                  type="text"
                  id="documentName"
                  name="documentName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter document name"
                  value={formData.documentName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-5">
                <label htmlFor="documentDescription" className="block font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="documentDescription"
                  name="documentDescription"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  placeholder="Enter document description"
                  value={formData.documentDescription}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="documentFile" className="block font-medium mb-2">
                  Upload File *
                </label>
                <div className="border border-gray-300 rounded-lg p-4 text-center">
                  {formData.documentFile ? (
                    <div className="text-green-600">
                      <i className="fas fa-file-alt text-3xl mb-2"></i>
                      <p className="font-medium truncate">{formData.documentFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(formData.documentFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <i className="fas fa-cloud-upload-alt text-3xl mb-2"></i>
                      <p>Drag & drop files here or click to browse</p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="documentFile"
                    className="hidden"
                    onChange={handleFileChange}
                    required
                  />
                  <button
                    type="button"
                    className="mt-3 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
                    onClick={() => document.getElementById('documentFile').click()}
                  >
                    {formData.documentFile ? 'Change File' : 'Select File'}
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  className="px-5 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Save Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Document Modal */}
      {viewDocument && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-xl animate-fade-in">
            <div className="bg-blue-600 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <i className="fas fa-eye"></i> View Document
              </h3>
              <button
                className="text-xl"
                onClick={() => setViewDocument(null)}
              >
                &times;
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className={`w-48 h-56 flex items-center justify-center rounded-xl ${getDocumentTypeInfo(viewDocument.type).bg}`}>
                    <i className={`fas ${getDocumentTypeInfo(viewDocument.type).icon} text-6xl opacity-70`}></i>
                  </div>
                </div>

                <div className="flex-grow">
                  <h2 className="text-2xl font-bold mb-3">{viewDocument.name}</h2>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                      <p className="text-gray-500 text-sm">Type</p>
                      <p className="font-medium capitalize">
                        {viewDocument.type === 'doc' ? 'Word Document' :
                          viewDocument.type === 'xls' ? 'Excel Spreadsheet' :
                            viewDocument.type === 'img' ? 'Image' :
                              viewDocument.type.toUpperCase()}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">Size</p>
                      <p className="font-medium">{viewDocument.size}</p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">Upload Date</p>
                      <p className="font-medium">{viewDocument.date}</p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">Document ID</p>
                      <p className="font-medium">{viewDocument.id}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-500 text-sm mb-2">Description</p>
                    <p className="text-gray-800">{viewDocument.description}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                      onClick={handleDownload}
                    >
                      <i className="fas fa-download mr-2"></i> Download
                    </button>

                    <button
                      className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
                      onClick={() => setViewDocument(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentManagementApp;