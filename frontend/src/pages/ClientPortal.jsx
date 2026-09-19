import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, LogOut, CheckCircle2, Circle, Clock, MessageSquare } from 'lucide-react';
import logo from '../assets/logo.png';

export default function ClientPortal() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <header className="bg-slate-900 text-white shadow-xl">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 flex items-center justify-center">
              <img
                src={logo}
                alt="NexaSync"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Acme Corp Portal</h1>
              <p className="text-xs text-slate-400 font-medium">Powered by NexaSync</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="flex items-center px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Project Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-8 border-b border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-extrabold text-slate-900">Website Redesign</h2>
                  <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-bold flex items-center">
                    <Activity className="h-4 w-4 mr-2 animate-pulse" /> In Progress
                  </span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed text-lg">
                  Track the real-time progress of your project and view the latest milestones completed by your allocated team.
                </p>
              </div>

              <div className="p-8 bg-slate-50">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                  Project Timeline
                </h3>

                {/* Timeline */}
                <div className="relative border-l-2 border-slate-200 ml-4 space-y-8">
                  <div className="relative pl-8">
                    <span className="absolute -left-3.5 bg-slate-50 h-7 w-7 rounded-full flex items-center justify-center ring-4 ring-slate-50">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </span>
                    <h4 className="font-bold text-slate-900 text-lg">Discovery Phase</h4>
                    <p className="text-sm text-slate-500 font-medium mt-1">Completed on Sep 10, 2026</p>
                    <p className="mt-2 text-slate-600 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      Initial requirements gathered and project scope finalized with the team.
                    </p>
                  </div>

                  <div className="relative pl-8">
                    <span className="absolute -left-3.5 bg-slate-50 h-7 w-7 rounded-full flex items-center justify-center ring-4 ring-slate-50">
                      <Clock className="h-6 w-6 text-blue-500" />
                    </span>
                    <h4 className="font-bold text-slate-900 text-lg">Design Mockups</h4>
                    <p className="text-sm text-slate-500 font-medium mt-1">In progress - Expected Sep 20, 2026</p>
                    <p className="mt-2 text-slate-600 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      Our design team is actively working on the initial Figma wireframes.
                    </p>
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
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg border border-blue-200">
                  JS
                </div>
                <div>
                  <p className="font-bold text-slate-900">John Smith</p>
                  <p className="text-sm text-slate-500 font-medium">Lead Developer</p>
                </div>
              </div>
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
      </main>
    </div>
  );
}
