












// import React, { useState, useRef, useEffect } from 'react';
// import Webcam from 'react-webcam';

// const AttendanceSystem = () => {
//   // State declarations
//   const [isCameraOn, setIsCameraOn] = useState(false);
//   const [attendanceStatus, setAttendanceStatus] = useState('notChecked');
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [employeeName, setEmployeeName] = useState('John Doe');
//   const [employeeId, setEmployeeId] = useState('EMP-00123');
//   const [department, setDepartment] = useState('Engineering');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isHumanDetected, setIsHumanDetected] = useState(false);
//   const [notification, setNotification] = useState(null);
  
//   const webcamRef = useRef(null);
//   const detectionTimeoutRef = useRef(null);
//   const successTimeoutRef = useRef(null);
//   const detectionIntervalRef = useRef(null);

//   // Update time every second
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     // Human detection simulation
//     detectionIntervalRef.current = setInterval(() => {
//       const detected = Math.random() > 0.2;
//       setIsHumanDetected(detected);
      
//       if (detected && !isCameraOn) {
//         setIsCameraOn(true);
//       } 
//       else if (!detected && isCameraOn) {
//         clearTimeout(detectionTimeoutRef.current);
//         detectionTimeoutRef.current = setTimeout(() => {
//           setIsCameraOn(false);
//         }, 3000);
//       }
//     }, 2000);

//     return () => {
//       clearInterval(timer);
//       clearInterval(detectionIntervalRef.current);
//       clearTimeout(detectionTimeoutRef.current);
//       clearTimeout(successTimeoutRef.current);
//     };
//   }, [isCameraOn]);

//   // Format time
//   const formatTime = (date) => {
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   // Format date
//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', { 
//       weekday: 'long', 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     });
//   };

//   // Simulate face recognition
//   const simulateFaceRecognition = () => {
//     setIsLoading(true);
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         setIsLoading(false);
//         resolve(true);
//       }, 1500);
//     });
//   };

//   // Show notification and reset after 3 seconds
//   const showNotification = (type) => {
//     setNotification({
//       type,
//       time: new Date()
//     });
    
//     // Reset the entire state after 3 seconds
//     successTimeoutRef.current = setTimeout(() => {
//       setNotification(null);
//       setAttendanceStatus('notChecked');
//       setIsCameraOn(false);
//       setIsHumanDetected(false);
//     }, 3000);
//   };

//   // Handle check in/out
//   const handleCheck = async (type) => {
//     const recognitionSuccess = await simulateFaceRecognition();
    
//     if (recognitionSuccess) {
//       // Show notification
//       showNotification(type);

//       // Update attendance status
//       setAttendanceStatus(type === 'in' ? 'checkedIn' : 'checkedOut');
//     }
//   };

//   // Toggle camera manually
//   const toggleCamera = () => {
//     setIsCameraOn(!isCameraOn);
//     clearTimeout(detectionTimeoutRef.current);
//   };

//   // Get status text and color
//   const getStatusInfo = () => {
//     switch (attendanceStatus) {
//       case 'checkedIn':
//         return { 
//           text: 'Present', 
//           color: 'bg-green-100 text-green-800',
//           icon: (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//             </svg>
//           )
//         };
//       case 'checkedOut':
//         return { 
//           text: 'Left Office', 
//           color: 'bg-blue-100 text-blue-800',
//           icon: (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//             </svg>
//           )
//         };
//       default:
//         return { 
//           text: 'Not Checked', 
//           color: 'bg-gray-100 text-gray-800',
//           icon: (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//             </svg>
//           )
//         };
//     }
//   };

//   const statusInfo = getStatusInfo();

//   return (
//     <div className="flex flex-col bg-gradient-to-br mt-12 md:mt-6 from-blue-50 to-indigo-100">
//       {/* Main content container */}
//       <div className="flex-grow overflow-y-auto p-4 md:p-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Grid layout for desktop and mobile */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            
//             {/* Mobile Camera Section - Top on Mobile */}
//             <div className="md:hidden mb-4">
//               <div className="bg-white rounded-2xl shadow-lg p-4">
//                 <div className="flex justify-between items-center mb-3">
//                   <h2 className="text-lg font-bold text-gray-800 flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                     </svg>
//                     Attendance Camera
//                   </h2>
                  
//                   <div className="flex items-center">
//                     <div className={`flex items-center mr-2 ${
//                       isHumanDetected ? 'text-green-600' : 'text-gray-500'
//                     }`}>
//                       <div className={`w-2 h-2 rounded-full mr-1 ${
//                         isHumanDetected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
//                       }`}></div>
//                       <span className="text-xs">
//                         {isHumanDetected ? 'Detected' : 'No person'}
//                       </span>
//                     </div>
                    
//                     <button 
//                       onClick={toggleCamera}
//                       className="flex items-center px-2 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg transition-colors"
//                     >
//                       <span className="mr-1 text-sm">
//                         {isCameraOn ? 'Off' : 'On'}
//                       </span>
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                         <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
                
//                 <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden relative border-4 border-indigo-100">
//                   {isCameraOn ? (
//                     <>
//                       <Webcam
//                         audio={false}
//                         ref={webcamRef}
//                         screenshotFormat="image/jpeg"
//                         className="w-full h-full object-cover"
//                       />
                      
//                       {isLoading && (
//                         <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
//                           <div className="text-center">
//                             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto"></div>
//                             <p className="mt-2 text-white text-sm font-medium">Verifying identity...</p>
//                           </div>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-gray-800">
//                       <div className="text-center">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                         </svg>
//                         <p className="mt-1 text-gray-400 text-sm">Camera is {isHumanDetected ? 'starting...' : 'off'}</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="flex justify-center mt-4 space-x-3">
//                   <button
//                     onClick={() => handleCheck('in')}
//                     disabled={!isCameraOn || isLoading}
//                     className={`px-4 py-2 text-sm rounded-full font-medium text-white shadow-lg transition-all flex items-center ${
//                       !isCameraOn || isLoading 
//                         ? 'bg-gray-400 cursor-not-allowed' 
//                         : 'bg-green-500 hover:bg-green-600 active:scale-95'
//                     }`}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
//                     </svg>
//                     Check In
//                   </button>
                  
//                   <button
//                     onClick={() => handleCheck('out')}
//                     disabled={!isCameraOn || isLoading}
//                     className={`px-4 py-2 text-sm rounded-full font-medium text-white shadow-lg transition-all flex items-center ${
//                       !isCameraOn || isLoading 
//                         ? 'bg-gray-400 cursor-not-allowed' 
//                         : 'bg-blue-500 hover:bg-blue-600 active:scale-95'
//                     }`}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
//                     </svg>
//                     Check Out
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Employee Info Card - Below Camera on Mobile */}
//             <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 md:mt-10 md:mb-10">
//               {/* Notification/Time Display */}
//               <div className="mt-2 md:mt-0 bg-white rounded-xl shadow-md p-3 md:p-4 flex items-center">
//                 {notification ? (
//                   <div className="flex items-center w-full">
//                     {notification.type === 'in' ? (
//                       <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-green-100 ring-2 ring-green-200 mr-3">
//                         <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                         </svg>
//                       </div>
//                     ) : (
//                       <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 ring-2 ring-blue-200 mr-3">
//                         <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
//                         </svg>
//                       </div>
//                     )}
//                     <div className="flex-grow">
//                       <div className="font-semibold">{employeeName}</div>
//                       <div className="text-sm">
//                         {notification.type === 'in' ? 'Checked In' : 'Checked Out'} at {formatTime(notification.time)}
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="text-center md:text-right flex-grow">
//                       <div className="text-xl md:text-2xl font-bold text-indigo-700">{formatTime(currentTime)}</div>
//                       <div className="text-gray-600 text-xs md:text-sm">{formatDate(currentTime)}</div>
//                     </div>
//                     <div className="ml-2 bg-indigo-100 p-1 md:p-2 rounded-full">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                   </>
//                 )}
//               </div>
              
