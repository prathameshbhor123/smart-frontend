// import { useState, useEffect, Fragment } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import format from 'date-fns/format';
// import SocialMedia from './SocialMediaEmployee.jsx';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import { Dialog, Transition } from "@headlessui/react";
// import { Clock4, X } from "lucide-react";
// import Swal from 'sweetalert2';

// const HRMSEmployee = () => {
//     const [activeSection, setActiveSection] = useState('dashboard');
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     const [user, setUser] = useState(storedUser || null);

//     const [leaveApplications, setLeaveApplications] = useState([]);
//     const [attendanceRecords, setAttendanceRecords] = useState([]);
//     const [leaveBalance, setLeaveBalance] = useState(null);
//     const [newLeave, setNewLeave] = useState({
//         type: 'Annual',
//         startDate: '',
//         endDate: '',
//         reason: ''
//     });

//     const fetchLeaveBalance = () => {
//         const token = localStorage.getItem("token");

//         fetch(`http://localhost:8080/api/employee/leave-balance/${user.id}`, {
//             method: "GET",
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "Content-Type": "application/json"
//             }
//         })
//             .then(async res => {
//                 if (!res.ok) throw new Error(`HTTP ${res.status}`);
//                 return res.json();
//             })
//             .then(data => {
//                 setLeaveBalance(data);
//             })
//             .catch(err => {
//                 console.error("Failed to fetch leave balance:", err);
//             });
//     };

//     useEffect(() => {
//         if (!user || !user.id) return;

//         const token = localStorage.getItem("token");
//         fetch(`http://localhost:8080/api/employee/leave/user/${user.id}`, {
//             method: "GET",
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "Content-Type": "application/json"
//             }
//         })
//             .then(async res => {
//                 if (!res.ok) throw new Error(`HTTP ${res.status}`);
//                 return res.json();
//             })
//             .then(data => {
//                 const formatted = data.map(item => ({
//                     id: item.leaveId,
//                     userId: item.userId,
//                     employee: user.name,
//                     type: item.leaveType,
//                     startDate: item.startDate,
//                     endDate: item.endDate,
//                     reason: item.reason,
//                     status: item.leaveStatus
//                 }));

//                 setLeaveApplications(formatted);
//             })
//             .catch(err => {
//                 console.error("Failed to load leave data:", err);
//             });

//         fetchLeaveBalance();
//     }, [user]);

//     const sectionVariants = {
//         hidden: { opacity: 0, x: -50 },
//         visible: {
//             opacity: 1,
//             x: 0,
//             transition: { duration: 0.5 }
//         },
//         exit: {
//             opacity: 0,
//             x: 50,
//             transition: { duration: 0.3 }
//         }
//     };

//     const token = localStorage.getItem("token");

//     const handleLeaveSubmit = async (e) => {
//         e.preventDefault();

//         const payload = {
//             userId: user.id,
//             leaveType: newLeave.type.toUpperCase(),
//             startDate: newLeave.startDate,
//             endDate: newLeave.endDate,
//             reason: newLeave.reason
//         };

