import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, DollarSign, LogOut, Bell, Search, ShieldCheck, TrendingUp, UserPlus, Activity } from 'lucide-react';
import logo from '../assets/logo.png';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <div className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl z-10">
        <div className="p-6 flex items-center space-x-3 mb-4">
          <div className="h-10 w-10 flex items-center justify-center">
            <img
              src={logo}
              alt="NexaSync"
              className="h-full w-full object-contain"
            />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Nexa<span className="text-blue-400">Sync</span></h2>
        </div>

        <div className="px-4 mb-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Main Menu</p>
          <nav className="space-y-1">
            <a href="#" className="flex items-center px-4 py-3 bg-blue-600/10 text-blue-400 border-l-4 border-blue-500 rounded-r-lg font-medium transition-colors">
              <Activity className="h-5 w-5 mr-3" />
              Overview
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg font-medium transition-colors">
              <DollarSign className="h-5 w-5 mr-3" />
              Global Budgets
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg font-medium transition-colors">
              <Briefcase className="h-5 w-5 mr-3" />
              Client Projects
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg font-medium transition-colors">
              <Users className="h-5 w-5 mr-3" />
              Directory & Roles
            </a>
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="bg-slate-800 rounded-xl p-4 mb-4 border border-slate-700">
            <p className="text-sm text-slate-300 font-medium">Logged in as</p>
            <p className="text-lg font-bold text-white">System Admin</p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all w-full px-4 py-3 rounded-lg font-medium"
          >
            <LogOut className="h-5 w-5 mr-3" />
            End Session
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-0">
          <div className="relative w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50"
              placeholder="Search employees, clients, or projects..."
            />
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-slate-400 hover:text-slate-600 relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <div className="flex items-center space-x-3 border-l border-slate-200 pl-6">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-700">Jane Doe</p>
                <p className="text-xs text-slate-500 font-medium">Owner</p>
              </div>
              <div className="h-10 w-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold shadow-md cursor-pointer ring-2 ring-slate-100">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
              <p className="text-slate-500 mt-1 font-medium">Here's what's happening across your business today.</p>
            </div>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-sm hover:bg-blue-700 transition-colors">
              <UserPlus className="h-4 w-4 mr-2" />
              New Allocation
            </button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <p className="text-sm font-semibold text-slate-500">Total Revenue</p>
                <span className="p-2 bg-green-100 text-green-700 rounded-lg"><DollarSign className="h-4 w-4" /></span>
              </div>
              <p className="text-3xl font-bold text-slate-900 mt-4">$240,000</p>
              <p className="text-sm text-green-600 font-medium mt-2 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" /> +14.5% from last month
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <p className="text-sm font-semibold text-slate-500">Active Clients</p>
                <span className="p-2 bg-blue-100 text-blue-700 rounded-lg"><Briefcase className="h-4 w-4" /></span>
              </div>
              <p className="text-3xl font-bold text-slate-900 mt-4">12</p>
              <p className="text-sm text-blue-600 font-medium mt-2 flex items-center">
                3 new clients boarded
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <p className="text-sm font-semibold text-slate-500">Total Employees</p>
                <span className="p-2 bg-indigo-100 text-indigo-700 rounded-lg"><Users className="h-4 w-4" /></span>
              </div>
              <p className="text-3xl font-bold text-slate-900 mt-4">24</p>
              <p className="text-sm text-slate-500 font-medium mt-2">
                Across 4 departments
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <p className="text-sm font-semibold text-slate-500">Active Allocations</p>
                <span className="p-2 bg-purple-100 text-purple-700 rounded-lg"><Activity className="h-4 w-4" /></span>
              </div>
              <p className="text-3xl font-bold text-slate-900 mt-4">18</p>
              <p className="text-sm text-slate-500 font-medium mt-2">
                Employees currently assigned
              </p>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Recent Allocations</h3>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View all</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">Employee</th>
                    <th className="px-6 py-4">Assigned Client</th>
                    <th className="px-6 py-4">Project Budget</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">JS</div>
                      <span className="font-medium text-slate-900">John Smith</span>
                    </td>
                    <td className="px-6 py-4 font-medium">Acme Corp Redesign</td>
                    <td className="px-6 py-4 font-medium text-slate-900">$45,000</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Active</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">AT</div>
                      <span className="font-medium text-slate-900">Alice Taylor</span>
                    </td>
                    <td className="px-6 py-4 font-medium">TechFlow ERP Implementation</td>
                    <td className="px-6 py-4 font-medium text-slate-900">$120,000</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Active</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