//               {attendanceStatus === 'notChecked' ? (
//                 <div className="text-center py-4 md:py-8 relative overflow-hidden rounded-2xl mt-10">
//                   <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 backdrop-blur-sm">
//                     <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 mix-blend-overlay opacity-30"></div>
//                   </div>
                  
//                   <div className="relative z-10 max-w-xl mx-auto">
//                     <div className="flex flex-col items-center">
//                       <h3 className="text-xl md:text-2xl font-bold text-indigo-900 bg-white/80 px-3 py-1 rounded-full inline-block backdrop-blur-sm">
//                         Welcome<span className="text-purple-600">!</span>
//                       </h3>
                      
//                       <div className="text-center py-4">
//                         <div className="bg-indigo-100 border border-indigo-300 rounded-xl w-full max-w-md mx-auto shadow-md p-4">
//                           <div className="flex flex-col items-center">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 2c-2.667 0-8 1.333-8 4v1h16v-1c0-2.667-5.333-4-8-4z" />
//                             </svg>
//                             <p className="text-gray-700 text-sm md:text-base">Awaiting your attendance</p>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="mt-3">
//                         <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs md:text-sm">
//                           <span className="font-medium">Please look into the camera to verify</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <div> 
//                     <div className="flex items-center mb-4 mt-10">
//                       <div className="relative">
//                         <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16" />
//                         <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
//                           isHumanDetected ? 'bg-green-500' : 'bg-gray-400'
//                         }`}></div>
//                       </div>
//                       <div className="ml-3">
//                         <h2 className="text-lg md:text-xl font-bold text-gray-800">{employeeName}</h2>
//                         <p className="text-gray-600 text-sm">{employeeId}</p>
//                       </div>
//                     </div>
                    
//                     <div className="mb-3">
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-gray-600 text-sm flex items-center">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                           </svg>
//                           Status:
//                         </span>
//                         <span className={`px-2 py-1 text-xs md:text-sm rounded-full font-medium flex items-center ${statusInfo.color}`}>
//                           {statusInfo.icon}
//                           {statusInfo.text}
//                         </span>
//                       </div>
                      
//                       <div className="flex justify-between items-center mb-1 bg-gray-50 p-2 rounded-lg">
//                         <span className="text-gray-600 text-sm flex items-center">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                           </svg>
//                           Date:
//                         </span>
//                         <span className="font-medium text-sm">{formatDate(currentTime)}</span>
//                       </div>
                      
//                       <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
//                         <span className="text-gray-600 text-sm flex items-center">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           Time:
//                         </span>
//                         <span className="font-medium text-sm">{formatTime(currentTime)}</span>
//                       </div>
//                     </div>
                    
//                     <div className="mt-4">
//                       <h3 className="font-bold text-gray-700 text-sm md:text-base mb-1 flex items-center">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                         </svg>
//                         Department Info
//                       </h3>
//                       <div className="bg-indigo-50 rounded-lg p-3">
//                         <p className="text-indigo-800 font-medium text-sm md:text-base">{department}</p>
//                         <p className="text-indigo-700 text-xs mt-1">Office: San Francisco HQ • Floor 3</p>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Desktop Camera Section */}
//             <div className="hidden md:block lg:col-span-2 p-10">
//               <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 h-full flex flex-col">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                     </svg>
//                     Attendance Camera
//                   </h2>
                  
//                   <div className="flex items-center">
//                     <div className={`flex items-center mr-4 ${
//                       isHumanDetected ? 'text-green-600' : 'text-gray-500'
//                     }`}>
//                       <div className={`w-2 h-2 rounded-full mr-1 ${
//                         isHumanDetected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
//                       }`}></div>
//                       <span className="text-sm">
//                         {isHumanDetected ? 'Person detected' : 'No person'}
//                       </span>
//                     </div>
                    
//                     <button 
//                       onClick={toggleCamera}
//                       className="flex items-center px-3 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg transition-colors text-sm"
//                     >
//                       <span className="mr-1">
//                         {isCameraOn ? 'Turn Off' : 'Turn On'}
//                       </span>
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                         <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
                
//                 <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden relative border-4 border-indigo-100 flex-grow">
//                   {isCameraOn ? (
//                     <>
//                       <Webcam
//                         audio={false}
//                         ref={webcamRef}
//                         screenshotFormat="image/jpeg"
//                         className="w-full h-full object-cover"
//                       />
                      
//                       {isLoading && (
//                         <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
//                           <div className="text-center">
//                             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto"></div>
//                             <p className="mt-2 text-white text-sm font-medium">Verifying identity...</p>
//                           </div>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-gray-800">
//                       <div className="text-center">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                         </svg>
//                         <p className="mt-2 text-gray-400 text-sm">Camera is {isHumanDetected ? 'starting...' : 'off'}</p>
//                         <p className="text-gray-500 text-xs mt-1">
//                           {isHumanDetected ? 'Person detected - camera starting' : 'Approach camera to activate'}
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="flex justify-center mt-4 md:mt-6 space-x-3">
//                   <button
//                     onClick={() => handleCheck('in')}
//                     disabled={!isCameraOn || isLoading}
//                     className={`px-4 py-2 md:px-5 md:py-2.5 text-sm rounded-full font-medium text-white shadow-lg transition-all flex items-center ${
//                       !isCameraOn || isLoading 
//                         ? 'bg-gray-400 cursor-not-allowed' 
//                         : 'bg-green-500 hover:bg-green-600 active:scale-95'
//                     }`}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
//                     </svg>
//                     Check In
//                   </button>
                  
//                   <button
//                     onClick={() => handleCheck('out')}
//                     disabled={!isCameraOn || isLoading}
//                     className={`px-4 py-2 md:px-5 md:py-2.5 text-sm rounded-full font-medium text-white shadow-lg transition-all flex items-center ${
//                       !isCameraOn || isLoading 
//                         ? 'bg-gray-400 cursor-not-allowed' 
//                         : 'bg-blue-500 hover:bg-blue-600 active:scale-95'
//                     }`}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
//                     </svg>
//                     Check Out
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceSystem;










// import React, { useState, useRef, useEffect } from 'react';
// import Webcam from 'react-webcam';

// const AttendanceSystem = () => {
//   // State declarations
//   const [isCameraOn, setIsCameraOn] = useState(false);
//   const [attendanceStatus, setAttendanceStatus] = useState('notChecked');
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [employeeName, setEmployeeName] = useState('');
//   const [employeeId, setEmployeeId] = useState('');
//   const [department, setDepartment] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isHumanDetected, setIsHumanDetected] = useState(false);
//   const [notification, setNotification] = useState(null);
//   const [employeeData, setEmployeeData] = useState(null);
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [recognizedEmail, setRecognizedEmail] = useState('');

//   const webcamRef = useRef(null);
//   const detectionTimeoutRef = useRef(null);
//   const successTimeoutRef = useRef(null);
//   const detectionIntervalRef = useRef(null);

//   // Update time every second
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     // Human detection simulation
//     detectionIntervalRef.current = setInterval(() => {
//       const detected = Math.random() > 0.2;
//       setIsHumanDetected(detected);

//       if (detected && !isCameraOn) {
//         setIsCameraOn(true);
//       }
//       else if (!detected && isCameraOn) {
//         clearTimeout(detectionTimeoutRef.current);
//         detectionTimeoutRef.current = setTimeout(() => {
//           setIsCameraOn(false);
//         }, 3000);
//       }
//     }, 2000);

//     return () => {
//       clearInterval(timer);
//       clearInterval(detectionIntervalRef.current);
//       clearTimeout(detectionTimeoutRef.current);
//       clearTimeout(successTimeoutRef.current);
//     };
//   }, [isCameraOn]);

//   // Format time
//   const formatTime = (date) => {
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   // Format date
//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Capture image and send to backend for recognition
//   const captureAndRecognize = async () => {
//     if (!webcamRef.current) return null;

//     const imageSrc = webcamRef.current.getScreenshot();
//     if (!imageSrc) return null;

//     try {
//       setIsLoading(true);

//       // Step 1: Generate embedding from the captured image
//       const embeddingResponse = await fetch("http://localhost:5005/generate-embedding", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ image: imageSrc })
//       });

//       if (!embeddingResponse.ok) throw new Error("Embedding generation failed");
//       const embeddingResult = await embeddingResponse.json();
//       const currentEmbedding = embeddingResult.embedding;

//       // Step 2: Get all cached embeddings to compare against
//       const cacheResponse = await fetch("http://localhost:8080/api/auth/cache");
//       if (!cacheResponse.ok) throw new Error("Failed to fetch cached embeddings");
//       const cachedEmbeddings = await cacheResponse.json();

//       // Step 3: Compare with each cached embedding
//       let bestMatch = null;
//       let highestSimilarity = 0;

//       for (const cachedUser of cachedEmbeddings) {
//         if (!cachedUser.embedding || cachedUser.embedding.length === 0) continue;

//         const compareResponse = await fetch("http://localhost:5005/compare-embeddings", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             embedding1: currentEmbedding,
//             embedding2: cachedUser.embedding
//           })
//         });

//         if (compareResponse.ok) {
//           const compareResult = await compareResponse.json();

//           if (compareResult.match && compareResult.similarity > highestSimilarity) {
//             highestSimilarity = compareResult.similarity;
//             bestMatch = cachedUser;
//           }
//         }
//       }

//       if (bestMatch) {
//         // Get additional user info from database
//         const userResponse = await fetch(`http://localhost:8080/api/auth/users?email=${bestMatch.email}`);
//         if (userResponse.ok) {
//           const userData = await userResponse.json();
//           if (userData.length > 0) {
//             setEmployeeName(userData[0].name || bestMatch.name);
//             setRecognizedEmail(bestMatch.email);

//             // Set dummy values for other fields (you can extend this with real data)
//             setEmployeeId("EMP-" + bestMatch.email.substring(0, 5).toUpperCase());
//             setDepartment("Engineering"); // Default department

//             return bestMatch.email;
//           }
//         }

//         // Fallback to cached data if user API fails
//         setEmployeeName(bestMatch.name);
//         setRecognizedEmail(bestMatch.email);
//         setEmployeeId("EMP-" + bestMatch.email.substring(0, 5).toUpperCase());
//         setDepartment("Engineering");

//         return bestMatch.email;
//       } else {
//         throw new Error("No matching face found");
//       }
//     } catch (error) {
//       console.error("Face recognition error:", error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle check in/out
//   const handleCheck = async (type) => {
//     try {
//       const recognizedEmail = await captureAndRecognize();

//       if (recognizedEmail) {
//         // Send attendance record to backend
//         const response = await fetch("http://localhost:8080/api/attendance/check-in-out", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: recognizedEmail,
//             type: type,
//             photo: webcamRef.current.getScreenshot()
//           })
//         });

//         if (response.ok) {
//           // Show notification
//           showNotification(type);

//           // Update attendance status
//           setAttendanceStatus(type === 'in' ? 'checkedIn' : 'checkedOut');
//         } else {
//           throw new Error("Failed to record attendance");
//         }
//       }
//     } catch (error) {
//       console.error("Attendance error:", error);
//       alert(`Error: ${error.message}`);
//     }
//   };

//   // Show notification and reset after 3 seconds
//   const showNotification = (type) => {
//     setNotification({
//       type,
//       time: new Date()
//     });

//     // Reset the entire state after 3 seconds
//     successTimeoutRef.current = setTimeout(() => {
//       setNotification(null);
//       setAttendanceStatus('notChecked');
//       setIsCameraOn(false);
//       setIsHumanDetected(false);
//       setEmployeeName('');
//       setRecognizedEmail('');
//     }, 3000);
//   };

//   // Toggle camera manually
//   const toggleCamera = () => {
//     setIsCameraOn(!isCameraOn);
//     clearTimeout(detectionTimeoutRef.current);

//     // Reset recognition data when turning camera off
//     if (!isCameraOn) {
//       setEmployeeName('');
//       setRecognizedEmail('');
//     }
//   };

//   // Get status text and color
//   const getStatusInfo = () => {
//     switch (attendanceStatus) {
//       case 'checkedIn':
//         return {
//           text: 'Present',
//           color: 'bg-green-100 text-green-800',
//           icon: (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//             </svg>
//           )
//         };
//       case 'checkedOut':
//         return {
//           text: 'Left Office',
//           color: 'bg-blue-100 text-blue-800',
//           icon: (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//             </svg>
//           )
//         };
//       default:
//         return {
//           text: 'Not Checked',
//           color: 'bg-gray-100 text-gray-800',
//           icon: (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//             </svg>
//           )
//         };
//     }
//   };

//   const statusInfo = getStatusInfo();

//   return (
//     <div className="flex flex-col bg-gradient-to-br mt-12 md:mt-6 from-blue-50 to-indigo-100">
//       {/* Main content container */}
//       <div className="flex-grow overflow-y-auto p-4 md:p-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Grid layout for desktop and mobile */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

//             {/* Mobile Camera Section - Top on Mobile */}
//             <div className="md:hidden mb-4">
//               <div className="bg-white rounded-2xl shadow-lg p-4">
//                 <div className="flex justify-between items-center mb-3">
//                   <h2 className="text-lg font-bold text-gray-800 flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                     </svg>
//                     Attendance Camera
//                   </h2>

//                   <div className="flex items-center">
//                     <div className={`flex items-center mr-2 ${
//                       isHumanDetected ? 'text-green-600' : 'text-gray-500'
//                     }`}>
//                       <div className={`w-2 h-2 rounded-full mr-1 ${
//                         isHumanDetected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
//                       }`}></div>
//                       <span className="text-xs">
//                         {isHumanDetected ? 'Detected' : 'No person'}
//                       </span>
//                     </div>

//                     <button
//                       onClick={toggleCamera}
//                       className="flex items-center px-2 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg transition-colors"
//                     >
//                       <span className="mr-1 text-sm">
//                         {isCameraOn ? 'Off' : 'On'}
//                       </span>
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                         <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden relative border-4 border-indigo-100">
//                   {isCameraOn ? (
//                     <>
//                       <Webcam
//                         audio={false}
//                         ref={webcamRef}
//                         screenshotFormat="image/jpeg"
//                         className="w-full h-full object-cover"
//                       />

//                       {isLoading && (
//                         <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
//                           <div className="text-center">
//                             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto"></div>
//                             <p className="mt-2 text-white text-sm font-medium">Verifying identity...</p>
//                           </div>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-gray-800">
//                       <div className="text-center">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                         </svg>
//                         <p className="mt-1 text-gray-400 text-sm">Camera is {isHumanDetected ? 'starting...' : 'off'}</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex justify-center mt-4 space-x-3">
//                   <button
//                     onClick={() => handleCheck('in')}
//                     disabled={!isCameraOn || isLoading || !employeeName}
//                     className={`px-4 py-2 text-sm rounded-full font-medium text-white shadow-lg transition-all flex items-center ${
//                       !isCameraOn || isLoading || !employeeName
//                         ? 'bg-gray-400 cursor-not-allowed'
//                         : 'bg-green-500 hover:bg-green-600 active:scale-95'
//                     }`}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
//                     </svg>
//                     Check In
//                   </button>

