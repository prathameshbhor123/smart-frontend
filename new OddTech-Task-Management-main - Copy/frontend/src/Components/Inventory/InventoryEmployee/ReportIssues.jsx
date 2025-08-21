import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

const ReportIssues = () => {
  const [formData, setFormData] = useState({
    assetId: '',
    issueType: '',
    description: '',
    priority: 'medium',
    stepsToReproduce: '',
  });
  const [assets, setAssets] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
const fetchData = async () => {
  try {
    setIsLoading(true);
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);

    const response = await api.get(`/assignments/employee/${userData.id}`);
    // Ensure the response data contains assets properly
    const assignedAssets = response.data.map(assignment => ({
      id: assignment.asset?.id || assignment.assetId,
      name: assignment.asset?.name || 'Unnamed Asset',
      productId: assignment.asset?.productId || 'N/A'
    }));
    setAssets(assignedAssets);

  } catch (error) {
    console.error('Full error:', error);
    console.error('Error response:', error.response?.data);

    let errorMessage = 'Failed to submit issue';
    if (error.response) {
      errorMessage = error.response.data?.message ||
                    error.response.statusText ||
                    'Server error occurred';
    } else if (error.message) {
      errorMessage = error.message;
    }
    Swal.fire({
      title: 'Error',
      text: 'Failed to load your assigned assets',
      icon: 'error'
    });
  } finally {
    setIsLoading(false);
  }
};

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Assets:", assets);
  }, [assets]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.assetId || !formData.issueType || !formData.description) {
        throw new Error('Please fill all required fields');
      }

      const issueData = {
        assetId: parseInt(formData.assetId),
        issueType: formData.issueType,
        description: formData.description,
        stepsToReproduce: formData.stepsToReproduce,
        priority: formData.priority.toUpperCase(),
        status: 'OPEN', // Default status when creating a new issue
        reportedById: user.id // The user who is reporting the issue
      };

      const response = await api.post('/issues', issueData);
      setSubmitted(true);
      Swal.fire({
        title: 'Success',
        text: 'Issue reported successfully',
        icon: 'success'
      });
    } catch (error) {
      let errorMessage = 'Failed to submit issue';
      if (error.response) {
        if (error.response.data && typeof error.response.data === 'object') {
          errorMessage = error.response.data.message ||
                        error.response.data.error ||
                        'Server error occurred';
        } else {
          errorMessage = error.response.data ||
                        error.response.statusText ||
                        'Server error occurred';
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      assetId: '',
      issueType: '',
      description: '',
      priority: 'medium',
      stepsToReproduce: '',
    });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-xl overflow-hidden">
          <div className="max-w-3xl mx-auto text-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-2 -left-2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="relative">
                <svg className="mx-auto h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
                  Issue Reported Successfully!
                </h2>
                <p className="mt-4 text-lg text-indigo-100 max-w-xl mx-auto">
                  Your issue has been logged with our support team. A ticket number will be assigned to you shortly.
                </p>
                <div className="mt-10">
                  <button
                    onClick={resetForm}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300"
                  >
                    Report Another Issue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-1"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Report Asset Issues
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
     <div className="bg-gradient-to-r from-[#00A3E1] to-[#00AEEF] px-6 py-4">
  <h2 className="text-xl font-bold text-white">Issue Report Form</h2>
</div>

        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Affected Asset */}
              <div className="relative">
                <label htmlFor="assetId" className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="flex items-center">
                    <svg className="mr-2 h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    Affected Asset
                  </span>
                </label>
                <select
                  id="assetId"
                  name="assetId"
                  value={formData.assetId}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full pl-10 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg border"
                  disabled={isSubmitting}
                >
                  <option value="">Select an asset</option>
                  {assets.map(asset => (
                    <option key={asset.id} value={asset.id}>
                      {asset.name} ({asset.productId})
                    </option>
                  ))}
                </select>
              </div>

              {/* Issue Type */}
              <div className="relative">
                <label htmlFor="issueType" className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="flex items-center">
                    <svg className="mr-2 h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Issue Type
                  </span>
                </label>
                <select
                  id="issueType"
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full pl-10 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg border"
                  disabled={isSubmitting}
                >
                  <option value="">Select an issue type</option>
                  <option value="hardware">Hardware Failure</option>
                  <option value="software">Software Problem</option>
                  <option value="performance">Performance Issue</option>
                  <option value="connectivity">Connectivity Problem</option>
                  <option value="battery">Battery/Charging Issue</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Description of Issue
                </span>
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Describe the issue you're experiencing..."
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                  Priority
                </span>
              </label>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className={`relative rounded-xl p-5 border-2 cursor-pointer transition-all duration-300 ${
                  formData.priority === 'low'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <input
                    id="low"
                    name="priority"
                    type="radio"
                    value="low"
                    checked={formData.priority === 'low'}
                    onChange={handleChange}
                    className="sr-only"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="low" className="block text-sm font-medium cursor-pointer">
                    <span className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                      Low Priority
                    </span>
                  </label>
                  <p className="mt-2 text-xs text-gray-500">Minor issue, workaround available</p>
                </div>

                <div className={`relative rounded-xl p-5 border-2 cursor-pointer transition-all duration-300 ${
                  formData.priority === 'medium'
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <input
                    id="medium"
                    name="priority"
                    type="radio"
                    value="medium"
                    checked={formData.priority === 'medium'}
                    onChange={handleChange}
                    className="sr-only"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="medium" className="block text-sm font-medium cursor-pointer">
                    <span className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
                      Medium Priority
                    </span>
                  </label>
                  <p className="mt-2 text-xs text-gray-500">Affects work but not critical</p>
                </div>

                <div className={`relative rounded-xl p-5 border-2 cursor-pointer transition-all duration-300 ${
                  formData.priority === 'high'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <input
                    id="high"
                    name="priority"
                    type="radio"
                    value="high"
                    checked={formData.priority === 'high'}
                    onChange={handleChange}
                    className="sr-only"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="high" className="block text-sm font-medium cursor-pointer">
                    <span className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
                      High Priority
                    </span>
                  </label>
                  <p className="mt-2 text-xs text-gray-500">Critical issue, cannot work</p>
                </div>
              </div>
            </div>

            {/* Steps to Reproduce */}
            <div>
              <label htmlFor="stepsToReproduce" className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  Steps to Reproduce
                </span>
              </label>
              <div className="mt-1">
                <textarea
                  id="stepsToReproduce"
                  name="stepsToReproduce"
                  rows={3}
                  value={formData.stepsToReproduce}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="What steps can we take to reproduce the issue?"
                  disabled={isSubmitting}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Include any error messages or screenshots if possible (you can attach files later)
              </p>
            </div>

            <div className="flex justify-end">
              {/* <button
                type="submit"
                disabled={isSubmitting}
                className={`ml-3 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Report Issue
                  </>
                )}
              </button> */}
                  <button
                type="submit"
                disabled={isSubmitting}
                className={`ml-3 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-[#00A3E1] to-[#00AEEF] hover:from-[#0095d6] hover:to-[#009bd7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A3E1] transition-all duration-300 transform ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Report Issue
                  </>
                )}
              </button>

            </div>
          </form>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-md p-6 border-l-4 border-yellow-400">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>For critical issues that prevent you from working, please call the IT Help Desk immediately at extension 4357 (HELP) after submitting this form.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportIssues;