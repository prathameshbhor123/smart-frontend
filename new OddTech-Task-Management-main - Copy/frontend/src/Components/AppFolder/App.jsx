




// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import EntryGate from './EntryGate';


// import Planning from './Planning';
// import Document from './Document';

// const apps = [

//   { id: 1, name: "Documents", icon: "📄", component: Document },

//   { id: 2, name: "Planning", icon: "🗓️", component: Planning },

//   { id: 3, name: "Entry Gate", icon: "🚪", component: EntryGate },
// ];

// const AppGrid = ({ apps, handleAppClick }) => {
//   if (apps.length === 0) {
//     return (
//       <div className="text-center py-12 ">
//         <div className="text-5xl mb-4">🔍</div>
//         <h3 className="text-xl font-bold text-gray-700 mb-2">No applications found</h3>
//         <p className="text-gray-600">Try adjusting your search terms</p>
//       </div>
//     );
//   }
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//       {apps.map((app, index) => (
//         <motion.button
//           key={app.id}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: index * 0.05, duration: 0.3 }}
//           whileHover={{
//             y: -5,
//             boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
//           }}
//           whileTap={{ scale: 0.98 }}
//           onClick={() => handleAppClick(app)}
//           className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         >
//           <motion.div
//             whileHover={{ scale: 1.4, rotate: 8 }}
//             whileTap={{ scale: 0.9 }}
//             className="text-4xl mb-3"
//           >
//             {app.icon}
//           </motion.div>
//           <p className="text-sm font-medium text-gray-700 text-center">{app.name}</p>
//         </motion.button>
//       ))}
//     </div>
//   );
// };

// const SecurityFeatures = () => (
//   <div className="grid md:grid-cols-3 gap-8">
//     <motion.div
//       className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors"
//       whileHover={{ y: -5 }}
//     >
//       <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4">
//         <div className="text-2xl">🔐</div>
//       </div>
//       <h3 className="text-xl font-bold text-gray-800 mb-2">Bank-Level Security</h3>
//       <p className="text-gray-600">
//         Enterprise-grade encryption and compliance with global security standards
//       </p>
//     </motion.div>

//     <motion.div
//       className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors"
//       whileHover={{ y: -5 }}
//     >
//       <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
//         <div className="text-2xl">⚡</div>
//       </div>
//       <h3 className="text-xl font-bold text-gray-800 mb-2">High Performance</h3>
//       <p className="text-gray-600">
//         99.99% uptime with lightning-fast response times for all applications
//       </p>
//     </motion.div>

//     <motion.div
//       className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors"
//       whileHover={{ y: -5 }}
//     >
//       <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
//         <div className="text-2xl">🔄</div>
//       </div>
//       <h3 className="text-xl font-bold text-gray-800 mb-2">Seamless Integration</h3>
//       <p className="text-gray-600">
//         All apps work together sharing data in real-time across your organization
//       </p>
//     </motion.div>
//   </div>
// );

// const AppsPage = () => {
//   const [activeApp, setActiveApp] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Handle body overflow when any app is open
//   useEffect(() => {
//     if (activeApp) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }

//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [activeApp]);

//   const handleAppClick = (app) => {
//     setActiveApp(app);
//   };

//   const closeApp = () => {
//     setActiveApp(null);
//   };

