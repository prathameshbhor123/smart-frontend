

// import React, { useEffect, useState } from 'react';
// import { Pie, Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title
// } from 'chart.js';
// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
// import { motion } from 'framer-motion';
// import { FiUsers, FiCheckSquare, FiCalendar, FiClock, FiTrendingUp, FiCoffee } from 'react-icons/fi';

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// const API_BASE_URL = 'http://localhost:8080/api/admin';

// const TeamOverviewDashboard = () => {
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [leaveApplications, setLeaveApplications] = useState([]);
//   const [taskCounts, setTaskCounts] = useState({ pending: 0, progress: 0, completed: 0 });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading delay for better UX
//     const timer = setTimeout(() => {
//       // Local Storage Data
//       setTeamMembers(JSON.parse(localStorage.getItem("teamMembers") || "[]"));
//       setAttendanceRecords(JSON.parse(localStorage.getItem("attendanceRecords") || "[]"));
//       setLeaveApplications(JSON.parse(localStorage.getItem("leaveApplications") || "[]"));
//       setLoading(false);
//     }, 1500);

//     // API Data
//     fetchTaskData();

//     return () => clearTimeout(timer);
//   }, []);

//   const fetchTaskData = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/tasks`, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) throw new Error('Failed to fetch tasks');

//       const data = await response.json();
//       const counts = { pending: 0, progress: 0, completed: 0 };

//       data.forEach(task => {
//         const status = task.taskStatus?.toLowerCase();
//         if (status === 'pending') counts.pending++;
//         else if (status === 'in progress') counts.progress++;
//         else if (status === 'completed') counts.completed++;
//       });

//       setTaskCounts(counts);
//     } catch (error) {
//       console.error(error);
//       Swal.fire('Error', 'Failed to load task data', 'error');
//     }
//   };

//   const totalMembers = teamMembers.length;
//   const today = new Date().toDateString();
//   const totalTasks = taskCounts.pending + taskCounts.progress + taskCounts.completed;

//   const presentToday = attendanceRecords.filter(record =>
//     new Date(record.date).toDateString() === today && record.status === "Present"
//   ).length;

//   const onLeaveToday = leaveApplications.filter(app =>
//     app.status === "Approved" &&
//     new Date(app.startDate) <= new Date() &&
//     new Date(app.endDate) >= new Date()
//   ).length;

//   const absent = Math.max(totalMembers - presentToday - onLeaveToday, 0);
  
//   // Calculate average attendance
//   const totalAttendanceDays = attendanceRecords.filter(r => r.status === 'Present').length;
//   const averageAttendance = totalMembers > 0 ? (totalAttendanceDays / (totalMembers * 30) * 100).toFixed(1) : 0;
  
//   // Calculate task completion rate
//   const taskCompletionRate = totalTasks > 0 ? ((taskCounts.completed / totalTasks) * 100).toFixed(1) : 0;

//   const attendancePie = {
//     labels: ['Present', 'On Leave', 'Absent'],
//     datasets: [{
//       label: 'Today',
//       data: [presentToday, onLeaveToday, absent],
//       backgroundColor: ['#34D399', '#60A5FA', '#F87171'],
//       borderColor: ['#10B981', '#3B82F6', '#EF4444'],
//       borderWidth: 1,
//     }]
//   };

//   const attendanceBar = {
//     labels: teamMembers.map(member => member.name),
//     datasets: [
//       {
//         label: 'Present Days',
//         backgroundColor: '#34D399',
//         data: teamMembers.map(member =>
//           attendanceRecords.filter(r => r.employeeId === member.id && r.status === 'Present').length
//         )
//       },
//       {
//         label: 'Absent Days',
//         backgroundColor: '#F87171',
//         data: teamMembers.map(member =>
//           attendanceRecords.filter(r => r.employeeId === member.id && r.status === 'Absent').length
//         )
//       }
//     ]
//   };

//   const taskPie = {
//     labels: ['Pending', 'In Progress', 'Completed'],
//     datasets: [{
//       label: 'Tasks',
//       data: [taskCounts.pending, taskCounts.progress, taskCounts.completed],
//       backgroundColor: ['#60A5FA', '#FBBF24', '#34D399'],
//       borderWidth: 1,
//       borderColor: ['#3B82F6', '#F59E0B', '#10B981']
//     }]
//   };

//   // Animation variants
//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const item = {
//     hidden: { y: 20, opacity: 0 },
//     show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-lg text-blue-700 font-medium">Loading Dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         <motion.div 
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-8 md:mb-12"
//         >
//           <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">Team Dashboard Overview</h1>
       
//         </motion.div>

//         {/* Stats Cards */}
//         <motion.div 
//           variants={container}
//           initial="hidden"
//           animate="show"
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8"
//         >
//           <motion.div variants={item} className="bg-white rounded-xl shadow-md p-5 flex items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
//             <div className="bg-blue-100 p-3 rounded-lg mr-4">
//               <FiUsers className="text-blue-600 text-2xl" />
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Team Members</p>
//               <h3 className="text-2xl font-bold text-gray-800">{totalMembers}</h3>
//             </div>
//           </motion.div>
          
//           <motion.div variants={item} className="bg-white rounded-xl shadow-md p-5 flex items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
//             <div className="bg-green-100 p-3 rounded-lg mr-4">
//               <FiCheckSquare className="text-green-600 text-2xl" />
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Total Tasks</p>
//               <h3 className="text-2xl font-bold text-gray-800">{totalTasks}</h3>
//             </div>
//           </motion.div>
          
//           <motion.div variants={item} className="bg-white rounded-xl shadow-md p-5 flex items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
//             <div className="bg-amber-100 p-3 rounded-lg mr-4">
//               <FiCalendar className="text-amber-600 text-2xl" />
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">Present Today</p>
//               <h3 className="text-2xl font-bold text-gray-800">{presentToday}</h3>
//             </div>
//           </motion.div>
          