//                   <button
//                     onClick={() => handleCheck('out')}
//                     disabled={!isCameraOn || isLoading || !employeeName}
//                     className={`px-4 py-2 text-sm rounded-full font-medium text-white shadow-lg transition-all flex items-center ${
//                       !isCameraOn || isLoading || !employeeName
//                         ? 'bg-gray-400 cursor-not-allowed'
//                         : 'bg-blue-500 hover:bg-blue-600 active:scale-95'
//                     }`}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
//                     </svg>
//                     Check Out
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Employee Info Card - Below Camera on Mobile */}
//             <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 md:mt-10 md:mb-10">
//               {/* Notification/Time Display */}
//               <div className="mt-2 md:mt-0 bg-white rounded-xl shadow-md p-3 md:p-4 flex items-center">
//                 {notification ? (
//                   <div className="flex items-center w-full">
//                     {notification.type === 'in' ? (
//                       <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-green-100 ring-2 ring-green-200 mr-3">
//                         <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                         </svg>
//                       </div>
//                     ) : (
//                       <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 ring-2 ring-blue-200 mr-3">
//                         <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
//                         </svg>
//                       </div>
//                     )}
//                     <div className="flex-grow">
//                       <div className="font-semibold">{employeeName}</div>
//                       <div className="text-sm">
//                         {notification.type === 'in' ? 'Checked In' : 'Checked Out'} at {formatTime(notification.time)}
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="text-center md:text-right flex-grow">
//                       <div className="text-xl md:text-2xl font-bold text-indigo-700">{formatTime(currentTime)}</div>
//                       <div className="text-gray-600 text-xs md:text-sm">{formatDate(currentTime)}</div>
//                     </div>
//                     <div className="ml-2 bg-indigo-100 p-1 md:p-2 rounded-full">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                   </>
//                 )}
//               </div>

//               {attendanceStatus === 'notChecked' ? (
//                 <div className="text-center py-4 md:py-8 relative overflow-hidden rounded-2xl mt-10">
//                   <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 backdrop-blur-sm">
//                     <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 mix-blend-overlay opacity-30"></div>
//                   </div>

//                   <div className="relative z-10 max-w-xl mx-auto">
//                     <div className="flex flex-col items-center">
//                       <h3 className="text-xl md:text-2xl font-bold text-indigo-900 bg-white/80 px-3 py-1 rounded-full inline-block backdrop-blur-sm">
//                         {employeeName ? `Welcome ${employeeName}!` : 'Welcome!'}
//                       </h3>

//                       <div className="text-center py-4">
//                         <div className="bg-indigo-100 border border-indigo-300 rounded-xl w-full max-w-md mx-auto shadow-md p-4">
//                           <div className="flex flex-col items-center">
//                             {employeeName ? (
//                               <>
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                 </svg>
//                                 <p className="text-gray-700 text-sm md:text-base">Face recognized</p>
//                                 <p className="text-green-700 font-medium mt-1">{employeeName}</p>
//                               </>
//                             ) : (
//                               <>
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 2c-2.667 0-8 1.333-8 4v1h16v-1c0-2.667-5.333-4-8-4z" />
//                                 </svg>
//                                 <p className="text-gray-700 text-sm md:text-base">Awaiting your attendance</p>
//                               </>
//                             )}
//                           </div>
//                         </div>
//                       </div>

//                       <div className="mt-3">
//                         <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs md:text-sm">
//                           <span className="font-medium">Please look into the camera to verify</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <div>
//                     <div className="flex items-center mb-4 mt-10">
//                       <div className="relative">
//                         <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16" />
//                         <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
//                           isHumanDetected ? 'bg-green-500' : 'bg-gray-400'
//                         }`}></div>
//                       </div>
//                       <div className="ml-3">
//                         <h2 className="text-lg md:text-xl font-bold text-gray-800">{employeeName}</h2>
//                         <p className="text-gray-600 text-sm">{employeeId}</p>
//                       </div>
//                     </div>

//                     <div className="mb-3">
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-gray-600 text-sm flex items-center">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                           </svg>
//                           Status:
//                         </span>
//                         <span className={`px-2 py-1 text-xs md:text-sm rounded-full font-medium flex items-center ${statusInfo.color}`}>
//                           {statusInfo.icon}
//                           {statusInfo.text}
//                         </span>
//                       </div>

//                       <div className="flex justify-between items-center mb-1 bg-gray-50 p-2 rounded-lg">
//                         <span className="text-gray-600 text-sm flex items-center">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                           </svg>
//                           Date:
//                         </span>
//                         <span className="font-medium text-sm">{formatDate(currentTime)}</span>
//                       </div>

//                       <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
//                         <span className="text-gray-600 text-sm flex items-center">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           Time:
//                         </span>
//                         <span className="font-medium text-sm">{formatTime(currentTime)}</span>
//                       </div>
//                     </div>

//                     <div className="mt-4">
//                       <h3 className="font-bold text-gray-700 text-sm md:text-base mb-1 flex items-center">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                         </svg>
//                         Department Info
//                       </h3>
//                       <div className="bg-indigo-50 rounded-lg p-3">
//                         <p className="text-indigo-800 font-medium text-sm md:text-base">{department}</p>
//                         <p className="text-indigo-700 text-xs mt-1">Office: San Francisco HQ • Floor 3</p>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Desktop Camera Section */}
//             <div className="hidden md:block lg:col-span-2 p-10">
//               <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 h-full flex flex-col">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                     </svg>
//                     Attendance Camera
//                   </h2>

//                   <div className="flex items-center">
//                     <div className={`flex items-center mr-4 ${
//                       isHumanDetected ? 'text-green-600' : 'text-gray-500'
//                     }`}>
//                       <div className={`w-2 h-2 rounded-full mr-1 ${
//                         isHumanDetected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
//                       }`}></div>
//                       <span className="text-sm">
//                         {isHumanDetected ? 'Person detected' : 'No person'}
//                       </span>
//                     </div>

//                     <button
//                       onClick={toggleCamera}
//                       className="flex items-center px-3 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg transition-colors text-sm"
//                     >
//                       <span className="mr-1">
//                         {isCameraOn ? 'Turn Off' : 'Turn On'}
//                       </span>
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                         <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden relative border-4 border-indigo-100 flex-grow">
//                   {isCameraOn ? (
//                     <>
//                       <Webcam
//                         audio={false}
//                         ref={webcamRef}
//                         screenshotFormat="image/jpeg"
//                         className="w-full h-full object-cover"
//                       />

//                       {isLoading && (
//                         <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
//                           <div className="text-center">
//                             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto"></div>
//                             <p className="mt-2 text-white text-sm font-medium">Verifying identity...</p>
//                           </div>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-gray-800">
//                       <div className="text-center">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                         </svg>
//                         <p className="mt-2 text-gray-400 text-sm">Camera is {isHumanDetected ? 'starting...' : 'off'}</p>
//                         <p className="text-gray-500 text-xs mt-1">
//                           {isHumanDetected ? 'Person detected - camera starting' : 'Approach camera to activate'}
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex justify-center mt-4 md:mt-6 space-x-3">
//                   <button
//                     onClick={() => handleCheck('in')}
//                     disabled={!isCameraOn || isLoading}
//                     className={`px-4 py-2 md:px-5 md:py-2.5 text-sm rounded-full font-medium text-white shadow-lg transition-all flex items-center ${
//                       !isCameraOn || isLoading
//                         ? 'bg-gray-400 cursor-not-allowed'
//                         : 'bg-green-500 hover:bg-green-600 active:scale-95'
//                     }`}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
//                     </svg>
//                     Check In
//                   </button>

