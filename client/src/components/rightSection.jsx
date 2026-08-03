import {useState} from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { IoMdCreate } from "react-icons/io";
import { registerUser } from '../api/authApi';

const RightSection = ({formData,handleChange,handleSubmit}) => {

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  
  return (
   <>
    {/* Right Section - Registration Form */}
          <div className="flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-md">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
                <p className="text-gray-600">Fill in the details to get started</p>
              </div>
    
              {/* Form */}
              <form data-testid="register-form" onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <input
                      data-testid="register-full-name"
                      type="text"
                      value={formData.fullName}
                      name='fullName'
                      required
                      onInvalid={(e) => e.target.setCustomValidity("Full Name is required !")}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
    
                {/* Email Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <input
                      data-testid="register-email"
                      type="email"
                      placeholder="Enter your email"
                      name='email'
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onInvalid={(e) => e.target.setCustomValidity("Email is required !")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
    
                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      data-testid="register-password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      name='password'
                      required
                      onChange={handleChange}
                      onInvalid={(e) => e.target.setCustomValidity("Password is required !")}
                      placeholder="Create a password"
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
    
                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      data-testid="register-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      name='confirmPassword'
                      required
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </button>
                  </div>
                </div>
    
                {/* Terms and Privacy */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
                  </label>
                </div>
    
                {/* Create Account Button */}
                <button
                  data-testid="register-submit-button"
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                >
                  <span><IoMdCreate className='w-5 h-5'/></span>Create Account
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
                Already have an account? <Link to="/login" className="text-indigo-600 hover:underline font-semibold">Sign in</Link>
              </p>
            </div>
          </div>
   </>
  )
}

export default RightSection