//           <motion.div variants={item} className="bg-white rounded-xl shadow-md p-5 flex items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
//             <div className="bg-purple-100 p-3 rounded-lg mr-4">
//               <FiClock className="text-purple-600 text-2xl" />
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">On Leave</p>
//               <h3 className="text-2xl font-bold text-gray-800">{onLeaveToday}</h3>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* Charts Grid */}
//         <motion.div 
//           variants={container}
//           initial="hidden"
//           animate="show"
//           className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
//         >
//           {/* Task Status Chart */}
//           <motion.div 
//             variants={item}
//             className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl"
//           >
//             <div className="flex justify-between items-center mb-5">
//               <h2 className="text-xl font-semibold text-gray-800">Task Status</h2>
//               <div className="flex items-center text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
//                 <FiTrendingUp className="mr-1" /> 
//                 <span>{taskCompletionRate}% Complete</span>
//               </div>
//             </div>
//             <div className="h-64">
//               <Pie data={taskPie} options={{ maintainAspectRatio: false }} />
//             </div>
//             <div className="mt-4 flex justify-between text-center">
//               <div className="flex-1">
//                 <div className="w-3 h-3 bg-[#60A5FA] rounded-full mx-auto"></div>
//                 <p className="text-sm mt-1">Pending</p>
//                 <p className="font-bold">{taskCounts.pending}</p>
//               </div>
//               <div className="flex-1">
//                 <div className="w-3 h-3 bg-[#FBBF24] rounded-full mx-auto"></div>
//                 <p className="text-sm mt-1">In Progress</p>
//                 <p className="font-bold">{taskCounts.progress}</p>
//               </div>
//               <div className="flex-1">
//                 <div className="w-3 h-3 bg-[#34D399] rounded-full mx-auto"></div>
//                 <p className="text-sm mt-1">Completed</p>
//                 <p className="font-bold">{taskCounts.completed}</p>
//               </div>
//             </div>
//           </motion.div>

//           {/* Attendance Pie Chart */}
//           <motion.div 
//             variants={item}
//             className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl"
//           >
//             <div className="flex justify-between items-center mb-5">
//               <h2 className="text-xl font-semibold text-gray-800">Today's Attendance</h2>
//               <div className="flex items-center text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full">
//                 <FiCoffee className="mr-1" /> 
//                 <span>{averageAttendance}% Avg.</span>
//               </div>
//             </div>
//             <div className="h-64">
//               <Pie data={attendancePie} options={{ maintainAspectRatio: false }} />
//             </div>
//             <div className="mt-4 grid grid-cols-3 gap-4 text-center">
//               <div>
//                 <p className="text-sm">Present</p>
//                 <p className="font-bold text-green-600">{presentToday}</p>
//               </div>
//               <div>
//                 <p className="text-sm">On Leave</p>
//                 <p className="font-bold text-blue-600">{onLeaveToday}</p>
//               </div>
//               <div>
//                 <p className="text-sm">Absent</p>
//                 <p className="font-bold text-red-600">{absent}</p>
//               </div>
//             </div>
//           </motion.div>

//           {/* Team Summary Card */}
//           <motion.div 
//             variants={item}
//             className="bg-gradient-to-br from-blue-500 to-indigo-700 rounded-2xl shadow-xl p-6 text-white"
//           >
//             <h2 className="text-xl font-semibold mb-5">Team Summary</h2>
            
//             <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-4 mb-4">
//               <div className="flex justify-between items-center mb-2">
//                 <span>Attendance Rate</span>
//                 <span className="font-bold">{averageAttendance}%</span>
//               </div>
//               <div className="h-2 bg-blue-400/30 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-white rounded-full" 
//                   style={{ width: `${averageAttendance}%` }}
//                 ></div>
//               </div>
//             </div>
            
//             <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-4 mb-4">
//               <div className="flex justify-between items-center mb-2">
//                 <span>Task Completion</span>
//                 <span className="font-bold">{taskCompletionRate}%</span>
//               </div>
//               <div className="h-2 bg-blue-400/30 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-green-400 rounded-full" 
//                   style={{ width: `${taskCompletionRate}%` }}
//                 ></div>
//               </div>
//             </div>
            
//             <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-4">
//               <h3 className="font-medium mb-2">Top Performers</h3>
//               <div className="space-y-3">
//                 {teamMembers.slice(0, 3).map((member, index) => (
//                   <div key={member.id} className="flex items-center">
//                     <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
//                     <div className="flex-1">
//                       <p className="font-medium">{member.name}</p>
//                       <p className="text-xs opacity-80">{member.role}</p>
//                     </div>
//                     <div className="bg-yellow-500 text-gray-900 text-xs font-bold px-2 py-1 rounded">
//                       {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* Attendance Bar Chart */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="bg-white rounded-2xl shadow-xl p-6 mb-8 transition-all duration-300 hover:shadow-2xl"
//         >
//           <div className="flex justify-between items-center mb-5">
//             <h2 className="text-xl font-semibold text-gray-800">Attendance Summary</h2>
//             <div className="flex space-x-2">
//               <div className="flex items-center text-sm">
//                 <div className="w-3 h-3 bg-[#34D399] rounded mr-1"></div>
//                 <span>Present</span>
//               </div>
//               <div className="flex items-center text-sm ml-2">
//                 <div className="w-3 h-3 bg-[#F87171] rounded mr-1"></div>
//                 <span>Absent</span>
//               </div>
//             </div>
//           </div>
//           <div className="h-80">
//             <Bar
//               data={attendanceBar}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: { position: 'top' },
//                 },
//                 scales: {
//                   x: {
//                     grid: { display: false }
//                   },
//                   y: {
//                     ticks: { precision: 0 },
//                     grid: { color: '#E5E7EB' }
//                   }
//                 }
//               }}
//             />
//           </div>
//         </motion.div>

//       </div>
//     </div>
//   );
// };

// export default TeamOverviewDashboard;








// import React, { useRef, useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   FaTasks, 
//   FaChartLine, 
//   FaUsers, 
//   FaCalendarAlt, 
//   FaArrowRight,
//   FaFileAlt,
//   FaCog,
//   FaBell
// } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { Pie, Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title
// } from 'chart.js';
// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
// import { FiUsers, FiCheckSquare, FiCalendar, FiClock, FiTrendingUp, FiCoffee } from 'react-icons/fi';

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// const API_BASE_URL = 'http://localhost:8080/api/admin';

// const AdminDashboard = () => {
//     const navigate = useNavigate();
//     const analyticsRef = useRef(null);
    