//                   <button
//                     onClick={() => handleCheck('out')}
//                     disabled={!isCameraOn || isLoading}
//                     className={`px-4 py-2 md:px-5 md:py-2.5 text-sm rounded-full font-medium text-white shadow-lg transition-all flex items-center ${
//                       !isCameraOn || isLoading
//                         ? 'bg-gray-400 cursor-not-allowed'
//                         : 'bg-blue-500 hover:bg-blue-600 active:scale-95'
//                     }`}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
//                     </svg>
//                     Check Out
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceSystem;














// import React, { useState, useRef, useEffect } from 'react';
// import Webcam from 'react-webcam';

// const AttendanceSystem = () => {
//   // State declarations
//   const [isCameraOn, setIsCameraOn] = useState(false);
//   const [attendanceStatus, setAttendanceStatus] = useState('notChecked');
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [employeeName, setEmployeeName] = useState('');
//   const [employeeId, setEmployeeId] = useState('');
//   const [department, setDepartment] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isHumanDetected, setIsHumanDetected] = useState(false);
//   const [notification, setNotification] = useState(null);
//   const [employeeData, setEmployeeData] = useState(null);
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [recognizedEmail, setRecognizedEmail] = useState('');

//   const webcamRef = useRef(null);
//   const detectionTimeoutRef = useRef(null);
//   const successTimeoutRef = useRef(null);
//   const detectionIntervalRef = useRef(null);

//   // Update time every second
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     // Human detection simulation
//     detectionIntervalRef.current = setInterval(() => {
//       const detected = Math.random() > 0.2;
//       setIsHumanDetected(detected);

//       if (detected && !isCameraOn) {
//         setIsCameraOn(true);
//       }
//       else if (!detected && isCameraOn) {
//         clearTimeout(detectionTimeoutRef.current);
//         detectionTimeoutRef.current = setTimeout(() => {
//           setIsCameraOn(false);
//         }, 3000);
//       }
//     }, 2000);

//     return () => {
//       clearInterval(timer);
//       clearInterval(detectionIntervalRef.current);
//       clearTimeout(detectionTimeoutRef.current);
//       clearTimeout(successTimeoutRef.current);
//     };
//   }, [isCameraOn]);

//   // Format time
//   const formatTime = (date) => {
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   // Format date
//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Capture image and send to backend for recognition
//   const captureAndRecognize = async () => {
//     if (!webcamRef.current) return null;

//     const imageSrc = webcamRef.current.getScreenshot();
//     if (!imageSrc) return null;

//     try {
//       setIsLoading(true);

//       // Step 1: Generate embedding from the captured image
//       const embeddingResponse = await fetch("http://localhost:5005/generate-embedding", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ image: imageSrc })
//       });

//       if (!embeddingResponse.ok) throw new Error("Embedding generation failed");
//       const embeddingResult = await embeddingResponse.json();
//       const currentEmbedding = embeddingResult.embedding;

//       // Step 2: Get all cached embeddings to compare against
//       const cacheResponse = await fetch("http://localhost:8080/api/auth/cache");
//       if (!cacheResponse.ok) throw new Error("Failed to fetch cached embeddings");
//       const cachedEmbeddings = await cacheResponse.json();

//       // Step 3: Compare with each cached embedding
//       let bestMatch = null;
//       let highestSimilarity = 0;

//       for (const cachedUser of cachedEmbeddings) {
//         if (!cachedUser.embedding || cachedUser.embedding.length === 0) continue;

//         const compareResponse = await fetch("http://localhost:5005/compare-embeddings", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             embedding1: currentEmbedding,
//             embedding2: cachedUser.embedding
//           })
//         });

//         if (compareResponse.ok) {
//           const compareResult = await compareResponse.json();

//           if (compareResult.match && compareResult.similarity > highestSimilarity) {
//             highestSimilarity = compareResult.similarity;
//             bestMatch = cachedUser;
//           }
//         }
//       }

//       if (bestMatch) {
//         // Get additional user info from database
//         const userResponse = await fetch(`http://localhost:8080/api/auth/users?email=${bestMatch.email}`);
//         if (userResponse.ok) {
//           const userData = await userResponse.json();
//           if (userData.length > 0) {
//             setEmployeeName(userData[0].name || bestMatch.name);
//             setRecognizedEmail(bestMatch.email);

//             // Set dummy values for other fields (you can extend this with real data)
//             setEmployeeId("EMP-" + bestMatch.email.substring(0, 5).toUpperCase());
//             setDepartment("Engineering"); // Default department

//             return bestMatch.email;
//           }
//         }

//         // Fallback to cached data if user API fails
//         setEmployeeName(bestMatch.name);
//         setRecognizedEmail(bestMatch.email);
//         setEmployeeId("EMP-" + bestMatch.email.substring(0, 5).toUpperCase());
//         setDepartment("Engineering");

//         return bestMatch.email;
//       } else {
//         throw new Error("No matching face found");
//       }
//     } catch (error) {
//       console.error("Face recognition error:", error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle check in/out
//   const handleCheck = async (type) => {
//     try {
//       const recognizedEmail = await captureAndRecognize();

//       if (recognizedEmail) {
//         // Send attendance record to backend
//         const response = await fetch("http://localhost:8080/api/attendance/check-in-out", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: recognizedEmail,
//             type: type,
//             photo: webcamRef.current.getScreenshot()
//           })
//         });

//         if (response.ok) {
//           // Show notification
//           showNotification(type);

//           // Update attendance status
//           setAttendanceStatus(type === 'in' ? 'checkedIn' : 'checkedOut');
//         } else {
//           throw new Error("Failed to record attendance");
//         }
//       }
//     } catch (error) {
//       console.error("Attendance error:", error);
//       alert(`Error: ${error.message}`);
//     }
//   };

//   // Show notification and reset after 3 seconds
//   const showNotification = (type) => {
//     setNotification({
//       type,
//       time: new Date()
//     });

//     // Reset the entire state after 3 seconds
//     successTimeoutRef.current = setTimeout(() => {
//       setNotification(null);
//       setAttendanceStatus('notChecked');
//       setIsCameraOn(false);
//       setIsHumanDetected(false);
//       setEmployeeName('');
//       setRecognizedEmail('');
//     }, 3000);
//   };

//   // Toggle camera manually
//   const toggleCamera = () => {
//     setIsCameraOn(!isCameraOn);
//     clearTimeout(detectionTimeoutRef.current);

//     // Reset recognition data when turning camera off
//     if (!isCameraOn) {
//       setEmployeeName('');
//       setRecognizedEmail('');
//     }
//   };

//   // Get status text and color
//   const getStatusInfo = () => {
//     switch (attendanceStatus) {
//       case 'checkedIn':
//         return {
//           text: 'Present',
//           color: 'bg-green-100 text-green-800',
//           icon: (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//             </svg>
//           )
//         };
//       case 'checkedOut':
//         return {
//           text: 'Left Office',
//           color: 'bg-blue-100 text-blue-800',
//           icon: (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//             </svg>
//           )
//         };
//       default:
//         return {
//           text: 'Not Checked',
//           color: 'bg-gray-100 text-gray-800',
//           icon: (
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//             </svg>
//           )
//         };
//     }
//   };

//   const statusInfo = getStatusInfo();

//   return (
//     <div className="flex flex-col bg-gradient-to-br mt-12 md:mt-6 from-blue-50 to-indigo-100">
//       {/* Main content container */}
//       <div className="flex-grow overflow-y-auto p-4 md:p-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Grid layout for desktop and mobile */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