//         try {
//             const response = await fetch("http://localhost:8080/api/employee/leave/createleave", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//                 body: JSON.stringify(payload)
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setLeaveApplications([...leaveApplications, {
//                     id: data.leaveId,
//                     userId: user.id,
//                     employee: user.name,
//                     type: newLeave.type,
//                     startDate: newLeave.startDate,
//                     endDate: newLeave.endDate,
//                     reason: newLeave.reason,
//                     status: 'Pending'
//                 }]);

//                 setNewLeave({
//                     type: 'Annual',
//                     startDate: '',
//                     endDate: '',
//                     reason: ''
//                 });

//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Leave Submitted',
//                     text: 'Your leave request was submitted successfully.'
//                 });
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Submission Failed',
//                     text: `Server responded with status ${response.status}`
//                 });
//             }
//         } catch (error) {
//             console.error("Error submitting leave:", error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: 'An unexpected error occurred while submitting leave.'
//             });
//         }
//     };

//     const markAttendance = (status) => {
//         const today = new Date().toISOString().split('T')[0];
//         const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//         const todayRecord = attendanceRecords.find(record =>
//             record.date === today && record.employeeId === user.id
//         );

//         if (todayRecord) {
//             Swal.fire({
//                 icon: 'info',
//                 title: 'Already Marked',
//                 text: 'Attendance is already marked for today.'
//             });
//             return;
//         }

//         const newRecord = {
//             id: attendanceRecords.length + 1,
//             employeeId: user.id,
//             employee: user.name,
//             date: today,
//             status,
//             checkIn: (status === 'Present' || status === 'Late') ? time : '-',
//             checkOut: '-'
//         };
//         setAttendanceRecords([...attendanceRecords, newRecord]);

//         Swal.fire({
//             icon: 'success',
//             title: 'Attendance Marked',
//             text: `Marked as ${status}`
//         });
//     };

//     const getMyLeaveApplications = () => {
//         return leaveApplications.filter(app => app.userId === user?.id);
//     };

//     const recentLeaves = [...leaveApplications]
//         .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
//         .slice(0, 5);

//     const getMyAttendanceRecords = () => {
//         return attendanceRecords.filter(record => record.employee === user?.name);
//     };

//     const AttendanceSection = () => {
//         const [selectedDate, setSelectedDate] = useState(new Date());
//         const [attendanceList, setAttendanceList] = useState([]);
//         const [allLogs, setAllLogs] = useState({});
//         const [logModal, setLogModal] = useState({ open: false, logs: [], name: "" });
//         const [photoModal, setPhotoModal] = useState({ open: false, url: "" });

//         const fetchAttendance = async () => {
//             try {
//                 const res = await fetch("http://localhost:8080/api/auth/attendance");
//                 if (!res.ok) throw new Error("Failed to fetch attendance");

//                 const allData = await res.json();
//                 const userData = localStorage.getItem("username");

//                 const filtered = allData.filter((entry) => {
//                     const entryDate = new Date(entry.time);
//                     return entryDate.toDateString() === selectedDate.toDateString() &&
//                         entry.name === userData;
//                 });

//                 const logsMap = {};
//                 filtered.forEach((entry) => {
//                     if (!logsMap[entry.email]) logsMap[entry.email] = [];
//                     logsMap[entry.email].push(entry);
//                 });

//                 const uniqueAttendance = Object.values(
//                     Object.fromEntries(
//                         Object.entries(logsMap).map(([email, entries]) => [
//                             email,
//                             entries.reduce((latest, current) =>
//                                 new Date(current.time) > new Date(latest.time) ? current : latest
//                             ),
//                         ])
//                     )
//                 );

//                 setAttendanceList(uniqueAttendance);
//                 setAllLogs(logsMap);
//             } catch (err) {
//                 console.error(err.message);
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Fetch Failed',
//                     text: 'Could not fetch attendance data.'
//                 });
//             }
//         };

//         useEffect(() => {
//             fetchAttendance();
//         }, [selectedDate]);
//         return (
//             <motion.section
//                 key="attendance"
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 variants={sectionVariants}
//                 className="bg-white rounded-lg shadow p-6"
//             >
//                 <h2 className="text-xl font-bold mb-6 text-gray-800">Attendance Dashboard</h2>

//                 <div className="mb-6">
//                     <label className="block text-gray-600 mb-2 font-medium">Select a Date</label>
//                     <DatePicker
//                         selected={selectedDate}
//                         onChange={(date) => setSelectedDate(date)}
//                         className="border border-gray-300 rounded-md p-2 w-full md:w-60"
//                         dateFormat="dd MMMM yyyy"
//                         showPopperArrow={false}
//                     />
//                 </div>

//                 <div className="overflow-x-auto rounded-lg border border-gray-200">
//                     <table className="w-full text-sm">
//                         <thead className="bg-blue-100 text-blue-800 font-medium">
//                             <tr>
//                                 <th className="py-3 px-4 text-left">Name</th>
//                                 <th className="py-3 px-4 text-left">Email</th>
//                                 <th className="py-3 px-4 text-left">Status</th>
//                                 <th className="py-3 px-4 text-left">Time</th>
//                                 <th className="py-3 px-4 text-left">Location</th>
//                                 <th className="py-3 px-4 text-left">Photo</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {attendanceList.length > 0 ? (
//                                 attendanceList.map((att, index) => (
//                                     <tr key={index} className="border-t hover:bg-gray-50 transition">
//                                         <td className="py-3 px-4">{att.name}</td>
//                                         <td className="py-3 px-4">{att.email}</td>
//                                         <td className="py-3 px-4">
//                                             <span
//                                                 className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${att.status === "PRESENT"
//                                                     ? "bg-green-100 text-green-700"
//                                                     : "bg-red-100 text-red-700"
//                                                     }`}
//                                             >
//                                                 {att.status}
//                                             </span>
//                                         </td>
//                                         <td className="py-3 px-4 text-gray-600">
//                                             {new Date(att.time).toLocaleTimeString([], {
//                                                 hour: "2-digit",
//                                                 minute: "2-digit",
//                                             })}
//                                             <button
//                                                 onClick={() =>
//                                                     setLogModal({
//                                                         open: true,
//                                                         logs: allLogs[att.email] || [],
//                                                         name: att.name,
//                                                     })
//                                                 }
//                                                 className="ml-2 text-blue-600 hover:underline text-xs flex items-center"
//                                             >
//                                                 <Clock4 className="h-4 w-4 mr-1" />
//                                                 Logs
//                                             </button>
//                                         </td>
//                                         <td className="py-3 px-4 text-sm">
//                                             <a
//                                                 href={`https://maps.google.com/?q=${att.lat},${att.lng}`}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="text-blue-600 hover:underline"
//                                             >
//                                                 {att.lat.toFixed(2)}, {att.lng.toFixed(2)}
//                                             </a>
//                                         </td>
//                                         <td className="py-3 px-4">
//                                             {att.photo ? (
//                                                 <img
//                                                     src={att.photo}
//                                                     alt="Face"
//                                                     className="w-16 h-16 rounded object-cover border cursor-pointer hover:scale-105 transition"
//                                                     onClick={() => setPhotoModal({ open: true, url: att.photo })}
//                                                 />
//                                             ) : (
//                                                 "-"
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="6" className="text-center py-6 text-gray-500">
//                                         No attendance marked on this date.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Logs Modal */}
//                 <Dialog
//                     open={logModal.open}
//                     onClose={() => setLogModal({ open: false, logs: [], name: "" })}
//                     className="relative z-50"
//                 >
//                     <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
//                     <div className="fixed inset-0 flex items-center justify-center p-4">
//                         <Dialog.Panel className="bg-white max-w-sm w-full rounded-lg shadow-xl p-6">
//                             <div className="flex justify-between items-center mb-4">
//                                 <Dialog.Title className="text-lg font-semibold">
//                                     ⏱️ Logs for {logModal.name}
//                                 </Dialog.Title>
//                                 <button
//                                     onClick={() => setLogModal({ open: false, logs: [], name: "" })}
//                                     className="text-gray-500 hover:text-gray-700"
//                                 >
//                                     <X className="h-5 w-5" />
//                                 </button>
//                             </div>
//                             <ul className="max-h-60 overflow-y-auto space-y-2 text-sm text-gray-700">
//                                 {logModal.logs.map((log, idx) => (
//                                     <li key={idx}>
//                                         {new Date(log.time).toLocaleTimeString([], {
//                                             hour: "2-digit",
//                                             minute: "2-digit",
//                                             second: "2-digit",
//                                         })}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </Dialog.Panel>
//                     </div>
//                 </Dialog>

//                 {/* Photo Modal with Animation */}
//                 <Transition appear show={photoModal.open} as={Fragment}>
//                     <Dialog
//                         as="div"
//                         className="relative z-50"
//                         onClose={() => setPhotoModal({ open: false, url: "" })}
//                     >
//                         <Transition.Child
//                             as={Fragment}
//                             enter="ease-out duration-300"
//                             enterFrom="opacity-0 backdrop-blur-none"
//                             enterTo="opacity-100 backdrop-blur-sm"
//                             leave="ease-in duration-200"
//                             leaveFrom="opacity-100 backdrop-blur-sm"
//                             leaveTo="opacity-0 backdrop-blur-none"
//                         >
//                             <div className="fixed inset-0 backdrop-blur-xs" />
//                         </Transition.Child>

//                         <div className="fixed inset-0 flex items-center justify-center p-4">
//                             <Transition.Child
//                                 as={Fragment}
//                                 enter="ease-out duration-300"
//                                 enterFrom="scale-90 opacity-0"
//                                 enterTo="scale-100 opacity-100"
//                                 leave="ease-in duration-200"
//                                 leaveFrom="scale-100 opacity-100"
//                                 leaveTo="scale-90 opacity-0"
//                             >
//                                 <Dialog.Panel className="bg-white p-4 rounded-lg shadow-xl max-w-lg w-full relative">
//                                     <img
//                                         src={photoModal.url}
//                                         alt="Zoomed Face"
//                                         className="rounded-lg w-full max-h-[80vh] object-contain"
//                                     />
//                                 </Dialog.Panel>
//                             </Transition.Child>
//                         </div>
//                     </Dialog>
//                 </Transition>
//             </motion.section>
//         );
//     };


//     return (
//         <div className="min-h-screen bg-gray-100 mt-15">


//             {/* Main Content */}
//             <main className="container mx-auto px-4 py-6">
//                 {/* Navigation */}
//              <nav className="mb-8 bg-white rounded-lg shadow p-2 overflow-x-auto">
//   <ul className="flex flex-wrap sm:flex-nowrap space-x-2 min-w-max">
//     <li>
//       <button
//         onClick={() => setActiveSection('dashboard')}
//         className={`px-4 py-2 rounded-md whitespace-nowrap ${
//           activeSection === 'dashboard'
//             ? 'bg-blue-100 text-blue-600 font-medium'
//             : 'text-gray-600 hover:bg-gray-100'
//         }`}
//       >
//         Dashboard
//       </button>
//     </li>
//     <li>
//       <button
//         onClick={() => setActiveSection('leave')}
//         className={`px-4 py-2 rounded-md whitespace-nowrap ${
//           activeSection === 'leave'
//             ? 'bg-blue-100 text-blue-600 font-medium'
//             : 'text-gray-600 hover:bg-gray-100'
//         }`}
//       >
//         Leave Management
//       </button>
//     </li>
//     <li>
//       <button
//         onClick={() => setActiveSection('attendance')}
//         className={`px-4 py-2 rounded-md whitespace-nowrap ${
//           activeSection === 'attendance'
//             ? 'bg-blue-100 text-blue-600 font-medium'
//             : 'text-gray-600 hover:bg-gray-100'
//         }`}
//       >
//         Attendance
//       </button>
//     </li>
//     <li>
//       <button
//         onClick={() => setActiveSection('socialmediaemployee')}
//         className={`px-4 py-2 rounded-md whitespace-nowrap ${
//           activeSection === 'socialmediaemployee'
//             ? 'bg-blue-100 text-blue-600 font-medium'
//             : 'text-gray-600 hover:bg-gray-100'
//         }`}
//       >
//         Social Media
//       </button>
//     </li>
//   </ul>
// </nav>


//                 {/* Content Sections */}
//                 <AnimatePresence mode="wait">









//                     {activeSection === 'socialmediaemployee' && (
//                         <motion.section
//                             key="socialmediaemployee"
//                             initial="hidden"
//                             animate="visible"
//                             exit="exit"
//                             variants={sectionVariants}
//                             className="bg-white rounded-lg shadow p-0 overflow-hidden"
//                         >
//                             <SocialMedia />
//                         </motion.section>
//                     )}
//                     {/* Dashboard Section */}
//                     {activeSection === 'dashboard' && (
//                         <motion.section
//                             key="dashboard"
//                             initial="hidden"
//                             animate="visible"
//                             exit="exit"
//                             variants={sectionVariants}
//                             className="bg-white rounded-lg shadow p-6"
//                         >
//                             <h2 className="text-xl font-bold mb-6 text-gray-800">Employee Dashboard</h2>

//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                                 {/* Leave Summary Card */}
//                                 <motion.div
//                                     className="bg-blue-50 rounded-lg p-4 border border-blue-100"
//                                     whileHover={{ y: -5 }}
//                                 >
//                                     <h3 className="font-medium text-blue-800 mb-2">Leave Balance</h3>
//                                     <div className="space-y-2">
//                                         <p className="flex justify-between">
//                                             <span className="text-gray-600">Annual Leave:</span>
//                                             <span className="font-semibold">{leaveBalance?.annualLeave ?? 0} days</span>
//                                         </p>
//                                         <p className="flex justify-between">
//                                             <span className="text-gray-600">Sick Leave:</span>
//                                             <span className="font-semibold">{leaveBalance?.sickLeave ?? 0} days</span>
//                                         </p>
//                                         <p className="flex justify-between">
//                                             <span className="text-gray-600">Casual Leave:</span>
//                                             <span className="font-semibold">{leaveBalance?.casualLeave ?? 0} days</span>
//                                         </p>
//                                         <p className="flex justify-between">
//                                             <span className="text-gray-600">Earned Leave:</span>
//                                             <span className="font-semibold">{leaveBalance?.earnedLeave ?? 0} days</span>
//                                         </p>
//                                     </div>

//                                 </motion.div>

//                                 {/* Attendance Summary Card */}
//                                 <motion.div
//                                     className="bg-green-50 rounded-lg p-4 border border-green-100"
//                                     whileHover={{ y: -5 }}
//                                 >
//                                     <h3 className="font-medium text-green-800 mb-2">Attendance Summary</h3>
//                                     <div className="space-y-2">
//                                         <p className="flex justify-between">
//                                             <span className="text-gray-600">This Month:</span>
//                                             <span className="font-semibold">22/23 days</span>
//                                         </p>
//                                         <p className="flex justify-between">
//                                             <span className="text-gray-600">On Time:</span>
//                                             <span className="font-semibold">18 days</span>
//                                         </p>
//                                         <p className="flex justify-between">
//                                             <span className="text-gray-600">Late Arrivals:</span>
//                                             <span className="font-semibold">4 days</span>
//                                         </p>
//                                     </div>
//                                 </motion.div>

//                                 {/* Quick Actions Card */}
//                                 <motion.div
//                                     className="bg-purple-50 rounded-lg p-4 border border-purple-100"
//                                     whileHover={{ y: -5 }}
//                                 >
//                                     <h3 className="font-medium text-purple-800 mb-4">Quick Actions</h3>
//                                     <div className="space-y-3">
//                                         <button
//                                             onClick={() => setActiveSection('leave')}
//                                             className="w-full bg-blue-100 text-blue-600 py-2 rounded-md text-sm font-medium hover:bg-blue-200 transition"
//                                         >
//                                             Apply for Leave
//                                         </button>
//                                         <button
//                                             onClick={() => setActiveSection('attendance')}
//                                             className="w-full bg-green-100 text-green-600 py-2 rounded-md text-sm font-medium hover:bg-green-200 transition"
//                                         >
//                                             Mark Attendance
//                                         </button>
//                                     </div>
//                                 </motion.div>
//                             </div>

//                             {/* Recent Leave Applications */}

//                             {/* <div className="mb-8">
//                                 <h3 className="font-bold text-gray-700 mb-3">My Recent Leave Applications</h3>
//                                 <div className=" rounded-lg overflow-hidden border border-gray-200">
//                                     <table className="min-w-full divide-y divide-gray-200">
//                                         <thead className="bg-gray-100">
//                                             <tr>
//                                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
//                                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
//                                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody className="divide-y divide-gray-200">
//                                             {([...getMyLeaveApplications()]
//                                                 .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
//                                                 .slice(0, 3)
//                                             ).map((app) => (
//                                                 <tr key={app.id} className="hover:bg-gray-50 transition-colors duration-150">
//                                                     <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{app.type}</td>
//                                                     <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                         {new Date(app.startDate).toLocaleDateString()} to{" "}
//                                                         {new Date(app.endDate).toLocaleDateString()}
//                                                     </td>
//                                                     <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hover:text-clip" title={app.reason || "-"}>
//                                                         {app.reason || "-"}
//                                                     </td>
//                                                     <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                         <span
//                                                             className={`px-2 py-1 text-xs rounded-full font-medium ${app.status === "APPROVED"
//                                                                 ? "bg-green-100 text-green-800"
//                                                                 : app.status === "PENDING"
//                                                                     ? "bg-yellow-100 text-yellow-800"
//                                                                     : "bg-red-100 text-red-800"
//                                                                 }`}
//                                                         >
//                                                             {app.status}
//                                                         </span>
//                                                     </td>
//                                                 </tr>
//                                             ))}

//                                             {getMyLeaveApplications().length === 0 && (
//                                                 <tr className="hover:bg-gray-50 transition-colors duration-150">
//                                                     <td colSpan={4} className="px-4 py-4 text-center text-sm text-gray-500">
//                                                         You haven't applied for any leaves yet
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div> */}
// <div className="mb-8">
//   <h3 className="font-bold text-gray-700 mb-3 text-base md:text-lg">
//     My Recent Leave Applications
//   </h3>

//   <div className="rounded-lg border border-gray-200 overflow-x-auto">
//     <table className="min-w-full divide-y divide-gray-200 text-sm">
//       <thead className="bg-gray-100">
//         <tr>
//           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
//           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
//           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//         </tr>
//       </thead>
//       <tbody className="divide-y divide-gray-200">
//         {([...getMyLeaveApplications()]
//           .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
//           .slice(0, 3)
//         ).map((app) => (
//           <tr key={app.id} className="hover:bg-gray-50 transition-colors duration-150">
//             <td className="px-4 py-4 whitespace-nowrap text-gray-700">{app.type}</td>
//             <td className="px-4 py-4 whitespace-nowrap text-gray-700">
//               {new Date(app.startDate).toLocaleDateString()} to{" "}
//               {new Date(app.endDate).toLocaleDateString()}
//             </td>
//             <td className="px-4 py-4 whitespace-nowrap text-gray-700" title={app.reason || "-"}>
//               {app.reason || "-"}
//             </td>
//             <td className="px-4 py-4 whitespace-nowrap text-gray-700">
//               <span
//                 className={`px-2 py-1 text-xs rounded-full font-medium ${app.status === "APPROVED"
//                   ? "bg-green-100 text-green-800"
//                   : app.status === "PENDING"
//                     ? "bg-yellow-100 text-yellow-800"
//                     : "bg-red-100 text-red-800"
//                   }`}
//               >
//                 {app.status}
//               </span>
//             </td>
//           </tr>
//         ))}

//         {getMyLeaveApplications().length === 0 && (
//           <tr className="hover:bg-gray-50 transition-colors duration-150">
//             <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
//               You haven't applied for any leaves yet
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   </div>
// </div>

//                             {/* Recent Attendance Records */}
//                             {/* <div>
//                                 <h3 className="font-bold text-gray-700 mb-3">Recent Attendance</h3>
//                                 <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
//                                     <table className="min-w-full divide-y divide-gray-200">
//                                         <thead className="bg-gray-100">
//                                             <tr>
//                                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
//                                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
//                                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
//                                                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Working Hours</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody className="bg-white divide-y divide-gray-200">
//                                             {getMyAttendanceRecords().slice(0, 5).map((record) => {
//                                                 const date = new Date(record.date);
//                                                 const day = date.toLocaleDateString([], { weekday: 'short' });

//                                                 return (
//                                                     <tr key={record.id}>
//                                                         <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.date}</td>
//                                                         <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{day}</td>
//                                                         <td className="px-4 py-3 whitespace-nowrap">
//                                                             <span className={`px-2 py-1 text-xs rounded-full ${record.status === 'Present' ? 'bg-green-100 text-green-800' :
//                                                                 record.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
//                                                                     'bg-red-100 text-red-800'
//                                                                 }`}>
//                                                                 {record.status}
//                                                             </span>
//                                                         </td>
//                                                         <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.checkIn}</td>
//                                                         <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.checkOut}</td>
//                                                         <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
//                                                             {record.checkIn !== '-' && record.checkOut !== '-' ? '8.5 hours' : '-'}
//                                                         </td>
//                                                     </tr>
//                                                 );
//                                             })}
//                                             {getMyAttendanceRecords().length === 0 && (
//                                                 <tr>
//                                                     <td colSpan={6} className="px-4 py-3 text-sm text-gray-500 text-center">
//                                                         No attendance records found
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div> */}

//                             <div>
//   <h3 className="font-bold text-gray-700 mb-3">Recent Attendance</h3>

//   {/* Responsive wrapper */}
//   <div className="bg-gray-50 rounded-lg overflow-x-auto border border-gray-200">
//     <table className="min-w-[700px] divide-y divide-gray-200">
//       <thead className="bg-gray-100">
//         <tr>
//           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
//           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
//           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
//           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Working Hours</th>
//         </tr>
//       </thead>
//       <tbody className="bg-white divide-y divide-gray-200">
//         {getMyAttendanceRecords().slice(0, 5).map((record) => {
//           const date = new Date(record.date);
//           const day = date.toLocaleDateString([], { weekday: 'short' });

//           return (
//             <tr key={record.id}>
//               <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.date}</td>
//               <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{day}</td>
//               <td className="px-4 py-3 whitespace-nowrap">
//                 <span className={`px-2 py-1 text-xs rounded-full ${
//                   record.status === 'Present' ? 'bg-green-100 text-green-800' :
//                   record.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
//                   'bg-red-100 text-red-800'
//                 }`}>
//                   {record.status}
//                 </span>
//               </td>
//               <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.checkIn}</td>
//               <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.checkOut}</td>
//               <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
//                 {record.checkIn !== '-' && record.checkOut !== '-' ? '8.5 hours' : '-'}
//               </td>
//             </tr>
//           );
//         })}
//         {getMyAttendanceRecords().length === 0 && (
//           <tr>
//             <td colSpan={6} className="px-4 py-3 text-sm text-gray-500 text-center">
//               No attendance records found
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   </div>
// </div>

//                         </motion.section>
//                     )}

//                     {/* Leave Management Section */}
//                     {activeSection === 'leave' && (
//                         <motion.section
//                             key="leave"
//                             initial="hidden"
//                             animate="visible"
//                             exit="exit"
//                             variants={sectionVariants}
//                             className="bg-white rounded-lg shadow p-6"
//                         >
//                             <h2 className="text-xl font-bold mb-6 text-gray-800">My Leave Applications</h2>

//                             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                                 {/* Apply for Leave Form */}
//                                 <div className="lg:col-span-1">
//                                     <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
//                                         <h3 className="font-bold text-blue-800 mb-4">Apply for Leave</h3>
//                                         <form onSubmit={handleLeaveSubmit}>
//                                             <div className="mb-4">
//                                                 <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
//                                                 <select
//                                                     value={newLeave.type}
//                                                     onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
//                                                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     required
//                                                 >
//                                                     <option value="Annual">Annual Leave</option>
//                                                     <option value="Sick">Sick Leave</option>
//                                                     <option value="Casual">Casual Leave</option>
//                                                     <option value="Maternity">Maternity Leave</option>
//                                                     <option value="Paternity">Paternity Leave</option>
//                                                 </select>
//                                             </div>

//                                             <div className="mb-4">
//                                                 <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//                                                 <input
//                                                     type="date"
//                                                     value={newLeave.startDate}
//                                                     onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
//                                                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     required
//                                                 />
//                                             </div>

//                                             <div className="mb-4">
//                                                 <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//                                                 <input
//                                                     type="date"
//                                                     value={newLeave.endDate}
//                                                     onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
//                                                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     required
//                                                 />
//                                             </div>

//                                             <div className="mb-4">
//                                                 <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
//                                                 <textarea
//                                                     value={newLeave.reason}
//                                                     onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
//                                                     rows="3"
//                                                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                                     required
//                                                 ></textarea>
//                                             </div>
// <button
//   type="submit"
//   style={{ backgroundColor: '#00A3E1' }}
//   className="w-full text-white py-2 px-4 rounded-md hover:brightness-110 transition font-medium"
// >
//   Submit Application
// </button>

//                                         </form>
//                                     </div>

//                                     {/* Leave Balance */}
//                                     <div className="mt-6 bg-green-50 rounded-lg p-5 border border-green-100">
//                                         <h3 className="font-bold text-green-800 mb-3">Your Leave Balance</h3>
//                                         <div className="space-y-2">
//                                             <div className="flex justify-between items-center">
//                                                 <span className="text-gray-700">Annual Leave:</span>
//                                                 <span className="font-bold">{leaveBalance?.annualLeave ?? 0} days</span>
//                                             </div>
//                                             <div className="flex justify-between items-center">
//                                                 <span className="text-gray-700">Sick Leave:</span>
//                                                 <span className="font-bold">{leaveBalance?.sickLeave ?? 0} days</span>
//                                             </div>
//                                             <div className="flex justify-between items-center">
//                                                 <span className="text-gray-700">Casual Leave:</span>
//                                                 <span className="font-bold">{leaveBalance?.casualLeave ?? 0} days</span>
//                                             </div>
//                                             <div className="flex justify-between items-center">
//                                                 <span className="text-gray-700">Earned Leave:</span>
//                                                 <span className="font-bold">{leaveBalance?.earnedLeave ?? 0} days</span>
//                                             </div>
//                                         </div>
//                                     </div>

//                                 </div>





//                                 <div className="lg:col-span-2">
//                                     <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//                                         <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
//                                             <h3 className="font-bold text-gray-800">My Applications</h3>
//                                             <div className="flex space-x-2">
//                                                 <select className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300">
//                                                     <option>All Status</option>
//                                                     <option>Pending</option>
//                                                     <option>Approved</option>
//                                                     <option>Rejected</option>
//                                                 </select>
//                                             </div>
//                                         </div>

//                                         <div className="overflow-x-auto">
//                                             <table className="min-w-full divide-y divide-gray-200">
//                                                 <thead className="bg-gray-100">
//                                                     <tr>
//                                                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                                                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
//                                                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
//                                                         <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody className="bg-white divide-y divide-gray-200">
//                                                     {getMyLeaveApplications().map((app) => (
//                                                         <tr key={app.id} className="hover:bg-gray-50 transition-colors duration-150">
//                                                             <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{app.type}</td>
//                                                             <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
//                                                                 {format(new Date(app.startDate), 'MMM dd, yyyy')} - {format(new Date(app.endDate), 'MMM dd, yyyy')}
//                                                             </td>
//                                                             <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate hover:text-clip" title={app.reason || '-'}>
//                                                                 {app.reason || '-'}
//                                                             </td>
//                                                             <td className="px-4 py-3 whitespace-nowrap">
//                                                                 <span className={`px-2 py-1 text-xs rounded-full font-medium ${app.status.toLowerCase() === 'approved'
//                                                                     ? 'bg-green-100 text-green-800'
//                                                                     : app.status.toLowerCase() === 'pending'
//                                                                         ? 'bg-yellow-100 text-yellow-800'
//                                                                         : 'bg-red-100 text-red-800'
//                                                                     }`}>
//                                                                     {app.status}
//                                                                 </span>
//                                                             </td>
//                                                         </tr>
//                                                     ))}
//                                                     {getMyLeaveApplications().length === 0 && (
//                                                         <tr>
//                                                             <td colSpan={4} className="px-4 py-3 text-sm text-gray-500 text-center">
//                                                                 No leave applications found
//                                                             </td>
//                                                         </tr>
//                                                     )}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                     </div>
//                                 </div>


//                             </div>
//                         </motion.section>
//                     )}

//                     {/* Attendance Section */}
//                     {activeSection === 'attendance' && <AttendanceSection />}


//                     {/* Profile Section */}
//                     {activeSection === 'profile' && (
//                         <motion.section
//                             key="profile"
//                             initial="hidden"
//                             animate="visible"
//                             exit="exit"
//                             variants={sectionVariants}
//                             className="bg-white rounded-lg shadow p-6"
//                         >
//                             <h2 className="text-xl font-bold mb-6 text-gray-800">My Profile</h2>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                                 <div>
//                                     <h3 className="text-lg font-semibold mb-4 text-gray-700">Personal Information</h3>
//                                     <div className="space-y-4">
//                                         <div>
//                                             <p className="text-sm text-gray-500">Full Name</p>
//                                             <p className="font-medium">{user.name}</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-sm text-gray-500">Email</p>
//                                             <p className="font-medium">{user.email}</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-sm text-gray-500">Department</p>
//                                             <p className="font-medium">{user.department}</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-sm text-gray-500">Join Date</p>
//                                             <p className="font-medium">{user.joinDate}</p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div>
//                                     <h3 className="text-lg font-semibold mb-4 text-gray-700">Leave Balance</h3>
//                                     <div className="space-y-4">
//                                         <div>
//                                             <p className="text-sm text-gray-500">Annual Leave</p>
//                                             <p className="font-medium">{user.remainingLeaves.annual} days remaining</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-sm text-gray-500">Sick Leave</p>
//                                             <p className="font-medium">{user.remainingLeaves.sick} days remaining</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-sm text-gray-500">Casual Leave</p>
//                                             <p className="font-medium">{user.remainingLeaves.casual} days remaining</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </motion.section>
//                     )}
//                 </AnimatePresence>
//             </main>


//         </div>
//     );
// };

// export default HRMSEmployee;









































































import { useState, useEffect, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import format from 'date-fns/format';
import SocialMedia from './SocialMediaEmployee.jsx';
import AnalyticsDashboard from '../Employee/DashboardEmp.jsx';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Dialog, Transition } from "@headlessui/react";
import { Clock4, X } from "lucide-react";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const HRMSEmployee = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('dashboard');
    const [showAnalytics, setShowAnalytics] = useState(false);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(storedUser || null);
    const [leaveApplications, setLeaveApplications] = useState([]);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [leaveBalance, setLeaveBalance] = useState(null);
    const [attendanceSummary, setAttendanceSummary] = useState(null);
    const [newLeave, setNewLeave] = useState({
        type: 'Annual',
        startDate: '',
        endDate: '',
        reason: ''
    });

    const fetchLeaveBalance = async () => {
        const token = localStorage.getItem("token");

        if (!user || !user.id) return;

        try {
            const res = await fetch(`http://localhost:8080/api/employee/leave-balance/${user.id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();
            setLeaveBalance(data);
        } catch (err) {
            console.error("Failed to fetch leave balance:", err);
        }
    };

    const fetchAttendanceSummary = async () => {
        const token = localStorage.getItem("token");
        if (!user || !user.id) return;

        try {
            const res = await fetch(`http://localhost:8080/api/employee/attendance-summary/${user.id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();
            setAttendanceSummary(data);
        } catch (err) {
            console.error("Failed to fetch attendance summary:", err);
        }
    };

    const fetchLeaveApplications = async () => {
        if (!user || !user.id) return;

        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://localhost:8080/api/employee/leave/user/${user.id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();
            const formatted = data.map(item => ({
                id: item.leaveId,
                userId: item.userId,
                employee: user.name,
                type: item.leaveType,
                startDate: item.startDate,
                endDate: item.endDate,
                reason: item.reason,
                status: item.leaveStatus
            }));

            setLeaveApplications(formatted);
        } catch (err) {
            console.error("Failed to load leave data:", err);
        }
    };

    useEffect(() => {
        if (user && user.id) {
            fetchLeaveBalance();
            fetchLeaveApplications();
            fetchAttendanceSummary();
        }
    }, [user]);

    const sectionVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 }
        },
        exit: {
            opacity: 0,
            x: 50,
            transition: { duration: 0.3 }
        }
    };

    const token = localStorage.getItem("token");

    const handleLeaveSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            userId: user.id,
            leaveType: newLeave.type.toUpperCase(),
            startDate: newLeave.startDate,
            endDate: newLeave.endDate,
            reason: newLeave.reason
        };

        try {
            const response = await fetch("http://localhost:8080/api/employee/leave/createleave", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                setLeaveApplications([...leaveApplications, {
                    id: data.leaveId,
                    userId: user.id,
                    employee: user.name,
                    type: newLeave.type,
                    startDate: newLeave.startDate,
                    endDate: newLeave.endDate,
                    reason: newLeave.reason,
                    status: 'Pending'
                }]);

                setNewLeave({
                    type: 'Annual',
                    startDate: '',
                    endDate: '',
                    reason: ''
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Leave Submitted',
                    text: 'Your leave request was submitted successfully.'
                });
                
                // Refresh leave balance
                fetchLeaveBalance();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Submission Failed',
                    text: `Server responded with status ${response.status}`
                });
            }
        } catch (error) {
            console.error("Error submitting leave:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An unexpected error occurred while submitting leave.'
            });
        }
    };

    const markAttendance = (status) => {
        const today = new Date().toISOString().split('T')[0];
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const todayRecord = attendanceRecords.find(record =>
            record.date === today && record.employeeId === user.id
        );

        if (todayRecord) {
            Swal.fire({
                icon: 'info',
                title: 'Already Marked',
                text: 'Attendance is already marked for today.'
            });
            return;
        }

        const newRecord = {
            id: attendanceRecords.length + 1,
            employeeId: user.id,
            employee: user.name,
            date: today,
            status,
            checkIn: (status === 'Present' || status === 'Late') ? time : '-',
            checkOut: '-'
        };
        setAttendanceRecords([...attendanceRecords, newRecord]);

        Swal.fire({
            icon: 'success',
            title: 'Attendance Marked',
            text: `Marked as ${status}`
        });
    };

    const getMyLeaveApplications = () => {
        return leaveApplications.filter(app => app.userId === user?.id);
    };

    const getMyAttendanceRecords = () => {
        return attendanceRecords.filter(record => record.employee === user?.name);
    };

    const AttendanceSection = () => {
        const [selectedDate, setSelectedDate] = useState(new Date());
        const [attendanceList, setAttendanceList] = useState([]);
        const [allLogs, setAllLogs] = useState({});
        const [logModal, setLogModal] = useState({ open: false, logs: [], name: "" });
        const [photoModal, setPhotoModal] = useState({ open: false, url: "" });

        const fetchAttendance = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/auth/attendance");
                if (!res.ok) throw new Error("Failed to fetch attendance");

                const allData = await res.json();
                const userData = localStorage.getItem("username");

                const filtered = allData.filter((entry) => {
                    const entryDate = new Date(entry.time);
                    return entryDate.toDateString() === selectedDate.toDateString() &&
                        entry.name === userData;
                });

                const logsMap = {};
                filtered.forEach((entry) => {
                    if (!logsMap[entry.email]) logsMap[entry.email] = [];
                    logsMap[entry.email].push(entry);
                });

                const uniqueAttendance = Object.values(
                    Object.fromEntries(
                        Object.entries(logsMap).map(([email, entries]) => [
                            email,
                            entries.reduce((latest, current) =>
                                new Date(current.time) > new Date(latest.time) ? current : latest
                            ),
                        ])
                    )
                );

                setAttendanceList(uniqueAttendance);
                setAllLogs(logsMap);
            } catch (err) {
                console.error(err.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Fetch Failed',
                    text: 'Could not fetch attendance data.'
                });
            }
        };

        useEffect(() => {
            fetchAttendance();
        }, [selectedDate]);

        return (
            <motion.section
                key="attendance"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={sectionVariants}
                className="bg-white rounded-lg shadow p-6"
            >
                <h2 className="text-xl font-bold mb-6 text-gray-800">Attendance Dashboard</h2>

                <div className="mb-6">
                    <label className="block text-gray-600 mb-2 font-medium">Select a Date</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        className="border border-gray-300 rounded-md p-2 w-full md:w-60"
                        dateFormat="dd MMMM yyyy"
                        showPopperArrow={false}
                    />
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-sm">
                        <thead className="bg-blue-100 text-blue-800 font-medium">
                            <tr>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Time</th>
                                <th className="py-3 px-4 text-left">Location</th>
                                <th className="py-3 px-4 text-left">Photo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceList.length > 0 ? (
                                attendanceList.map((att, index) => (
                                    <tr key={index} className="border-t hover:bg-gray-50 transition">
                                        <td className="py-3 px-4">{att.name}</td>
                                        <td className="py-3 px-4">{att.email}</td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${att.status === "PRESENT"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {att.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">
                                            {new Date(att.time).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                            <button
                                                onClick={() =>
                                                    setLogModal({
                                                        open: true,
                                                        logs: allLogs[att.email] || [],
                                                        name: att.name,
                                                    })
                                                }
                                                className="ml-2 text-blue-600 hover:underline text-xs flex items-center"
                                            >
                                                <Clock4 className="h-4 w-4 mr-1" />
                                                Logs
                                            </button>
                                        </td>
                                        <td className="py-3 px-4 text-sm">
                                            <a
                                                href={`https://maps.google.com/?q=${att.lat},${att.lng}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {att.lat.toFixed(2)}, {att.lng.toFixed(2)}
                                            </a>
                                        </td>
                                        <td className="py-3 px-4">
                                            {att.photo ? (
                                                <img
                                                    src={att.photo}
                                                    alt="Face"
                                                    className="w-16 h-16 rounded object-cover border cursor-pointer hover:scale-105 transition"
                                                    onClick={() => setPhotoModal({ open: true, url: att.photo })}
                                                />
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-6 text-gray-500">
                                        No attendance marked on this date.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Logs Modal */}
                <Dialog
                    open={logModal.open}
                    onClose={() => setLogModal({ open: false, logs: [], name: "" })}
                    className="relative z-50"
                >
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="bg-white max-w-sm w-full rounded-lg shadow-xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <Dialog.Title className="text-lg font-semibold">
                                    ⏱️ Logs for {logModal.name}
                                </Dialog.Title>
                                <button
                                    onClick={() => setLogModal({ open: false, logs: [], name: "" })}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <ul className="max-h-60 overflow-y-auto space-y-2 text-sm text-gray-700">
                                {logModal.logs.map((log, idx) => (
                                    <li key={idx}>
                                        {new Date(log.time).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                        })}
                                    </li>
                                ))}
                            </ul>
                        </Dialog.Panel>
                    </div>
                </Dialog>

                {/* Photo Modal with Animation */}
                <Transition appear show={photoModal.open} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-50"
                        onClose={() => setPhotoModal({ open: false, url: "" })}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 backdrop-blur-none"
                            enterTo="opacity-100 backdrop-blur-sm"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 backdrop-blur-sm"
                            leaveTo="opacity-0 backdrop-blur-none"
                        >
                            <div className="fixed inset-0 backdrop-blur-xs" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex items-center justify-center p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="scale-90 opacity-0"
                                enterTo="scale-100 opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="scale-100 opacity-100"
                                leaveTo="scale-90 opacity-0"
                            >
                                <Dialog.Panel className="bg-white p-4 rounded-lg shadow-xl max-w-lg w-full relative">
                                    <img
                                        src={photoModal.url}
                                        alt="Zoomed Face"
                                        className="rounded-lg w-full max-h-[80vh] object-contain"
                                    />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
            </motion.section>
        );
    };


    return (
        <div className="min-h-screen bg-gray-100 mt-15">
            <main className="container mx-auto px-4 py-6">
                {/* Navigation */}
                <nav className="mb-8 bg-white rounded-lg shadow p-2 overflow-x-auto">
                    <ul className="flex flex-wrap sm:flex-nowrap space-x-2 min-w-max">
                        <li>
                            <button
                                onClick={() => setActiveSection('dashboard')}
                                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                                    activeSection === 'dashboard'
                                        ? 'bg-blue-100 text-blue-600 font-medium'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                Dashboard
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('leave')}
                                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                                    activeSection === 'leave'
                                        ? 'bg-blue-100 text-blue-600 font-medium'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                Leave Management
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('attendance')}
                                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                                    activeSection === 'attendance'
                                        ? 'bg-blue-100 text-blue-600 font-medium'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                Attendance
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('socialmediaemployee')}
                                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                                    activeSection === 'socialmediaemployee'
                                        ? 'bg-blue-100 text-blue-600 font-medium'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                Social Media
                            </button>
                        </li>
                        {/* <li>
                            <button
                                onClick={() => setShowAnalytics(true)}
                                className="px-4 py-2 rounded-md whitespace-nowrap bg-blue-600 text-white font-medium hover:bg-blue-700"
                            >
                                Analytics Dashboard
                            </button>
                        </li> */}
                    </ul>
                </nav>

                {/* Content Sections */}
                <AnimatePresence mode="wait">
                    {/* Analytics Dashboard */}
                    {showAnalytics && (
                        <AnalyticsDashboard 
                            leaveBalance={leaveBalance}
                            attendanceSummary={attendanceSummary}
                            onClose={() => setShowAnalytics(false)}
                        />
                    )}

                    {/* Social Media Section */}
                    {activeSection === 'socialmediaemployee' && !showAnalytics && (
                        <motion.section
                            key="socialmediaemployee"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={sectionVariants}
                            className="bg-white rounded-lg shadow p-0 overflow-hidden"
                        >
                            <SocialMedia />
                        </motion.section>
                    )}
                    
                    {/* Dashboard Section */}
                    {activeSection === 'dashboard' && !showAnalytics && (
                        <motion.section
                            key="dashboard"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={sectionVariants}
                            className="bg-white rounded-lg shadow p-6"
                        >
                            <h2 className="text-xl font-bold mb-6 text-gray-800">Employee Dashboard</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {/* Leave Summary Card */}
                                <motion.div
                                    className="bg-blue-50 rounded-lg p-4 border border-blue-100"
                                    whileHover={{ y: -5 }}
                                >
                                    <h3 className="font-medium text-blue-800 mb-2">Leave Balance</h3>
                                    <div className="space-y-2">
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">Annual Leave:</span>
                                            <span className="font-semibold">{leaveBalance?.annualLeave ?? 0} days</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">Sick Leave:</span>
                                            <span className="font-semibold">{leaveBalance?.sickLeave ?? 0} days</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">Casual Leave:</span>
                                            <span className="font-semibold">{leaveBalance?.casualLeave ?? 0} days</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">Earned Leave:</span>
                                            <span className="font-semibold">{leaveBalance?.earnedLeave ?? 0} days</span>
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Attendance Summary Card */}
                                {/* <motion.div
                                    className="bg-green-50 rounded-lg p-4 border border-green-100"
                                    whileHover={{ y: -5 }}
                                >
                                    <h3 className="font-medium text-green-800 mb-2">Attendance Summary</h3>
                                    <div className="space-y-2">
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">This Month:</span>
                                            <span className="font-semibold">22/23 days</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">On Time:</span>
                                            <span className="font-semibold">18 days</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">Late Arrivals:</span>
                                            <span className="font-semibold">4 days</span>
                                        </p>
                                    </div>
                                </motion.div> */}

                                {/* Quick Actions Card */}
                                <motion.div
                                    className="bg-purple-50 rounded-lg p-4 border border-purple-100"
                                    whileHover={{ y: -5 }}
                                >
                                    <h3 className="font-medium text-purple-800 mb-4">Quick Actions</h3>
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setActiveSection('leave')}
                                            className="w-full bg-blue-100 text-blue-600 py-2 rounded-md text-sm font-medium hover:bg-blue-200 transition"
                                        >
                                            Apply for Leave
                                        </button>
                                        <button
                                            onClick={() => setActiveSection('attendance')}
                                            className="w-full bg-green-100 text-green-600 py-2 rounded-md text-sm font-medium hover:bg-green-200 transition"
                                        >
                                            Mark Attendance
                                        </button>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Recent Leave Applications */}
                            <div className="mb-8">
                                <h3 className="font-bold text-gray-700 mb-3 text-base md:text-lg">
                                    My Recent Leave Applications
                                </h3>

                                <div className="rounded-lg border border-gray-200 overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {([...getMyLeaveApplications()]
                                                .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                                                .slice(0, 3)
                                            ).map((app) => (
                                                <tr key={app.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                    <td className="px-4 py-4 whitespace-nowrap text-gray-700">{app.type}</td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-gray-700">
                                                        {new Date(app.startDate).toLocaleDateString()} to{" "}
                                                        {new Date(app.endDate).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-gray-700" title={app.reason || "-"}>
                                                        {app.reason || "-"}
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap text-gray-700">
                                                        <span
                                                            className={`px-2 py-1 text-xs rounded-full font-medium ${app.status === "APPROVED"
                                                                ? "bg-green-100 text-green-800"
                                                                : app.status === "PENDING"
                                                                    ? "bg-yellow-100 text-yellow-800"
                                                                    : "bg-red-100 text-red-800"
                                                                }`}
                                                        >
                                                            {app.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}

                                            {getMyLeaveApplications().length === 0 && (
                                                <tr className="hover:bg-gray-50 transition-colors duration-150">
                                                    <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                                                        You haven't applied for any leaves yet
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Recent Attendance Records */}
                            {/* <div>
                                <h3 className="font-bold text-gray-700 mb-3">Recent Attendance</h3>
                                <div className="bg-gray-50 rounded-lg overflow-x-auto border border-gray-200">
                                    <table className="min-w-[700px] divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Working Hours</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {getMyAttendanceRecords().slice(0, 5).map((record) => {
                                                const date = new Date(record.date);
                                                const day = date.toLocaleDateString([], { weekday: 'short' });

                                                return (
                                                    <tr key={record.id}>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.date}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{day}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap">
                                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                                record.status === 'Present' ? 'bg-green-100 text-green-800' :
                                                                record.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'
                                                            }`}>
                                                                {record.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.checkIn}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{record.checkOut}</td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                                            {record.checkIn !== '-' && record.checkOut !== '-' ? '8.5 hours' : '-'}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            {getMyAttendanceRecords().length === 0 && (
                                                <tr>
                                                    <td colSpan={6} className="px-4 py-3 text-sm text-gray-500 text-center">
                                                        No attendance records found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div> */}
                        </motion.section>
                    )}

                    {/* Leave Management Section */}
                    {activeSection === 'leave' && !showAnalytics && (
                        <motion.section
                            key="leave"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={sectionVariants}
                            className="bg-white rounded-lg shadow p-6"
                        >
                            <h2 className="text-xl font-bold mb-6 text-gray-800">My Leave Applications</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Apply for Leave Form */}
                                <div className="lg:col-span-1">
                                    <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                                        <h3 className="font-bold text-blue-800 mb-4">Apply for Leave</h3>
                                        <form onSubmit={handleLeaveSubmit}>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                                                <select
                                                    value={newLeave.type}
                                                    onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                >
                                                    <option value="Annual">Annual Leave</option>
                                                    <option value="Sick">Sick Leave</option>
                                                    <option value="Casual">Casual Leave</option>
                                                    <option value="Maternity">Maternity Leave</option>
                                                    <option value="Paternity">Paternity Leave</option>
                                                </select>
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                                <input
                                                    type="date"
                                                    value={newLeave.startDate}
                                                    onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                                <input
                                                    type="date"
                                                    value={newLeave.endDate}
                                                    onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                                                <textarea
                                                    value={newLeave.reason}
                                                    onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                                                    rows="3"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                ></textarea>
                                            </div>
                                            <button
                                                type="submit"
                                                style={{ backgroundColor: '#00A3E1' }}
                                                className="w-full text-white py-2 px-4 rounded-md hover:brightness-110 transition font-medium"
                                            >
                                                Submit Application
                                            </button>
                                        </form>
                                    </div>

                                    {/* Leave Balance */}
                                    <div className="mt-6 bg-green-50 rounded-lg p-5 border border-green-100">
                                        <h3 className="font-bold text-green-800 mb-3">Your Leave Balance</h3>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">Annual Leave:</span>
                                                <span className="font-bold">{leaveBalance?.annualLeave ?? 0} days</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">Sick Leave:</span>
                                                <span className="font-bold">{leaveBalance?.sickLeave ?? 0} days</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">Casual Leave:</span>
                                                <span className="font-bold">{leaveBalance?.casualLeave ?? 0} days</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">Earned Leave:</span>
                                                <span className="font-bold">{leaveBalance?.earnedLeave ?? 0} days</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-2">
                                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                            <h3 className="font-bold text-gray-800">My Applications</h3>
                                            <div className="flex space-x-2">
                                                <select className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300">
                                                    <option>All Status</option>
                                                    <option>Pending</option>
                                                    <option>Approved</option>
                                                    <option>Rejected</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {getMyLeaveApplications().map((app) => (
                                                        <tr key={app.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{app.type}</td>
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                                                {format(new Date(app.startDate), 'MMM dd, yyyy')} - {format(new Date(app.endDate), 'MMM dd, yyyy')}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate hover:text-clip" title={app.reason || '-'}>
                                                                {app.reason || '-'}
                                                            </td>
                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${app.status.toLowerCase() === 'approved'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : app.status.toLowerCase() === 'pending'
                                                                        ? 'bg-yellow-100 text-yellow-800'
                                                                        : 'bg-red-100 text-red-800'
                                                                    }`}>
                                                                    {app.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {getMyLeaveApplications().length === 0 && (
                                                        <tr>
                                                            <td colSpan={4} className="px-4 py-3 text-sm text-gray-500 text-center">
                                                                No leave applications found
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {/* Attendance Section */}
                    {activeSection === 'attendance' && !showAnalytics && <AttendanceSection />}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default HRMSEmployee;