//     // Team Dashboard State
//     const [teamMembers, setTeamMembers] = useState([]);
//     const [attendanceRecords, setAttendanceRecords] = useState([]);
//     const [leaveApplications, setLeaveApplications] = useState([]);
//     const [taskCounts, setTaskCounts] = useState({ pending: 0, progress: 0, completed: 0 });
//     const [loading, setLoading] = useState(true);
//     const [dashboardData, setDashboardData] = useState(null);

//     // Animation variants
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.3,
//                 delayChildren: 0.2
//             }
//         }
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: {
//                 duration: 0.6,
//                 ease: "easeOut"
//             }
//         }
//     };

//     // Function to scroll to Analytics section
//     const scrollToAnalytics = () => {
//         analyticsRef.current.scrollIntoView({
//             behavior: 'smooth',
//             block: 'center'
//         });
//     };

//     // Admin features data
//     const features = [
//         {
//             icon: <FaTasks className="text-3xl text-[#00d4ff]" />,
//             title: "Task Management",
//             description: "Create, assign, and track tasks across teams"
//         },
//         {
//             icon: <FaUsers className="text-3xl text-[#0088ff]" />,
//             title: "Team Collaboration",
//             description: "Manage team members and their permissions"
//         },
//         {
//             icon: <FaFileAlt className="text-3xl text-[#0062ff]" />,
//             title: "Reporting",
//             description: "Generate detailed reports and analytics"
//         },
//         {
//             icon: <FaCalendarAlt className="text-3xl text-[#00f2fe]" />,
//             title: "Scheduling",
//             description: "Plan and organize team schedules"
//         }
//     ];

//     // Fetch team data
//     const fetchTeamData = async () => {
//       try {
//         // Simulate loading delay for better UX
//         const timer = setTimeout(() => {
//           // Local Storage Data
//           setTeamMembers(JSON.parse(localStorage.getItem("teamMembers") || "[]"));
//           setAttendanceRecords(JSON.parse(localStorage.getItem("attendanceRecords") || "[]"));
//           setLeaveApplications(JSON.parse(localStorage.getItem("leaveApplications") || "[]"));
//           setLoading(false);
//         }, 1500);

//         // API Data
//         await fetchTaskData();

//         return () => clearTimeout(timer);
//       } catch (error) {
//         console.error('Error fetching team data:', error);
//         Swal.fire('Error', 'Failed to load team data', 'error');
//       }
//     };


// const fetchTaskData = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/tasks`, {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     if (!response.ok) throw new Error('Failed to fetch tasks');

//     const data = await response.json();
//     const counts = { pending: 0, progress: 0, completed: 0 };

//     data.forEach(task => {
//       // Normalize the task status for consistency
//       let status = (task.taskStatus || "").toLowerCase().replace(/[\s_-]/g, "");

//       if (status === 'pending') counts.pending++;
//       else if (status === 'inprogress') counts.progress++;  // catches in progress, in-progress, in_progress
//       else if (status === 'completed') counts.completed++;
//     });

//     setTaskCounts(counts);
//   } catch (error) {
//     console.error(error);
//     Swal.fire('Error', 'Failed to load task data', 'error');
//   }
// };








    
//     // Prepare dashboard data
//     const prepareDashboardData = () => {
//       const totalMembers = teamMembers.length;
//       const today = new Date().toDateString();
      
//       const presentToday = attendanceRecords.filter(record =>
//         new Date(record.date).toDateString() === today && record.status === "Present"
//       ).length;

//       const onLeaveToday = leaveApplications.filter(app =>
//         app.status === "Approved" &&
//         new Date(app.startDate) <= new Date() &&
//         new Date(app.endDate) >= new Date()
//       ).length;

//       const absent = Math.max(totalMembers - presentToday - onLeaveToday, 0);
      
//       // Calculate average attendance
//       const totalAttendanceDays = attendanceRecords.filter(r => r.status === 'Present').length;
//       const averageAttendance = totalMembers > 0 ? (totalAttendanceDays / (totalMembers * 30) * 100).toFixed(1) : 0;
      
//       const totalTasks = taskCounts.pending + taskCounts.progress + taskCounts.completed;
//       const taskCompletionRate = totalTasks > 0 ? ((taskCounts.completed / totalTasks) * 100).toFixed(1) : 0;

//       // Prepare charts data
//       const attendancePie = {
//         labels: ['Present', 'On Leave', 'Absent'],
//         datasets: [{
//           label: 'Today',
//           data: [presentToday, onLeaveToday, absent],
//           backgroundColor: ['#34D399', '#60A5FA', '#F87171'],
//           borderColor: ['#10B981', '#3B82F6', '#EF4444'],
//           borderWidth: 1,
//         }]
//       };

//       const attendanceBar = {
//         labels: teamMembers.map(member => member.name),
//         datasets: [
//           {
//             label: 'Present Days',
//             backgroundColor: '#34D399',
//             data: teamMembers.map(member =>
//               attendanceRecords.filter(r => r.employeeId === member.id && r.status === 'Present').length
//             )
//           },
//           {
//             label: 'Absent Days',
//             backgroundColor: '#F87171',
//             data: teamMembers.map(member =>
//               attendanceRecords.filter(r => r.employeeId === member.id && r.status === 'Absent').length
//             )
//           }
//         ]
//       };

//       const taskPie = {
//         labels: ['Pending', 'In Progress', 'Completed'],
//         datasets: [{
//           label: 'Tasks',
//           data: [taskCounts.pending, taskCounts.progress, taskCounts.completed],
//           backgroundColor: ['#60A5FA', '#FBBF24', '#34D399'],
//           borderWidth: 1,
//           borderColor: ['#3B82F6', '#F59E0B', '#10B981']
//         }]
//       };

//       return {
//         stats: {
//           teamMembers: totalMembers,
//           totalTasks,
//           presentToday,
//           onLeaveToday
//         },
//         charts: {
//           attendancePie,
//           attendanceBar,
//           taskPie
//         },
//         metrics: {
//           averageAttendance,
//           taskCompletionRate,
//           absent
//         }
//       };
//     };

//     useEffect(() => {
//       fetchTeamData();
//     }, []);

//     useEffect(() => {
//       if (teamMembers.length > 0 && attendanceRecords.length > 0) {
//         const data = prepareDashboardData();
//         setDashboardData(data);
//       }
//     }, [teamMembers, attendanceRecords, taskCounts]);

//     if (loading || !dashboardData) {
//       return (
//         <div className="relative overflow-hidden bg-[#0a192f] min-h-screen flex items-center justify-center">
//           <div className="text-center">
//             <div className="w-16 h-16 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin mx-auto"></div>
//             <p className="mt-4 text-lg text-[#00d4ff] font-medium">Loading Dashboard...</p>
//           </div>
//         </div>
//       );
//     }

//     return (
//         <div className="relative overflow-hidden bg-[#0a192f] mt-20">
           

//             {/* Hero Section */}
//             <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden ">
//                 {/* Animated Gradient Overlay - Neon Blue */}
//                 <motion.div
//                     className="absolute inset-0 bg-gradient-to-r from-[#0062ff]/70 to-[#00d4ff]/70"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 1.5 }}
//                 />

//                 {/* Floating Elements */}
//                 <motion.div
//                     className="absolute top-20 left-20 w-40 h-40 bg-[#00d4ff] rounded-full mix-blend-screen opacity-10 blur-xl"
//                     animate={{
//                         x: [0, 30, 0],
//                         y: [0, 40, 0],
//                         scale: [1, 1.1, 1]
//                     }}
//                     transition={{
//                         duration: 15,
//                         repeat: Infinity,
//                         ease: "easeInOut"
//                     }}
//                 />

//                 <motion.div
//                     className="absolute bottom-20 right-20 w-60 h-60 bg-[#0062ff] rounded-full mix-blend-screen opacity-10 blur-xl"
//                     animate={{
//                         x: [0, -40, 0],
//                         y: [0, -30, 0],
//                         scale: [1, 1.2, 1]
//                     }}
//                     transition={{
//                         duration: 20,
//                         repeat: Infinity,
//                         ease: "easeInOut"
//                     }}
//                 />

//                 {/* Hero Content */}
//                 <motion.div
//                     className="relative z-10 text-center px-6 py-20 max-w-6xl mx-auto"
//                     initial="hidden"
//                     animate="visible"
//                     variants={containerVariants}
//                 >
//                     <motion.h1
//                         className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg"
//                         variants={itemVariants}
//                     >
//                         Welcome to <span className="text-[#00f2fe]">Admin Dashboard</span>
//                     </motion.h1>

//                     <motion.p
//                         className="text-xl sm:text-2xl md:text-3xl mb-8 text-[#e6f1ff] drop-shadow-lg max-w-3xl mx-auto"
//                         variants={itemVariants}
//                     >
//                         Manage your team, tasks, and analytics in one powerful platform
//                     </motion.p>

//                     <motion.div
//                         className="flex flex-col sm:flex-row justify-center gap-4"
//                         variants={itemVariants}
//                     >
//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="px-8 py-3 bg-[#0062ff] hover:bg-[#0088ff] text-white font-medium rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto sm:mx-0"
//                             onClick={() => navigate('/admindashboard')}
//                         >
//                             Manage Tasks <FaArrowRight />
//                         </motion.button>

//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg shadow-lg transition-all duration-300 border border-white/20 flex justify-center mx-auto sm:mx-0"
//                             onClick={scrollToAnalytics}
//                         >
//                             View Analytics
//                         </motion.button>
//                     </motion.div>
//                 </motion.div>
//             </div>

//             {/* Stats Section */}
//             <div className="py-12 px-6 bg-[#13294B]">
//                 <div className="max-w-6xl mx-auto">
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                         {/* Team Members */}
//                         <motion.div
//                             className="bg-[#0a192f]/80 p-6 rounded-xl border border-[#172a45] hover:border-[#00d4ff] transition-all duration-300"
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.5, delay: 0 * 0.1 }}
//                             viewport={{ once: true }}
//                         >
//                             <div className="flex items-center">
//                                 <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white mr-4">
//                                     <FiUsers className="text-xl" />
//                                 </div>
//                                 <div>
//                                     <div className="text-2xl font-bold text-white">{dashboardData.stats.teamMembers}</div>
//                                     <div className="text-sm text-[#e6f1ff]">Team Members</div>
//                                 </div>
//                             </div>
//                         </motion.div>
                        