//             {/* Mobile Camera Section - Top on Mobile */}
//             <div className="md:hidden mb-4">
//               <div className="bg-white rounded-2xl shadow-lg p-4">
//                 <div className="flex justify-between items-center mb-3">
//                   <h2 className="text-lg font-bold text-gray-800 flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                     </svg>
//                     Attendance Camera
//                   </h2>

//                   <div className="flex items-center">
//                     <div className={`flex items-center mr-2 ${
//                       isHumanDetected ? 'text-green-600' : 'text-gray-500'
//                     }`}>
//                       <div className={`w-2 h-2 rounded-full mr-1 ${
//                         isHumanDetected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
//                       }`}></div>
//                       <span className="text-xs">
//                         {isHumanDetected ? 'Detected' : 'No person'}
//                       </span>
//                     </div>

//                     <button
//                       onClick={toggleCamera}
//                       className="flex items-center px-2 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg transition-colors"
//                     >
//                       <span className="mr-1 text-sm">
//                         {isCameraOn ? 'Off' : 'On'}
//                       </span>
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                         <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden relative border-4 border-indigo-100">
//                   {isCameraOn ? (
//                     <>
//                       <Webcam
//                         audio={false}
//                         ref={webcamRef}
//                         screenshotFormat="image/jpeg"
//                         className="w-full h-full object-cover"
//                         screenshotQuality={1}
//                       />

//                       {isLoading && (
//                         <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
//                           <div className="text-center">
//                             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto"></div>
//                             <p className="mt-2 text-white text-sm font-medium">Verifying identity...</p>
//                           </div>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-gray-800">
//                       <div className="text-center">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                         </svg>
//                         <p className="mt-1 text-gray-400 text-sm">Camera is {isHumanDetected ? 'starting...' : 'off'}</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex justify-center mt-4 space-x-3">
//                   <button
//                     onClick={() => handleCheck('in')}
//                     disabled={!isCameraOn || isLoading}
//                     className={`px-4 py-2 text-sm rounded-full font-medium text-white shadow-lg transition-all flex items-center ${
//                       !isCameraOn || isLoading
//                         ? 'bg-gray-400 cursor-not-allowed'
//                         : 'bg-green-500 hover:bg-green-600 active:scale-95'
//                     }`}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
//                     </svg>
//                     Check In
//                   </button>

//                   <button
//                     onClick={() => handleCheck('out')}
//                     disabled={!isCameraOn || isLoading}
//                     className={`px-4 py-2 text-sm rounded-full font-medium text-white shadow-lg transition-all flex items-center ${
//                       !isCameraOn || isLoading
//                         ? 'bg-gray-400 cursor-not-allowed'
//                         : 'bg-blue-500 hover:bg-blue-600 active:scale-95'
//                     }`}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
//                     </svg>
//                     Check Out
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Employee Info Card - Below Camera on Mobile */}
//             <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 md:mt-10 md:mb-10">
//               {/* Notification/Time Display */}
//               <div className="mt-2 md:mt-0 bg-white rounded-xl shadow-md p-3 md:p-4 flex items-center">
//                 {notification ? (
//                   <div className="flex items-center w-full">
//                     {notification.type === 'in' ? (
//                       <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-green-100 ring-2 ring-green-200 mr-3">
//                         <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                         </svg>
//                       </div>
//                     ) : (
//                       <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 ring-2 ring-blue-200 mr-3">
//                         <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
//                         </svg>
//                       </div>
//                     )}
//                     <div className="flex-grow">
//                       <div className="font-semibold">{employeeName}</div>
//                       <div className="text-sm">
//                         {notification.type === 'in' ? 'Checked In' : 'Checked Out'} at {formatTime(notification.time)}
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="text-center md:text-right flex-grow">
//                       <div className="text-xl md:text-2xl font-bold text-indigo-700">{formatTime(currentTime)}</div>
//                       <div className="text-gray-600 text-xs md:text-sm">{formatDate(currentTime)}</div>
//                     </div>
//                     <div className="ml-2 bg-indigo-100 p-1 md:p-2 rounded-full">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                   </>
//                 )}
//               </div>

//               {attendanceStatus === 'notChecked' ? (
//                 <div className="text-center py-4 md:py-8 relative overflow-hidden rounded-2xl mt-10">
//                   <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 backdrop-blur-sm">
//                     <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 mix-blend-overlay opacity-30"></div>
//                   </div>

//                   <div className="relative z-10 max-w-xl mx-auto">
//                     <div className="flex flex-col items-center">
//                       <h3 className="text-xl md:text-2xl font-bold text-indigo-900 bg-white/80 px-3 py-1 rounded-full inline-block backdrop-blur-sm">
//                         {employeeName ? `Welcome ${employeeName}!` : 'Welcome!'}
//                       </h3>

//                       <div className="text-center py-4">
//                         <div className="bg-indigo-100 border border-indigo-300 rounded-xl w-full max-w-md mx-auto shadow-md p-4">
//                           <div className="flex flex-col items-center">
//                             {employeeName ? (
//                               <>
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                 </svg>
//                                 <p className="text-gray-700 text-sm md:text-base">Face recognized</p>
//                                 <p className="text-green-700 font-medium mt-1">{employeeName}</p>
//                               </>
//                             ) : (
//                               <>
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 2c-2.667 0-8 1.333-8 4v1h16v-1c0-2.667-5.333-4-8-4z" />
//                                 </svg>
//                                 <p className="text-gray-700 text-sm md:text-base">Awaiting your attendance</p>
//                               </>
//                             )}
//                           </div>
//                         </div>
//                       </div>

//                       <div className="mt-3">
//                         <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs md:text-sm">
//                           <span className="font-medium">Please look into the camera to verify</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <div>
//                     <div className="flex items-center mb-4 mt-10">
//                       <div className="relative">
//                         <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16" />
//                         <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
//                           isHumanDetected ? 'bg-green-500' : 'bg-gray-400'
//                         }`}></div>
//                       </div>
//                       <div className="ml-3">
//                         <h2 className="text-lg md:text-xl font-bold text-gray-800">{employeeName}</h2>
//                         <p className="text-gray-600 text-sm">{employeeId}</p>
//                       </div>
//                     </div>

//                     <div className="mb-3">
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-gray-600 text-sm flex items-center">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                           </svg>
//                           Status:
//                         </span>
//                         <span className={`px-2 py-1 text-xs md:text-sm rounded-full font-medium flex items-center ${statusInfo.color}`}>
//                           {statusInfo.icon}
//                           {statusInfo.text}
//                         </span>
//                       </div>

//                       <div className="flex justify-between items-center mb-1 bg-gray-50 p-2 rounded-lg">
//                         <span className="text-gray-600 text-sm flex items-center">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                           </svg>
//                           Date:
//                         </span>
//                         <span className="font-medium text-sm">{formatDate(currentTime)}</span>
//                       </div>

//                       <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
//                         <span className="text-gray-600 text-sm flex items-center">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           Time:
//                         </span>
//                         <span className="font-medium text-sm">{formatTime(currentTime)}</span>
//                       </div>
//                     </div>

//                     <div className="mt-4">
//                       <h3 className="font-bold text-gray-700 text-sm md:text-base mb-1 flex items-center">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                         </svg>
//                         Department Info
//                       </h3>
//                       <div className="bg-indigo-50 rounded-lg p-3">
//                         <p className="text-indigo-800 font-medium text-sm md:text-base">{department}</p>
//                         <p className="text-indigo-700 text-xs mt-1">Office: San Francisco HQ • Floor 3</p>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Desktop Camera Section */}
//             <div className="hidden md:block lg:col-span-2 p-10">
//               <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 h-full flex flex-col">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                     </svg>
//                     Attendance Camera
//                   </h2>

//                   <div className="flex items-center">
//                     <div className={`flex items-center mr-4 ${
//                       isHumanDetected ? 'text-green-600' : 'text-gray-500'
//                     }`}>
//                       <div className={`w-2 h-2 rounded-full mr-1 ${
//                         isHumanDetected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
//                       }`}></div>
//                       <span className="text-sm">
//                         {isHumanDetected ? 'Person detected' : 'No person'}
//                       </span>
//                     </div>

//                     <button
//                       onClick={toggleCamera}
//                       className="flex items-center px-3 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg transition-colors text-sm"
//                     >
//                       <span className="mr-1">
//                         {isCameraOn ? 'Turn Off' : 'Turn On'}
//                       </span>
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                         <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden relative border-4 border-indigo-100 flex-grow">
//                   {isCameraOn ? (
//                     <>
//                       <Webcam
//                         audio={false}
//                         ref={webcamRef}
//                         screenshotFormat="image/jpeg"
//                         className="w-full h-full object-cover"
//                         screenshotQuality={1}
//                       />

//                       {isLoading && (
//                         <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
//                           <div className="text-center">
//                             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto"></div>
//                             <p className="mt-2 text-white text-sm font-medium">Verifying identity...</p>
//                           </div>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-gray-800">
//                       <div className="text-center">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                         </svg>
//                         <p className="mt-2 text-gray-400 text-sm">Camera is {isHumanDetected ? 'starting...' : 'off'}</p>
//                         <p className="text-gray-500 text-xs mt-1">
//                           {isHumanDetected ? 'Person detected - camera starting' : 'Approach camera to activate'}
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex justify-center mt-4 md:mt-6 space-x-3">
//                   <button
//                     onClick={() => handleCheck('in')}
//                     disabled={!isCameraOn || isLoading}
//                     className={`px-4 py-2 md:px-5 md:py-2.5 text-sm rounded-full font-medium text-white shadow-lg transition-all flex items-center ${
//                       !isCameraOn || isLoading
//                         ? 'bg-gray-400 cursor-not-allowed'
//                         : 'bg-green-500 hover:bg-green-600 active:scale-95'
//                     }`}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
//                     </svg>
//                     Check In
//                   </button>

//                   <button
//                     onClick={() => handleCheck('out')}
//                     disabled={!isCameraOn || isLoading}
//                     className={`px-4 py-2 md:px-5 md:py-2.5 text-sm rounded-full font-medium text-white shadow-lg transition-all flex items-center ${
//                       !isCameraOn || isLoading
//                         ? 'bg-gray-400 cursor-not-allowed'
//                         : 'bg-blue-500 hover:bg-blue-600 active:scale-95'
//                     }`}
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
//                     </svg>
//                     Check Out
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceSystem;






























import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

