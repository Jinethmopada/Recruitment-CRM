import {useState} from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { IoMdCreate } from "react-icons/io";

const LoginRightSection = ({formData,handleChange,handleSubmit}) => {
    const [showPassword, setShowPassword] = useState(false)
      const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  return (
    <>
    {/* Right Section - Registration Form */}
          <div className="flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-md">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in to your account</h2>
                <p className="text-gray-600">Enter your credentials to access your account</p>
              </div>
    
              {/* Form */}
              <form data-testid="login-form" onSubmit={handleSubmit} className="space-y-5">
                {/* Email Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <input
                      data-testid="login-email"
                      type="email"
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      onInvalid={(e) => e.target.setCustomValidity("Email is required !")}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
    
                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      data-testid="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      name='password'
                      onChange={handleChange}
                      value={formData.password}
                      onInvalid={(e) => e.target.setCustomValidity("Password is required !")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </button>
                  </div>
                </div>
    
                {/* Sign In Button */}
                <button
                  data-testid="login-submit-button"
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                >
                  <span><IoMdCreate className='w-5 h-5'/></span>Sign in
                </button>
              </form>
    
              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-sm text-gray-500">or continue with</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
    
              {/* Social Login */}
              <div className="space-y-3">
                <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 rounded-lg transition flex items-center justify-center gap-2">
                  <span><FcGoogle className='w-5 h-5' /></span>Continue with Google
                </button>
              </div>
    
              {/* Sign In Link */}
              <p className="mt-6 text-center text-gray-600">
                Don't have an account? <Link to="/register" className="text-indigo-600 hover:underline font-semibold">Sign up</Link>
              </p>
            </div>
          </div>
   </>
  )
}

export default LoginRightSection