import LeftSection from "../components/leftSection"
import { useState } from "react"
import RightSection from "../components/rightSection";
import { registerUser } from "../api/authApi";
import {useNavigate} from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    fullName:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,[e.target.name]:e.target.value,
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword){
      alert("Password didn't Match");
      return;
    }
    try {
      const response = await registerUser({
        fullName:formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      console.log(response);
      alert("Registration Completed Successfully");
      navigate('/login');
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Registration Failed");
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 grid lg:grid-cols-2">
      <LeftSection />
      <RightSection formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
    </div>
  )
}

export default Registration