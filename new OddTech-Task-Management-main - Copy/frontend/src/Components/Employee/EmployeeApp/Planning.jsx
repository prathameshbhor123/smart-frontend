
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// Mock taskService implementation
const API_URL = "http://localhost:8080/api/tasks";

const taskService = {
  getTasks: async () => {
    const response = await fetch(API_URL);
    return response.json();
  },
  
  createTask: async (task) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    });
    return response.json();
  },
  
  updateTask: async (id, updatedTask) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask)
    });
    return response.json();
  },
  
  deleteTask: async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return true;
  }
};

ChartJS.register(ArcElement, Tooltip, Legend);

const PlanningApp = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    date: '',
    search: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    highPriority: 0
  });

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    updateStats();
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (error) {
      showToast('Error', 'Failed to load tasks', 'error');
    }
  };

  const updateStats = () => {
    setStats({
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'completed').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      highPriority: tasks.filter(t => t.priority === 'high').length
    });
  };

  const showToast = (title, message, type = 'success') => {
    Swal.fire({
      title,
      text: message,
      icon: type,
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: type === 'error' ? '#fee2e2' : '#d1fae5',
      iconColor: type === 'error' ? '#ef4444' : '#10b981',
      color: '#1f2937'
    });
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filters.status === 'all' || task.status === filters.status;
    const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
    const matchesDate = !filters.date || task.dueDate === filters.date;
    const matchesSearch = !filters.search || 
      task.title.toLowerCase().includes(filters.search.toLowerCase()) || 
      (task.description && task.description.toLowerCase().includes(filters.search.toLowerCase()));
    
    return matchesStatus && matchesPriority && matchesDate && matchesSearch;
  });

  const chartData = {
    labels: ['To Do', 'In Progress', 'Completed'],
    datasets: [{
      data: [
        tasks.filter(t => t.status === 'todo').length,
        tasks.filter(t => t.status === 'in-progress').length,
        tasks.filter(t => t.status === 'completed').length
      ],
      backgroundColor: ['#ff9e00', '#4361ee', '#4cc9f0'],
      borderWidth: 0
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
        text: 'Task Status Distribution',
        padding: { top: 10, bottom: 20 }
      }
    },
    cutout: '60%'
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const taskData = Object.fromEntries(formData.entries());
    
    try {
      if (currentTask) {
        await taskService.updateTask(currentTask.id, taskData);
        showToast('Success', 'Task updated successfully');
      } else {
        await taskService.createTask(taskData);
        showToast('Success', 'Task added successfully');
      }
      await loadTasks();
      closeModal();
    } catch (error) {
      showToast('Error', 'Failed to save task', 'error');
    }
  };

  const editTask = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const deleteTask = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      background: '#fff',
      color: '#1f2937',
      customClass: {
        confirmButton: 'px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg',
        cancelButton: 'px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg mr-2'
      }
    });

    if (result.isConfirmed) {
      try {
        await taskService.deleteTask(id);
        await loadTasks();
        showToast('Deleted!', 'Task has been deleted.', 'success');
      } catch (error) {
        showToast('Error', 'Failed to delete task', 'error');
      }
    }
  };

  const completeTask = async (task) => {
    try {
      await taskService.updateTask(task.id, { ...task, status: 'completed' });
      await loadTasks();
      showToast('Completed!', 'Task marked as completed', 'success');
    } catch (error) {
      showToast('Error', 'Failed to complete task', 'error');
    }
  };

  const openAddModal = () => {
    setCurrentTask(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      status: 'all',
      priority: 'all',
      date: '',
      search: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        searchValue={filters.search}
        onSearchChange={(e) => handleFilterChange({
          target: { name: 'search', value: e.target.value }
        })}
        onBack={() => navigate('/admindashboard')}
      />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Sidebar
            filters={filters}
            stats={stats}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
          />
          
          <MainContent
            tasks={filteredTasks}
            chartData={chartData}
            chartOptions={chartOptions}
            onAddTask={openAddModal}
            onEditTask={editTask}
            onDeleteTask={deleteTask}
            onCompleteTask={completeTask}
          />
        </div>
      </div>
      
      <TaskModal
        isOpen={isModalOpen}
        task={currentTask}
        onClose={closeModal}
        onSubmit={handleSubmitTask}
      />
    </div>
  );
};

