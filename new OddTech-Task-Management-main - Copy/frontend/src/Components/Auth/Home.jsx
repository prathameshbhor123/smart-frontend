

// import React, { useRef } from 'react';
// import { motion } from 'framer-motion';
// import { FaHandshake, FaChartLine, FaShieldAlt, FaComments, FaArrowRight } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//     const navigate = useNavigate();
//     const howItWorksRef = useRef(null);

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

//     // Function to scroll to How It Works section
//     const scrollToHowItWorks = () => {
//         howItWorksRef.current.scrollIntoView({
//             behavior: 'smooth',
//             block: 'center'
//         });
//     };

//     // Features data with neon blue accent colors
//     const features = [
//         {
//             icon: <FaHandshake className="text-3xl text-[#00d4ff]" />,
//             title: "Fair Resolution",
//             description: "Ensuring impartial and just solutions to all concerns"
//         },
//         {
//             icon: <FaChartLine className="text-3xl text-[#0088ff]" />,
//             title: "Real-time Tracking",
//             description: "Monitor your complaint status anytime, anywhere"
//         },
//         {
//             icon: <FaShieldAlt className="text-3xl text-[#0062ff]" />,
//             title: "Confidentiality",
//             description: "Your identity and concerns are kept completely private"
//         },
//         {
//             icon: <FaComments className="text-3xl text-[#00f2fe]" />,
//             title: "24/7 Support",
//             description: "Our team is always ready to assist you"
//         }
//     ];

//     return (
//         <div className="relative overflow-hidden">
//             {/* Hero Section with Animated Background */}
//             <div className="relative min-h-screen flex items-center justify-center bg-[#0a192f] overflow-hidden">
//                 {/* Background Image with Overlay */}
//                 <div
//                     className="absolute inset-0 bg-[url('https://blogimage.vantagecircle.com/content/images/2019/10/employee-grievances.png')] bg-cover bg-center opacity-20"
//                     style={{
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                         backgroundRepeat: "no-repeat"
//                     }}
//                 />

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
//                         Welcome to <span className="text-[#00f2fe]">Smart Management</span> System
//                     </motion.h1>

//                     <motion.p
//                         className="text-xl sm:text-2xl md:text-3xl mb-8 text-[#e6f1ff] drop-shadow-lg max-w-3xl mx-auto"
//                         variants={itemVariants}
//                     >
//                         Your trusted platform for efficient complaint management and resolution
//                     </motion.p>

//                     <motion.div
//                         className="flex flex-col sm:flex-row justify-center gap-4"
//                         variants={itemVariants}
//                     >
//                         {/* <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="px-8 py-3 bg-[#0062ff] hover:bg-[#0088ff] text-white font-medium rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2"
//                             onClick={() => navigate('/contactus')}
//                         >
//                             Get Started <FaArrowRight />
//                         </motion.button> */}

//                          <motion.button
//                               whileHover={{ scale: 1.05 }}
//                                whileTap={{ scale: 0.95 }}
//                                 className="px-16 py-3 bg-[#0062ff] hover:bg-[#0088ff] text-white font-medium rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto sm:mx-0"
//                                  onClick={() => navigate('/contactus')}
//                              >
//                             Get Started <FaArrowRight />
//                       </motion.button>

//                         {/* <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg shadow-lg transition-all duration-300 border border-white/20"
//                             onClick={scrollToHowItWorks}
//                         >
//                             Track Complaint Status
//                         </motion.button> */}

//                         <motion.button
//   whileHover={{ scale: 1.05 }}
//   whileTap={{ scale: 0.95 }}
//   className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg shadow-lg transition-all duration-300 border border-white/20 flex justify-center mx-auto sm:mx-0"
//   onClick={scrollToHowItWorks}
// >
//   Track Complaint Status
// </motion.button>

//                     </motion.div>
//                 </motion.div>
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
//                         <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Choose Our System?</h2>
//                         <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
//                             We provide everything you need for effective smart management.
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

//             {/* How It Works Section */}
//             <div
//                 className="py-20 px-6 bg-[#13294B]"
//                 ref={howItWorksRef}
//             >
//                 <div className="max-w-6xl mx-auto">
//                     <motion.div
//                         className="text-center mb-16"
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                     >
//                         <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
//                         <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
//                             Simple steps to get your concerns addressed
//                         </p>
//                     </motion.div>
//                     <div className="relative">
//                         {/* Timeline - Neon Blue Gradient */}
//                         <div className="hidden lg:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-[#00d4ff] to-[#0062ff] -ml-0.5"></div>

