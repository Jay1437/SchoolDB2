"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Bell,
  Book,
  Briefcase,
  Calendar,
  ChevronDown,
  CreditCard,
  File,
  Home,
  LogOut,
  Menu,
  Settings,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sample Data
  const schoolStats = {
    totalStudents: 1254,
    totalTeachers: 87,
    attendanceRate: 94.2,
    feeCollection: 87.5,
  };

  const recentStudents = [
    { id: 1, name: "Emma Thompson", grade: "10th", admissionDate: "01/15/2025", status: "Active" },
    { id: 2, name: "Michael Chen", grade: "8th", admissionDate: "01/12/2025", status: "Active" },
    { id: 3, name: "Sophia Garcia", grade: "11th", admissionDate: "01/10/2025", status: "Pending" },
    { id: 4, name: "James Wilson", grade: "9th", admissionDate: "01/08/2025", status: "Active" },
    { id: 5, name: "Olivia Martinez", grade: "7th", admissionDate: "01/05/2025", status: "Active" },
  ];

  const attendanceData = [
    { grade: "7th", present: 95, absent: 5 },
    { grade: "8th", present: 92, absent: 8 },
    { grade: "9th", present: 94, absent: 6 },
    { grade: "10th", present: 97, absent: 3 },
    { grade: "11th", present: 91, absent: 9 },
    { grade: "12th", present: 96, absent: 4 },
  ];

  const feeStatus = [
    { month: "January", collected: 87, pending: 13 },
    { month: "February", collected: 92, pending: 8 },
    { month: "March", collected: 78, pending: 22 },
  ];

  const notifications = [
    { id: 1, message: "New teacher registration request", time: "10 minutes ago" },
    { id: 2, message: "End of term exam schedules published", time: "2 hours ago" },
    { id: 3, message: "Payment reminder sent to 24 students", time: "Yesterday" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ease-in-out ${sidebarOpen ? "w-64" : "w-20"}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link href="/get-started" className={`${sidebarOpen ? "block" : "hidden"} font-bold text-xl text-blue-700`}>
            EduManager
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className="p-4">
          <div className={`flex items-center mb-6 ${sidebarOpen ? "justify-start" : "justify-center"}`}>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
              <User size={20} />
            </div>
            {sidebarOpen && (
              <div className="ml-3">
                <div className="font-medium">Admin Portal</div>
                <div className="text-xs text-gray-500">Springfield Elementary</div>
              </div>
            )}
          </div>
          <nav>
            <ul className="space-y-1">
              <li>
                <a href="#" className="flex items-center p-3 text-blue-700 bg-blue-50 rounded-md">
                  <Home size={20} />
                  {sidebarOpen && <span className="ml-3">Dashboard</span>}
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
                  <Users size={20} />
                  {sidebarOpen && <span className="ml-3">Students</span>}
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
                  <Briefcase size={20} />
                  {sidebarOpen && <span className="ml-3">Teachers</span>}
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
                  <Calendar size={20} />
                  {sidebarOpen && <span className="ml-3">Attendance</span>}
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
                  <Book size={20} />
                  {sidebarOpen && <span className="ml-3">Grades</span>}
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
                  <CreditCard size={20} />
                  {sidebarOpen && <span className="ml-3">Fee Management</span>}
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
                  <File size={20} />
                  {sidebarOpen && <span className="ml-3">Reports</span>}
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
                  <Settings size={20} />
                  {sidebarOpen && <span className="ml-3">Settings</span>}
                </a>
              </li>
              <li className="mt-6">
                <a href="#" className="flex items-center p-3 text-red-500 hover:bg-red-50 rounded-md">
                  <LogOut size={20} />
                  {sidebarOpen && <span className="ml-3">Logout</span>}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Dashboard Overview</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 text-gray-500 hover:text-gray-700 relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {notifications.length}
                </span>
              </button>
            </div>
            <div className="flex items-center">
            <Image
  src="/path/to/image.jpg"
  alt="Description"
  width={500}  // Add appropriate width
  height={300} // Add appropriate height
/>
              <div className="ml-2">
                <div className="text-sm font-medium">John Doe</div>
                <div className="text-xs text-gray-500">Principal</div>
              </div>
              <ChevronDown size={16} className="ml-2 text-gray-500" />
            </div>
          </div>
        </header>

        {/* Dashboard Main Section */}
        <main className="p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">Total Students</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{schoolStats.totalStudents}</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg text-blue-700">
                  <Users size={20} />
                </div>
              </div>
              <div className="mt-4 text-sm text-green-600">+12% from last month</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">Total Teachers</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{schoolStats.totalTeachers}</h3>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg text-purple-700">
                  <Briefcase size={20} />
                </div>
              </div>
              <div className="mt-4 text-sm text-green-600">+5% from last month</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">Attendance Rate</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{schoolStats.attendanceRate}%</h3>
                </div>
                <div className="p-3 bg-green-100 rounded-lg text-green-700">
                  <Calendar size={20} />
                </div>
              </div>
              <div className="mt-4 text-sm text-green-600">+2.3% from last month</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">Fee Collection</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{schoolStats.feeCollection}%</h3>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg text-yellow-700">
                  <CreditCard size={20} />
                </div>
              </div>
              <div className="mt-4 text-sm text-red-600">-3.5% from last month</div>
            </div>
          </div>

          {/* Recent Students & Attendance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-lg">Recent Student Admissions</h2>
              </div>
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentStudents.map((student) => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{student.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">{student.grade}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">{student.admissionDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                student.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {student.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-sm text-blue-600 text-center">
                  <a href="#">View all students →</a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-lg">Grade-wise Attendance</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {attendanceData.map((item) => (
                    <div key={item.grade} className="flex items-center">
                      <div className="w-16 text-sm font-medium">{item.grade}</div>
                      <div className="flex-1 ml-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${item.present}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-4 text-sm font-medium">{item.present}%</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-sm text-blue-600 text-center">
                  <a href="#">View detailed reports →</a>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Collection & Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow lg:col-span-2">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-lg">Fee Collection Status</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-4">
                  {feeStatus.map((item) => (
                    <div key={item.month} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">{item.month}</h3>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div
                          className="bg-green-600 h-2.5 rounded-full"
                          style={{ width: `${item.collected}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Collected: {item.collected}%</span>
                        <span className="text-gray-500">Pending: {item.pending}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-sm text-blue-600 text-center">
                  <a href="#">View fee management →</a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-lg">Recent Notifications</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-sm text-blue-600 text-center">
                  <a href="#">View all notifications →</a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
