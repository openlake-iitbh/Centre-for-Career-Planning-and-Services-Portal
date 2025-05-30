import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useSignup from '../api/useSignup.js'
import { useAppContext } from '../context/AppContext.jsx';

function Signup() {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    });
    const { loading, signup } = useSignup();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    }

    const showPassword = () => {
        var x = document.getElementById("password");
        var y = document.getElementById("confirmPassword");
        if (x.type === "password") {
            x.type = "text";
            y.type = "text";
        } else {
            x.type = "password";
            y.type = "password";
        }
    }

    return (
        <>
            <h1 className="text-3xl font-semibold text-center ">Sign Up CCPS
            </h1>
            <form onSubmit={handleSubmit} className='p-10 mt-0' >
                <div>
                    <label className="label p-2">
                        <span className='text-base  label-text'>Name</span>
                    </label>
                    <input 
                    type="text" 
                    placeholder="Enter Your name" 
                    autoComplete="name"
                    className="w-full input input-bordered h-10"
                    value={inputs.name} 
                    onChange={(e) => setInputs({ ...inputs, name: e.target.value })} 
                    />
                </div>
                <div>
                    <label className="label p-2">
                        <span className='text-base  label-text'>Email</span>
                    </label>
                    <input 
                    type="text" 
                    placeholder="Enter email" 
                    autoComplete="email"
                    className="w-full input input-bordered h-10"
                    value={inputs.email} 
                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })} 
                    />
                </div>
                <div>
                    <label className="label p-2">
                        <span className='text-base  label-text'>Password</span>
                    </label>
                    <input 
                    type="password" 
                    placeholder="Enter Password" 
                    autoComplete="new-password"
                    className="w-full input input-bordered h-10"
                    value={inputs.password} 
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })} id='password'
                    />
                </div>
                <div>
                    <label className="label p-2">
                        <span className='text-base  label-text'>Confirm Password</span>
                    </label>
                    <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    autoComplete="new-password"
                    className="w-full input input-bordered h-10"
                    value={inputs.confirmPassword} 
                    onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} id='confirmPassword'
                    />
                </div>
                <div>
                    <label className="label p-2">
                        <span className='text-base  label-text'>Role</span>
                    </label>
                    <select className="w-full input input-bordered h-10" value={inputs.role} onChange={(e) => setInputs({ ...inputs, role: e.target.value })}>
                        <option value="">Select Role</option>
                        <option value="student">Student</option>
                        <option value="recruiter">Recruiter</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className='flex'>
                    <input type="checkbox" onClick={() => showPassword()} className='w-4 h-4 mt-3' />
                    <span className='mt-2.5 ml-1 text-sm'>Show Password</span>
                </div>
                <div className=' inline-block mr-2'> Already have an account? </div>
                <Link to="/login" className='  text-blue-400 hover:underline hover:text-blue-600 mt-2 inline-block  '>
                    Login
                </Link>
                <div>
                    <button className="btn  btn-block btn-sm mt-2 bg-blue-400 hover:bg-blue-600 text-white" disabled={loading}>
                        {loading ? <span className='loading loading-spinner'></span> : 'Sign Up'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default Signup
