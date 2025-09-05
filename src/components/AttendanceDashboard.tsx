import React from "react";
import { Calendar, Download, User, AlertCircle, Clock } from "lucide-react";

const AttendanceDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900">Attendance Tracking</h1>
      <p className="text-gray-500 mb-6">
        Voice-based attendance monitoring and analytics
      </p>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow rounded-xl p-4 flex flex-col">
          <span className="text-gray-500 font-medium">Today's Check-ins</span>
          <span className="text-3xl font-bold text-purple-600">0</span>
          <span className="text-sm text-gray-400">0 verified entries</span>
        </div>

        <div className="bg-white shadow rounded-xl p-4 flex flex-col">
          <span className="text-gray-500 font-medium">Average Confidence</span>
          <span className="text-3xl font-bold text-green-500">0%</span>
          <span className="text-sm text-gray-400">Voice recognition accuracy</span>
        </div>

        <div className="bg-white shadow rounded-xl p-4 flex flex-col">
          <span className="text-gray-500 font-medium">System Status</span>
          <span className="text-3xl font-bold text-blue-500">Online</span>
          <span className="text-sm text-gray-400">Real-time monitoring active</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-end space-x-3 mb-6">
        <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-100">
          <Calendar className="w-4 h-4 mr-2" /> Select date
        </button>
        <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-100">
          <Download className="w-4 h-4 mr-2" /> Export
        </button>
        <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          <User className="w-4 h-4 mr-2" /> Demo Record
        </button>
      </div>

      {/* Attendance Records */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-2">Attendance Records</h2>
        <p className="text-gray-500 mb-4">
          Showing all recent attendance records
        </p>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2 px-3">Employee</th>
              <th className="py-2 px-3">Department</th>
              <th className="py-2 px-3">Time</th>
              <th className="py-2 px-3">Location</th>
              <th className="py-2 px-3">Confidence</th>
              <th className="py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-400">
                No attendance records found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceDashboard;