const Header = ({ searchValue, onSearchChange, onBack }) => (
  <header className="bg-white shadow-sm">
    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
      {/* <button 
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 transition"
      >
        <i className="fas fa-arrow-left mr-2"></i> Go Back
      </button>
       */}
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={searchValue}
            onChange={onSearchChange}
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>
      
      <div className="text-xl font-bold text-blue-600">
        Task Planner
      </div>
    </div>
  </header>
);

const Sidebar = ({ filters, stats, onFilterChange, onResetFilters }) => (
  <div className="lg:col-span-1 space-y-6 mt-15">
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-blue-600 mb-4">Filters</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            id="statusFilter"
            name="status"
            value={filters.status}
            onChange={onFilterChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="priorityFilter" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            id="priorityFilter"
            name="priority"
            value={filters.priority}
            onChange={onFilterChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            id="dateFilter"
            name="date"
            value={filters.date}
            onChange={onFilterChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <button 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
            onClick={onResetFilters}
          >
            <i className="fas fa-redo"></i> Reset Filters
          </button>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-blue-600 mb-4">Statistics</h2>
      <div className="space-y-3">
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-gray-600">Total Tasks:</span>
          <span className="font-semibold text-blue-600">{stats.total}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-gray-600">Completed:</span>
          <span className="font-semibold text-blue-600">{stats.completed}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-100">
          <span className="text-gray-600">In Progress:</span>
          <span className="font-semibold text-blue-600">{stats.inProgress}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-600">High Priority:</span>
          <span className="font-semibold text-blue-600">{stats.highPriority}</span>
        </div>
      </div>
    </div>
  </div>
);

const MainContent = ({ tasks, chartData, chartOptions, onAddTask, onEditTask, onDeleteTask, onCompleteTask }) => (
  <div className="lg:col-span-3 space-y-6 mt-15">
    <div className="bg-white rounded-xl shadow">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-blue-600">Tasks</h2>
        {/* <button 
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition"
          onClick={onAddTask}
        >
          <i className="fas fa-plus"></i> Add New Task
        </button> */}
        <button 
  className="bg-[#00A3E1] hover:bg-[#00AEEF] text-white py-2 px-4 rounded-lg flex items-center gap-2 transition"
  onClick={onAddTask}
>
  <i className="fas fa-plus"></i> Add New Task
</button>

      </div>
      
      <TasksList
        tasks={tasks}
        onEdit={onEditTask}
        onDelete={onDeleteTask}
        onComplete={onCompleteTask}
      />
    </div>

    <div className="bg-white rounded-xl shadow">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-blue-600">Progress Overview</h2>
      </div>
      <div className="p-5 h-80">
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  </div>
);

const TasksList = ({ tasks, onEdit, onDelete, onComplete }) => {
  if (tasks.length === 0) {
    return (
      <div className="p-10 text-center">
        <i className="fas fa-tasks text-5xl text-gray-300 mb-4"></i>
        <h3 className="text-xl font-medium text-gray-700">No tasks yet</h3>
        <p className="text-gray-500">Add your first task to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
};

const TaskCard = ({ task, onEdit, onDelete, onComplete }) => {
  const statusText = {
    'todo': 'To Do',
    'in-progress': 'In Progress',
    'completed': 'Completed'
  }[task.status];
  
  const statusColor = {
    'todo': '#ff9e00',
    'in-progress': '#4361ee',
    'completed': '#4cc9f0'
  }[task.status];
  
  const formattedDate = task.dueDate 
    ? new Date(task.dueDate).toLocaleDateString() 
    : 'No due date';
  
  const formattedCreated = new Date(task.createdAt).toLocaleDateString();

  return (
    <div className={`bg-white rounded-xl border-l-4 p-4 shadow transition-all hover:shadow-lg hover:-translate-y-1 ${
      task.priority === 'high' ? 'border-red-500' : 
      task.priority === 'medium' ? 'border-yellow-500' : 
      'border-green-500'
    }`}>
      <div className="text-xs text-gray-400 text-right absolute top-2 right-3">ID: {task.id}</div>
      
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-800 text-lg">{task.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          task.priority === 'high' ? 'bg-red-100 text-red-800' : 
          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-green-100 text-green-800'
        }`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{task.description || 'No description provided'}</p>
      
      <div className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded mb-3">
        Created: {formattedCreated}
      </div>
      
      <div className="flex justify-between text-sm text-gray-500 border-t border-gray-100 pt-3 mt-3">
        <span className="flex items-center gap-1">
          <i className="fas fa-calendar-alt"></i> {formattedDate}
        </span>
        <span className="flex items-center gap-1">
          <i className="fas fa-circle" style={{ color: statusColor }}></i> {statusText}
        </span>
      </div>
      
      <div className="flex gap-2 mt-4">
        <button 
          className="flex-1 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-sm flex items-center justify-center gap-1"
          onClick={() => onEdit(task)}
        >
          <i className="fas fa-edit"></i> Edit
        </button>
        
        <button 
          className="flex-1 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded text-sm flex items-center justify-center gap-1"
          onClick={() => onDelete(task.id)}
        >
          <i className="fas fa-trash"></i> Delete
        </button>
        
        {task.status !== 'completed' && (
          <button 
            className="flex-1 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-sm flex items-center justify-center gap-1"
            onClick={() => onComplete(task)}
          >
            <i className="fas fa-check"></i> Complete
          </button>
        )}
      </div>
    </div>
  );
};

const TaskModal = ({ isOpen, task, onClose, onSubmit }) => (
  <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity ${
    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
  }`}>
    <div className="bg-white rounded-xl w-full max-w-md transform transition-transform duration-300 ease-in-out">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-lg text-blue-600">{task ? 'Edit Task' : 'Add New Task'}</h3>
        <button 
          className="text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
      
      <form onSubmit={onSubmit}>
        <div className="p-5 space-y-4">
          {task && <input type="hidden" name="id" defaultValue={task.id} />}
          
          <div>
            <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              id="taskTitle"
              name="title"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              defaultValue={task?.title || ''}
              required
            />
          </div>
          
          <div>
            <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="taskDescription"
              name="description"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              defaultValue={task?.description || ''}
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="taskPriority" className="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
            <select
              id="taskPriority"
              name="priority"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              defaultValue={task?.priority || 'medium'}
              required
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="taskStatus" className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
            <select
              id="taskStatus"
              name="status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              defaultValue={task?.status || 'todo'}
              required
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="taskDueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              id="taskDueDate"
              name="dueDate"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              defaultValue={task?.dueDate || ''}
            />
          </div>
        </div>
        
        <div className="p-5 border-t border-gray-200 flex justify-end gap-3">
          <button 
            type="button" 
            className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition"
            onClick={onClose}
          >
            Cancel
          </button>
          {/* <button 
            type="submit" 
            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Save Task
          </button> */}
          <button 
  type="submit" 
  className="py-2 px-4 bg-[#00A3E1] hover:bg-[#00AEEF] text-white rounded-lg transition"
>
  Save Task
</button>

        </div>
      </form>
    </div>
  </div>
);

export default PlanningApp;



// import React, { useState, useEffect, useRef } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import Swal from 'sweetalert2';
// import Navbar from '../NavBar/Navbar';

// // Mock taskService for demonstration; replace with real API calls as needed


// // Replace taskService implementation with:
// const API_URL = "http://localhost:8080/api/tasks";

// const taskService = {
//   getTasks: async () => {
//     const response = await fetch(API_URL);
//     return response.json();
//   },
  
//   createTask: async (task) => {
//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(task)
//     });
//     return response.json();
//   },
  
//   updateTask: async (id, updatedTask) => {
//     const response = await fetch(`${API_URL}/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedTask)
//     });
//     return response.json();
//   },
  
//   deleteTask: async (id) => {
//     await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//     return true;
//   }
// };


// // const taskService = {
// //   getTasks: async () => {
// //     const stored = localStorage.getItem('tasks');
// //     return stored ? JSON.parse(stored) : [];
// //   },
// //   createTask: async (task) => {
// //     const stored = localStorage.getItem('tasks');
// //     const tasks = stored ? JSON.parse(stored) : [];
// //     const newTask = {
// //       ...task,
// //       id: Date.now(),
// //       createdAt: new Date().toISOString().split('T')[0]
// //     };
// //     tasks.unshift(newTask);
// //     localStorage.setItem('tasks', JSON.stringify(tasks));
// //     return newTask;
// //   },
// //   updateTask: async (id, updatedTask) => {
// //     const stored = localStorage.getItem('tasks');
// //     let tasks = stored ? JSON.parse(stored) : [];
// //     tasks = tasks.map(t => t.id === Number(id) ? { ...t, ...updatedTask, id: Number(id) } : t);
// //     localStorage.setItem('tasks', JSON.stringify(tasks));
// //     return tasks.find(t => t.id === Number(id));
// //   },
// //   deleteTask: async (id) => {
// //     const stored = localStorage.getItem('tasks');
// //     let tasks = stored ? JSON.parse(stored) : [];
// //     tasks = tasks.filter(t => t.id !== Number(id));
// //     localStorage.setItem('tasks', JSON.stringify(tasks));
// //     return true;
// //   }
// // };

// const applyFilters = () => {
//   // No-op: filters are applied automatically through filteredTasks
// };

// ChartJS.register(ArcElement, Tooltip, Legend);

// const PlanningApp = () => {
//   // State management
//   const [tasks, setTasks] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentTask, setCurrentTask] = useState(null);
//   const [filters, setFilters] = useState({
//     status: 'all',
//     priority: 'all',
//     date: '',
//     search: ''
//   });
//   const [stats, setStats] = useState({
//     total: 0,
//     completed: 0,
//     inProgress: 0,
//     highPriority: 0
//   });

//   // Load tasks from backend on mount
//   useEffect(() => {
//     loadTasks();
//   }, []);

//   // Update stats when tasks change
//   useEffect(() => {
//     updateStats();
//   }, [tasks]);

//   // Load tasks from backend
//   const loadTasks = async () => {
//     try {
//       const data = await taskService.getTasks();
//       setTasks(data);
//     } catch (error) {
//       showToast('Error', 'Failed to load tasks', 'error');
//     }
//   };

//   // Update statistics
//   const updateStats = () => {
//     setStats({
//       total: tasks.length,
//       completed: tasks.filter(t => t.status === 'completed').length,
//       inProgress: tasks.filter(t => t.status === 'in-progress').length,
//       highPriority: tasks.filter(t => t.priority === 'high').length
//     });
//   };

//   // Show toast notification using SweetAlert
//   const showToast = (title, message, type = 'success') => {
//     Swal.fire({
//       title,
//       text: message,
//       icon: type,
//       toast: true,
//       position: 'bottom-end',
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//       background: type === 'error' ? '#fee2e2' : '#d1fae5',
//       iconColor: type === 'error' ? '#ef4444' : '#10b981',
//       color: '#1f2937'
//     });
//   };

//   // Filter tasks based on current filters
//   const filteredTasks = tasks.filter(task => {
//     const matchesStatus = filters.status === 'all' || task.status === filters.status;
//     const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
//     const matchesDate = !filters.date || task.dueDate === filters.date;
//     const matchesSearch = !filters.search || 
//       task.title.toLowerCase().includes(filters.search.toLowerCase()) || 
//       (task.description && task.description.toLowerCase().includes(filters.search.toLowerCase()));
    
//     return matchesStatus && matchesPriority && matchesDate && matchesSearch;
//   });

//   // Chart data
//   const chartData = {
//     labels: ['To Do', 'In Progress', 'Completed'],
//     datasets: [{
//       data: [
//         tasks.filter(t => t.status === 'todo').length,
//         tasks.filter(t => t.status === 'in-progress').length,
//         tasks.filter(t => t.status === 'completed').length
//       ],
//       backgroundColor: ['#ff9e00', '#4361ee', '#4cc9f0'],
//       borderWidth: 0
//     }]
//   };

//   // Chart options
//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'bottom',
//         labels: {
//           padding: 20,
//           usePointStyle: true,
//           pointStyle: 'circle'
//         }
//       },
//       title: {
//         display: true,
//         text: 'Task Status Distribution',
//         padding: { top: 10, bottom: 20 }
//       }
//     },
//     cutout: '60%'
//   };

//   // Form handler - now using backend
//   const handleSubmitTask = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const taskData = Object.fromEntries(formData.entries());
    
//     try {
//       if (currentTask) {
//         await taskService.updateTask(currentTask.id, taskData);
//         showToast('Success', 'Task updated successfully');
//       } else {
//         await taskService.createTask(taskData);
//         showToast('Success', 'Task added successfully');
//       }
//       await loadTasks();
//       closeModal();
//     } catch (error) {
//       showToast('Error', 'Failed to save task', 'error');
//     }
//   };

//   // Task actions - now using backend
//   const editTask = (task) => {
//     setCurrentTask(task);
//     setIsModalOpen(true);
//   };

//   const deleteTask = async (id) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!',
//       background: '#fff',
//       color: '#1f2937',
//       customClass: {
//         confirmButton: 'px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg',
//         cancelButton: 'px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg mr-2'
//       }
//     });

//     if (result.isConfirmed) {
//       try {
//         await taskService.deleteTask(id);
//         await loadTasks();
//         showToast('Deleted!', 'Task has been deleted.', 'success');
//       } catch (error) {
//         showToast('Error', 'Failed to delete task', 'error');
//       }
//     }
//   };

//   const completeTask = async (task) => {
//     try {
//       await taskService.updateTask(task.id, { ...task, status: 'completed' });
//       await loadTasks();
//       showToast('Completed!', 'Task marked as completed', 'success');
//     } catch (error) {
//       showToast('Error', 'Failed to complete task', 'error');
//     }
//   };

//   // Modal handlers
//   const openAddModal = () => {
//     setCurrentTask(null);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentTask(null);
//   };

//   // Filter handlers
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const resetFilters = () => {
//     setFilters({
//       status: 'all',
//       priority: 'all',
//       date: '',
//       search: ''
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Header 
//         searchValue={filters.search}
//         onSearchChange={(e) => handleFilterChange({
//           target: { name: 'search', value: e.target.value }
//         })}
//       />
      
//       <div className="container mx-auto px-4 py-6">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           <Sidebar
//             filters={filters}
//             stats={stats}
//             onFilterChange={handleFilterChange}
//             onApplyFilters={applyFilters}
//             onResetFilters={resetFilters}
//           />
          
//           <MainContent
//             tasks={filteredTasks}
//             chartData={chartData}
//             chartOptions={chartOptions}
//             onAddTask={openAddModal}
//             onEditTask={editTask}
//             onDeleteTask={deleteTask}
//             onCompleteTask={completeTask}
//           />
//         </div>
//       </div>
      
//       <TaskModal
//         isOpen={isModalOpen}
//         task={currentTask}
//         onClose={closeModal}
//         onSubmit={handleSubmitTask}
//       />
//     </div>
//   );
// };

// // Sub-components
// const Header = ({ searchValue, onSearchChange }) => (
// <header>
//   <Navbar />

// </header>
// );



// const Sidebar = ({ filters, stats, onFilterChange, onApplyFilters, onResetFilters }) => (
//   <div className="lg:col-span-1 space-y-6 mt-15">
//     <div className="bg-white rounded-xl shadow p-6">
//       <h2 className="text-lg font-semibold text-blue-600 mb-4">Filters</h2>
//       <div className="space-y-4">
//         <div>
//           <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//           <select
//             id="statusFilter"
//             name="status"
//             value={filters.status}
//             onChange={onFilterChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="all">All Tasks</option>
//             <option value="todo">To Do</option>
//             <option value="in-progress">In Progress</option>
//             <option value="completed">Completed</option>
//           </select>
//         </div>
        
//         <div>
//           <label htmlFor="priorityFilter" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
//           <select
//             id="priorityFilter"
//             name="priority"
//             value={filters.priority}
//             onChange={onFilterChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="all">All Priorities</option>
//             <option value="high">High</option>
//             <option value="medium">Medium</option>
//             <option value="low">Low</option>
//           </select>
//         </div>
        
//         <div>
//           <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
//           <input
//             type="date"
//             id="dateFilter"
//             name="date"
//             value={filters.date}
//             onChange={onFilterChange}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
        
//         <div className="flex flex-col gap-2">
//           <button 
//             className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
//             onClick={onApplyFilters}
//           >
//             <i className="fas fa-filter"></i> Apply Filters
//           </button>
//           <button 
//             className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
//             onClick={onResetFilters}
//           >
//             <i className="fas fa-redo"></i> Reset Filters
//           </button>
//         </div>
//       </div>
//     </div>

//     <div className="bg-white rounded-xl shadow p-6">
//       <h2 className="text-lg font-semibold text-blue-600 mb-4">Statistics</h2>
//       <div className="space-y-3">
//         <div className="flex justify-between py-2 border-b border-gray-100">
//           <span className="text-gray-600">Total Tasks:</span>
//           <span className="font-semibold text-blue-600">{stats.total}</span>
//         </div>
//         <div className="flex justify-between py-2 border-b border-gray-100">
//           <span className="text-gray-600">Completed:</span>
//           <span className="font-semibold text-blue-600">{stats.completed}</span>
//         </div>
//         <div className="flex justify-between py-2 border-b border-gray-100">
//           <span className="text-gray-600">In Progress:</span>
//           <span className="font-semibold text-blue-600">{stats.inProgress}</span>
//         </div>
//         <div className="flex justify-between py-2">
//           <span className="text-gray-600">High Priority:</span>
//           <span className="font-semibold text-blue-600">{stats.highPriority}</span>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const MainContent = ({ tasks, chartData, chartOptions, onAddTask, onEditTask, onDeleteTask, onCompleteTask }) => (
//   <div className="lg:col-span-3 space-y-6 mt-15">
//     <div className="bg-white rounded-xl shadow">
//       <div className="p-5 border-b border-gray-200 flex justify-between items-center">
//         <h2 className="text-lg font-semibold text-blue-600">Tasks</h2>
//         <button 
//           className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition"
//           onClick={onAddTask}
//         >
//           <i className="fas fa-plus"></i> Add New Task
//         </button>
//       </div>
      
//       <TasksList
//         tasks={tasks}
//         onEdit={onEditTask}
//         onDelete={onDeleteTask}
//         onComplete={onCompleteTask}
//       />
//     </div>

//     <div className="bg-white rounded-xl shadow">
//       <div className="p-5 border-b border-gray-200">
//         <h2 className="text-lg font-semibold text-blue-600">Progress Overview</h2>
//       </div>
//       <div className="p-5 h-80">
//         <Doughnut data={chartData} options={chartOptions} />
//       </div>
//     </div>
//   </div>
// );

// const TasksList = ({ tasks, onEdit, onDelete, onComplete }) => {
//   if (tasks.length === 0) {
//     return (
//       <div className="p-10 text-center">
//         <i className="fas fa-tasks text-5xl text-gray-300 mb-4"></i>
//         <h3 className="text-xl font-medium text-gray-700">No tasks yet</h3>
//         <p className="text-gray-500">Add your first task to get started</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
//       {tasks.map(task => (
//         <TaskCard
//           key={task.id}
//           task={task}
//           onEdit={onEdit}
//           onDelete={onDelete}
//           onComplete={onComplete}
//         />
//       ))}
//     </div>
//   );
// };

// const TaskCard = ({ task, onEdit, onDelete, onComplete }) => {
//   const statusText = {
//     'todo': 'To Do',
//     'in-progress': 'In Progress',
//     'completed': 'Completed'
//   }[task.status];
  
//   const statusColor = {
//     'todo': '#ff9e00',
//     'in-progress': '#4361ee',
//     'completed': '#4cc9f0'
//   }[task.status];
  
//   const formattedDate = task.dueDate 
//     ? new Date(task.dueDate).toLocaleDateString() 
//     : 'No due date';
  
//   const formattedCreated = new Date(task.createdAt).toLocaleDateString();

//   return (
//     <div className={`bg-white rounded-xl border-l-4 p-4 shadow transition-all hover:shadow-lg hover:-translate-y-1 ${
//       task.priority === 'high' ? 'border-red-500' : 
//       task.priority === 'medium' ? 'border-yellow-500' : 
//       'border-green-500'
//     }`}>
//       <div className="text-xs text-gray-400 text-right absolute top-2 right-3">ID: {task.id}</div>
      
//       <div className="flex justify-between items-start mb-3">
//         <h3 className="font-semibold text-gray-800 text-lg">{task.title}</h3>
//         <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//           task.priority === 'high' ? 'bg-red-100 text-red-800' : 
//           task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
//           'bg-green-100 text-green-800'
//         }`}>
//           {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
//         </span>
//       </div>
      
//       <p className="text-gray-600 mb-4">{task.description || 'No description provided'}</p>
      
//       <div className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded mb-3">
//         Created: {formattedCreated}
//       </div>
      
//       <div className="flex justify-between text-sm text-gray-500 border-t border-gray-100 pt-3 mt-3">
//         <span className="flex items-center gap-1">
//           <i className="fas fa-calendar-alt"></i> {formattedDate}
//         </span>
//         <span className="flex items-center gap-1">
//           <i className="fas fa-circle" style={{ color: statusColor }}></i> {statusText}
//         </span>
//       </div>
      
//       <div className="flex gap-2 mt-4">
//         <button 
//           className="flex-1 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-sm flex items-center justify-center gap-1"
//           onClick={() => onEdit(task)}
//         >
//           <i className="fas fa-edit"></i> Edit
//         </button>
        
//         <button 
//           className="flex-1 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded text-sm flex items-center justify-center gap-1"
//           onClick={() => onDelete(task.id)}
//         >
//           <i className="fas fa-trash"></i> Delete
//         </button>
        
//         {task.status !== 'completed' && (
//           <button 
//             className="flex-1 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-sm flex items-center justify-center gap-1"
//             onClick={() => onComplete(task)}
//           >
//             <i className="fas fa-check"></i> Complete
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// const TaskModal = ({ isOpen, task, onClose, onSubmit }) => (
//   <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity ${
//     isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
//   }`}>
//     <div className="bg-white rounded-xl w-full max-w-md transform transition-transform duration-300 ease-in-out">
//       <div className="p-5 border-b border-gray-200 flex justify-between items-center">
//         <h3 className="font-semibold text-lg text-blue-600">{task ? 'Edit Task' : 'Add New Task'}</h3>
//         <button 
//           className="text-gray-500 hover:text-gray-700 text-xl"
//           onClick={onClose}
//         >
//           &times;
//         </button>
//       </div>
      
//       <form onSubmit={onSubmit}>
//         <div className="p-5 space-y-4">
//           {task && <input type="hidden" name="id" defaultValue={task.id} />}
          
//           <div>
//             <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
//             <input
//               type="text"
//               id="taskTitle"
//               name="title"
//               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               defaultValue={task?.title || ''}
//               required
//             />
//           </div>
          
//           <div>
//             <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <textarea
//               id="taskDescription"
//               name="description"
//               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               rows="3"
//               defaultValue={task?.description || ''}
//             ></textarea>
//           </div>
          
//           <div>
//             <label htmlFor="taskPriority" className="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
//             <select
//               id="taskPriority"
//               name="priority"
//               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               defaultValue={task?.priority || 'medium'}
//               required
//             >
//               <option value="high">High</option>
//               <option value="medium">Medium</option>
//               <option value="low">Low</option>
//             </select>
//           </div>
          
//           <div>
//             <label htmlFor="taskStatus" className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
//             <select
//               id="taskStatus"
//               name="status"
//               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               defaultValue={task?.status || 'todo'}
//               required
//             >
//               <option value="todo">To Do</option>
//               <option value="in-progress">In Progress</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>
          
//           <div>
//             <label htmlFor="taskDueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
//             <input
//               type="date"
//               id="taskDueDate"
//               name="dueDate"
//               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               defaultValue={task?.dueDate || ''}
//             />
//           </div>
//         </div>
        
//         <div className="p-5 border-t border-gray-200 flex justify-end gap-3">
//           <button 
//             type="button" 
//             className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button 
//             type="submit" 
//             className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
//           >
//             Save Task
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// );

// export default PlanningApp;