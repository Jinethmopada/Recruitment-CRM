import React, { useState } from 'react'
import LeftSection from '../components/leftSection'
import LoginRightSection from '../components/loginRightSection'
import { loginUser } from '../api/authApi'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    email:"",
    password:""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,[e.target.name]:e.target.value,
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
      if (formData.email === "") {
    alert("Email is required");
    return;
    }
    if (formData.password === "") {
    alert("Password is required");
    return;
    }
     try {
    const response = await loginUser(formData);

    if(response.success){
      console.log(response);
    // Save token
    localStorage.setItem("token", response.token);
    alert(response.message);

    navigate("/dashboard");
    }else{
      alert(response.message);
    }

  } catch (error) {
    console.error(error);

    alert(error.response?.data?.message || "Login Failed");
  }
  }

  return (
    <>
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 grid lg:grid-cols-2">
      <LeftSection />
      <LoginRightSection formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
    </div>
    </>
  )
}

export default LoginPage