//                         {/* Total Tasks */}
//                         <motion.div
//                             className="bg-[#0a192f]/80 p-6 rounded-xl border border-[#172a45] hover:border-[#00d4ff] transition-all duration-300"
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.5, delay: 0.1 }}
//                             viewport={{ once: true }}
//                         >
//                             <div className="flex items-center">
//                                 <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white mr-4">
//                                     <FiCheckSquare className="text-xl" />
//                                 </div>
//                                 <div>
//                                     <div className="text-2xl font-bold text-white">{dashboardData.stats.totalTasks}</div>
//                                     <div className="text-sm text-[#e6f1ff]">Total Tasks</div>
//                                 </div>
//                             </div>
//                         </motion.div>
                        
//                         {/* Present Today */}
//                         <motion.div
//                             className="bg-[#0a192f]/80 p-6 rounded-xl border border-[#172a45] hover:border-[#00d4ff] transition-all duration-300"
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.5, delay: 0.2 }}
//                             viewport={{ once: true }}
//                         >
//                             <div className="flex items-center">
//                                 <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center text-white mr-4">
//                                     <FiCalendar className="text-xl" />
//                                 </div>
//                                 <div>
//                                     <div className="text-2xl font-bold text-white">{dashboardData.stats.presentToday}</div>
//                                     <div className="text-sm text-[#e6f1ff]">Present Today</div>
//                                 </div>
//                             </div>
//                         </motion.div>
                        
//                         {/* On Leave */}
//                         <motion.div
//                             className="bg-[#0a192f]/80 p-6 rounded-xl border border-[#172a45] hover:border-[#00d4ff] transition-all duration-300"
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.5, delay: 0.3 }}
//                             viewport={{ once: true }}
//                         >
//                             <div className="flex items-center">
//                                 <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white mr-4">
//                                     <FiClock className="text-xl" />
//                                 </div>
//                                 <div>
//                                     <div className="text-2xl font-bold text-white">{dashboardData.stats.onLeaveToday}</div>
//                                     <div className="text-sm text-[#e6f1ff]">On Leave</div>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </div>
//                 </div>
//             </div>

