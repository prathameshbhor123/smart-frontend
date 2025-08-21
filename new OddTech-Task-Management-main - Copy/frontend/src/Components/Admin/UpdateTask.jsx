// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// const API_BASE_URL = 'http://localhost:8080/api/admin'; // Update with your API base URL

// const UpdateTask = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
//     const [loading, setLoading] = useState(true);

//     const [formData, setFormData] = useState({
//         employeeId: '',
//         title: '',
//         dueDate: null,
//         description: '',
//         priority: '',
//         taskStatus: ''
//     });

//     const [listOfEmployees, setListOfEmployees] = useState([]);
//     const listOfPriorities = ["LOW", "MEDIUM", "HIGH"];
//     const listOfTaskStatus = ["PENDING", "INPROGRESS", "COMPLETED", "DEFERRED", "CANCELED"];

//     const getTaskById = async () => {
//         try {
//             const response = await axios.get(`${API_BASE_URL}/task/${id}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });
//             setFormData({
//                 ...response.data,
//                 dueDate: new Date(response.data.dueDate)
//             });
//         } catch (error) {
//             console.error('Error fetching task:', error);
//             showSnackbar('Failed to load task details', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getUsers = async () => {
//         try {
//             const response = await axios.get(`${API_BASE_URL}/users`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             });
//             setListOfEmployees(response.data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//             showSnackbar('Failed to load employee list', 'error');
//         }
//     };

//     const updateTask = async () => {
//         try {
//             const response = await axios.put(`${API_BASE_URL}/task/${id}`, {
//                 ...formData,
//                 dueDate: formData.dueDate.toISOString()
//             }, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (response.data.id) {
//                 showSnackbar('Task updated successfully', 'success');
//                 navigate('/admindashboard');
//             } else {
//                 showSnackbar('Something went wrong', 'error');
//             }
//         } catch (error) {
//             console.error('Error updating task:', error);
//             showSnackbar(error.response?.data?.message || 'Failed to update task', 'error');
//         }
//     };

//     const showSnackbar = (message, severity) => {
//         setSnackbar({ open: true, message, severity });
//         setTimeout(() => setSnackbar({ ...snackbar, open: false }), 5000);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleDateChange = (date) => {
//         setFormData(prev => ({
//             ...prev,
//             dueDate: date
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!formData.employeeId || !formData.title || !formData.dueDate ||
//             !formData.description || !formData.priority || !formData.taskStatus) {
//             showSnackbar('Please fill all required fields', 'error');
//             return;
//         }
//         updateTask();
//     };

//     useEffect(() => {
//         if (id) {
//             getTaskById();
//             getUsers();
//         }
//     }, [id]);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="container max-w-md mx-auto px-4 py-8">
//             <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Update Task</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//                 {/* Title Field */}
//                 <div>
//                     <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//                         Title <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         id="title"
//                         name="title"
//                         type="text"
//                         value={formData.title}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                         required
//                     />
//                 </div>

//                 {/* Description Field */}
//                 <div>
//                     <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                         Description <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                         id="description"
//                         name="description"
//                         rows={4}
//                         value={formData.description}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                         required
//                     />
//                 </div>

//                 {/* Due Date Field */}
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Due Date <span className="text-red-500">*</span>
//                     </label>
//                     <LocalizationProvider dateAdapter={AdapterDateFns}>
//                         <DatePicker
//                             value={formData.dueDate}
//                             onChange={handleDateChange}
//                             className="w-full"
//                         />
//                     </LocalizationProvider>
//                 </div>

//                 {/* Priority Field */}
//                 <div>
//                     <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
//                         Priority <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                         id="priority"
//                         name="priority"
//                         value={formData.priority}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                         required
//                     >
//                         <option value="">Select Priority</option>
//                         {listOfPriorities.map(priority => (
//                             <option key={priority} value={priority}>{priority}</option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Status Field */}
//                 <div>
//                     <label htmlFor="taskStatus" className="block text-sm font-medium text-gray-700 mb-1">
//                         Status <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                         id="taskStatus"
//                         name="taskStatus"
//                         value={formData.taskStatus}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                         required
//                     >
//                         <option value="">Select Status</option>
//                         {listOfTaskStatus.map(status => (
//                             <option key={status} value={status}>{status}</option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Employee Field */}
//                 <div>
//                     <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
//                         Assign Employee <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                         id="employeeId"
//                         name="employeeId"
//                         value={formData.employeeId}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                         required
//                     >
//                         <option value="">Select Employee</option>
//                         {listOfEmployees.map(employee => (
//                             <option key={employee.id} value={employee.id}>{employee.name}</option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="pt-4">
//                     <button
//                         type="submit"
//                         className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                     >
//                         Update Task
//                     </button>
//                 </div>
//             </form>

//             {/* Snackbar Notification */}
//             {snackbar.open && (
//                 <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg flex items-center ${snackbar.severity === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     <span>{snackbar.message}</span>
//                     <button
//                         onClick={() => setSnackbar({ ...snackbar, open: false })}
//                         className="ml-4 font-bold focus:outline-none"
//                     >
//                         ×
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UpdateTask;





// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { FaArrowLeft } from 'react-icons/fa';

// const API_BASE_URL = 'http://localhost:8080/api/admin'; // Update with your API base URL

// const UpdateTask = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
//   const [loading, setLoading] = useState(true);

//   const [formData, setFormData] = useState({
//     employeeId: '',
//     title: '',
//     dueDate: null,
//     description: '',
//     priority: '',
//     taskStatus: ''
//   });

//   const [listOfEmployees, setListOfEmployees] = useState([]);
//   const listOfPriorities = ['LOW', 'MEDIUM', 'HIGH'];
//   const listOfTaskStatus = ['PENDING', 'INPROGRESS', 'COMPLETED', 'DEFERRED', 'CANCELED'];

//   const getTaskById = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/task/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       setFormData({
//         ...response.data,
//         dueDate: new Date(response.data.dueDate)
//       });
//     } catch (error) {
//       console.error('Error fetching task:', error);
//       showSnackbar('Failed to load task details', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getUsers = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/users`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       setListOfEmployees(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       showSnackbar('Failed to load employee list', 'error');
//     }
//   };

//   const updateTask = async () => {
//     try {
//       const response = await axios.put(
//         `${API_BASE_URL}/task/${id}`,
//         {
//           ...formData,
//           dueDate: formData.dueDate.toISOString()
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.data.id) {
//         showSnackbar('Task updated successfully', 'success');
//         navigate('/admindashboard');
//       } else {
//         showSnackbar('Something went wrong', 'error');
//       }
//     } catch (error) {
//       console.error('Error updating task:', error);
//       showSnackbar(error.response?.data?.message || 'Failed to update task', 'error');
//     }
//   };

//   const showSnackbar = (message, severity) => {
//     setSnackbar({ open: true, message, severity });
//     setTimeout(() => setSnackbar({ ...snackbar, open: false }), 5000);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleDateChange = (date) => {
//     setFormData((prev) => ({
//       ...prev,
//       dueDate: date
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (
//       !formData.employeeId ||
//       !formData.title ||
//       !formData.dueDate ||
//       !formData.description ||
//       !formData.priority ||
//       !formData.taskStatus
//     ) {
//       showSnackbar('Please fill all required fields', 'error');
//       return;
//     }
//     updateTask();
//   };

//   useEffect(() => {
//     if (id) {
//       getTaskById();
//       getUsers();
//     }
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//  <div className='bg-gradient-to-tr from-blue-50 to-blue-100 '>
//        <div className="container max-w-md mx-auto px-4 py-8 bg-white p-4">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
//       >
//         <FaArrowLeft className="mr-2" />
//         Back
//       </button>

//       <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Update Task</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Title */}
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//             Title <span className="text-red-500">*</span>
//           </label>
//           <input
//             id="title"
//             name="title"
//             type="text"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full text-sm sm:text-base px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label htmlFor="description"  className="block  text-sm font-medium text-gray-700 mb-1">
//             Description <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             rows={4}
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full text-sm sm:text-base px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             required
//           />
//         </div>

//         {/* Due Date */}
//         <div>
//           <label className="block text-sm  font-medium text-gray-700 mb-1">
//             Due Date <span className="text-red-500">*</span>
//           </label>
//           <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <DatePicker
//               value={formData.dueDate}
//               onChange={handleDateChange}
//               className="w-full"
//             />
//           </LocalizationProvider>
//         </div>

//         {/* Priority */}
//         <div>
//           <label htmlFor="priority" className="block text-sm  font-medium text-gray-700 mb-1">
//             Priority <span className="text-red-500">*</span>
//           </label>
//           <select
//             id="priority"
//             name="priority"
//             value={formData.priority}
//             onChange={handleChange}
//             className="w-[250px] md:w-[420px]  text-sm sm:text-base px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             required
//           >
//             <option value="">Select Priority</option>
//             {listOfPriorities.map((priority) => (
//               <option key={priority} value={priority} className="w-2xs text-sm sm:text-base">
//                 {priority}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Task Status */}
//         <div>
//           <label htmlFor="taskStatus" className="block text-sm font-medium text-gray-700 mb-1">
//             Status <span className="text-red-500">*</span>
//           </label>
//           <select
//             id="taskStatus"
//             name="taskStatus"
//             value={formData.taskStatus}
//             onChange={handleChange}
//             className="w-[250px] md:w-[420px]  text-sm sm:text-base px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             required
//           >
//             <option value="">Select Status</option>
//             {listOfTaskStatus.map((status) => (
//               <option key={status} value={status} className="text-sm sm:text-base">
//                 {status}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Assign Employee */}
//         <div>
//           <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
//             Assign Employee <span className="text-red-500">*</span>
//           </label>
//           <select
//             id="employeeId"
//             name="employeeId"
//             value={formData.employeeId}
//             onChange={handleChange}
//             className="w-[250px] md:w-[420px]  text-sm sm:text-base px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             required
//           >
//             <option value="">Select Employee</option>
//             {listOfEmployees.map((employee) => (
//               <option key={employee.id} value={employee.id} className="text-sm sm:text-base">
//                 {employee.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Submit Button */}
//         <div className="pt-4">
//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Update Task
//           </button>
//         </div>
//       </form>

//       {/* Snackbar */}
//       {snackbar.open && (
//         <div
//           className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg flex items-center ${
//             snackbar.severity === 'success'
//               ? 'bg-green-100 text-green-800'
//               : 'bg-red-100 text-red-800'
//           }`}
//         >
//           <span>{snackbar.message}</span>
//           <button
//             onClick={() => setSnackbar({ ...snackbar, open: false })}
//             className="ml-4 font-bold focus:outline-none"
//           >
//             ×
//           </button>
//         </div>
//       )}
//     </div>
//  </div>
//   );
// };

// export default UpdateTask;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FaArrowLeft } from 'react-icons/fa';
import Navbar from '../NavBar/Navbar';

const API_BASE_URL = 'http://localhost:8080/api/admin';

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    employeeId: '',
    title: '',
    dueDate: null,
    description: '',
    priority: '',
    taskStatus: ''
  });

  const [listOfEmployees, setListOfEmployees] = useState([]);
  const listOfPriorities = ['LOW', 'MEDIUM', 'HIGH'];
  const listOfTaskStatus = ['PENDING', 'INPROGRESS', 'COMPLETED', 'DEFERRED', 'CANCELED'];

  const getTaskById = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/task/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setFormData({
        ...response.data,
        dueDate: new Date(response.data.dueDate)
      });
    } catch (error) {
      console.error('Error fetching task:', error);
      showSnackbar('Failed to load task details', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setListOfEmployees(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      showSnackbar('Failed to load employee list', 'error');
    }
  };

  const updateTask = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/task/${id}`,
        {
          ...formData,
          dueDate: formData.dueDate.toISOString()
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.id) {
        showSnackbar('Task updated successfully', 'success');
        navigate('/admindashboard');
      } else {
        showSnackbar('Something went wrong', 'error');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      showSnackbar(error.response?.data?.message || 'Failed to update task', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
    setTimeout(() => setSnackbar({ ...snackbar, open: false }), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      dueDate: date
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.employeeId ||
      !formData.title ||
      !formData.dueDate ||
      !formData.description ||
      !formData.priority ||
      !formData.taskStatus
    ) {
      showSnackbar('Please fill all required fields', 'error');
      return;
    }
    updateTask();
  };

  useEffect(() => {
    if (id) {
      getTaskById();
      getUsers();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
   <div>
    <Navbar />
     <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-blue-100 py-4 px-4 sm:px-6 mt-17 ">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          {/* Header with Back Button */}
       <div className="flex items-center mb-6">
  <button
    onClick={() => navigate(-1)}
    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mr-4"
  >
    <FaArrowLeft className="mr-2" />
    <span className="text-sm sm:text-base">Back</span>
  </button>

  <div className="flex-1 text-center">
  <h2 className="text-xl sm:text-2xl font-bold text-[#00A3E1]">
  Update Task
</h2>

  </div>
</div>


          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                required
              />
            </div>

            {/* Grid for Due Date and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date <span className="text-red-500">*</span>
                </label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={formData.dueDate}
                    onChange={handleDateChange}
                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                    className="w-full"
                  />
                </LocalizationProvider>
              </div>

              {/* Priority */}
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority <span className="text-red-500">*</span>
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  required
                >
                  <option value="">Select Priority</option>
                  {listOfPriorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid for Status and Assign Employee */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Task Status */}
              <div>
                <label htmlFor="taskStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="taskStatus"
                  name="taskStatus"
                  value={formData.taskStatus}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  required
                >
                  <option value="">Select Status</option>
                  {listOfTaskStatus.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Assign Employee */}
              <div>
                <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
                  Assign Employee <span className="text-red-500">*</span>
                </label>
                <select
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  required
                >
                  <option value="">Select Employee</option>
                  {listOfEmployees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
         <div className="pt-4 text-center">
<button
  type="submit"
  className="inline-block px-6 py-3 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-[#00AEEF] hover:bg-[#0095D6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00AEEF] transition-all duration-300"
>
  Update Task
</button>

</div>

          </form>

          {/* Snackbar - Mobile Optimized */}
          {snackbar.open && (
            <div
              className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md px-4 py-3 rounded-md shadow-lg flex items-center justify-between ${
                snackbar.severity === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}
            >
              <span className="text-sm">{snackbar.message}</span>
              <button
                onClick={() => setSnackbar({ ...snackbar, open: false })}
                className="ml-4 font-bold focus:outline-none text-lg hover:opacity-75"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
   </div>
  );
};

export default UpdateTask;