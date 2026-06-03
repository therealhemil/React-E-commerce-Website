import React, { useState } from 'react'
import "../../../public/css/auth.css"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Admin_login_page() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleAdminLogin = async (e) => {
        e.preventDefault()

        setLoading(true)

        const Admin_login_formData = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        const toastloading = toast.loading("Login...")
        try {
            const res = await axios.post("http://localhost:3000/admin/api/login", Admin_login_formData)

            const { message, type } = res.data
            toast[type](message, {
                id: toastloading
            })

            setTimeout(() => {
                navigate('/admin/dashboard')
            }, 1500);

        } catch (err) {
            console.log("Admin login Frontend Error:", err);
            toast.error("Server Error")
        } finally {
            e.target.reset() // form reset form
            setLoading(false)
        }
    }

    return (
        <>
            <div className="auth-container">

                <div className="auth-box" style={{ height: '360px' }}>
                    <div className='signup_logo'>
                        <img src="/images/logo/logo.png" alt="E-commerce Website" />
                    </div>
                    <h2>Admin Login</h2>
                    <p>Welcome back! Please login to your account</p>

                    <form className="admin-login-form" onSubmit={handleAdminLogin}>
                        <input type="email" name="email" placeholder="Email Address" required />
                        <input type="password" name="password" placeholder="Password" required />

                        <button disabled={loading} style={{cursor : loading ? 'not-allowed' : 'pointer'}} className={loading ? 'opacity-50 cursor-not-allowed' : ''} type="submit">{loading ? "Please Wait..." : "Admin Login"}</button>
                    </form>
                </div>

            </div>

        </>
    )
}

export default Admin_login_page
