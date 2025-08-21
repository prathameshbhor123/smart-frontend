


import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTasks, FaChartLine, FaUserShield, FaUsers, FaArrowRight, FaCalendarAlt, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import Swal from 'sweetalert2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
    const navigate = useNavigate();
    const howItWorksRef = useRef(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [analyticsData, setAnalyticsData] = useState({
        leaveBalance: {
            annualLeave: 0,
            sickLeave: 0,
            casualLeave: 0,
            earnedLeave: 0
        },
        taskCounts: { 
            total: 0, 
            pending: 0, 
            inProgress: 0, 
            completed: 0 
        },
        loading: true
    });

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

    // Function to scroll to How It Works section
    const scrollToHowItWorks = () => {
        howItWorksRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    };

    // Features data with neon blue accent colors
    const features = [
        {
            icon: <FaTasks className="text-3xl text-[#00d4ff]" />,
            title: "Task Assignment",
            description: "Easily create and assign tasks with clear priorities and deadlines"
        },
        {
            icon: <FaChartLine className="text-3xl text-[#0088ff]" />,
            title: "Progress Tracking",
            description: "Monitor task completion in real-time with visual indicators"
        },
        {
            icon: <FaUserShield className="text-3xl text-[#0062ff]" />,
            title: "Role Management",
            description: "Control access levels and permissions based on team roles"
        },
        {
            icon: <FaUsers className="text-3xl text-[#00f2fe]" />,
            title: "Team Collaboration",
            description: "Enable seamless communication between team members"
        }
    ];

    // Fetch user data from localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token");
        
        if (storedUser && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
            fetchAnalyticsData(storedUser, storedToken);
        } else {
            setAnalyticsData(prev => ({...prev, loading: false}));
        }
    }, []);

    // Fetch analytics data
    const fetchAnalyticsData = async (user, token) => {
        try {
            const [leaveRes, tasksRes] = await Promise.all([
                fetch(`http://localhost:8080/api/employee/leave-balance/${user.id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }),
                axios.get(`http://localhost:8080/api/employee/tasks/${user.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            if (!leaveRes.ok) throw new Error(`Leave balance error: ${leaveRes.status}`);
            const leaveData = await leaveRes.json();
            
            const tasks = tasksRes.data || [];
            const taskStats = {
                total: tasks.length,
                pending: tasks.filter(task => task.taskStatus === 'PENDING').length,
                inProgress: tasks.filter(task => task.taskStatus === 'INPROGRESS').length,
                completed: tasks.filter(task => task.taskStatus === 'COMPLETED').length
            };

            setAnalyticsData({
                leaveBalance: leaveData,
                taskCounts: taskStats,
                loading: false
            });
        } catch (err) {
            console.error("Error fetching analytics data:", err);
            setAnalyticsData(prev => ({...prev, loading: false}));
            Swal.fire({
                icon: 'error',
                title: 'Data Load Error',
                text: 'Unable to load analytics data'
            });
        }
    };

    // Prepare chart data
    const getLeaveChartData = () => ({
        labels: ['Annual', 'Sick', 'Casual', 'Earned'],
        datasets: [{
            data: [
                analyticsData.leaveBalance.annualLeave,
                analyticsData.leaveBalance.sickLeave,
                analyticsData.leaveBalance.casualLeave,
                analyticsData.leaveBalance.earnedLeave
            ],
            backgroundColor: ['#00A3E1', '#FF6384', '#36A2EB', '#4BC0C0'],
            borderColor: ['#0088CC', '#E55370', '#2D91D6', '#3BA9A9'],
            borderWidth: 1,
        }],
    });

    const getTaskChartData = () => ({
        labels: ['Pending', 'In Progress', 'Completed'],
        datasets: [{
            data: [
                analyticsData.taskCounts.pending,
                analyticsData.taskCounts.inProgress,
                analyticsData.taskCounts.completed
            ],
            backgroundColor: ['#f59e0b', '#3b82f6', '#10b981'],
            borderColor: ['#facc15', '#2563eb', '#059669'],
            borderWidth: 1,
        }],
    });

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom', labels: { font: { size: 13 }, padding: 20 } },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.parsed} ${context.datasetIndex === 0 ? 'days' : 'tasks'}`
                }
            }
        }
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    // Calculate total leaves
    const totalLeaves = Object.values(analyticsData.leaveBalance).reduce((sum, val) => sum + val, 0);

    return (
        <div className="relative overflow-hidden">
            {/* Hero Section with Animated Background */}
            <div className="relative min-h-screen flex items-center justify-center bg-[#0a192f] overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-20"
                    style={{
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }}
                />

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
                        Welcome to <span className="text-[#00f2fe]">Task Management</span> System
                    </motion.h1>

                    <motion.p
                        className="text-xl sm:text-2xl md:text-3xl mb-8 text-[#e6f1ff] drop-shadow-lg max-w-3xl mx-auto"
                        variants={itemVariants}
                    >
                        Streamline team productivity with powerful task management solutions
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row justify-center gap-4"
                        variants={itemVariants}
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-16 py-3 bg-[#0062ff] hover:bg-[#0088ff] text-white font-medium rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto sm:mx-0"
                            onClick={() => navigate('/contactus')}
                        >
                            Get Started <FaArrowRight />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg shadow-lg transition-all duration-300 border border-white/20 flex justify-center mx-auto sm:mx-0"
                            onClick={scrollToHowItWorks}
                        >
                            Track Task Status
                        </motion.button>
                    </motion.div>
                </motion.div>
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
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Optimize Team Productivity</h2>
                        <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
                            Everything you need for efficient team task management
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

            {/* How It Works Section */}
            <div
                className="py-20 px-6 bg-[#13294B]"
                ref={howItWorksRef}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Workflow Management</h2>
                        <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
                            Simple steps to manage your team's tasks effectively
                        </p>
                    </motion.div>
                    <div className="relative">
                        {/* Timeline - Neon Blue Gradient */}
                        <div className="hidden lg:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-[#00d4ff] to-[#0062ff] -ml-0.5"></div>

                        <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
                            {[
                                {
                                    step: "01",
                                    title: "Create Tasks",
                                    description: "Quickly add tasks with priorities, deadlines, and descriptions"
                                },
                                {
                                    step: "02",
                                    title: "Assign to Team",
                                    description: "Delegate tasks to members with automatic notifications"
                                },
                                {
                                    step: "03",
                                    title: "Track Progress",
                                    description: "Monitor real-time updates and completion status"
                                },
                                {
                                    step: "04",
                                    title: "Review & Analyze",
                                    description: "Generate performance reports and optimize workflows"
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`relative ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12 lg:mt-32'}`}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="mb-4">
                                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0062ff] text-white font-bold text-lg">
                                            {item.step}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-[#e6f1ff]">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Integrated Analytics Dashboard */}
            {user && token && (
                <div className="py-20 px-6 bg-gradient-to-b from-blue-900 to-blue-950">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Your Performance Dashboard</h2>
                            <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
                                Real-time insights into your tasks and leave status
                            </p>
                        </motion.div>

                        {analyticsData.loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mx-auto"></div>
                                <p className="mt-4 text-[#e6f1ff]">Loading your analytics data...</p>
                            </div>
                        ) : (
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {/* Leave Balance Card */}
                                <motion.div
                                    className="bg-[#0a192f]/80 p-6 rounded-xl border border-[#172a45]"
                                    variants={itemVariants}
                                >
                                    <div className="flex items-center mb-6">
                                        <FaCalendarAlt className="text-2xl text-[#00d4ff] mr-3" />
                                        <h3 className="text-xl font-bold text-white">Leave Balance Overview</h3>
                                    </div>
                                    <div className="h-64">
                                        <Pie data={getLeaveChartData()} options={pieOptions} />
                                    </div>
                                    <div className="mt-6 grid grid-cols-2 gap-4">
                                        {getLeaveChartData().labels.map((label, index) => (
                                            <div key={index} className="flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <div className="w-4 h-4 rounded-full mr-2" style={{ 
                                                        backgroundColor: getLeaveChartData().datasets[0].backgroundColor[index] 
                                                    }}></div>
                                                    <span className="text-[#e6f1ff] font-medium">{label}</span>
                                                </div>
                                                <span className="font-semibold text-white">
                                                    {getLeaveChartData().datasets[0].data[index]} days
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 text-sm text-[#e6f1ff] text-right">
                                        Total Leaves: <span className="font-bold text-white">{totalLeaves} days</span>
                                    </div>
                                </motion.div>

                                {/* Task Summary Card */}
                                <motion.div
                                    className="bg-[#0a192f]/80 p-6 rounded-xl border border-[#172a45]"
                                    variants={itemVariants}
                                >
                                    <div className="flex items-center mb-6">
                                        <FaTasks className="text-2xl text-[#00d4ff] mr-3" />
                                        <h3 className="text-xl font-bold text-white">Task Summary</h3>
                                    </div>
                                    <div className="h-64">
                                        <Pie data={getTaskChartData()} options={pieOptions} />
                                    </div>
                                    <div className="mt-6 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#e6f1ff] font-medium">Total Tasks:</span>
                                            <span className="font-semibold text-white">{analyticsData.taskCounts.total}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#e6f1ff] font-medium">Pending:</span>
                                            <span className="font-semibold text-white">{analyticsData.taskCounts.pending}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#e6f1ff] font-medium">In Progress:</span>
                                            <span className="font-semibold text-white">{analyticsData.taskCounts.inProgress}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#e6f1ff] font-medium">Completed:</span>
                                            <span className="font-semibold text-white">{analyticsData.taskCounts.completed}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                        
                        <motion.div
                            className="mt-12 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            {/* <button
                                onClick={() => navigate('/employee-dashboard')}
                                className="flex items-center justify-center mx-auto text-[#00d4ff] hover:text-white font-medium px-6 py-3 rounded-lg border border-[#00d4ff] transition-colors duration-300"
                            >
                                <FaHome className="mr-2" />
                                Go to Full Dashboard
                            </button> */}
                        </motion.div>
                    </div>
                </div>
            )}

            {/* CTA Section - Neon Blue Gradient */}
            <div className="py-20 px-6 bg-gradient-to-r from-[#0062ff] to-[#00d4ff]">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                            Ready to boost your team's productivity?
                        </h2>
                        <p className="text-xl text-[#e6f1ff] mb-8">
                            Join thousands of teams managing tasks efficiently with our system
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-[#0062ff] hover:bg-gray-100 font-bold rounded-lg shadow-lg transition-all duration-300 text-lg"
                            onClick={() => navigate('/signup')}>
                            Start Managing Tasks Now
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Home;


