import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function User_signup_page() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        setLoading(true)

        let country_code = e.target.country_code.value.trim()

        if (!country_code.startsWith("+")) {
            country_code = `+${country_code}`
        }

        const formData = {
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            confirm_password: e.target.confirm_password.value,
            country_code: country_code,
            phone_number: e.target.phone_number.value
        }

        if (formData.password !== formData.confirm_password) {
            return toast.error("Password did not match!")
        }

        const toastloading = toast.loading("Creating Account...")

        try {
            const res = await axios.post("http://localhost:3000/user/api/sign_up", formData)

            console.log('Signup page Response data:', res.data);

            const { message, message2, type } = res.data

            if (res.data.success) {
                toast[type](message, {
                    id: toastloading
                })
                toast[type](message2)
            }

            toast[type](message, {
                id: toastloading
            })

            if(res.data.redirect){
                setTimeout(() => {
                    toast.dismiss()
                    navigate("/login")
                }, 1500);
            }


        } catch (err) {
            console.log("Signup Form Submit Error:", err);
            toast.error(res.data.message || "Server Error", {
                id: toastloading
            });
        } finally{
            e.target.reset() // form reset
            setLoading(false)
        }

    }


    return (
        <>

            <div className="auth-container">
                <div className="auth-box signup-box">
                    <div className='signup_logo'>
                        <img src="/images/logo/logo.png" alt="E-commerce Website" />
                    </div>

                    {/* <img src="/images/logo/logo.png" alt="E-commerce Website" style={{height : "20%"}}/> */}
                    <h2>Sign in or Create Account</h2>
                    {/* <p>E-commerce Platform</p> */}

                    <form className="signup-form" onSubmit={handleSubmitForm}>
                        {/* Name  */}
                        <div className="row">
                            <input type="text" name="first_name" placeholder="First Name" required />
                            <input type="text" name="last_name" placeholder="Last Name" required />
                        </div>

                        {/* Email  */}
                        <input type="email" name="email" placeholder="Email Address" required />

                        {/* Password  */}
                        <input type="password" name="password" placeholder="Create Password" minLength={8} required />
                        <input type="password" name="confirm_password" placeholder="Repeat Password" required />

                        {/* Phone Number  */}
                        <div className="row phone_row">
                            <input type="tel" name="country_code" className='phn-spin' style={{ width: "15%" }} defaultValue={'+91'} maxLength={4} required />
                            <input type="number" name="phone_number" className='phn-spin' placeholder="Enter Your Phone Number" maxLength={10} onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10) }} required />
                        </div>

                        <button disabled={loading} style={{cursor : loading ? 'not-allowed' : 'pointer'}} className={loading ? 'opacity-50 cursor-not-allowed' : ''} type="submit">{loading ? "Please Wait..." : "Sign up"}</button>
                    </form>


                    <p className="switch">
                        Already have an account? <Link to="/login">Login</Link>
                        {/* <a href="/login">Login</a> */}
                    </p>
                </div>

            </div >

        </>
    )
}

export default User_signup_page