//                         <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
//                             {[
//                                 {
//                                     step: "01",
//                                     title: "Create Tasks",
//                                     description: "Quickly add tasks with priorities, deadlines, and descriptions"
//                                 },
//                                 {
//                                     step: "02",
//                                     title: "Assign to Team",
//                                     description: "Delegate tasks to members with automatic notifications"
//                                 },
//                                 {
//                                     step: "03",
//                                     title: "Track Progress",
//                                     description: "Monitor real-time updates and completion status"
//                                 },
//                                 {
//                                     step: "04",
//                                     title: "Review & Analyze",
//                                     description: "Generate performance reports and optimize workflows"
//                                 }
//                             ].map((item, index) => (
//                                 <motion.div
//                                     key={index}
//                                     className={`relative ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12 lg:mt-32'}`}
//                                     initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
//                                     whileInView={{ opacity: 1, x: 0 }}
//                                     transition={{ duration: 0.6, delay: index * 0.1 }}
//                                     viewport={{ once: true }}
//                                 >
//                                     <div className="mb-4">
//                                         <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0062ff] text-white font-bold text-lg">
//                                             {item.step}
//                                         </span>
//                                     </div>
//                                     <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
//                                     <p className="text-[#e6f1ff]">{item.description}</p>
//                                 </motion.div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* CTA Section - Neon Blue Gradient */}
//             <div className="py-20 px-6 bg-gradient-to-r from-[#0062ff] to-[#00d4ff]">
//                 <div className="max-w-4xl mx-auto text-center">
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         whileInView={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                     >
//                         <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
//                             Ready to address your concerns?
//                         </h2>
//                         <p className="text-xl text-[#e6f1ff] mb-8">
//                             Join thousands who have found fair resolutions through our system
//                         </p>
//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="px-8 py-4 bg-white text-[#0062ff] hover:bg-gray-100 font-bold rounded-lg shadow-lg transition-all duration-300 text-lg"
//                             onClick={() => navigate('/signup')}>
//                             Get Started Now
//                         </motion.button>
//                     </motion.div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;





















// import React, { useRef, useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   FaHandshake, FaChartLine, FaShieldAlt, FaComments, 
//   FaArrowRight, FaStar, FaUsers, FaAward, 
//   FaTasks, FaUserCheck, FaChartBar, FaSearch, FaCheckCircle,
//   FaLightbulb
// } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// gsap.registerPlugin(ScrollTrigger);

// const Home = () => {
//     const navigate = useNavigate();
//     const howItWorksRef = useRef(null);
//     const heroRef = useRef(null);
//     const canvasRef = useRef(null);
//     const humanCanvasRef = useRef(null);
//     const [rating, setRating] = useState(0);
//     const [tasksCompleted, setTasksCompleted] = useState(0);
    
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

//     // Function to scroll to How It Works section
//     const scrollToHowItWorks = () => {
//         howItWorksRef.current.scrollIntoView({
//             behavior: 'smooth',
//             block: 'center'
//         });
//     };

//     // Features data with neon blue accent colors
//     const features = [
//         {
//             icon: <FaHandshake className="text-3xl text-[#00d4ff]" />,
//             title: "Fair Resolution",
//             description: "Ensuring impartial and just solutions to all concerns"
//         },
//         {
//             icon: <FaChartLine className="text-3xl text-[#0088ff]" />,
//             title: "Real-time Tracking",
//             description: "Monitor your complaint status anytime, anywhere"
//         },
//         {
//             icon: <FaShieldAlt className="text-3xl text-[#0062ff]" />,
//             title: "Confidentiality",
//             description: "Your identity and concerns are kept completely private"
//         },
//         {
//             icon: <FaComments className="text-3xl text-[#00f2fe]" />,
//             title: "24/7 Support",
//             description: "Our team is always ready to assist you"
//         }
//     ];

//     // Testimonials data
//     const testimonials = [
//         {
//             name: "Alex Johnson",
//             role: "Project Manager",
//             content: "This system transformed how we handle complaints. Resolution time improved by 70%!",
//             rating: 5
//         },
//         {
//             name: "Sarah Williams",
//             role: "HR Director",
//             content: "The confidentiality features are outstanding. Our employees feel truly heard.",
//             rating: 4.5
//         },
//         {
//             name: "Michael Chen",
//             role: "Operations Lead",
//             content: "Real-time tracking saved us countless hours of follow-up communications.",
//             rating: 5
//         }
//     ];

//     // Stats data
//     const stats = [
//         { value: "98%", label: "Satisfaction Rate", icon: <FaStar className="text-3xl text-yellow-400" /> },
//         { value: "24h", label: "Avg. Resolution Time", icon: <FaChartLine className="text-3xl text-green-400" /> },
//         { value: "10K+", label: "Active Users", icon: <FaUsers className="text-3xl text-blue-400" /> },
//         { value: "15+", label: "Industry Awards", icon: <FaAward className="text-3xl text-purple-400" /> }
//     ];

//     // Initialize Three.js scene for particles
//     useEffect(() => {
//         if (!canvasRef.current) return;
        
//         // Scene setup
//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//         const renderer = new THREE.WebGLRenderer({ 
//             canvas: canvasRef.current, 
//             alpha: true,
//             antialias: true 
//         });
        
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
//         // Create particle system
//         const particlesGeometry = new THREE.BufferGeometry();
//         const particlesCount = 1500;
//         const posArray = new Float32Array(particlesCount * 3);
        
//         for (let i = 0; i < particlesCount * 3; i++) {
//             posArray[i] = (Math.random() - 0.5) * 20;
//         }
        
//         particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
//         // Materials
//         const particlesMaterial = new THREE.PointsMaterial({
//             size: 0.05,
//             color: 0x00d4ff,
//             transparent: true,
//             opacity: 0.8,
//             blending: THREE.AdditiveBlending
//         });
        
//         // Mesh
//         const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//         scene.add(particlesMesh);
        
//         // Position camera
//         camera.position.z = 5;
        
//         // Animation
//         const animate = () => {
//             requestAnimationFrame(animate);
            
//             particlesMesh.rotation.x += 0.001;
//             particlesMesh.rotation.y += 0.002;
            
//             renderer.render(scene, camera);
//         };
        
//         animate();
        
//         // Handle resize
//         const handleResize = () => {
//             camera.aspect = window.innerWidth / window.innerHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(window.innerWidth, window.innerHeight);
//         };
        
//         window.addEventListener('resize', handleResize);
        
//         // Cleanup
//         return () => {
//             window.removeEventListener('resize', handleResize);
//             renderer.dispose();
//         };
//     }, []);

//     // Initialize Three.js scene for 3D human task management
//     useEffect(() => {
//         if (!humanCanvasRef.current) return;

//         // Scene setup
//         const scene = new THREE.Scene();
//         scene.background = new THREE.Color(0x0a192f);
//         scene.fog = new THREE.Fog(0x0a192f, 10, 20);

//         const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
//         camera.position.set(0, 2, 8);

//         const renderer = new THREE.WebGLRenderer({
//             canvas: humanCanvasRef.current,
//             alpha: true,
//             antialias: true
//         });
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//         renderer.shadowMap.enabled = true;

//         // Lighting
//         const ambientLight = new THREE.AmbientLight(0x404040, 2);
//         scene.add(ambientLight);

//         const directionalLight = new THREE.DirectionalLight(0x00d4ff, 1);
//         directionalLight.position.set(5, 10, 7);
//         directionalLight.castShadow = true;
//         scene.add(directionalLight);

//         const pointLight = new THREE.PointLight(0x0062ff, 2, 10);
//         pointLight.position.set(0, 3, 0);
//         scene.add(pointLight);

//         // Controls
//         const controls = new OrbitControls(camera, renderer.domElement);
//         controls.enableDamping = true;
//         controls.dampingFactor = 0.05;
//         controls.enableZoom = false;
//         controls.enablePan = false;
//         controls.maxPolarAngle = Math.PI / 2 - 0.1;
//         controls.minPolarAngle = Math.PI / 2 - 0.3;

//         // Office environment
//         const createOfficeEnvironment = () => {
//             // Floor
//             const floorGeometry = new THREE.PlaneGeometry(20, 20);
//             const floorMaterial = new THREE.MeshStandardMaterial({
//                 color: 0x172a45,
//                 metalness: 0.1,
//                 roughness: 0.5
//             });
//             const floor = new THREE.Mesh(floorGeometry, floorMaterial);
//             floor.rotation.x = -Math.PI / 2;
//             floor.receiveShadow = true;
//             scene.add(floor);

//             // Desks
//             const deskPositions = [
//                 { x: -3, y: 0, z: -1 },
//                 { x: -1, y: 0, z: -1 },
//                 { x: 1, y: 0, z: -1 },
//                 { x: 3, y: 0, z: -1 }
//             ];

//             deskPositions.forEach(pos => {
//                 const deskGeometry = new THREE.BoxGeometry(1.5, 0.5, 0.8);
//                 const deskMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
//                 const desk = new THREE.Mesh(deskGeometry, deskMaterial);
//                 desk.position.set(pos.x, pos.y + 0.25, pos.z);
//                 desk.castShadow = true;
//                 desk.receiveShadow = true;
//                 scene.add(desk);

//                 // Computers
//                 const computerGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.1);
//                 const computerMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
//                 const computer = new THREE.Mesh(computerGeometry, computerMaterial);
//                 computer.position.set(pos.x, pos.y + 0.8, pos.z);
//                 computer.rotation.x = -0.2;
//                 scene.add(computer);
//             });

//             // Task board
//             const boardGeometry = new THREE.BoxGeometry(3, 2, 0.1);
//             const boardMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
//             const board = new THREE.Mesh(boardGeometry, boardMaterial);
//             board.position.set(0, 1.5, -3);
//             scene.add(board);

//             // Task cards
//             const tasks = [
//                 { status: 'completed', color: 0x00ff00, position: { x: -1, y: 1.5, z: -2.9 } },
//                 { status: 'in-progress', color: 0xffff00, position: { x: -0.3, y: 1.5, z: -2.9 } },
//                 { status: 'pending', color: 0xff0000, position: { x: 0.4, y: 1.5, z: -2.9 } },
//                 { status: 'pending', color: 0xff0000, position: { x: 1.1, y: 1.5, z: -2.9 } }
//             ];

//             tasks.forEach(task => {
//                 const cardGeometry = new THREE.BoxGeometry(0.5, 0.3, 0.05);
//                 const cardMaterial = new THREE.MeshStandardMaterial({ color: task.color });
//                 const card = new THREE.Mesh(cardGeometry, cardMaterial);
//                 card.position.set(task.position.x, task.position.y, task.position.z);
//                 scene.add(card);
//             });
//         };

//         // Human models (simplified placeholder)
//         const createHumanPlaceholders = () => {
//             const humanPositions = [
//                 { x: -3, y: 0, z: -1 },
//                 { x: -1, y: 0, z: -1 },
//                 { x: 1, y: 0, z: -1 },
//                 { x: 3, y: 0, z: -1 }
//             ];

//             humanPositions.forEach(pos => {
//                 // Simple human placeholder (cylinder for body, sphere for head)
//                 const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 8);
//                 const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x8888ff });
//                 const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
//                 body.position.set(pos.x, pos.y + 0.4, pos.z);
//                 scene.add(body);

//                 const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
//                 const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffddbb });
//                 const head = new THREE.Mesh(headGeometry, headMaterial);
//                 head.position.set(pos.x, pos.y + 0.9, pos.z);
//                 scene.add(head);
//             });
//         };

//         createOfficeEnvironment();
//         createHumanPlaceholders();

//         // Animation loop
//         const animate = () => {
//             requestAnimationFrame(animate);
//             controls.update();
//             renderer.render(scene, camera);
//         };
//         animate();

//         // Handle resize
//         const handleResize = () => {
//             camera.aspect = window.innerWidth / window.innerHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(window.innerWidth, window.innerHeight);
//         };
//         window.addEventListener('resize', handleResize);

//         return () => {
//             window.removeEventListener('resize', handleResize);
//             renderer.dispose();
//         };
//     }, []);

//     // GSAP Animations
//     useEffect(() => {
//         // Hero section animations
//         gsap.fromTo(heroRef.current.querySelector('h1'), 
//             { opacity: 0, y: 50 }, 
//             { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
//         );
        
//         gsap.fromTo(heroRef.current.querySelector('p'), 
//             { opacity: 0, y: 30 }, 
//             { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
//         );
        
//         gsap.fromTo(heroRef.current.querySelectorAll('button'), 
//             { opacity: 0, y: 20 }, 
//             { opacity: 1, y: 0, duration: 0.8, delay: 0.6, stagger: 0.2, ease: 'power3.out' }
//         );
        
//         // Features section animation
//         gsap.utils.toArray('.feature-card').forEach((card, i) => {
//             gsap.fromTo(card, 
//                 { opacity: 0, y: 50 }, 
//                 {
//                     opacity: 1, 
//                     y: 0, 
//                     duration: 0.8, 
//                     delay: i * 0.1,
//                     scrollTrigger: {
//                         trigger: card,
//                         start: 'top 80%',
//                         end: 'bottom 20%',
//                         toggleActions: 'play none none none'
//                     }
//                 }
//             );
//         });
        
//         // How it works timeline animation
//         const timelineItems = gsap.utils.toArray('.timeline-item');
//         timelineItems.forEach((item, i) => {
//             gsap.fromTo(item, 
//                 { opacity: 0, x: i % 2 === 0 ? -50 : 50 }, 
//                 {
//                     opacity: 1, 
//                     x: 0, 
//                     duration: 0.8,
//                     scrollTrigger: {
//                         trigger: item,
//                         start: 'top 70%',
//                         end: 'bottom 30%',
//                         toggleActions: 'play none none none'
//                     }
//                 }
//             );
//         });
        
//         // Testimonials animation
//         gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
//             gsap.fromTo(card, 
//                 { opacity: 0, scale: 0.9 }, 
//                 {
//                     opacity: 1, 
//                     scale: 1, 
//                     duration: 0.8,
//                     delay: i * 0.2,
//                     scrollTrigger: {
//                         trigger: card,
//                         start: 'top 80%',
//                         end: 'bottom 20%',
//                         toggleActions: 'play none none none'
//                     }
//                 }
//             );
//         });
        
//         // Stats counter animation
//         gsap.utils.toArray('.stat-value').forEach(stat => {
//             const finalValue = stat.innerText;
//             const isPercentage = finalValue.includes('%');
//             const isK = finalValue.includes('K');
//             const isH = finalValue.includes('h');
//             const isPlus = finalValue.includes('+');
            
//             let numericValue = parseFloat(finalValue);
//             if (isK) numericValue *= 1000;
            
//             gsap.to(stat, {
//                 innerText: numericValue,
//                 duration: 2,
//                 snap: { innerText: 1 },
//                 scrollTrigger: {
//                     trigger: stat,
//                     start: 'top 80%',
//                     end: 'bottom 20%',
//                     toggleActions: 'play none none none'
//                 },
//                 onUpdate: function() {
//                     if (isPercentage) {
//                         stat.innerText = Math.ceil(this.targets()[0].innerText) + '%';
//                     } else if (isK) {
//                         stat.innerText = (this.targets()[0].innerText / 1000).toFixed(1) + 'K+';
//                     } else if (isH) {
//                         stat.innerText = Math.ceil(this.targets()[0].innerText) + 'h';
//                     } else if (isPlus) {
//                         stat.innerText = Math.ceil(this.targets()[0].innerText) + '+';
//                     } else {
//                         stat.innerText = Math.ceil(this.targets()[0].innerText);
//                     }
//                 }
//             });
//         });
        
//         // Rating animation
//         gsap.to({}, {
//             duration: 2,
//             ease: 'power2.out',
//             scrollTrigger: {
//                 trigger: '.rating-container',
//                 start: 'top 80%',
//                 toggleActions: 'play none none none'
//             },
//             onUpdate: function() {
//                 setRating(4.8 * this.progress());
//             }
//         });
        
//         // Task completion animation
//         gsap.to({}, {
//             duration: 3,
//             ease: 'power2.out',
//             scrollTrigger: {
//                 trigger: '.human-scene-container',
//                 start: 'top 80%',
//                 toggleActions: 'play none none none'
//             },
//             onUpdate: function() {
//                 setTasksCompleted(Math.floor(125 * this.progress()));
//             }
//         });
        
//         // Floating elements animation
//         gsap.to('.floating-element', {
//             y: '+=20',
//             duration: 3,
//             ease: 'power1.inOut',
//             yoyo: true,
//             repeat: -1,
//             stagger: 0.5
//         });
        
//         // Cleanup ScrollTrigger
//         return () => {
//             ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//         };
//     }, []);

//     return (
//         <div className="relative overflow-hidden">
//             {/* Hero Section with Three.js Background */}
//             <div ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-[#0a192f] overflow-hidden">
//                 {/* Three.js Canvas */}
//                 <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                
//                 {/* Animated Gradient Overlay - Neon Blue */}
//                 <motion.div
//                     className="absolute inset-0 bg-gradient-to-r from-[#0062ff]/70 to-[#00d4ff]/70"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 1.5 }}
//                 />
                
//                 {/* Floating Elements */}
//                 <motion.div
//                     className="absolute top-20 left-20 w-40 h-40 bg-[#00d4ff] rounded-full mix-blend-screen opacity-10 blur-xl floating-element"
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
//                     className="absolute bottom-20 right-20 w-60 h-60 bg-[#0062ff] rounded-full mix-blend-screen opacity-10 blur-xl floating-element"
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
//                         Welcome to <span className="text-[#00f2fe]">Smart Management</span> System
//                     </motion.h1>
//                     <motion.p
//                         className="text-xl sm:text-2xl md:text-3xl mb-8 text-[#e6f1ff] drop-shadow-lg max-w-3xl mx-auto"
//                         variants={itemVariants}
//                     >
//                         Your trusted platform for efficient complaint management and resolution
//                     </motion.p>
//                     <motion.div
//                         className="flex flex-col sm:flex-row justify-center gap-4"
//                         variants={itemVariants}
//                     >
//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="px-16 py-3 bg-[#0062ff] hover:bg-[#0088ff] text-white font-medium rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto sm:mx-0"
//                             onClick={() => navigate('/contactus')}
//                         >
//                             Get Started <FaArrowRight />
//                         </motion.button>
//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg shadow-lg transition-all duration-300 border border-white/20 flex justify-center mx-auto sm:mx-0"
//                             onClick={scrollToHowItWorks}
//                         >
//                             Track Complaint Status
//                         </motion.button>
//                     </motion.div>
//                 </motion.div>
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
//                         <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Choose Our System?</h2>
//                         <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
//                             We provide everything you need for effective smart management.
//                         </p>
//                     </motion.div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                         {features.map((feature, index) => (
//                             <motion.div
//                                 key={index}
//                                 className="feature-card bg-[#0a192f]/80 p-8 rounded-xl border border-[#172a45] hover:border-[#00d4ff] transition-all duration-300 hover:-translate-y-2"
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

//             {/* 3D Human Task Management Section */}
//             <div className="py-20 px-6 bg-[#0a192f]">
//                 <div className="max-w-6xl mx-auto">
//                     <motion.div
//                         className="text-center mb-16"
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                     >
//                         <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Real-time Task Management</h2>
//                         <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
//                             Visualize how tasks flow through your team in our interactive 3D environment
//                         </p>
//                     </motion.div>

//                     <div className="human-scene-container relative h-[500px] rounded-xl overflow-hidden border border-[#172a45] shadow-2xl">
//                         <canvas ref={humanCanvasRef} className="absolute inset-0 w-full h-full" />
//                         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
//                             <div className="flex justify-between items-center">
//                                 <div>
//                                     <h3 className="text-xl font-bold text-white mb-2">Team Task Dashboard</h3>
//                                     <p className="text-[#e6f1ff]">Each team member working on assigned tasks</p>
//                                 </div>
                          
//                             </div>
//                         </div>
//                     </div>

//                     {/* Task Flow Explanation */}
//                     <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
//                         <motion.div 
//                             className="task-flow-item bg-[#0a192f]/80 p-6 rounded-xl border border-[#172a45]"
//                             whileHover={{ y: -5 }}
//                         >
//                             <FaTasks className="text-3xl text-[#00d4ff] mb-4" />
//                             <h3 className="text-xl font-bold text-white mb-2">Task Creation</h3>
//                             <p className="text-[#e6f1ff]">Easily create and assign tasks with priorities and deadlines</p>
//                         </motion.div>
//                         <motion.div 
//                             className="task-flow-item bg-[#0a192f]/80 p-6 rounded-xl border border-[#172a45]"
//                             whileHover={{ y: -5 }}
//                         >
//                             <FaUserCheck className="text-3xl text-[#0088ff] mb-4" />
//                             <h3 className="text-xl font-bold text-white mb-2">Team Assignment</h3>
//                             <p className="text-[#e6f1ff]">Assign tasks to team members with automatic notifications</p>
//                         </motion.div>
//                         <motion.div 
//                             className="task-flow-item bg-[#0a192f]/80 p-6 rounded-xl border border-[#172a45]"
//                             whileHover={{ y: -5 }}
//                         >
//                             <FaChartBar className="text-3xl text-[#0062ff] mb-4" />
//                             <h3 className="text-xl font-bold text-white mb-2">Progress Tracking</h3>
//                             <p className="text-[#e6f1ff]">Monitor real-time progress and completion status</p>
//                         </motion.div>
//                     </div>
//                 </div>
//             </div>

//             {/* How It Works Section */}
//             <div
//                 className="py-20 px-6 bg-[#13294B]"
//                 ref={howItWorksRef}
//             >
//                 <div className="max-w-6xl mx-auto">
//                     <motion.div
//                         className="text-center mb-16"
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                     >
//                         <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
//                         <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
//                             Simple steps to get your concerns addressed
//                         </p>
//                     </motion.div>
//                     <div className="relative">
//                         {/* Timeline - Neon Blue Gradient */}
//                         <div className="hidden lg:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-[#00d4ff] to-[#0062ff] -ml-0.5"></div>

//                         <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
//                             {[
//                                 {
//                                     step: "01",
//                                     title: "Create Tasks",
//                                     description: "Quickly add tasks with priorities, deadlines, and descriptions"
//                                 },
//                                 {
//                                     step: "02",
//                                     title: "Assign to Team",
//                                     description: "Delegate tasks to members with automatic notifications"
//                                 },
//                                 {
//                                     step: "03",
//                                     title: "Track Progress",
//                                     description: "Monitor real-time updates and completion status"
//                                 },
//                                 {
//                                     step: "04",
//                                     title: "Review & Analyze",
//                                     description: "Generate performance reports and optimize workflows"
//                                 }
//                             ].map((item, index) => (
//                                 <motion.div
//                                     key={index}
//                                     className={`timeline-item relative ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12 lg:mt-32'}`}
//                                     initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
//                                     whileInView={{ opacity: 1, x: 0 }}
//                                     transition={{ duration: 0.6, delay: index * 0.1 }}
//                                     viewport={{ once: true }}
//                                 >
//                                     <div className="mb-4">
//                                         <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0062ff] text-white font-bold text-lg">
//                                             {item.step}
//                                         </span>
//                                     </div>
//                                     <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
//                                     <p className="text-[#e6f1ff]">{item.description}</p>
//                                 </motion.div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Stats Section */}
//             <div className="py-20 px-6 bg-gradient-to-b from-[#13294B] to-[#0a192f]">
//                 <div className="max-w-6xl mx-auto">
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                         {stats.map((stat, index) => (
//                             <motion.div
//                                 key={index}
//                                 className="bg-[#0a192f]/80 p-8 rounded-xl border border-[#172a45] text-center"
//                                 initial={{ opacity: 0, y: 30 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                                 viewport={{ once: true }}
//                             >
//                                 <div className="flex justify-center mb-4">{stat.icon}</div>
//                                 <h3 className="stat-value text-4xl font-bold text-white mb-2">{stat.value}</h3>
//                                 <p className="text-[#e6f1ff]">{stat.label}</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* CTA Section - Neon Blue Gradient */}
//             <div className="py-20 px-6 bg-gradient-to-r from-[#0062ff] to-[#00d4ff]">
//                 <div className="max-w-4xl mx-auto text-center">
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         whileInView={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                     >
//                         <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
//                             Ready to address your concerns?
//                         </h2>
//                         <p className="text-xl text-[#e6f1ff] mb-8">
//                             Join thousands who have found fair resolutions through our system
//                         </p>
//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="px-8 py-4 bg-white text-[#0062ff] hover:bg-gray-100 font-bold rounded-lg shadow-lg transition-all duration-300 text-lg"
//                             onClick={() => navigate('/signup')}>
//                             Get Started Now
//                         </motion.button>
//                     </motion.div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;

























import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaHandshake, FaChartLine, FaShieldAlt, FaComments, 
  FaArrowRight, FaStar, FaUsers, FaAward, 
  FaTasks, FaUserCheck, FaChartBar, FaSearch, FaCheckCircle,
  FaLightbulb
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const navigate = useNavigate();
    const howItWorksRef = useRef(null);
    const heroRef = useRef(null);
    const canvasRef = useRef(null);
    const humanCanvasRef = useRef(null);
    const [rating, setRating] = useState(0);
    const [tasksCompleted, setTasksCompleted] = useState(0);


    
    
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
            icon: <FaHandshake className="text-3xl text-[#00d4ff]" />,
            title: "Fair Resolution",
            description: "Ensuring impartial and just solutions to all concerns"
        },
        {
            icon: <FaChartLine className="text-3xl text-[#0088ff]" />,
            title: "Real-time Tracking",
            description: "Monitor your complaint status anytime, anywhere"
        },
        {
            icon: <FaShieldAlt className="text-3xl text-[#0062ff]" />,
            title: "Confidentiality",
            description: "Your identity and concerns are kept completely private"
        },
        {
            icon: <FaComments className="text-3xl text-[#00f2fe]" />,
            title: "24/7 Support",
            description: "Our team is always ready to assist you"
        }
    ];

    // Testimonials data
    const testimonials = [
        {
            name: "Alex Johnson",
            role: "Project Manager",
            content: "This system transformed how we handle complaints. Resolution time improved by 70%!",
            rating: 5
        },
        {
            name: "Sarah Williams",
            role: "HR Director",
            content: "The confidentiality features are outstanding. Our employees feel truly heard.",
            rating: 4.5
        },
        {
            name: "Michael Chen",
            role: "Operations Lead",
            content: "Real-time tracking saved us countless hours of follow-up communications.",
            rating: 5
        }
    ];

    // Stats data
    const stats = [
        { value: "98%", label: "Satisfaction Rate", icon: <FaStar className="text-3xl text-yellow-400" /> },
        { value: "24h", label: "Avg. Resolution Time", icon: <FaChartLine className="text-3xl text-green-400" /> },
        { value: "10K+", label: "Active Users", icon: <FaUsers className="text-3xl text-blue-400" /> },
        { value: "15+", label: "Industry Awards", icon: <FaAward className="text-3xl text-purple-400" /> }
    ];

    // Initialize Three.js scene for particles
    useEffect(() => {
        if (!canvasRef.current) return;
        
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvasRef.current, 
            alpha: true,
            antialias: true 
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Create particle system
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1500;
        const posArray = new Float32Array(particlesCount * 3);
        
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 20;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        // Materials
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        // Mesh
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        // Position camera
        camera.position.z = 5;
        
        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.x += 0.001;
            particlesMesh.rotation.y += 0.002;
            
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        
        window.addEventListener('resize', handleResize);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
        };
    }, []);

    // Initialize Three.js scene for 3D human task management
    useEffect(() => {
        if (!humanCanvasRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a192f);
        scene.fog = new THREE.Fog(0x0a192f, 10, 20);

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 2, 8);

        const renderer = new THREE.WebGLRenderer({
            canvas: humanCanvasRef.current,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x00d4ff, 1);
        directionalLight.position.set(5, 10, 7);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0x0062ff, 2, 10);
        pointLight.position.set(0, 3, 0);
        scene.add(pointLight);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.maxPolarAngle = Math.PI / 2 - 0.1;
        controls.minPolarAngle = Math.PI / 2 - 0.3;

        // Office environment
        const createOfficeEnvironment = () => {
            // Floor
            const floorGeometry = new THREE.PlaneGeometry(20, 20);
            const floorMaterial = new THREE.MeshStandardMaterial({
                color: 0x172a45,
                metalness: 0.1,
                roughness: 0.5
            });
            const floor = new THREE.Mesh(floorGeometry, floorMaterial);
            floor.rotation.x = -Math.PI / 2;
            floor.receiveShadow = true;
            scene.add(floor);

            // Desks
            const deskPositions = [
                { x: -3, y: 0, z: -1 },
                { x: -1, y: 0, z: -1 },
                { x: 1, y: 0, z: -1 },
                { x: 3, y: 0, z: -1 }
            ];

            deskPositions.forEach(pos => {
                const deskGeometry = new THREE.BoxGeometry(1.5, 0.5, 0.8);
                const deskMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
                const desk = new THREE.Mesh(deskGeometry, deskMaterial);
                desk.position.set(pos.x, pos.y + 0.25, pos.z);
                desk.castShadow = true;
                desk.receiveShadow = true;
                scene.add(desk);

                // Computers
                const computerGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.1);
                const computerMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
                const computer = new THREE.Mesh(computerGeometry, computerMaterial);
                computer.position.set(pos.x, pos.y + 0.8, pos.z);
                computer.rotation.x = -0.2;
                scene.add(computer);
            });

            // Task board
            const boardGeometry = new THREE.BoxGeometry(3, 2, 0.1);
            const boardMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
            const board = new THREE.Mesh(boardGeometry, boardMaterial);
            board.position.set(0, 1.5, -3);
            scene.add(board);

            // Task cards
            const tasks = [
                { status: 'completed', color: 0x00ff00, position: { x: -1, y: 1.5, z: -2.9 } },
                { status: 'in-progress', color: 0xffff00, position: { x: -0.3, y: 1.5, z: -2.9 } },
                { status: 'pending', color: 0xff0000, position: { x: 0.4, y: 1.5, z: -2.9 } },
                { status: 'pending', color: 0xff0000, position: { x: 1.1, y: 1.5, z: -2.9 } }
            ];

            tasks.forEach(task => {
                const cardGeometry = new THREE.BoxGeometry(0.5, 0.3, 0.05);
                const cardMaterial = new THREE.MeshStandardMaterial({ color: task.color });
                const card = new THREE.Mesh(cardGeometry, cardMaterial);
                card.position.set(task.position.x, task.position.y, task.position.z);
                scene.add(card);
            });
        };

        // Human models (simplified placeholder)
        const createHumanPlaceholders = () => {
            const humanPositions = [
                { x: -3, y: 0, z: -1 },
                { x: -1, y: 0, z: -1 },
                { x: 1, y: 0, z: -1 },
                { x: 3, y: 0, z: -1 }
            ];

            humanPositions.forEach(pos => {
                // Simple human placeholder (cylinder for body, sphere for head)
                const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 8);
                const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x8888ff });
                const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
                body.position.set(pos.x, pos.y + 0.4, pos.z);
                scene.add(body);

                const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
                const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffddbb });
                const head = new THREE.Mesh(headGeometry, headMaterial);
                head.position.set(pos.x, pos.y + 0.9, pos.z);
                scene.add(head);
            });
        };

        createOfficeEnvironment();
        createHumanPlaceholders();

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
        };
    }, []);

    // GSAP Animations
    useEffect(() => {
        // Hero section animations
        gsap.fromTo(heroRef.current.querySelector('h1'), 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );
        
        gsap.fromTo(heroRef.current.querySelector('p'), 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
        );
        
        gsap.fromTo(heroRef.current.querySelectorAll('button'), 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.8, delay: 0.6, stagger: 0.2, ease: 'power3.out' }
        );
        
        // Features section animation
        gsap.utils.toArray('.feature-card').forEach((card, i) => {
            gsap.fromTo(card, 
                { opacity: 0, y: 50 }, 
                {
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
        
        // How it works timeline animation
        const timelineItems = gsap.utils.toArray('.timeline-item');
        timelineItems.forEach((item, i) => {
            gsap.fromTo(item, 
                { opacity: 0, x: i % 2 === 0 ? -50 : 50 }, 
                {
                    opacity: 1, 
                    x: 0, 
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 70%',
                        end: 'bottom 30%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
        
        // Testimonials animation
        gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
            gsap.fromTo(card, 
                { opacity: 0, scale: 0.9 }, 
                {
                    opacity: 1, 
                    scale: 1, 
                    duration: 0.8,
                    delay: i * 0.2,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
        
        // Stats counter animation
        gsap.utils.toArray('.stat-value').forEach(stat => {
            const finalValue = stat.innerText;
            const isPercentage = finalValue.includes('%');
            const isK = finalValue.includes('K');
            const isH = finalValue.includes('h');
            const isPlus = finalValue.includes('+');
            
            let numericValue = parseFloat(finalValue);
            if (isK) numericValue *= 1000;
            
            gsap.to(stat, {
                innerText: numericValue,
                duration: 2,
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none'
                },
                onUpdate: function() {
                    if (isPercentage) {
                        stat.innerText = Math.ceil(this.targets()[0].innerText) + '%';
                    } else if (isK) {
                        stat.innerText = (this.targets()[0].innerText / 1000).toFixed(1) + 'K+';
                    } else if (isH) {
                        stat.innerText = Math.ceil(this.targets()[0].innerText) + 'h';
                    } else if (isPlus) {
                        stat.innerText = Math.ceil(this.targets()[0].innerText) + '+';
                    } else {
                        stat.innerText = Math.ceil(this.targets()[0].innerText);
                    }
                }
            });
        });
        
        // Rating animation
        gsap.to({}, {
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.rating-container',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            onUpdate: function() {
                setRating(4.8 * this.progress());
            }
        });
        
        // Task completion animation
        gsap.to({}, {
            duration: 3,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.human-scene-container',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            onUpdate: function() {
                setTasksCompleted(Math.floor(125 * this.progress()));
            }
        });
        
        // Floating elements animation
        gsap.to('.floating-element', {
            y: '+=20',
            duration: 3,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1,
            stagger: 0.5
        });
        
        // Cleanup ScrollTrigger
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="relative overflow-hidden">
            {/* Hero Section with Three.js Background */}
            <div ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-[#0a192f] overflow-hidden">
                {/* Three.js Canvas */}
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                
                {/* Animated Gradient Overlay - Neon Blue */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#0062ff]/70 to-[#00d4ff]/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                />
                
                {/* Floating Elements */}
                <motion.div
                    className="absolute top-20 left-20 w-40 h-40 bg-[#00d4ff] rounded-full mix-blend-screen opacity-10 blur-xl floating-element"
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
                    className="absolute bottom-20 right-20 w-60 h-60 bg-[#0062ff] rounded-full mix-blend-screen opacity-10 blur-xl floating-element"
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
                        Welcome to <span className="text-[#00f2fe]">Smart Management</span> System
                    </motion.h1>
                    <motion.p
                        className="text-xl sm:text-2xl md:text-3xl mb-8 text-[#e6f1ff] drop-shadow-lg max-w-3xl mx-auto"
                        variants={itemVariants}
                    >
                        Your trusted platform for efficient complaint management and resolution
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
                            Track Complaint Status
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
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Choose Our System?</h2>
                        <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
                            We provide everything you need for effective smart management.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="feature-card bg-[#0a192f]/80 p-8 rounded-xl border border-[#172a45] hover:border-[#00d4ff] transition-all duration-300 hover:-translate-y-2"
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

            {/* 3D Human Task Management Section */}
            <div className="py-20 px-6 bg-[#0a192f]">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Real-time Task Management</h2>
                        <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
                            Visualize how tasks flow through your team in our interactive 3D environment
                        </p>
                    </motion.div>

                    <div className="human-scene-container relative h-[500px] rounded-xl overflow-hidden border border-[#172a45] shadow-2xl">
                        <canvas ref={humanCanvasRef} className="absolute inset-0 w-full h-full" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Team Task Dashboard</h3>
                                    <p className="text-[#e6f1ff]">Each team member working on assigned tasks</p>
                                </div>
                          
                            </div>
                        </div>
                    </div>

                    {/* Task Flow Explanation */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div 
                            className="task-flow-item bg-[#0a192f]/80 p-6 rounded-xl border border-[#172a45]"
                            whileHover={{ y: -5 }}
                        >
                            <FaTasks className="text-3xl text-[#00d4ff] mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Task Creation</h3>
                            <p className="text-[#e6f1ff]">Easily create and assign tasks with priorities and deadlines</p>
                        </motion.div>
                        <motion.div 
                            className="task-flow-item bg-[#0a192f]/80 p-6 rounded-xl border border-[#172a45]"
                            whileHover={{ y: -5 }}
                        >
                            <FaUserCheck className="text-3xl text-[#0088ff] mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Team Assignment</h3>
                            <p className="text-[#e6f1ff]">Assign tasks to team members with automatic notifications</p>
                        </motion.div>
                        <motion.div 
                            className="task-flow-item bg-[#0a192f]/80 p-6 rounded-xl border border-[#172a45]"
                            whileHover={{ y: -5 }}
                        >
                            <FaChartBar className="text-3xl text-[#0062ff] mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Progress Tracking</h3>
                            <p className="text-[#e6f1ff]">Monitor real-time progress and completion status</p>
                        </motion.div>
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
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
                        <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
                            Simple steps to get your concerns addressed
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
                                    className={`timeline-item relative ${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12 lg:mt-32'}`}
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

            {/* Stats Section */}
            <div className="py-20 px-6 bg-gradient-to-b from-[#13294B] to-[#0a192f]">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="bg-[#0a192f]/80 p-8 rounded-xl border border-[#172a45] text-center"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex justify-center mb-4">{stat.icon}</div>
                                <h3 className="stat-value text-4xl font-bold text-white mb-2">{stat.value}</h3>
                                <p className="text-[#e6f1ff]">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

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
                            Ready to address your concerns?
                        </h2>
                        <p className="text-xl text-[#e6f1ff] mb-8">
                            Join thousands who have found fair resolutions through our system
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-[#0062ff] hover:bg-gray-100 font-bold rounded-lg shadow-lg transition-all duration-300 text-lg"
                            onClick={() => navigate('/signup')}>
                            Get Started Now
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Home;





















// import React, { useRef, useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   FaHandshake, FaChartLine, FaShieldAlt, FaComments, 
//   FaArrowRight, FaStar, FaUsers, FaAward, 
//   FaTasks, FaUserCheck, FaChartBar, FaLightbulb
// } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
// import { SplitText } from 'gsap/SplitText';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// // Register GSAP plugins
// gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

// const Home = () => {
//     const navigate = useNavigate();
//     const howItWorksRef = useRef(null);
//     const heroRef = useRef(null);
//     const canvasRef = useRef(null);
//     const humanCanvasRef = useRef(null);
//     const logoRef = useRef(null);
//     const [rating, setRating] = useState(0);
//     const [tasksCompleted, setTasksCompleted] = useState(0);

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

//     // Features data
//     const features = [
//         {
//             icon: <FaHandshake className="text-3xl text-[#00d4ff]" />,
//             title: "Fair Resolution",
//             description: "Ensuring impartial and just solutions to all concerns"
//         },
//         {
//             icon: <FaChartLine className="text-3xl text-[#0088ff]" />,
//             title: "Real-time Tracking",
//             description: "Monitor your complaint status anytime, anywhere"
//         },
//         {
//             icon: <FaShieldAlt className="text-3xl text-[#0062ff]" />,
//             title: "Confidentiality",
//             description: "Your identity and concerns are kept completely private"
//         },
//         {
//             icon: <FaComments className="text-3xl text-[#00f2fe]" />,
//             title: "24/7 Support",
//             description: "Our team is always ready to assist you"
//         }
//     ];

//     // Initialize Three.js scene for particles
//     useEffect(() => {
//         if (!canvasRef.current) return;
        
//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//         const renderer = new THREE.WebGLRenderer({ 
//             canvas: canvasRef.current, 
//             alpha: true,
//             antialias: true 
//         });
        
//         renderer.setSize(window.innerWidth, window.innerHeight);
        
//         // Create particle system
//         const particlesGeometry = new THREE.BufferGeometry();
//         const particlesCount = 1500;
//         const posArray = new Float32Array(particlesCount * 3);
        
//         for (let i = 0; i < particlesCount * 3; i++) {
//             posArray[i] = (Math.random() - 0.5) * 20;
//         }
        
//         particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
//         const particlesMaterial = new THREE.PointsMaterial({
//             size: 0.05,
//             color: 0x00d4ff,
//             transparent: true,
//             opacity: 0.8,
//             blending: THREE.AdditiveBlending
//         });
        
//         const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//         scene.add(particlesMesh);
//         camera.position.z = 5;
        
//         const animate = () => {
//             requestAnimationFrame(animate);
//             particlesMesh.rotation.x += 0.001;
//             particlesMesh.rotation.y += 0.002;
//             renderer.render(scene, camera);
//         };
        
//         animate();
        
//         const handleResize = () => {
//             camera.aspect = window.innerWidth / window.innerHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(window.innerWidth, window.innerHeight);
//         };
        
//         window.addEventListener('resize', handleResize);
        
//         return () => {
//             window.removeEventListener('resize', handleResize);
//             renderer.dispose();
//         };
//     }, []);

//     // GSAP Animations
//     useEffect(() => {
//         // 1. ScrollTrigger Animations
//         gsap.from(heroRef.current.querySelector('h1'), {
//             opacity: 0,
//             y: 50,
//             duration: 1,
//             ease: "power3.out",
//             scrollTrigger: {
//                 trigger: heroRef.current,
//                 start: "top 80%",
//                 toggleActions: "play none none none"
//             }
//         });

//         // 2. Staggered Animations
//         gsap.from(".feature-card", {
//             opacity: 0,
//             y: 30,
//             duration: 0.5,
//             stagger: 0.2,
//             ease: "power2.out",
//             scrollTrigger: {
//                 trigger: ".features-section",
//                 start: "top 80%"
//             }
//         });

//         // 3. Morphing & SVG Animations
//         if (logoRef.current) {
//             gsap.to(logoRef.current.querySelector("path"), {
//                 morphSVG: "M10,50 Q50,10 90,50 Q50,90 10,50",
//                 duration: 2,
//                 repeat: -1,
//                 yoyo: true,
//                 ease: "sine.inOut"
//             });
//         }

//         // 4. Text & Typography Animations
//         const headline = new SplitText(".hero-headline", { type: "chars" });
//         gsap.from(headline.chars, {
//             y: 50,
//             opacity: 0,
//             stagger: 0.05,
//             duration: 0.5,
//             ease: "back.out",
//             scrollTrigger: {
//                 trigger: ".hero-section",
//                 start: "top 80%"
//             }
//         });

//         // 5. Interactive Hover Animations
//         document.querySelectorAll(".btn").forEach(btn => {
//             btn.addEventListener("mouseenter", () => {
//                 gsap.to(btn, { 
//                     scale: 1.1,
//                     backgroundColor: "#00d4ff",
//                     duration: 0.3 
//                 });
//             });
//             btn.addEventListener("mouseleave", () => {
//                 gsap.to(btn, { 
//                     scale: 1,
//                     backgroundColor: "#0a192f",
//                     duration: 0.3 
//                 });
//             });
//         });

//         // 6. Page Load Animation
//         gsap.from("body", { 
//             opacity: 0, 
//             duration: 1, 
//             ease: "power2.inOut" 
//         });

//         // 7. Smooth Scrolling
//         gsap.to("main", {
//             y: () => -(document.querySelector("main").scrollHeight - window.innerHeight),
//             ease: "none",
//             scrollTrigger: {
//                 trigger: "main",
//                 start: "top top",
//                 end: "bottom bottom",
//                 scrub: 1
//             }
//         });

//         // 8. Motion Path Animations
//         gsap.to(".floating-circle", {
//             motionPath: {
//                 path: "M0,0 C50,100 150,100 200,0",
//                 autoRotate: true
//             },
//             duration: 5,
//             repeat: -1,
//             yoyo: true,
//             ease: "sine.inOut"
//         });

//         return () => {
//             ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//         };
//     }, []);

//     return (
//         <div className="relative overflow-hidden">
//             {/* Hero Section */}
//             <section ref={heroRef} className="hero-section relative min-h-screen flex items-center justify-center bg-[#0a192f]">
//                 <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                
//                 <div className="relative z-10 text-center px-6 py-20 max-w-6xl mx-auto">
//                     <h1 className="hero-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
//                         Welcome to Smart Management System
//                     </h1>
//                     <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-[#e6f1ff]">
//                         Your trusted platform for efficient complaint management
//                     </p>
//                     <div className="flex gap-4 justify-center">
//                         <button className="btn px-8 py-3 bg-[#0062ff] text-white rounded-lg">
//                             Get Started
//                         </button>
//                     </div>
//                 </div>
//             </section>

//             {/* Features Section */}
//             <section className="features-section py-20 px-6 bg-gradient-to-b from-blue-950 to-blue-900">
//                 <div className="max-w-6xl mx-auto">
//                     <h2 className="text-3xl sm:text-4xl font-bold text-white mb-16 text-center">Why Choose Our System?</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                         {features.map((feature, index) => (
//                             <div key={index} className="feature-card bg-[#0a192f]/80 p-8 rounded-xl">
//                                 <div>{feature.icon}</div>
//                                 <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
//                                 <p className="text-[#e6f1ff]">{feature.description}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Logo Animation */}
//             <section className="py-20 flex justify-center">
//                 <svg ref={logoRef} width="200" height="200" viewBox="0 0 100 100">
//                     <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="#00d4ff" strokeWidth="2"/>
//                 </svg>
//             </section>

//             {/* Floating Elements */}
//             <div className="floating-circle absolute top-1/4 left-1/4 w-10 h-10 bg-[#00d4ff] rounded-full"></div>
//         </div>
//     );
// };

// export default Home;






// import React, { useRef, useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { SplitText } from 'gsap/SplitText';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { useNavigate } from 'react-router-dom';

// gsap.registerPlugin(ScrollTrigger, SplitText);

// const PremiumHomepage = () => {
//   const navigate = useNavigate();
//   const heroRef = useRef(null);
//   const canvasRef = useRef(null);
//   const floatingCanvasRef = useRef(null);
//   const featureCardsRef = useRef([]);
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

//   // 1. Cosmic Particle Vortex (Three.js)
//   useEffect(() => {
//     if (!canvasRef.current) return;

//     // Scene setup with post-processing
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.z = 15;

//     const renderer = new THREE.WebGLRenderer({ 
//       canvas: canvasRef.current,
//       antialias: true,
//       alpha: true
//     });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//     // Post-processing pipeline
//     const composer = new EffectComposer(renderer);
//     const renderPass = new RenderPass(scene, camera);
//     composer.addPass(renderPass);

//     const bloomPass = new UnrealBloomPass(
//       new THREE.Vector2(window.innerWidth, window.innerHeight),
//       1.5, 0.4, 0.85
//     );
//     bloomPass.threshold = 0;
//     bloomPass.strength = 1.5;
//     bloomPass.radius = 0.5;
//     composer.addPass(bloomPass);

//     // Create a galaxy of particles
//     const particlesCount = 10000;
//     const positions = new Float32Array(particlesCount * 3);
//     const colors = new Float32Array(particlesCount * 3);
//     const sizes = new Float32Array(particlesCount);

//     const colorPalette = [
//       new THREE.Color(0x00d4ff),
//       new THREE.Color(0x0062ff),
//       new THREE.Color(0x00f2fe),
//       new THREE.Color(0x0088ff)
//     ];

//     for (let i = 0; i < particlesCount; i++) {
//       // Spiral galaxy distribution
//       const radius = Math.random() * 20;
//       const spinAngle = Math.random() * Math.PI * 2;
//       const branchAngle = (i % 8) / 8 * Math.PI * 2;

//       positions[i * 3] = Math.cos(branchAngle + spinAngle) * radius;
//       positions[i * 3 + 1] = Math.sin(branchAngle + spinAngle) * radius;
//       positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

//       // Color variation
//       const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
//       colors[i * 3] = color.r;
//       colors[i * 3 + 1] = color.g;
//       colors[i * 3 + 2] = color.b;

//       // Size variation
//       sizes[i] = Math.random() * 0.5 + 0.1;
//     }

//     const particlesGeometry = new THREE.BufferGeometry();
//     particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//     particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
//     particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.2,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.8,
//       blending: THREE.AdditiveBlending,
//       sizeAttenuation: true
//     });

//     const particles = new THREE.Points(particlesGeometry, particlesMaterial);
//     scene.add(particles);

//     // Mouse interaction
//     const mouse = new THREE.Vector2();
//     const handleMouseMove = (event) => {
//       mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//       mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//       setMousePos({ x: event.clientX, y: event.clientY });
//     };
//     window.addEventListener('mousemove', handleMouseMove);

//     // Animation loop
//     const clock = new THREE.Clock();
//     const animate = () => {
//       requestAnimationFrame(animate);
      
//       const elapsedTime = clock.getElapsedTime();
      
//       // Create a vortex effect
//       particles.rotation.x = elapsedTime * 0.05;
//       particles.rotation.y = elapsedTime * 0.1;
      
//       // Particles respond to mouse
//       const positions = particlesGeometry.attributes.position.array;
//       for (let i = 0; i < particlesCount; i++) {
//         const i3 = i * 3;
//         const x = positions[i3];
//         const y = positions[i3 + 1];
        
//         // Create repulsion from mouse
//         const dx = x - mouse.x * 20;
//         const dy = y - mouse.y * 20;
//         const distance = Math.sqrt(dx * dx + dy * dy);
        
//         if (distance < 10) {
//           const force = (10 - distance) / 10;
//           positions[i3] += dx * force * 0.1;
//           positions[i3 + 1] += dy * force * 0.1;
//         }
        
//         // Pulsing effect
//         positions[i3 + 2] = Math.sin(elapsedTime * 0.5 + i * 0.01) * 5;
//       }
//       particlesGeometry.attributes.position.needsUpdate = true;
      
//       composer.render();
//     };
//     animate();

//     // Handle resize
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       composer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('resize', handleResize);
//       renderer.dispose();
//     };
//   }, []);

//   // 2. Floating 3D Shapes (Three.js)
//   useEffect(() => {
//     if (!floatingCanvasRef.current) return;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.z = 15;

//     const renderer = new THREE.WebGLRenderer({
//       canvas: floatingCanvasRef.current,
//       alpha: true,
//       antialias: true
//     });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//     // Custom geometry - metaballs effect
//     const createMetaball = (color) => {
//       const geometry = new THREE.IcosahedronGeometry(1, 3);
//       const material = new THREE.MeshPhysicalMaterial({
//         color,
//         metalness: 0.2,
//         roughness: 0.1,
//         transmission: 0.9,
//         thickness: 0.5,
//         clearcoat: 1,
//         clearcoatRoughness: 0.1,
//         ior: 1.2,
//         envMapIntensity: 1
//       });
//       return new THREE.Mesh(geometry, material);
//     };

//     const shapes = [
//       { mesh: createMetaball(0x00d4ff), speed: 0.3, size: 1.5 },
//       { mesh: createMetaball(0x0062ff), speed: 0.5, size: 1.2 },
//       { mesh: createMetaball(0x00f2fe), speed: 0.7, size: 1.0 }
//     ];

//     shapes.forEach((shape, i) => {
//       shape.mesh.position.x = (Math.random() - 0.5) * 10;
//       shape.mesh.position.y = (Math.random() - 0.5) * 10;
//       shape.mesh.position.z = (Math.random() - 0.5) * 10;
//       shape.mesh.scale.set(shape.size, shape.size, shape.size);
//       scene.add(shape.mesh);
//     });

//     // Lighting
//     const ambientLight = new THREE.AmbientLight(0x404040, 2);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(5, 10, 7);
//     scene.add(directionalLight);

//     const pointLight = new THREE.PointLight(0x00d4ff, 2, 20);
//     pointLight.position.set(0, 5, 5);
//     scene.add(pointLight);

//     // Animation loop
//     const clock = new THREE.Clock();
//     const animate = () => {
//       requestAnimationFrame(animate);
      
//       const elapsedTime = clock.getElapsedTime();
      
//       shapes.forEach((shape, i) => {
//         shape.mesh.position.x = Math.sin(elapsedTime * shape.speed) * 5;
//         shape.mesh.position.y = Math.cos(elapsedTime * shape.speed * 1.3) * 5;
//         shape.mesh.rotation.x = elapsedTime * shape.speed * 0.5;
//         shape.mesh.rotation.y = elapsedTime * shape.speed * 0.3;
        
//         // Pulsing scale
//         shape.mesh.scale.setScalar(shape.size + Math.sin(elapsedTime * 2 + i) * 0.2);
//       });
      
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Handle resize
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       renderer.dispose();
//     };
//   }, []);

//   // 3. Premium GSAP Animations
//   useEffect(() => {
//     // 3.1 Hero Text Animation (Split Text + Morphing)
//     const heroHeading = new SplitText(heroRef.current.querySelector("h1"), { type: "chars,words" });
//     const heroSubhead = new SplitText(heroRef.current.querySelector("p"), { type: "lines" });
    
//     gsap.set(heroHeading.chars, { opacity: 0, y: "100%", rotationX: 90 });
//     gsap.set(heroSubhead.lines, { opacity: 0, y: 30 });
    
//     const heroTl = gsap.timeline({
//       defaults: { ease: "expo.out", duration: 1.5 }
//     });
    
//     heroTl
//       .to(heroHeading.chars, {
//         opacity: 1,
//         y: "0%",
//         rotationX: 0,
//         stagger: 0.02,
//         duration: 1.2
//       })
//       .to(heroSubhead.lines, {
//         opacity: 1,
//         y: 0,
//         stagger: 0.1
//       }, "-=0.8")
//       .from(heroRef.current.querySelectorAll("button"), {
//         opacity: 0,
//         y: 30,
//         stagger: 0.1,
//         duration: 0.8,
//         ease: "back.out(4)"
//       }, "-=0.5");

//     // 3.2 Feature Cards (3D Flip + Hover)
//     featureCardsRef.current.forEach((card, i) => {
//       if (!card) return;
      
//       // Entrance animation
//       gsap.from(card, {
//         scrollTrigger: {
//           trigger: card,
//           start: "top 80%",
//           toggleActions: "play none none none"
//         },
//         rotationY: 90,
//         opacity: 0,
//         duration: 1,
//         delay: i * 0.15,
//         ease: "back.out(2)",
//         transformOrigin: "left center"
//       });
      
//       // Hover animation
//       card.addEventListener("mouseenter", () => {
//         gsap.to(card, {
//           rotationY: 5,
//           rotationX: 5,
//           scale: 1.05,
//           boxShadow: "0 30px 60px rgba(0, 212, 255, 0.4)",
//           duration: 0.5,
//           ease: "power2.out"
//         });
        
//         // Inner elements animation
//         gsap.to(card.querySelector("svg"), {
//           scale: 1.2,
//           duration: 0.5,
//           ease: "elastic.out(1, 0.5)"
//         });
//       });
      
//       card.addEventListener("mouseleave", () => {
//         gsap.to(card, {
//           rotationY: 0,
//           rotationX: 0,
//           scale: 1,
//           boxShadow: "0 10px 30px rgba(0, 212, 255, 0.2)",
//           duration: 0.7,
//           ease: "elastic.out(1, 0.5)"
//         });
        
//         gsap.to(card.querySelector("svg"), {
//           scale: 1,
//           duration: 0.5
//         });
//       });
//     });

//     // 3.3 Parallax Sections
//     const sections = gsap.utils.toArray(".parallax-section");
//     sections.forEach(section => {
//       const depth = section.dataset.depth || 0.3;
      
//       gsap.to(section, {
//         yPercent: -20 * depth,
//         ease: "none",
//         scrollTrigger: {
//           trigger: section,
//           start: "top bottom",
//           end: "bottom top",
//           scrub: true
//         }
//       });
//     });

//     // 3.4 Magnetic Buttons
//     const buttons = gsap.utils.toArray(".magnetic-btn");
//     buttons.forEach(btn => {
//       btn.addEventListener("mousemove", (e) => {
//         const rect = btn.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;
//         const centerX = rect.width / 2;
//         const centerY = rect.height / 2;
        
//         gsap.to(btn, {
//           x: (x - centerX) * 0.2,
//           y: (y - centerY) * 0.2,
//           duration: 0.5,
//           ease: "power2.out"
//         });
//       });
      
//       btn.addEventListener("mouseleave", () => {
//         gsap.to(btn, {
//           x: 0,
//           y: 0,
//           duration: 0.7,
//           ease: "elastic.out(1, 0.5)"
//         });
//       });
//     });

//     // 3.5 Scroll Progress Indicator
//     const progressBar = document.createElement("div");
//     progressBar.className = "fixed top-0 left-0 h-1 bg-gradient-to-r from-[#00d4ff] to-[#0062ff] z-50";
//     document.body.appendChild(progressBar);
    
//     gsap.to(progressBar, {
//       scaleX: 0,
//       ease: "none",
//       scrollTrigger: {
//         trigger: "body",
//         start: "top top",
//         end: "bottom bottom",
//         scrub: 0.5,
//         onUpdate: (self) => {
//           gsap.set(progressBar, { scaleX: self.progress });
//         }
//       }
//     });

//     return () => {
//       progressBar.remove();
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, []);

//   // 4. Mouse Follower Effect
//   useEffect(() => {
//     const follower = document.createElement("div");
//     follower.className = "fixed w-8 h-8 rounded-full bg-[#00d4ff] pointer-events-none mix-blend-difference z-50";
//     document.body.appendChild(follower);
    
//     const moveFollower = (e) => {
//       gsap.to(follower, {
//         x: e.clientX - 16,
//         y: e.clientY - 16,
//         duration: 0.3,
//         ease: "power2.out"
//       });
//     };
    
//     document.addEventListener("mousemove", moveFollower);
    
//     // Scale effect on buttons
//     const buttons = gsap.utils.toArray("button, a");
//     buttons.forEach(btn => {
//       btn.addEventListener("mouseenter", () => {
//         gsap.to(follower, {
//           scale: 3,
//           backgroundColor: "#ffffff",
//           duration: 0.3
//         });
//       });
      
//       btn.addEventListener("mouseleave", () => {
//         gsap.to(follower, {
//           scale: 1,
//           backgroundColor: "#00d4ff",
//           duration: 0.3
//         });
//       });
//     });
    
//     return () => {
//       document.removeEventListener("mousemove", moveFollower);
//       follower.remove();
//     };
//   }, []);

//   return (
//     <div className="relative overflow-hidden text-white">
//       {/* Cosmic Particle Background */}
//       <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />
      
//       {/* Floating 3D Shapes */}
//       <canvas ref={floatingCanvasRef} className="fixed inset-0 w-full h-full -z-10 opacity-30" />
      
//       {/* Mouse Follower will be added by JS */}

//       {/* Hero Section */}
//       <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent z-0" />
        
//         <div className="relative z-10 text-center px-6 py-20 max-w-6xl mx-auto">
//           <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8">
//             Transform Your <span className="text-[#00d4ff]">Digital Experience</span>
//           </h1>
//           <p className="text-xl sm:text-2xl md:text-3xl mb-12 max-w-3xl mx-auto">
//             Cutting-edge solutions with premium animations and immersive interactions
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-6">
//             <button 
//               className="magnetic-btn px-12 py-4 bg-[#00d4ff] hover:bg-[#0088ff] text-black font-bold rounded-full shadow-xl transition-all duration-300 text-lg"
//               onClick={() => navigate('/demo')}
//             >
//               View Demo
//             </button>
//             <button 
//               className="magnetic-btn px-8 py-4 bg-transparent hover:bg-white/10 text-white font-medium rounded-full shadow-xl transition-all duration-300 border-2 border-[#00d4ff]"
//               onClick={() => navigate('/contact')}
//             >
//               Contact Us
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-32 px-6 relative parallax-section" data-depth="0.2">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             className="text-center mb-20"
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-4xl sm:text-5xl font-bold mb-6">Premium Features</h2>
//             <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
//               Experience the most advanced animation technologies available
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {[
//               {
//                 icon: <div className="w-16 h-16 bg-[#00d4ff] rounded-2xl flex items-center justify-center text-3xl">✨</div>,
//                 title: "Cosmic Particle System",
//                 description: "Interactive galaxy of particles that respond to your cursor with physics-based behaviors"
//               },
//               {
//                 icon: <div className="w-16 h-16 bg-[#0062ff] rounded-2xl flex items-center justify-center text-3xl">🌀</div>,
//                 title: "3D Metaballs",
//                 description: "Liquid-like 3D shapes with refraction and advanced material properties"
//               },
//               {
//                 icon: <div className="w-16 h-16 bg-[#00f2fe] rounded-2xl flex items-center justify-center text-3xl">⚡</div>,
//                 title: "Magnetic Interactions",
//                 description: "Elements that physically respond to cursor movement with smooth elasticity"
//               },
//               {
//                 icon: <div className="w-16 h-16 bg-[#0088ff] rounded-2xl flex items-center justify-center text-3xl">🌌</div>,
//                 title: "Parallax Depth",
//                 description: "Multi-layered parallax effects creating immersive depth perception"
//               },
//               {
//                 icon: <div className="w-16 h-16 bg-[#00d4ff] rounded-2xl flex items-center justify-center text-3xl">💎</div>,
//                 title: "Post Processing",
//                 description: "Bloom, glitch, and chromatic aberration effects for cinematic quality"
//               },
//               {
//                 icon: <div className="w-16 h-16 bg-[#0062ff] rounded-2xl flex items-center justify-center text-3xl">🔄</div>,
//                 title: "Fluid Transitions",
//                 description: "Seamless page transitions with morphing animations and custom easing"
//               }
//             ].map((feature, index) => (
//               <div
//                 key={index}
//                 ref={el => featureCardsRef.current[index] = el}
//                 className="feature-card bg-[#0a192f]/80 p-8 rounded-2xl border border-[#172a45] backdrop-blur-sm transform-style-preserve-3d"
//                 style={{ transformStyle: 'preserve-3d' }}
//               >
//                 <div className="mb-6 transform-z-0">{feature.icon}</div>
//                 <h3 className="text-2xl font-bold mb-4 transform-z-0">{feature.title}</h3>
//                 <p className="text-[#e6f1ff] transform-z-0">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 3D Showcase Section */}
//       <section className="py-32 px-6 bg-black/50 parallax-section" data-depth="0.4">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-20">
//             <h2 className="text-4xl sm:text-5xl font-bold mb-6">Immersive 3D Experience</h2>
//             <p className="text-xl text-[#e6f1ff] max-w-3xl mx-auto">
//               Powered by Three.js and advanced WebGL techniques
//             </p>
//           </div>
          
//           <div className="relative h-[600px] rounded-3xl overflow-hidden border-2 border-[#00d4ff]/30">
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="text-center">
//                 <h3 className="text-3xl font-bold mb-4">3D Model Loading...</h3>
//                 <div className="w-full h-2 bg-[#172a45] rounded-full overflow-hidden">
//                   <div className="h-full bg-gradient-to-r from-[#00d4ff] to-[#0062ff] rounded-full animate-pulse" style={{ width: '70%' }} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-32 px-6 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-[#0062ff] to-[#00d4ff] opacity-90 z-0" />
//         <div className="absolute inset-0 bg-noise opacity-10 z-0" />
        
//         <div className="max-w-4xl mx-auto text-center relative z-10">
//           <h2 className="text-4xl sm:text-5xl font-bold mb-8">
//             Ready to Elevate Your Project?
//           </h2>
//           <p className="text-xl mb-12 max-w-3xl mx-auto">
//             Implement these premium animations in your next website or application
//           </p>
//           <button 
//             className="magnetic-btn px-12 py-5 bg-white text-[#0062ff] hover:bg-gray-100 font-bold rounded-full shadow-2xl transition-all duration-300 text-xl"
//             onClick={() => navigate('/contact')}
//           >
//             Get Started Today
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default PremiumHomepage;
