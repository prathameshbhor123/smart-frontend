
// // TaskStatusChart.jsx
// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import { Card, CardContent, Typography, Tabs, Tab, Box } from '@mui/material';

// const COLORS = ['#FF8042', '#0088FE', '#00C49F'];

// const TaskStatusChart = ({ tasks }) => {
//   const [tabValue, setTabValue] = React.useState(0);

//   // Calculate status counts
//   const statusCounts = tasks.reduce((acc, task) => {
//     acc[task.taskStatus] = (acc[task.taskStatus] || 0) + 1;
//     return acc;
//   }, {});

//   const chartData = [
//     { name: 'Pending', value: statusCounts.PENDING || 0 },
//     { name: 'In Progress', value: statusCounts.INPROGRESS || 0 },
//     { name: 'Completed', value: statusCounts.COMPLETED || 0 },
//   ];

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   return (
//     <Card elevation={3} className="mb-6">
//       <CardContent>
//         <Typography variant="h6" component="div" className="mb-4 text-center">
//           Task Status Distribution
//         </Typography>
        
//         <Tabs 
//           value={tabValue} 
//           onChange={handleTabChange} 
//           centered
//           className="mb-4"
//         >
//           <Tab label="Bar Chart" />
//           <Tab label="Pie Chart" />
//         </Tabs>
        
//         <Box sx={{ height: 300 }}>
//           {tabValue === 0 ? (
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart
//                 data={chartData}
//                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="value" name="Task Count">
//                   {chartData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           ) : (
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={chartData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={true}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                   nameKey="name"
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                 >
//                   {chartData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           )}
//         </Box>
        
//         <div className="flex justify-center mt-4">
//           <div className="flex items-center mr-6">
//             <div className="w-4 h-4 bg-[#FF8042] mr-2"></div>
//             <Typography variant="body2">Pending: {statusCounts.PENDING || 0}</Typography>
//           </div>
//           <div className="flex items-center mr-6">
//             <div className="w-4 h-4 bg-[#0088FE] mr-2"></div>
//             <Typography variant="body2">In Progress: {statusCounts.INPROGRESS || 0}</Typography>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-[#00C49F] mr-2"></div>
//             <Typography variant="body2">Completed: {statusCounts.COMPLETED || 0}</Typography>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default TaskStatusChart;
















// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import { Card, CardContent, Typography, Tabs, Tab, Box } from '@mui/material';

// const COLORS = ['#FF8042', '#0088FE', '#00C49F'];

// const TaskStatusChart = ({ tasks }) => {
//   const [tabValue, setTabValue] = React.useState(0);

//   // Calculate status counts
//   const statusCounts = tasks.reduce((acc, task) => {
//     acc[task.taskStatus] = (acc[task.taskStatus] || 0) + 1;
//     return acc;
//   }, {});

//   const chartData = [
//     { name: 'Pending', value: statusCounts.PENDING || 0 },
//     { name: 'In Progress', value: statusCounts.INPROGRESS || 0 },
//     { name: 'Completed', value: statusCounts.COMPLETED || 0 },
//   ];

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   return (
//     <Card elevation={3} className="mb-6">
//       <CardContent>
//         <Typography variant="h6" component="div" className="mb-4 text-center">
//           Task Status Distribution
//         </Typography>
        
//         <Tabs 
//           value={tabValue} 
//           onChange={handleTabChange} 
//           centered
//           className="mb-4"
//         >
//           <Tab label="Bar Chart" />
//           <Tab label="Pie Chart" />
//         </Tabs>
        
//         <Box sx={{ height: 300 }}>
//           {tabValue === 0 ? (
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart
//                 data={chartData}
//                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="value" name="Task Count">
//                   {chartData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           ) : (
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={chartData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={true}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                   nameKey="name"
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                 >
//                   {chartData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           )}
//         </Box>
        
//         <div className="flex justify-center mt-4">
//           <div className="flex items-center mr-6">
//             <div className="w-4 h-4 bg-[#FF8042] mr-2"></div>
//             <Typography variant="body2">Pending: {statusCounts.PENDING || 0}</Typography>
//           </div>
//           <div className="flex items-center mr-6">
//             <div className="w-4 h-4 bg-[#0088FE] mr-2"></div>
//             <Typography variant="body2">In Progress: {statusCounts.INPROGRESS || 0}</Typography>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-[#00C49F] mr-2"></div>
//             <Typography variant="body2">Completed: {statusCounts.COMPLETED || 0}</Typography>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default TaskStatusChart;







// import React, { useEffect, useState } from 'react';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const TaskStatusChartemp = () => {
//   const [taskCounts, setTaskCounts] = useState({
//     pending: 0,
//     inProgress: 0,
//     completed: 0,
//   });

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/api/admin/tasks', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch tasks');
//       }

//       const data = await response.json();

//       // Count task statuses
//       const statusCount = {
//         pending: 0,
//         inProgress: 0,
//         completed: 0,
//       };

//       data.forEach((task) => {
//         const status = task.taskStatus?.toLowerCase();
//         if (status === 'pending') statusCount.pending++;
//         else if (status === 'in progress') statusCount.inProgress++;
//         else if (status === 'completed') statusCount.completed++;
//       });

//       setTaskCounts(statusCount);
//     } catch (error) {
//       console.error(error);
//       Swal.fire('Error', 'Could not load task data', 'error');
//     }
//   };

//   const data = {
//     labels: ['Pending', 'In Progress', 'Completed'],
//     datasets: [
//       {
//         label: 'Task Count',
//         data: [taskCounts.pending, taskCounts.inProgress, taskCounts.completed],
//         backgroundColor: ['#60A5FA', '#FBBF24', '#34D399'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'bottom',
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-blue-100 p-6 flex flex-col items-center justify-center">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Status Overview</h1>
//       <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full">
//         <Pie data={data} options={options} />
//         <div className="mt-4 text-center text-gray-700 font-medium space-y-1">
//           <p>Pending: {taskCounts.pending}</p>
//           <p>In Progress: {taskCounts.inProgress}</p>
//           <p>Completed: {taskCounts.completed}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskStatusChartemp;

