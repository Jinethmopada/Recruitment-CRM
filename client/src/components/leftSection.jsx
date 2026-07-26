import React from 'react'
import { LuUsers } from "react-icons/lu"
import { MdOutlineCheckCircle } from "react-icons/md"
import { FaStar,FaFolderOpen } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import workingImage from '../assets/Working-amico.png'

const LeftSection = () => {
  return (
    <div className="hidden lg:flex flex-col bg-linear-to-br from-white-600 to-white-500 text-black p-12 relative overflow-hidden ml-20">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full opacity-10 -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400 rounded-full opacity-10 -ml-32 -mb-32"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-indigo-600 bg-opacity-20 rounded-lg flex items-center justify-center border border-indigo-500 border-opacity-30 backdrop-blur-sm">
            <LuUsers className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold">Recruitment CRM</h1>
        </div>

        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4 leading-tight">Welcome Back! 👋</h2>
          <p className="text-black-100 text-lg">
            Sign in to continue managing your recruitment process.
          </p>
        </div>

        {/*Illustration Image*/}
        <div>
            <img src={workingImage} alt="Working illustration" className="w-full max-w-sm"/>
        </div>

        {/* Features */}
        <div className="space-y-6">
          {/* Feature 1 */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-600 bg-opacity-20 rounded-lg flex items-center justify-center shrink-0 border border-white border-opacity-30 backdrop-blur-sm">
              <FaFolderOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Centralise your recruitment</h3>
              <p className="text-black">
                Manage jobs, candidates and applications in one place.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-600 bg-opacity-20 rounded-lg flex items-center justify-center shrink-0 border border-white border-opacity-30 backdrop-blur-sm">
              <HiUsers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Track & collaborate</h3>
              <p className="text-black">
                Work with your team and track progress in real time.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-600 bg-opacity-20 rounded-lg flex items-center justify-center shrink-0 border border-white border-opacity-30 backdrop-blur-sm">
              <FaStar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Make better hires</h3>
              <p className="text-black">
                Find the best talent faster with powerful insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSection