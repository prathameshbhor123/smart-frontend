
// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardActions,
//   TextField,
//   InputAdornment,
//   IconButton,
//   Button,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import { Visibility, VisibilityOff, Mail, Lock } from '@mui/icons-material';
// import axios from 'axios';
// import FaceLogin from '../FaceRecognition/FaceLogin'; // Adjust the import path as necessary

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [isError, setIsError] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showFaceLogin, setShowFaceLogin] = useState(false);
//   const [loggedUser, setLoggedUser] = useState(null);

//   const navigate = useNavigate();
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     const token = localStorage.getItem('token');

//     if (user && token) {
//       if (user.role === 'ADMIN') {
//         navigate('/admindashboard', { replace: true });
//       } else if (user.role === 'EMPLOYEE') {
//         navigate('/employeedashboard', { replace: true });
//       }
//     }
//   }, []);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       email: '',
//       password: ''
//     }
//   });

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   const loginUser = async (credentials) => {
//     try {
//       setIsLoading(true);
//       const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
//       return response.data;
//     } catch (error) {
//       if (error.response) {
//         throw new Error(error.response.data.message || 'Login failed');
//       } else if (error.request) {
//         throw new Error('No response from server');
//       } else {
//         throw new Error('Error setting up request');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await loginUser(data);

//       if (response.userId) {
//         const userObj = {
//           id: response.userId,
//           role: response.userRole,
//           jwt: response.jwt,
//           email: data.email
//         };

//         if (response.userRole === 'ADMIN') {
//           localStorage.setItem('user', JSON.stringify({ id: userObj.id, role: userObj.role }));
//           localStorage.setItem('token', userObj.jwt);
//           navigate('/admindashboard');
//         } else if (response.userRole === 'EMPLOYEE') {
//           setLoggedUser(userObj);
//           setShowFaceLogin(true);
//         }
//       } else {
//         setIsError(true);
//         setSnackbarMessage('Invalid Credentials');
//         setOpenSnackbar(true);
//       }
//     } catch (error) {
//       setIsError(true);
//       setSnackbarMessage(error.message || 'Login Failed');
//       setOpenSnackbar(true);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-blue-100">
//       <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full mt-10 md:mt-20">
//         {/* Left side - Login form */}
//         <div className="w-full md:w-1/2 p-10">
//           <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
//           <p className="text-gray-600 mb-6">Login to access your dashboard</p>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <TextField
//               placeholder='Email'
//               size="small"
//               variant="outlined"
//               fullWidth
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Mail fontSize="small" color="action" />
//                   </InputAdornment>
//                 ),
//                 sx: {
//                   borderRadius: '12px',
//                   height: '40px',
//                 }
//               }}
//               {...register('email', {
//                 required: 'Email is required',
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                   message: 'Invalid email address'
//                 }
//               })}
//               error={!!errors.email}
//               helperText={errors.email?.message}
//             />

//             <TextField
//               placeholder='Password'
//               size="small"
//               variant="outlined"
//               fullWidth
//               type={showPassword ? 'text' : 'password'}
//               InputProps={{
//                 sx: {
//                   borderRadius: '12px',
//                   height: '40px',
//                   marginTop: '8px'
//                 },
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Lock fontSize="small" color="action" />
//                   </InputAdornment>
//                 ),
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={togglePasswordVisibility} edge="end">
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 )
//               }}
//               {...register('password', {
//                 required: 'Password is required'
//               })}
//               error={!!errors.password}
//               helperText={errors.password?.message}
//             />

//             <div className="flex items-center justify-between text-sm mt-2">
//               <label className="flex items-center">
//                 <input type="checkbox" className="mr-2" /> Remember me
//               </label>
//               <button
//                 type="button"
//                 className="hover:underline"
//                 style={{ color: '#00A3E1' }}
//               >
//                 Forgot password?
//               </button>
//             </div>

//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               sx={{
//                 backgroundColor: '#00A3E1',
//                 '&:hover': { backgroundColor: '#0081B4' }
//               }}
//               disabled={isLoading}
//             >
//               {isLoading ? 'Logging in...' : 'Verify with Face'}
//             </Button>

//             <div className="text-center text-gray-400">or continue with</div>

//             <button
//               type="button"
//               className="w-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center py-2 rounded-md"
//             >
//               <span className="mr-2 text-xl" style={{ color: '#00A3E1' }}>G</span>
//               Continue with Google
//             </button>
//           </form>

//           <CardActions>
//             <Button
//               fullWidth
//               onClick={() => navigate('/contactus')}
//               disabled={isLoading}
//               sx={{
//                 fontSize: 'small',
//                 color: '#00A3E1',
//                 '&:hover': {
//                   backgroundColor: 'transparent',
//                   color: '#0081B4',
//                   textDecoration: 'underline'
//                 }
//               }}
//             >
//               Don't have an account? Contact Admin
//             </Button>
//           </CardActions>
//         </div>

//         {/* Right side - Branding */}
//         <div
//           className="md:flex w-full md:w-1/2 text-white items-center justify-center p-10 bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400"
//         // style={{ 
//         //   background: 'linear-gradient(135deg, #0066A6 0%, #00A3E1 50%, #00BFFF 100%)'
//         // }}
//         >
//           {showFaceLogin && loggedUser?.role === 'EMPLOYEE' ? (
//             <FaceLogin
//               user={loggedUser}
//               loggedUser={loggedUser}
//               onSuccess={() => {
//                 localStorage.setItem('user', JSON.stringify({ id: loggedUser.id, role: loggedUser.role }));
//                 localStorage.setItem('token', loggedUser.jwt);
//                 navigate('/employeedashboard');
//               }}
//               onFailure={() => {
//                 setIsError(true);
//                 setSnackbarMessage('Face not recognized');
//                 setOpenSnackbar(true);
//                 setShowFaceLogin(false);
//               }}
//             />
//           ) : (
//             <div className="text-center">
//               <h2 className="text-4xl font-bold mb-2">OddTech</h2>
//               <h3 className="text-3xl font-semibold mb-4">Solutions</h3>
//               <p className="text-lg font-semibold mb-2">Build. Track. Achieve.</p>
//               <p className="text-sm">Empowering your work with speed and clarity.</p>
//             </div>
//           )}
//         </div>
//       </div>

//       <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
//         <Alert onClose={handleCloseSnackbar} severity={isError ? 'error' : 'success'} sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default Login;






import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff, Mail, Lock } from '@mui/icons-material';
import axios from 'axios';
import FaceLogin from '../FaceRecognition/FaceLogin';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFaceLogin, setShowFaceLogin] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const threeContainerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);
  const controlsRef = useRef(null);

  const navigate = useNavigate();
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (user && token) {
      if (user.role === 'ADMIN') {
        navigate('/admindashboard', { replace: true });
      } else if (user.role === 'EMPLOYEE') {
        navigate('/employeedashboard', { replace: true });
      }
    }
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (leftPanelRef.current && rightPanelRef.current) {
      // Initial hidden state
      gsap.set(leftPanelRef.current.children, { opacity: 0, y: 20 });
      gsap.set(rightPanelRef.current, { opacity: 0, scale: 0.95 });
      
      // Staggered animation for form elements
      gsap.to(leftPanelRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3,
        ease: "power3.out"
      });
      
      // Animation for right panel
      gsap.to(rightPanelRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "elastic.out(1, 0.8)"
      });
    }
  }, []);

  // Three.js Animation
  useEffect(() => {
    if (threeContainerRef.current && !showFaceLogin) {
      // Initialize scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      
      // Initialize camera
      const camera = new THREE.PerspectiveCamera(
        75, 
        threeContainerRef.current.clientWidth / threeContainerRef.current.clientHeight, 
        0.1, 
        1000
      );
      camera.position.z = 30;
      cameraRef.current = camera;
      
      // Initialize renderer
      const renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true 
      });
      renderer.setSize(
        threeContainerRef.current.clientWidth, 
        threeContainerRef.current.clientHeight
      );
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      threeContainerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
      
      // Add orbit controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controlsRef.current = controls;
      
      // Add lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(10, 20, 15);
      scene.add(directionalLight);
      
      // Create particle system
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 2000;
      
      const posArray = new Float32Array(particlesCount * 3);
      const colorArray = new Float32Array(particlesCount * 3);
      
      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
        colorArray[i] = Math.random();
      }
      
      particlesGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(posArray, 3)
      );
      
      particlesGeometry.setAttribute(
        'color',
        new THREE.BufferAttribute(colorArray, 3)
      );
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
      });
      
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
      particlesRef.current = particles;
      
      // Add floating cubes
      const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
      const cubeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.15,
        wireframe: true
      });
      
      const cubes = [];
      for (let i = 0; i < 8; i++) {
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 40
        );
        cube.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        scene.add(cube);
        cubes.push(cube);
      }
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        // Rotate particles
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;
        
        // Rotate cubes
        cubes.forEach(cube => {
          cube.rotation.x += 0.005;
          cube.rotation.y += 0.003;
        });
        
        controls.update();
        renderer.render(scene, camera);
      };
      
      animate();
      
      // Handle resize
      const handleResize = () => {
        camera.aspect = threeContainerRef.current.clientWidth / threeContainerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          threeContainerRef.current.clientWidth, 
          threeContainerRef.current.clientHeight
        );
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        if (renderer) {
          renderer.dispose();
        }
        if (threeContainerRef.current) {
          threeContainerRef.current.removeChild(renderer.domElement);
        }
      };
    }
  }, [showFaceLogin]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const loginUser = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Login failed');
      } else if (error.request) {
        throw new Error('No response from server');
      } else {
        throw new Error('Error setting up request');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      if (response.userId) {
        const userObj = {
          id: response.userId,
          role: response.userRole,
          jwt: response.jwt,
          email: data.email
        };

        if (response.userRole === 'ADMIN') {
          localStorage.setItem('user', JSON.stringify({ id: userObj.id, role: userObj.role }));
          localStorage.setItem('token', userObj.jwt);
          
          // Animate before navigation
          gsap.to(".min-h-screen", {
            opacity: 0,
            duration: 0.5,
            onComplete: () => navigate('/admindashboard')
          });
        } else if (response.userRole === 'EMPLOYEE') {
          setLoggedUser(userObj);
          
          // Animate transition to face login
          gsap.to(rightPanelRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.4,
            onComplete: () => {
              setShowFaceLogin(true);
              gsap.fromTo(rightPanelRef.current, 
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.6 }
              );
            }
          });
        }
      } else {
        setIsError(true);
        setSnackbarMessage('Invalid Credentials');
        setOpenSnackbar(true);
        
        // Shake animation for error
        gsap.fromTo(leftPanelRef.current, 
          { x: 0 },
          { 
            x: 10, 
            duration: 0.08, 
            repeat: 5, 
            yoyo: true, 
            ease: "power1.inOut" 
          }
        );
      }
    } catch (error) {
      setIsError(true);
      setSnackbarMessage(error.message || 'Login Failed');
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-blue-100 overflow-hidden">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full mt-10 md:mt-20">
        {/* Left side - Login form */}
        <div className="w-full md:w-1/2 p-10" ref={leftPanelRef}>
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-600 mb-6">Login to access your dashboard</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField
              placeholder='Email'
              size="small"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail fontSize="small" color="action" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '12px',
                  height: '40px',
                }
              }}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              placeholder='Password'
              size="small"
              variant="outlined"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                sx: {
                  borderRadius: '12px',
                  height: '40px',
                  marginTop: '8px'
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock fontSize="small" color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={togglePasswordVisibility} 
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              {...register('password', {
                required: 'Password is required'
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <div className="flex items-center justify-between text-sm mt-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <button
                type="button"
                className="hover:underline"
                style={{ color: '#00A3E1' }}
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#00A3E1',
                '&:hover': { backgroundColor: '#0081B4' },
                transition: 'all 0.3s ease'
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Verify with Face'}
            </Button>

            <div className="text-center text-gray-400">or continue with</div>

            <button
              type="button"
              className="w-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center py-2 rounded-md transition-all duration-300"
              onMouseEnter={(e) => gsap.to(e.target, { scale: 1.02, duration: 0.3 })}
              onMouseLeave={(e) => gsap.to(e.target, { scale: 1, duration: 0.3 })}
            >
              <span className="mr-2 text-xl" style={{ color: '#00A3E1' }}>G</span>
              Continue with Google
            </button>
          </form>

          <CardActions>
            <Button
              fullWidth
              onClick={() => {
                gsap.to(".min-h-screen", {
                  opacity: 0,
                  duration: 0.5,
                  onComplete: () => navigate('/contactus')
                });
              }}
              disabled={isLoading}
              sx={{
                fontSize: 'small',
                color: '#00A3E1',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#0081B4',
                  textDecoration: 'underline'
                }
              }}
            >
              Don't have an account? Contact Admin
            </Button>
          </CardActions>
        </div>

        {/* Right side - Branding */}
        <div
          className="md:flex w-full md:w-1/2 text-white items-center justify-center p-10 relative bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400"
          ref={rightPanelRef}
        >
          <div 
            ref={threeContainerRef}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 0 }}
          />
          
          <div className="relative z-10">
            {showFaceLogin && loggedUser?.role === 'EMPLOYEE' ? (
              <FaceLogin
                user={loggedUser}
                loggedUser={loggedUser}
                onSuccess={() => {
                  localStorage.setItem('user', JSON.stringify({ id: loggedUser.id, role: loggedUser.role }));
                  localStorage.setItem('token', loggedUser.jwt);
                  
                  // Animate before navigation
                  gsap.to(".min-h-screen", {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => navigate('/employeedashboard')
                  });
                }}
                onFailure={() => {
                  setIsError(true);
                  setSnackbarMessage('Face not recognized');
                  setOpenSnackbar(true);
                  
                  // Animate back to login form
                  gsap.to(rightPanelRef.current, {
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.4,
                    onComplete: () => {
                      setShowFaceLogin(false);
                      gsap.fromTo(rightPanelRef.current, 
                        { opacity: 0, scale: 0.9 },
                        { opacity: 1, scale: 1, duration: 0.6 }
                      );
                    }
                  });
                }}
              />
            ) : (
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-2">OddTech</h2>
                <h3 className="text-3xl font-semibold mb-4">Solutions</h3>
                <p className="text-lg font-semibold mb-2">Build. Track. Achieve.</p>
                <p className="text-sm">Empowering your work with speed and clarity.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={5000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={isError ? 'error' : 'success'} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;




