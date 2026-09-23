import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, LogOut, CheckCircle2, Circle, Clock, MessageSquare } from 'lucide-react';

export default function ClientPortal() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
        const response = await fetch(`${API_URL}/api/client/dashboard`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const json = await response.json();
          setProjects(json.projects);
        } else {
          if (response.status === 401 || response.status === 403) navigate('/login');
        }
      } catch (err) {
        console.error("Failed to fetch client data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const project = projects.length > 0 ? projects[0] : null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <header className="bg-slate-900 text-white shadow-xl">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
               <span className="text-white font-bold text-lg">{user.name ? user.name[0] : 'C'}</span>
             </div>
             <div>
               <h1 className="text-xl font-bold tracking-tight">{user.name || 'Client'} Portal</h1>
               <p className="text-xs text-slate-400 font-medium">Powered by NexaSync</p>
             </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-10">
        {loading ? (
          <div className="flex justify-center p-12 text-slate-500">Loading your project status...</div>
        ) : !project ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center text-slate-500">
            You do not currently have any active projects.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Project Feed */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-extrabold text-slate-900">{project.name}</h2>
                    <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-bold flex items-center">
                      <Activity className="h-4 w-4 mr-2 animate-pulse" /> {project.status}
                    </span>
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed text-lg">
                    {project.description}
                  </p>
                </div>
                
                <div className="p-8 bg-slate-50">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                    Project Timeline
                  </h3>
                  
                  {/* Timeline (Static mock UI for now, but project is dynamic) */}
                  <div className="relative border-l-2 border-slate-200 ml-4 space-y-8">
                    <div className="relative pl-8">
                      <span className="absolute -left-3.5 bg-slate-50 h-7 w-7 rounded-full flex items-center justify-center ring-4 ring-slate-50">
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      </span>
                      <h4 className="font-bold text-slate-900 text-lg">Discovery Phase</h4>
                      <p className="text-sm text-slate-500 font-medium mt-1">Completed recently</p>
                    </div>
                    
                    <div className="relative pl-8">
                      <span className="absolute -left-3.5 bg-slate-50 h-7 w-7 rounded-full flex items-center justify-center ring-4 ring-slate-50">
                        <Clock className="h-6 w-6 text-blue-500" />
                      </span>
                      <h4 className="font-bold text-slate-900 text-lg">Design Mockups</h4>
                      <p className="text-sm text-slate-500 font-medium mt-1">In progress</p>
                    </div>

                    <div className="relative pl-8">
                      <span className="absolute -left-3.5 bg-slate-50 h-7 w-7 rounded-full flex items-center justify-center ring-4 ring-slate-50">
                        <Circle className="h-6 w-6 text-slate-300" />
                      </span>
                      <h4 className="font-bold text-slate-400 text-lg">Development</h4>
                      <p className="text-sm text-slate-400 font-medium mt-1">Pending</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Your Team</h3>
                {project.team && project.team.length > 0 ? (
                  project.team.map((member, idx) => (
                    <div key={idx} className="flex items-center space-x-4 mb-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg border border-blue-200">
                        {member.initials}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{member.name}</p>
                        <p className="text-sm text-slate-500 font-medium">Assigned Developer</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No team members assigned yet.</p>
                )}
                
                <button className="mt-6 w-full flex items-center justify-center py-2.5 px-4 rounded-xl shadow-sm text-sm font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Team
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-md p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Need Assistance?</h3>
                <p className="text-blue-100 text-sm font-medium mb-4">
                  If you have any questions regarding the budget or timeline, please reach out to your project manager.
                </p>
                <button className="w-full py-2.5 px-4 rounded-xl text-sm font-bold text-blue-600 bg-white hover:bg-blue-50 transition-colors">
                  View Contract
                </button>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