//   const filteredApps = apps.filter(app =>
//     app.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-white py-12 px-6 md:px-16 relative overflow-hidden">
//       {/* Floating bubbles background */}
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         {Array.from({ length: 15 }).map((_, i) => (
//           <motion.div
//             key={i}
//             animate={{
//               x: [0, Math.random() * 100 - 50],
//               y: [0, Math.random() * 100 - 50],
//             }}
//             transition={{
//               duration: 20 + Math.random() * 30,
//               repeat: Infinity,
//               repeatType: "reverse",
//             }}
//             className="absolute rounded-full opacity-5"
//             style={{
//               width: `${10 + Math.random() * 100}px`,
//               height: `${10 + Math.random() * 100}px`,
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               background: `hsl(${Math.random() * 360}, 50%, 90%)`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Main content container - Hide when any app is active */}
//       {!activeApp && (
//         <div className="max-w-7xl mx-auto relative z-10 mt-15">
//           {/* Hero Section */}
//           <div className="text-center mb-16">
//             <motion.h1
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
//             >
//               {/* <span className="bg-gradient-to-r from-[#00A3E1] to-[#00AEEF] text-transparent bg-clip-text">
//   Enterprise App Suite
// </span> */}


//               <span className="bg-gradient-to-r from-[#444444] to-[#444444] text-transparent bg-clip-text">
//                 Enterprise App Suite
//               </span>

//             </motion.h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
//               25+ premium business applications with enterprise-grade security
//             </p>

//             {/* Search Bar */}
//             <div className="max-w-2xl mx-auto mb-12">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search applications..."
//                   className="w-full p-4 pl-12 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <svg
//                   className="absolute left-4 top-4 h-5 w-5 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <button
//                   onClick={() => setSearchTerm('')}
//                   className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
//                 >
//                   Clear
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Apps Grid Section */}
//           <section className="mb-16">
//             <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//               <h2 className="text-3xl font-bold text-gray-800">Business Applications</h2>
//               <div className="flex items-center gap-4">
//                 <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg">
//                   {filteredApps.length} applications
//                 </div>

//               </div>
//             </div>

//             <AppGrid apps={filteredApps} handleAppClick={handleAppClick} />
//           </section>

//           {/* High Security Video Section */}
//           <section className="bg-white rounded-2xl p-8 shadow-sm mb-16 border border-gray-100">
//             <div className="flex flex-col md:flex-row gap-8 items-center">
//               <div className="md:w-1/2">
//                 <h2 className="text-3xl font-bold text-gray-800 mb-4">
//                   Enterprise-Grade Security & Quality
//                 </h2>
//                 <p className="text-gray-600 mb-6">
//                   Our applications are built with military-grade encryption and undergo rigorous quality testing to ensure your data is always protected.
//                 </p>
//                 <ul className="space-y-3 mb-6">
//                   {[
//                     "256-bit AES encryption for all data",
//                     "SOC 2 Type II compliant infrastructure",
//                     "Regular security audits & penetration testing",
//                     "ISO 27001 certified development processes"
//                   ].map((item, index) => (
//                     <li key={index} className="flex items-start gap-3">
//                       <svg className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                       <span className="text-gray-700">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 {/* <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
//                   View Security Report
//                 </button> */}
//                 <button className="bg-gradient-to-r from-[#00AEEF] to-[#00A3E1] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all">
//                   View Security Report
//                 </button>

//               </div>
//               <div className="md:w-1/2">
//                 <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center">
//                   <div className="text-center p-8">
//                     <div className="text-8xl mb-4">🔒</div>
//                     <p className="text-xl text-gray-700 font-medium">Enterprise Security</p>
//                     <p className="text-gray-600 mt-2">Military-grade encryption</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>


//           {/* Features Section */}
//           <section className="bg-white rounded-2xl p-8 shadow-sm mb-16 border border-gray-100">
//             <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
//               Why Enterprises Trust Our Platform
//             </h2>

//             <SecurityFeatures />
//           </section>

//           {/* CTA Section */}
//           {/* <motion.section 
//             className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 text-center shadow-xl"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//           > */}

//           <motion.section
//             className="bg-gradient-to-r from-[#00AEEF] to-[#00A3E1] text-white rounded-2xl p-8 text-center shadow-xl"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//           >

//             <h2 className="text-3xl font-bold mb-4">Ready to Experience Enterprise-Grade Applications?</h2>
//             <p className="text-indigo-100 max-w-2xl mx-auto mb-6 text-lg">
//               Join thousands of businesses using our secure, high-quality platform
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//               <motion.button
//                 className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl shadow-md hover:bg-indigo-50 transition-colors"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Start Free 30-Day Trial
//               </motion.button>
//               <motion.button
//                 className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Schedule Security Demo
//               </motion.button>
//             </div>
//             <p className="mt-6 text-indigo-200">
//               Enterprise-grade security • 99.99% uptime • 24/7 support
//             </p>
//           </motion.section>
//         </div>
//       )}

//       {/* Render any active app in full screen */}
//       {activeApp && (
//         <div className="fixed inset-0 z-50 bg-white overflow-auto">
//           <div className="absolute top-4 right-4 z-50">
//             <button
//               onClick={closeApp}
//               className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
//             >
//               <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//           <activeApp.component appName={activeApp.name} appIcon={activeApp.icon} onClose={closeApp} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default AppsPage;









// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import EntryGate from './EntryGate';
// import { useNavigate } from 'react-router-dom';

// import Planning from './Planning';
// import Document from './Document';

// const apps = [

//  { id: 1, name: "Documents", icon: "📄", component: Document, route: "/documentmanagement" }
// ,

//   { id: 2, name: "Planning", icon: "🗓️", component: Planning, route: "/planning" },

//   { id: 3, name: "Entry Gate", icon: "🚪", component: EntryGate },
// ];

// const AppGrid = ({ apps, handleAppClick }) => {
//   if (apps.length === 0) {
//     return (
//       <div className="text-center py-12 ">
//         <div className="text-5xl mb-4">🔍</div>
//         <h3 className="text-xl font-bold text-gray-700 mb-2">No applications found</h3>
//         <p className="text-gray-600">Try adjusting your search terms</p>
//       </div>
//     );
//   }
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//       {apps.map((app, index) => (
//         <motion.button
//           key={app.id}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: index * 0.05, duration: 0.3 }}
//           whileHover={{
//             y: -5,
//             boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
//           }}
//           whileTap={{ scale: 0.98 }}
//           onClick={() => handleAppClick(app)}
//           className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         >
//           <motion.div
//             whileHover={{ scale: 1.4, rotate: 8 }}
//             whileTap={{ scale: 0.9 }}
//             className="text-4xl mb-3"
//           >
//             {app.icon}
//           </motion.div>
//           <p className="text-sm font-medium text-gray-700 text-center">{app.name}</p>
//         </motion.button>
//       ))}
//     </div>
//   );
// };

// const SecurityFeatures = () => (
//   <div className="grid md:grid-cols-3 gap-8">
//     <motion.div
//       className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors"
//       whileHover={{ y: -5 }}
//     >
//       <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4">
//         <div className="text-2xl">🔐</div>
//       </div>
//       <h3 className="text-xl font-bold text-gray-800 mb-2">Bank-Level Security</h3>
//       <p className="text-gray-600">
//         Enterprise-grade encryption and compliance with global security standards
//       </p>
//     </motion.div>

//     <motion.div
//       className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors"
//       whileHover={{ y: -5 }}
//     >
//       <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
//         <div className="text-2xl">⚡</div>
//       </div>
//       <h3 className="text-xl font-bold text-gray-800 mb-2">High Performance</h3>
//       <p className="text-gray-600">
//         99.99% uptime with lightning-fast response times for all applications
//       </p>
//     </motion.div>

//     <motion.div
//       className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors"
//       whileHover={{ y: -5 }}
//     >
//       <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
//         <div className="text-2xl">🔄</div>
//       </div>
//       <h3 className="text-xl font-bold text-gray-800 mb-2">Seamless Integration</h3>
//       <p className="text-gray-600">
//         All apps work together sharing data in real-time across your organization
//       </p>
//     </motion.div>
//   </div>
// );

// const AppsPage = () => {
//   const [activeApp, setActiveApp] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Handle body overflow when any app is open
//   useEffect(() => {
//     if (activeApp) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }

//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [activeApp]);

//   const handleAppClick = (app) => {
//     setActiveApp(app);
//   };

//   const closeApp = () => {
//     setActiveApp(null);
//   };

//   const filteredApps = apps.filter(app =>
//     app.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-white py-12 px-6 md:px-16 relative overflow-hidden">
//       {/* Floating bubbles background */}
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         {Array.from({ length: 15 }).map((_, i) => (
//           <motion.div
//             key={i}
//             animate={{
//               x: [0, Math.random() * 100 - 50],
//               y: [0, Math.random() * 100 - 50],
//             }}
//             transition={{
//               duration: 20 + Math.random() * 30,
//               repeat: Infinity,
//               repeatType: "reverse",
//             }}
//             className="absolute rounded-full opacity-5"
//             style={{
//               width: `${10 + Math.random() * 100}px`,
//               height: `${10 + Math.random() * 100}px`,
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               background: `hsl(${Math.random() * 360}, 50%, 90%)`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Main content container - Hide when any app is active */}
//       {!activeApp && (
//         <div className="max-w-7xl mx-auto relative z-10 mt-15">
//           {/* Hero Section */}
//           <div className="text-center mb-16">
//             <motion.h1
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
//             >
//               {/* <span className="bg-gradient-to-r from-[#00A3E1] to-[#00AEEF] text-transparent bg-clip-text">
//   Enterprise App Suite
// </span> */}


//               <span className="bg-gradient-to-r from-[#444444] to-[#444444] text-transparent bg-clip-text">
//                 Enterprise App Suite
//               </span>

//             </motion.h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
//               25+ premium business applications with enterprise-grade security
//             </p>

//             {/* Search Bar */}
//             <div className="max-w-2xl mx-auto mb-12">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search applications..."
//                   className="w-full p-4 pl-12 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <svg
//                   className="absolute left-4 top-4 h-5 w-5 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <button
//                   onClick={() => setSearchTerm('')}
//                   className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
//                 >
//                   Clear
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Apps Grid Section */}
//           <section className="mb-16">
//             <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//               <h2 className="text-3xl font-bold text-gray-800">Business Applications</h2>
//               <div className="flex items-center gap-4">
//                 <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg">
//                   {filteredApps.length} applications
//                 </div>

//               </div>
//             </div>

//             <AppGrid apps={filteredApps} handleAppClick={handleAppClick} />
//           </section>

//           {/* High Security Video Section */}
//           <section className="bg-white rounded-2xl p-8 shadow-sm mb-16 border border-gray-100">
//             <div className="flex flex-col md:flex-row gap-8 items-center">
//               <div className="md:w-1/2">
//                 <h2 className="text-3xl font-bold text-gray-800 mb-4">
//                   Enterprise-Grade Security & Quality
//                 </h2>
//                 <p className="text-gray-600 mb-6">
//                   Our applications are built with military-grade encryption and undergo rigorous quality testing to ensure your data is always protected.
//                 </p>
//                 <ul className="space-y-3 mb-6">
//                   {[
//                     "256-bit AES encryption for all data",
//                     "SOC 2 Type II compliant infrastructure",
//                     "Regular security audits & penetration testing",
//                     "ISO 27001 certified development processes"
//                   ].map((item, index) => (
//                     <li key={index} className="flex items-start gap-3">
//                       <svg className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                       <span className="text-gray-700">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 {/* <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
//                   View Security Report
//                 </button> */}
//                 <button className="bg-gradient-to-r from-[#00AEEF] to-[#00A3E1] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all">
//                   View Security Report
//                 </button>

//               </div>
//               <div className="md:w-1/2">
//                 <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center">
//                   <div className="text-center p-8">
//                     <div className="text-8xl mb-4">🔒</div>
//                     <p className="text-xl text-gray-700 font-medium">Enterprise Security</p>
//                     <p className="text-gray-600 mt-2">Military-grade encryption</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>


//           {/* Features Section */}
//           <section className="bg-white rounded-2xl p-8 shadow-sm mb-16 border border-gray-100">
//             <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
//               Why Enterprises Trust Our Platform
//             </h2>

//             <SecurityFeatures />
//           </section>

//           {/* CTA Section */}
//           {/* <motion.section 
//             className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 text-center shadow-xl"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//           > */}

//           <motion.section
//             className="bg-gradient-to-r from-[#00AEEF] to-[#00A3E1] text-white rounded-2xl p-8 text-center shadow-xl"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//           >

//             <h2 className="text-3xl font-bold mb-4">Ready to Experience Enterprise-Grade Applications?</h2>
//             <p className="text-indigo-100 max-w-2xl mx-auto mb-6 text-lg">
//               Join thousands of businesses using our secure, high-quality platform
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//               <motion.button
//                 className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl shadow-md hover:bg-indigo-50 transition-colors"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Start Free 30-Day Trial
//               </motion.button>
//               <motion.button
//                 className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Schedule Security Demo
//               </motion.button>
//             </div>
//             <p className="mt-6 text-indigo-200">
//               Enterprise-grade security • 99.99% uptime • 24/7 support
//             </p>
//           </motion.section>
//         </div>
//       )}

//       {/* Render any active app in full screen */}
//       {activeApp && (
//         <div className="fixed inset-0 z-50 bg-white overflow-auto">
//           <div className="absolute top-4 right-4 z-50">
//             <button
//               onClick={closeApp}
//               className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
//             >
//               <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//           <activeApp.component appName={activeApp.name} appIcon={activeApp.icon} onClose={closeApp} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default AppsPage;









import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EntryGate from './EntryGate';
import { useNavigate } from 'react-router-dom';

const apps = [
  { id: 1, name: "Documents", icon: "📄", route: "/documentmanagement" },
  { id: 2, name: "Planning", icon: "🗓️", route: "/planning" },
  { id: 3, name: "Entry Gate", icon: "🚪", component: EntryGate , route: "/entrygate"  },
];

const AppGrid = ({ apps, handleAppClick }) => {
  if (apps.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">No applications found</h3>
        <p className="text-gray-600">Try adjusting your search terms</p>
      </div>
    );
  }
  return (

    
    // <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
    //   {apps.map((app, index) => (
    //     <motion.button
    //       key={app.id}
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ delay: index * 0.05, duration: 0.3 }}
    //       whileHover={{
    //         y: -5,
    //         boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
    //       }}
    //       whileTap={{ scale: 0.98 }}
    //       onClick={() => handleAppClick(app)}
    //       className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    //     >
    //       <motion.div
    //         whileHover={{ scale: 1.4, rotate: 8 }}
    //         whileTap={{ scale: 0.9 }}
    //         className="text-4xl mb-3"
    //       >
    //         {app.icon}
    //       </motion.div>
    //       <p className="text-sm font-medium text-gray-700 text-center">{app.name}</p>
    //     </motion.button>
    //   ))}
    // </div>
    <div className="flex items-center justify-center">
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center place-items-center">
    {apps.map((app, index) => (
      <motion.button
        key={app.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        whileHover={{
          y: -5,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleAppClick(app)}
        className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <motion.div
          whileHover={{ scale: 1.4, rotate: 8 }}
          whileTap={{ scale: 0.9 }}
          className="text-4xl mb-3"
        >
          {app.icon}
        </motion.div>
        <p className="text-sm font-medium text-gray-700 text-center">{app.name}</p>
      </motion.button>
    ))}
  </div>
</div>

  );
};

const SecurityFeatures = () => (
  <div className="grid md:grid-cols-3 gap-8">
    <motion.div
      className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors"
      whileHover={{ y: -5 }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4">
        <div className="text-2xl">🔐</div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Bank-Level Security</h3>
      <p className="text-gray-600">
        Enterprise-grade encryption and compliance with global security standards
      </p>
    </motion.div>

    <motion.div
      className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors"
      whileHover={{ y: -5 }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
        <div className="text-2xl">⚡</div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">High Performance</h3>
      <p className="text-gray-600">
        99.99% uptime with lightning-fast response times for all applications
      </p>
    </motion.div>

    <motion.div
      className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors"
      whileHover={{ y: -5 }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
        <div className="text-2xl">🔄</div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Seamless Integration</h3>
      <p className="text-gray-600">
        All apps work together sharing data in real-time across your organization
      </p>
    </motion.div>
  </div>
);

const AppsPage = () => {
  const [activeApp, setActiveApp] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (activeApp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeApp]);

  const handleAppClick = (app) => {
    if (app.route) {
      navigate(app.route);
    } else {
      setActiveApp(app);
    }
  };

  const closeApp = () => {
    setActiveApp(null);
  };

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white py-12 px-6 md:px-16 relative overflow-hidden">
      {/* Floating bubbles background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 20 + Math.random() * 30,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute rounded-full opacity-5"
            style={{
              width: `${10 + Math.random() * 100}px`,
              height: `${10 + Math.random() * 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `hsl(${Math.random() * 360}, 50%, 90%)`,
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      {!activeApp && (
        <div className="max-w-7xl mx-auto relative z-10 mt-15">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            >
              <span className="bg-gradient-to-r from-[#444444] to-[#444444] text-transparent bg-clip-text">
                Enterprise App Suite
              </span>
            </motion.h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              25+ premium business applications with enterprise-grade security
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search applications..."
                  className="w-full p-4 pl-12 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute left-4 top-4 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Apps Grid Section */}
          <section className="mb-16">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <h2 className="text-3xl font-bold text-gray-800">Business Applications</h2>
              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-lg">
                  {filteredApps.length} applications
                </div>
              </div>
            </div>

            <AppGrid apps={filteredApps} handleAppClick={handleAppClick} />
          </section>

          {/* Security Section */}
          <section className="bg-white rounded-2xl p-8 shadow-sm mb-16 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Enterprise-Grade Security & Quality
                </h2>
                <p className="text-gray-600 mb-6">
                  Our applications are built with military-grade encryption and undergo rigorous quality testing to ensure your data is always protected.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "256-bit AES encryption for all data",
                    "SOC 2 Type II compliant infrastructure",
                    "Regular security audits & penetration testing",
                    "ISO 27001 certified development processes"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <button className="bg-gradient-to-r from-[#00AEEF] to-[#00A3E1] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all">
                  View Security Report
                </button>
              </div>
              <div className="md:w-1/2">
                <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-8xl mb-4">🔒</div>
                    <p className="text-xl text-gray-700 font-medium">Enterprise Security</p>
                    <p className="text-gray-600 mt-2">Military-grade encryption</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-white rounded-2xl p-8 shadow-sm mb-16 border border-gray-100">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Why Enterprises Trust Our Platform
            </h2>
            <SecurityFeatures />
          </section>

          {/* CTA Section */}
          <motion.section
            className="bg-gradient-to-r from-[#00AEEF] to-[#00A3E1] text-white rounded-2xl p-8 text-center shadow-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Enterprise-Grade Applications?</h2>
            <p className="text-indigo-100 max-w-2xl mx-auto mb-6 text-lg">
              Join thousands of businesses using our secure, high-quality platform
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl shadow-md hover:bg-indigo-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free 30-Day Trial
              </motion.button>
              <motion.button
                className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Security Demo
              </motion.button>
            </div>
            <p className="mt-6 text-indigo-200">
              Enterprise-grade security • 99.99% uptime • 24/7 support
            </p>
          </motion.section>
        </div>
      )}

      {/* Render active inline app */}
      {activeApp && activeApp.component && (
        <div className="fixed inset-0 z-50 bg-white overflow-auto">
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={closeApp}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <activeApp.component appName={activeApp.name} appIcon={activeApp.icon} onClose={closeApp} />
        </div>
      )}
    </div>
  );
};

export default AppsPage;