//             {/* Features Section */}
//             <div className="py-20 px-6 bg-gradient-to-b from-blue-950 to-blue-900">
//                 <div className="max-w-6xl mx-auto">
//                     <motion.div
//                         className="text-center mb-16"
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                     >
//                         <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Admin Dashboard Features</h2>
//                         <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
//                             Everything you need to efficiently manage your team and projects
//                         </p>
//                     </motion.div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                         {features.map((feature, index) => (
//                             <motion.div
//                                 key={index}
//                                 className="bg-[#0a192f]/80 p-8 rounded-xl border border-[#172a45] hover:border-[#00d4ff] transition-all duration-300 hover:-translate-y-2"
//                                 initial={{ opacity: 0, y: 30 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                                 viewport={{ once: true }}
//                             >
//                                 <div className="mb-4">{feature.icon}</div>
//                                 <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
//                                 <p className="text-[#e6f1ff]">{feature.description}</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Analytics Section */}
//             <div
//                 className="py-20 px-6 bg-[#13294B]"
//                 ref={analyticsRef}
//             >
//                 <div className="max-w-6xl mx-auto">
//                     <motion.div
//                         className="text-center mb-16"
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                     >
//                         <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Performance Analytics</h2>
//                         <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
//                             Track key metrics and team performance
//                         </p>
//                     </motion.div>
                    
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//                         {/* Task Status Chart */}
//                         <motion.div
//                             className="bg-[#0a192f]/80 p-8 rounded-xl border border-[#172a45]"
//                             initial={{ opacity: 0, x: -30 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.6 }}
//                             viewport={{ once: true }}
//                         >
//                             <div className="flex justify-between items-center mb-6">
//                                 <h3 className="text-xl font-bold text-white">Task Status</h3>
//                                 <div className="flex items-center text-sm bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
//                                     <FiTrendingUp className="mr-1" /> 
//                                     <span>{dashboardData.metrics.taskCompletionRate}% Complete</span>
//                                 </div>
//                             </div>
                            
//                             <div className="h-64">
//                                 <Pie 
//                                   data={dashboardData.charts.taskPie} 
//                                   options={{ 
//                                     maintainAspectRatio: false,
//                                     plugins: {
//                                       legend: {
//                                         labels: {
//                                           color: '#e6f1ff'
//                                         }
//                                       }
//                                     }
//                                   }} 
//                                 />
//                             </div>
//                             <div className="mt-4 flex justify-between text-center">
//                                 <div className="flex-1">
//                                     <div className="w-3 h-3 bg-[#60A5FA] rounded-full mx-auto"></div>
//                                     <p className="text-sm mt-1 text-[#e6f1ff]">Pending</p>
//                                     <p className="font-bold text-white">{taskCounts.pending}</p>
//                                 </div>
//                                 <div className="flex-1">
//                                     <div className="w-3 h-3 bg-[#FBBF24] rounded-full mx-auto"></div>
//                                     <p className="text-sm mt-1 text-[#e6f1ff]">In Progress</p>
//                                     <p className="font-bold text-white">{taskCounts.progress}</p>
//                                 </div>
//                                 <div className="flex-1">
//                                     <div className="w-3 h-3 bg-[#34D399] rounded-full mx-auto"></div>
//                                     <p className="text-sm mt-1 text-[#e6f1ff]">Completed</p>
//                                     <p className="font-bold text-white">{taskCounts.completed}</p>
//                                 </div>
//                             </div>
//                         </motion.div>
                        
//                         {/* Attendance Chart */}
//                         <motion.div
//                             className="bg-[#0a192f]/80 p-8 rounded-xl border border-[#172a45]"
//                             initial={{ opacity: 0, x: 30 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.6 }}
//                             viewport={{ once: true }}
//                         >
//                             <div className="flex justify-between items-center mb-6">
//                                 <h3 className="text-xl font-bold text-white">Today's Attendance</h3>
//                                 <div className="flex items-center text-sm bg-green-500/20 text-green-300 px-3 py-1 rounded-full">
//                                     <FiCoffee className="mr-1" /> 
//                                     <span>{dashboardData.metrics.averageAttendance}% Avg.</span>
//                                 </div>
//                             </div>
                            
//                             <div className="h-64">
//                                 <Pie 
//                                   data={dashboardData.charts.attendancePie} 
//                                   options={{ 
//                                     maintainAspectRatio: false,
//                                     plugins: {
//                                       legend: {
//                                         labels: {
//                                           color: '#e6f1ff'
//                                         }
//                                       }
//                                     }
//                                   }} 
//                                 />
//                             </div>
//                             <div className="mt-4 grid grid-cols-3 gap-4 text-center">
//                                 <div>
//                                     <p className="text-sm text-[#e6f1ff]">Present</p>
//                                     <p className="font-bold text-green-400">{dashboardData.stats.presentToday}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-[#e6f1ff]">On Leave</p>
//                                     <p className="font-bold text-blue-400">{dashboardData.stats.onLeaveToday}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-[#e6f1ff]">Absent</p>
//                                     <p className="font-bold text-red-400">{dashboardData.metrics.absent}</p>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </div>
                    
//                     {/* Charts Row */}
//                     <div className="grid grid-cols-1 gap-8 mt-12">
//                         {/* Attendance Bar Chart */}
//                         <motion.div
//                             className="bg-[#0a192f]/80 p-8 rounded-xl border border-[#172a45]"
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.6, delay: 0.2 }}
//                             viewport={{ once: true }}
//                         >
//                             <div className="flex justify-between items-center mb-5">
//                                 <h3 className="text-xl font-bold text-white">Attendance Summary</h3>
//                                 <div className="flex space-x-4">
//                                     <div className="flex items-center text-sm">
//                                         <div className="w-3 h-3 bg-[#34D399] rounded mr-1"></div>
//                                         <span className="text-[#e6f1ff]">Present</span>
//                                     </div>
//                                     <div className="flex items-center text-sm">
//                                         <div className="w-3 h-3 bg-[#F87171] rounded mr-1"></div>
//                                         <span className="text-[#e6f1ff]">Absent</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="h-80">
//                                 <Bar
//                                     data={dashboardData.charts.attendanceBar}
//                                     options={{
//                                         responsive: true,
//                                         maintainAspectRatio: false,
//                                         plugins: {
//                                             legend: { 
//                                                 position: 'top',
//                                                 labels: {
//                                                     color: '#e6f1ff'
//                                                 }
//                                             },
//                                         },
//                                         scales: {
//                                             x: {
//                                                 grid: { 
//                                                     display: false,
//                                                     color: 'rgba(255, 255, 255, 0.1)'
//                                                 },
//                                                 ticks: {
//                                                     color: '#e6f1ff'
//                                                 }
//                                             },
//                                             y: {
//                                                 ticks: { 
//                                                     precision: 0,
//                                                     color: '#e6f1ff'
//                                                 },
//                                                 grid: { 
//                                                     color: 'rgba(255, 255, 255, 0.1)'
//                                                 }
//                                             }
//                                         }
//                                     }}
//                                 />
//                             </div>
//                         </motion.div>
//                     </div>
//                 </div>
//             </div>

