import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const API_BASE_URL = 'http://localhost:8080/api/admin';

const TaskStatusChart = () => {
  const [statusCounts, setStatusCounts] = useState({ pending: 0, progress: 0, completed: 0 });

  useEffect(() => {
    fetchTaskData();
  }, []);

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

      const counts = {
        pending: 0,
        progress: 0,
        completed: 0
      };

      data.forEach(task => {
        const status = task.taskStatus?.toLowerCase();
        if (status === 'pending') counts.pending++;
        else if (status === 'in progress') counts.progress++;
        else if (status === 'completed') counts.completed++;
      });

      setStatusCounts(counts);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to load task data', 'error');
    }
  };

  const chartData = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Task Count',
        data: [statusCounts.pending, statusCounts.progress, statusCounts.completed],
        backgroundColor: ['#60A5FA', '#FBBF24', '#34D399'],
        borderWidth: 1,
      }
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-blue-100 p-6 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Task Status Overview</h2>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <Pie data={chartData} />
        <div className="mt-4 text-sm text-gray-600 text-center">
          <p><strong>Pending:</strong> {statusCounts.pending}</p>
          <p><strong>In Progress:</strong> {statusCounts.progress}</p>
          <p><strong>Completed:</strong> {statusCounts.completed}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskStatusChart;
