import React, { useState } from 'react';
import { Outlet, useNavigate  } from 'react-router-dom';
import { Menu, Plus,LogOut  } from 'lucide-react';
import Sidebar from '../SideBar/SideBar';
import ExitModel from '../../components/ExitModel/ExitModel';


export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
     const [showLogOutModal, setShowLogOutModal] = useState(false);
const navigate = useNavigate();
    const toggleSidebar = () => setSidebarOpen(prev => !prev);
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
       <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
          <ExitModel
                isOpen={showLogOutModal}
                onClose={() => setShowLogOutModal(false)}
                onConfirm={() => { handleLogout(); setShowLogOutModal(false) }}
                title="You want to LogOut"
                message="Are you sure you want to LogOut?"
                confirmLabel="Yes"
                cancelLabel="No"
        
              />
        {/* Header Bar */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleSidebar}
              className="inline-flex lg:hidden items-center justify-center p-1 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle sidebar"
            >
              <Menu size={22} />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">Welcome!</h1>
          </div>

          <button
           onClick={() => {setShowLogOutModal(true) }}
            className="inline-flex items-center gap-2 px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
    );
}