//             {/* Quick Actions Section */}
//             <div className="py-20 px-6 bg-gradient-to-r from-[#0062ff] to-[#00d4ff]">
//                 <div className="max-w-4xl mx-auto text-center">
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         whileInView={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                     >
//                         <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
//                             Ready to optimize your workflow?
//                         </h2>
//                         <p className="text-xl text-[#e6f1ff] mb-8">
//                             Access powerful tools to manage your team and tasks efficiently
//                         </p>
//                         <div className="flex flex-wrap justify-center gap-4">
//                             <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className="px-8 py-4 bg-white text-[#0062ff] hover:bg-gray-100 font-bold rounded-lg shadow-lg transition-all duration-300"
//                                 onClick={() => navigate('/admindashboard')}
//                             >
//                                 Manage Tasks
//                             </motion.button>
//                             {/* <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold rounded-lg shadow-lg transition-all duration-300"
//                                 onClick={() => navigate('/reports')}
//                             >
//                                 View Reports
//                             </motion.button>
//                             <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold rounded-lg shadow-lg transition-all duration-300"
//                                 onClick={() => navigate('/team')}
//                             >
//                                 Team Management
//                             </motion.button> */}
//                         </div>
//                     </motion.div>
//                 </div>
//             </div>

         
//         </div>
//     );
// };

// export default AdminDashboard;
















import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaTasks,
  FaChartLine,
  FaUsers,
  FaCalendarAlt,
  FaArrowRight,
  FaFileAlt,
  FaCog,
  FaBell
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { FiUsers, FiCheckSquare, FiCalendar, FiClock, FiTrendingUp, FiCoffee } from 'react-icons/fi';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const API_BASE_URL = 'http://localhost:8080/api/admin';
const ATTENDANCE_API_URL = 'http://localhost:8080/api/auth/attendance';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const analyticsRef = useRef(null);

    // Team Dashboard State
    const [teamMembers, setTeamMembers] = useState([]);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [leaveApplications, setLeaveApplications] = useState([]);
    const [taskCounts, setTaskCounts] = useState({ pending: 0, progress: 0, completed: 0 });
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    // Function to scroll to Analytics section
    const scrollToAnalytics = () => {
        analyticsRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    };

    // Admin features data
    const features = [
        {
            icon: <FaTasks className="text-3xl text-[#00d4ff]" />,
            title: "Task Management",
            description: "Create, assign, and track tasks across teams"
        },
        {
            icon: <FaUsers className="text-3xl text-[#0088ff]" />,
            title: "Team Collaboration",
            description: "Manage team members and their permissions"
        },
        {
            icon: <FaFileAlt className="text-3xl text-[#0062ff]" />,
            title: "Reporting",
            description: "Generate detailed reports and analytics"
        },
        {
            icon: <FaCalendarAlt className="text-3xl text-[#00f2fe]" />,
            title: "Scheduling",
            description: "Plan and organize team schedules"
        }
    ];

    // Fetch team data
    const fetchTeamData = async () => {
      try {
        // Fetch attendance data from FaceLogin API
        await fetchAttendanceData();

        // Fetch task data
        await fetchTaskData();

        // Fetch users for team members
        await fetchUsers();

        setLoading(false);
      } catch (error) {
        console.error('Error fetching team data:', error);
        Swal.fire('Error', 'Failed to load team data', 'error');
      }
    };

    // Fetch attendance data from FaceLogin API
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch(ATTENDANCE_API_URL);
        if (!response.ok) throw new Error('Failed to fetch attendance data');

        const data = await response.json();
        setAttendanceRecords(data);
      } catch (error) {
        console.error('Error fetching attendance:', error);
        // Fallback to localStorage if API fails
        setAttendanceRecords(JSON.parse(localStorage.getItem("attendanceRecords") || "[]"));
      }
    };

    // Fetch users for team members
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/auth/users');
        if (!response.ok) throw new Error('Failed to fetch users');

        const data = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Fallback to localStorage if API fails
        setTeamMembers(JSON.parse(localStorage.getItem("teamMembers") || "[]"));
      }
    };

    const fetchTaskData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error('Failed to fetch tasks');

        const data = await response.json();
        const counts = { pending: 0, progress: 0, completed: 0 };

        data.forEach(task => {
          // Normalize the task status for consistency
          let status = (task.taskStatus || "").toLowerCase().replace(/[\s_-]/g, "");

          if (status === 'pending') counts.pending++;
          else if (status === 'inprogress') counts.progress++;  // catches in progress, in-progress, in_progress
          else if (status === 'completed') counts.completed++;
        });

        setTaskCounts(counts);
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Failed to load task data', 'error');
      }
    };

    // Get unique attendance records per user per day
    const getUniqueDailyAttendances = () => {
      const uniqueAttendances = {};

      attendanceRecords.forEach(record => {
        if (record.status === "PRESENT") {
          const recordDate = new Date(record.time).toDateString();
          const key = `${record.email}_${recordDate}`;

          // Only keep the first record for each user on each day
          if (!uniqueAttendances[key]) {
            uniqueAttendances[key] = record;
          }
        }
      });

      return Object.values(uniqueAttendances);
    };

    // Prepare dashboard data
    const prepareDashboardData = () => {
      const totalMembers = teamMembers.length;
      const today = new Date().toDateString();

      // Get unique daily attendances
      const uniqueAttendances = getUniqueDailyAttendances();

      // Filter today's attendance from FaceLogin data
      const presentToday = uniqueAttendances.filter(record => {
        const recordDate = new Date(record.time).toDateString();
        return recordDate === today;
      }).length;

      // For leave applications, we'll still use localStorage as fallback
      const onLeaveToday = leaveApplications.filter(app =>
        app.status === "Approved" &&
        new Date(app.startDate) <= new Date() &&
        new Date(app.endDate) >= new Date()
      ).length;

      const absent = Math.max(totalMembers - presentToday - onLeaveToday, 0);

      // Calculate average attendance based on unique daily attendances
      const totalAttendanceDays = uniqueAttendances.length;
      const daysInMonth = 30; // Assuming a 30-day month for calculation
      const totalPossibleAttendanceDays = totalMembers * daysInMonth;

      // Calculate percentage correctly (max 100%)
      const averageAttendance = totalPossibleAttendanceDays > 0
        ? Math.min((totalAttendanceDays / totalPossibleAttendanceDays) * 100, 100).toFixed(1)
        : 0;

      const totalTasks = taskCounts.pending + taskCounts.progress + taskCounts.completed;
      const taskCompletionRate = totalTasks > 0 ? ((taskCounts.completed / totalTasks) * 100).toFixed(1) : 0;

      // Prepare charts data
      const attendancePie = {
        labels: ['Present', 'On Leave', 'Absent'],
        datasets: [{
          label: 'Today',
          data: [presentToday, onLeaveToday, absent],
          backgroundColor: ['#34D399', '#60A5FA', '#F87171'],
          borderColor: ['#10B981', '#3B82F6', '#EF4444'],
          borderWidth: 1,
        }]
      };

      const attendanceBar = {
        labels: teamMembers.map(member => member.name || member.email),
        datasets: [
          {
            label: 'Present Days',
            backgroundColor: '#34D399',
            data: teamMembers.map(member => {
              const memberEmail = member.email;
              return uniqueAttendances.filter(r => r.email === memberEmail).length;
            })
          },
          {
            label: 'Absent Days',
            backgroundColor: '#F87171',
            data: teamMembers.map(member => {
              const memberEmail = member.email;
              const presentDays = uniqueAttendances.filter(r => r.email === memberEmail).length;
              // Calculate absent days based on working days (assuming 30 days)
              return Math.max(30 - presentDays, 0);
            })
          }
        ]
      };

      const taskPie = {
        labels: ['Pending', 'In Progress', 'Completed'],
        datasets: [{
          label: 'Tasks',
          data: [taskCounts.pending, taskCounts.progress, taskCounts.completed],
          backgroundColor: ['#60A5FA', '#FBBF24', '#34D399'],
          borderWidth: 1,
          borderColor: ['#3B82F6', '#F59E0B', '#10B981']
        }]
      };

      return {
        stats: {
          teamMembers: totalMembers,
          totalTasks,
          presentToday,
          onLeaveToday
        },
        charts: {
          attendancePie,
          attendanceBar,
          taskPie
        },
        metrics: {
          averageAttendance,
          taskCompletionRate,
          absent
        }
      };
    };

    useEffect(() => {
      fetchTeamData();
    }, []);

    useEffect(() => {
      if (teamMembers.length > 0 && attendanceRecords.length > 0) {
        const data = prepareDashboardData();
        setDashboardData(data);
      }
    }, [teamMembers, attendanceRecords, taskCounts]);

    if (loading || !dashboardData) {
      return (
        <div className="relative overflow-hidden bg-[#0a192f] min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-lg text-[#00d4ff] font-medium">Loading Dashboard...</p>
          </div>
        </div>
      );
    }

    return (
        <div className="relative overflow-hidden bg-[#0a192f] mt-20">


            {/* Hero Section */}
            <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden ">
                {/* Animated Gradient Overlay - Neon Blue */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#0062ff]/70 to-[#00d4ff]/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                />

                {/* Floating Elements */}
                <motion.div
                    className="absolute top-20 left-20 w-40 h-40 bg-[#00d4ff] rounded-full mix-blend-screen opacity-10 blur-xl"
                    animate={{
                        x: [0, 30, 0],
                        y: [0, 40, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <motion.div
                    className="absolute bottom-20 right-20 w-60 h-60 bg-[#0062ff] rounded-full mix-blend-screen opacity-10 blur-xl"
                    animate={{
                        x: [0, -40, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Hero Content */}
                <motion.div
                    className="relative z-10 text-center px-6 py-20 max-w-6xl mx-auto"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg"
                        variants={itemVariants}
                    >
                        Welcome to <span className="text-[#00f2fe]">Admin Dashboard</span>
                    </motion.h1>

                    <motion.p
                        className="text-xl sm:text-2xl md:text-3xl mb-8 text-[#e6f1ff] drop-shadow-lg max-w-3xl mx-auto"
                        variants={itemVariants}
                    >
                        Manage your team, tasks, and analytics in one powerful platform
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row justify-center gap-4"
                        variants={itemVariants}
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-[#0062ff] hover:bg-[#0088ff] text-white font-medium rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto sm:mx-0"
                            onClick={() => navigate('/admindashboard')}
                        >
                            Manage Tasks <FaArrowRight />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg shadow-lg transition-all duration-300 border border-white/20 flex justify-center mx-auto sm:mx-0"
                            onClick={scrollToAnalytics}
                        >
                            View Analytics
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Stats Section */}
            <div className="py-12 px-6 bg-[#13294B]">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Team Members */}
                        <motion.div
                            className="bg-[#0a192f]/80 p-6 rounded-xl border border-[#172a45] hover:border-[#00d4ff] transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0 * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white mr-4">
                                    <FiUsers className="text-xl" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">{dashboardData.stats.teamMembers}</div>
                                    <div className="text-sm text-[#e6f1ff]">Team Members</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Total Tasks */}
                        <motion.div
                            className="bg-[#0a192f]/80 p-6 rounded-xl border border-[#172a45] hover:border-[#00d4ff] transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white mr-4">
                                    <FiCheckSquare className="text-xl" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">{dashboardData.stats.totalTasks}</div>
                                    <div className="text-sm text-[#e6f1ff]">Total Tasks</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Present Today */}
                        <motion.div
                            className="bg-[#0a192f]/80 p-6 rounded-xl border border-[#172a45] hover:border-[#00d4ff] transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center text-white mr-4">
                                    <FiCalendar className="text-xl" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">{dashboardData.stats.presentToday}</div>
                                    <div className="text-sm text-[#e6f1ff]">Present Today</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* On Leave */}
                        <motion.div
                            className="bg-[#0a192f]/80 p-6 rounded-xl border border-[#172a45] hover:border-[#00d4ff] transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white mr-4">
                                    <FiClock className="text-xl" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">{dashboardData.stats.onLeaveToday}</div>
                                    <div className="text-sm text-[#e6f1ff]">On Leave</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 px-6 bg-gradient-to-b from-blue-950 to-blue-900">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Admin Dashboard Features</h2>
                        <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
                            Everything you need to efficiently manage your team and projects
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-[#0a192f]/80 p-8 rounded-xl border border-[#172a45] hover:border-[#00d4ff] transition-all duration-300 hover:-translate-y-2"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-[#e6f1ff]">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Analytics Section */}
            <div
                className="py-20 px-6 bg-[#13294B]"
                ref={analyticsRef}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Performance Analytics</h2>
                        <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
                            Track key metrics and team performance
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Task Status Chart */}
                        <motion.div
                            className="bg-[#0a192f]/80 p-8 rounded-xl border border-[#172a45]"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white">Task Status</h3>
                                <div className="flex items-center text-sm bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                                    <FiTrendingUp className="mr-1" />
                                    <span>{dashboardData.metrics.taskCompletionRate}% Complete</span>
                                </div>
                            </div>

                            <div className="h-64">
                                <Pie
                                  data={dashboardData.charts.taskPie}
                                  options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                      legend: {
                                        labels: {
                                          color: '#e6f1ff'
                                        }
                                      }
                                    }
                                  }}
                                />
                            </div>
                            <div className="mt-4 flex justify-between text-center">
                                <div className="flex-1">
                                    <div className="w-3 h-3 bg-[#60A5FA] rounded-full mx-auto"></div>
                                    <p className="text-sm mt-1 text-[#e6f1ff]">Pending</p>
                                    <p className="font-bold text-white">{taskCounts.pending}</p>
                                </div>
                                <div className="flex-1">
                                    <div className="w-3 h-3 bg-[#FBBF24] rounded-full mx-auto"></div>
                                    <p className="text-sm mt-1 text-[#e6f1ff]">In Progress</p>
                                    <p className="font-bold text-white">{taskCounts.progress}</p>
                                </div>
                                <div className="flex-1">
                                    <div className="w-3 h-3 bg-[#34D399] rounded-full mx-auto"></div>
                                    <p className="text-sm mt-1 text-[#e6f1ff]">Completed</p>
                                    <p className="font-bold text-white">{taskCounts.completed}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Attendance Chart */}
                        <motion.div
                            className="bg-[#0a192f]/80 p-8 rounded-xl border border-[#172a45]"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white">Today's Attendance</h3>
                                <div className="flex items-center text-sm bg-green-500/20 text-green-300 px-3 py-1 rounded-full">
                                    <FiCoffee className="mr-1" />
                                    <span>{dashboardData.metrics.averageAttendance}% Avg.</span>
                                </div>
                            </div>

                            <div className="h-64">
                                <Pie
                                  data={dashboardData.charts.attendancePie}
                                  options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                      legend: {
                                        labels: {
                                          color: '#e6f1ff'
                                        }
                                      }
                                    }
                                  }}
                                />
                            </div>
                            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-sm text-[#e6f1ff]">Present</p>
                                    <p className="font-bold text-green-400">{dashboardData.stats.presentToday}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#e6f1ff]">On Leave</p>
                                    <p className="font-bold text-blue-400">{dashboardData.stats.onLeaveToday}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#e6f1ff]">Absent</p>
                                    <p className="font-bold text-red-400">{dashboardData.metrics.absent}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 gap-8 mt-12">
                        {/* Attendance Bar Chart */}
                        <motion.div
                            className="bg-[#0a192f]/80 p-8 rounded-xl border border-[#172a45]"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex justify-between items-center mb-5">
                                <h3 className="text-xl font-bold text-white">Attendance Summary</h3>
                                <div className="flex space-x-4">
                                    <div className="flex items-center text-sm">
                                        <div className="w-3 h-3 bg-[#34D399] rounded mr-1"></div>
                                        <span className="text-[#e6f1ff]">Present</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <div className="w-3 h-3 bg-[#F87171] rounded mr-1"></div>
                                        <span className="text-[#e6f1ff]">Absent</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-80">
                                <Bar
                                    data={dashboardData.charts.attendanceBar}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'top',
                                                labels: {
                                                    color: '#e6f1ff'
                                                }
                                            },
                                        },
                                        scales: {
                                            x: {
                                                grid: {
                                                    display: false,
                                                    color: 'rgba(255, 255, 255, 0.1)'
                                                },
                                                ticks: {
                                                    color: '#e6f1ff'
                                                }
                                            },
                                            y: {
                                                ticks: {
                                                    precision: 0,
                                                    color: '#e6f1ff'
                                                },
                                                grid: {
                                                    color: 'rgba(255, 255, 255, 0.1)'
                                                }
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Section */}
            <div className="py-20 px-6 bg-gradient-to-r from-[#0062ff] to-[#00d4ff]">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                            Ready to optimize your workflow?
                        </h2>
                        <p className="text-xl text-[#e6f1ff] mb-8">
                            Access powerful tools to manage your team and tasks efficiently
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white text-[#0062ff] hover:bg-gray-100 font-bold rounded-lg shadow-lg transition-all duration-300"
                                onClick={() => navigate('/admindashboard')}
                            >
                                Manage Tasks
                            </motion.button>
                            {/* <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold rounded-lg shadow-lg transition-all duration-300"
                                onClick={() => navigate('/reports')}
                            >
                                View Reports
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold rounded-lg shadow-lg transition-all duration-300"
                                onClick={() => navigate('/team')}
                            >
                                Team Management
                            </motion.button> */}
                        </div>
                    </motion.div>
                </div>
            </div>


        </div>
    );
};

export default AdminDashboard;






