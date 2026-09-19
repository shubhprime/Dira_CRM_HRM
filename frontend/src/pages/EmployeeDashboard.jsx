import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, LogOut, Search, Clock, Calendar, ChevronRight } from 'lucide-react';
import logo from '../assets/logo.png';

export default function EmployeeDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 flex items-center justify-center">
              <img
                src={logo}
                alt="DIRA Marketing Agency"
                className="h-full w-full object-contain"
              />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Employee Workspace</h1>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden sm:block relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50"
                placeholder="Search projects..."
              />
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">My Allocated Clients</h2>
            <p className="mt-1 text-sm font-medium text-slate-500">
              You are currently viewing data restricted to your specific project assignments.
            </p>
          </div>
        </div>

        {/* Project Cards (Mock Data) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Acme Corp Redesign</h3>
                  <p className="text-sm text-slate-500 font-medium">Acme Corporation</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Active</span>
            </div>

            <p className="text-sm text-slate-600 mb-6 line-clamp-2">
              Full redesign of the Acme Corp landing page and customer dashboard. Expected to take 3 months.
            </p>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <div className="flex space-x-4 text-sm text-slate-500 font-medium">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1.5 text-slate-400" />
                  Due Oct 24
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1.5 text-slate-400" />
                  In Progress
                </div>
              </div>
              <button className="flex items-center text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                View Project <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Empty state filler for balance */}
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-12 text-center text-slate-400">
            <Briefcase className="h-10 w-10 mb-3 text-slate-300" />
            <p className="font-medium">No other active allocations</p>
            <p className="text-sm mt-1">When an admin assigns you to a new project, it will appear here.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