const AttendanceSystem = () => {
  // State declarations
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState('notChecked');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [employeeName, setEmployeeName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHumanDetected, setIsHumanDetected] = useState(false);
  const [notification, setNotification] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [recognizedEmail, setRecognizedEmail] = useState('');

  const webcamRef = useRef(null);
  const detectionTimeoutRef = useRef(null);
  const successTimeoutRef = useRef(null);
  const detectionIntervalRef = useRef(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Human detection simulation
    detectionIntervalRef.current = setInterval(() => {
      const detected = Math.random() > 0.2;
      setIsHumanDetected(detected);

      if (detected && !isCameraOn) {
        setIsCameraOn(true);
      }
      else if (!detected && isCameraOn) {
        clearTimeout(detectionTimeoutRef.current);
        detectionTimeoutRef.current = setTimeout(() => {
          setIsCameraOn(false);
        }, 3000);
      }
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(detectionIntervalRef.current);
      clearTimeout(detectionTimeoutRef.current);
      clearTimeout(successTimeoutRef.current);
    };
  }, [isCameraOn]);

  // Format time
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Capture image and send to backend for recognition
  const captureAndRecognize = async () => {
    if (!webcamRef.current) return null;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return null;

    try {
      setIsLoading(true);

      // Step 1: Generate embedding from the captured image
      const embeddingResponse = await fetch("http://localhost:5005/generate-embedding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageSrc })
      });

      if (!embeddingResponse.ok) throw new Error("Embedding generation failed");
      const embeddingResult = await embeddingResponse.json();
      const currentEmbedding = embeddingResult.embedding;

      // Step 2: Get all cached embeddings to compare against
      const cacheResponse = await fetch("http://localhost:8080/api/auth/cache");
      if (!cacheResponse.ok) throw new Error("Failed to fetch cached embeddings");
      const cachedEmbeddings = await cacheResponse.json();

      // Step 3: Compare with each cached embedding
      let bestMatch = null;
      let highestSimilarity = 0;

      for (const cachedUser of cachedEmbeddings) {
        if (!cachedUser.embedding || cachedUser.embedding.length === 0) continue;

        const compareResponse = await fetch("http://localhost:5005/compare-embeddings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            embedding1: currentEmbedding,
            embedding2: cachedUser.embedding
          })
        });

        if (compareResponse.ok) {
          const compareResult = await compareResponse.json();

          if (compareResult.match && compareResult.similarity > highestSimilarity) {
            highestSimilarity = compareResult.similarity;
            bestMatch = cachedUser;
          }
        }
      }

      if (bestMatch) {
        // Get additional user info from database
        const userResponse = await fetch(`http://localhost:8080/api/auth/users?email=${bestMatch.email}`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          if (userData.length > 0) {
            setEmployeeName(userData[0].name || bestMatch.name);
            setRecognizedEmail(bestMatch.email);

            // Set dummy values for other fields
            setEmployeeId("EMP-" + bestMatch.email.substring(0, 5).toUpperCase());
            setContactInfo(bestMatch.email); // Using email as contact info

            return bestMatch.email;
          }
        }

        // Fallback to cached data if user API fails
        setEmployeeName(bestMatch.name);
        setRecognizedEmail(bestMatch.email);
        setEmployeeId("EMP-" + bestMatch.email.substring(0, 5).toUpperCase());
        setContactInfo(bestMatch.email);

        return bestMatch.email;
      } else {
        throw new Error("No matching face found");
      }
    } catch (error) {
      console.error("Face recognition error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle check in/out
  const handleCheck = async (type) => {
    try {
      const recognizedEmail = await captureAndRecognize();

      if (recognizedEmail) {
        // Send attendance record to backend
        const response = await fetch("http://localhost:8080/api/attendance/check-in-out", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: recognizedEmail,
            type: type,
            photo: webcamRef.current.getScreenshot()
          })
        });

        if (response.ok) {
          // Show notification
          showNotification(type);

          // Update attendance status
          setAttendanceStatus(type === 'in' ? 'checkedIn' : 'checkedOut');
        } else {
          throw new Error("Failed to record attendance");
        }
      }
    } catch (error) {
      console.error("Attendance error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  // Show notification and reset after 3 seconds
  const showNotification = (type) => {
    setNotification({
      type,
      time: new Date()
    });

    // Reset the entire state after 3 seconds
    successTimeoutRef.current = setTimeout(() => {
      setNotification(null);
      setAttendanceStatus('notChecked');
      setIsCameraOn(false);
      setIsHumanDetected(false);
      setEmployeeName('');
      setRecognizedEmail('');
    }, 3000);
  };

  // Toggle camera manually
  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    clearTimeout(detectionTimeoutRef.current);

    // Reset recognition data when turning camera off
    if (!isCameraOn) {
      setEmployeeName('');
      setRecognizedEmail('');
    }
  };

  // Get status text and color
  const getStatusInfo = () => {
    switch (attendanceStatus) {
      case 'checkedIn':
        return {
          text: 'Present',
          color: 'bg-green-100 text-green-800',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )
        };
      case 'checkedOut':
        return {
          text: 'Left Office',
          color: 'bg-blue-100 text-blue-800',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )
        };
      default:
        return {
          text: 'Not Checked',
          color: 'bg-gray-100 text-gray-800',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          )
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="flex flex-col bg-gradient-to-br mt-12 md:mt-6 from-blue-50 to-indigo-100">
      {/* Main content container */}
      <div className="flex-grow overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Grid layout for desktop and mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

            {/* Mobile Camera Section - Top on Mobile */}
            <div className="md:hidden mb-4">
              <div className="bg-white rounded-2xl shadow-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Attendance Camera
                  </h2>

                  <div className="flex items-center">
                    <div className={`flex items-center mr-2 ${
                      isHumanDetected ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      <div className={`w-2 h-2 rounded-full mr-1 ${
                        isHumanDetected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                      }`}></div>
                      <span className="text-xs">
                        {isHumanDetected ? 'Detected' : 'No person'}
                      </span>
                    </div>

                    <button
                      onClick={toggleCamera}
                      className="flex items-center px-2 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg transition-colors"
                    >
                      <span className="mr-1 text-sm">
                        {isCameraOn ? 'Off' : 'On'}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden relative border-4 border-indigo-100">
                  {isCameraOn ? (
                    <>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="w-full h-full object-cover"
                        screenshotQuality={1}
                      />

                      {isLoading && (
                        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto"></div>
                            <p className="mt-2 text-white text-sm font-medium">Verifying identity...</p>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-1 text-gray-400 text-sm">Camera is {isHumanDetected ? 'starting...' : 'off'}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center mt-4 space-x-3">
                  <button
                    onClick={() => handleCheck('in')}
                    disabled={!isCameraOn || isLoading}
                    className={`px-4 py-2 text-sm rounded-full font-medium text-white shadow-lg transition-all flex items-center ${
                      !isCameraOn || isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600 active:scale-95'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Check In
                  </button>

                  <button
                    onClick={() => handleCheck('out')}
                    disabled={!isCameraOn || isLoading}
                    className={`px-4 py-2 text-sm rounded-full font-medium text-white shadow-lg transition-all flex items-center ${
                      !isCameraOn || isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 active:scale-95'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    Check Out
                  </button>
                </div>
              </div>
            </div>

            {/* Employee Info Card - Below Camera on Mobile */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 md:mt-10 md:mb-10">
              {/* Notification/Time Display */}
              <div className="mt-2 md:mt-0 bg-white rounded-xl shadow-md p-3 md:p-4 flex items-center">
                {notification ? (
                  <div className="flex items-center w-full">
                    {notification.type === 'in' ? (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-green-100 ring-2 ring-green-200 mr-3">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 ring-2 ring-blue-200 mr-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="font-semibold">{employeeName}</div>
                      <div className="text-sm">
                        {notification.type === 'in' ? 'Checked In' : 'Checked Out'} at {formatTime(notification.time)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-center md:text-right flex-grow">
                      <div className="text-xl md:text-2xl font-bold text-indigo-700">{formatTime(currentTime)}</div>
                      <div className="text-gray-600 text-xs md:text-sm">{formatDate(currentTime)}</div>
                    </div>
                    <div className="ml-2 bg-indigo-100 p-1 md:p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </>
                )}
              </div>

              {attendanceStatus === 'notChecked' ? (
                <div className="text-center py-4 md:py-8 relative overflow-hidden rounded-2xl mt-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 mix-blend-overlay opacity-30"></div>
                  </div>

                  <div className="relative z-10 max-w-xl mx-auto">
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl md:text-2xl font-bold text-indigo-900 bg-white/80 px-3 py-1 rounded-full inline-block backdrop-blur-sm">
                        {employeeName ? `Welcome ${employeeName}!` : 'Welcome!'}
                      </h3>

                      <div className="text-center py-4">
                        <div className="bg-indigo-100 border border-indigo-300 rounded-xl w-full max-w-md mx-auto shadow-md p-4">
                          <div className="flex flex-col items-center">
                            {employeeName ? (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <p className="text-gray-700 text-sm md:text-base">Face recognized</p>
                                <p className="text-green-700 font-medium mt-1">{employeeName}</p>
                              </>
                            ) : (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 2c-2.667 0-8 1.333-8 4v1h16v-1c0-2.667-5.333-4-8-4z" />
                                </svg>
                                <p className="text-gray-700 text-sm md:text-base">Awaiting your attendance</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs md:text-sm">
                          <span className="font-medium">Please look into the camera to verify</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <div className="flex items-center mb-4 mt-10">
                      <div className="relative">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16" />
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          isHumanDetected ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div className="ml-3">
                        <h2 className="text-lg md:text-xl font-bold text-gray-800">{employeeName}</h2>
                        <p className="text-gray-600 text-sm">{employeeId}</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 text-sm flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          Status:
                        </span>
                        <span className={`px-2 py-1 text-xs md:text-sm rounded-full font-medium flex items-center ${statusInfo.color}`}>
                          {statusInfo.icon}
                          {statusInfo.text}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mb-1 bg-gray-50 p-2 rounded-lg">
                        <span className="text-gray-600 text-sm flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Date:
                        </span>
                        <span className="font-medium text-sm">{formatDate(currentTime)}</span>
                      </div>

                      <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                        <span className="text-gray-600 text-sm flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Time:
                        </span>
                        <span className="font-medium text-sm">{formatTime(currentTime)}</span>
                      </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="mt-4">
                      <h3 className="font-bold text-gray-700 text-sm md:text-base mb-1 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Contact Information
                      </h3>
                      <div className="bg-indigo-50 rounded-lg p-3">
                        <p className="text-indigo-800 font-medium text-sm md:text-base flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {contactInfo || 'N/A'}
                        </p>
                    
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Desktop Camera Section */}
            <div className="hidden md:block lg:col-span-2 p-10">
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Attendance Camera
                  </h2>

                  <div className="flex items-center">
                    <div className={`flex items-center mr-4 ${
                      isHumanDetected ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      <div className={`w-2 h-2 rounded-full mr-1 ${
                        isHumanDetected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                      }`}></div>
                      <span className="text-sm">
                        {isHumanDetected ? 'Person detected' : 'No person'}
                      </span>
                    </div>

                    <button
                      onClick={toggleCamera}
                      className="flex items-center px-3 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg transition-colors text-sm"
                    >
                      <span className="mr-1">
                        {isCameraOn ? 'Turn Off' : 'Turn On'}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden relative border-4 border-indigo-100 flex-grow">
                  {isCameraOn ? (
                    <>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="w-full h-full object-cover"
                        screenshotQuality={1}
                      />

                      {isLoading && (
                        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto"></div>
                            <p className="mt-2 text-white text-sm font-medium">Verifying identity...</p>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-2 text-gray-400 text-sm">Camera is {isHumanDetected ? 'starting...' : 'off'}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          {isHumanDetected ? 'Person detected - camera starting' : 'Approach camera to activate'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-center mt-4 md:mt-6 space-x-3">
                  <button
                    onClick={() => handleCheck('in')}
                    disabled={!isCameraOn || isLoading}
                    className={`px-4 py-2 md:px-5 md:py-2.5 text-sm rounded-full font-medium text-white shadow-lg transition-all flex items-center ${
                      !isCameraOn || isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600 active:scale-95'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Check In
                  </button>

                  <button
                    onClick={() => handleCheck('out')}
                    disabled={!isCameraOn || isLoading}
                    className={`px-4 py-2 md:px-5 md:py-2.5 text-sm rounded-full font-medium text-white shadow-lg transition-all flex items-center ${
                      !isCameraOn || isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 active:scale-95'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSystem;














