import { Link } from "react-router-dom"
import "../../../public/css/auth.css"
import axios from "axios"
import toast from "react-hot-toast"
import { useState } from "react"

function User_login_page() {
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault()

        setLoading(true)

        const login_formData = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        const toastloading = toast.loading("Login...")

        try {
            const res = await axios.post("http://localhost:3000/user/api/login", login_formData)

            const { message, message2, type } = res.data

            if (res.data.success) {
                toast[type](message, {
                    id: toastloading
                })
                toast.success(message2)
            }
            toast[type](message, {
                id: toastloading
            })

        } catch (err) {
            console.log("User login Frontend Error:", err);
            toast.error("Server Error")
        } finally{
            e.target.reset() // form reset
            setLoading(false)
        }

    }



    return (
        <>
            <div className="auth-container">
                <div className="auth-box">
                    <div className='signup_logo'>
                        <img src="/images/logo/logo.png" alt="E-commerce Website" />
                    </div>
                    <h2>Login</h2>
                    <p>Welcome back! Please login to your account</p>

                    <form className="login-form" onSubmit={handleLogin}>
                        <input type="email" name="email" placeholder="Email Address" style={{ backgroundImage: 'none' }} required />
                        <input type="password" name="password" placeholder="Password" required />

                        <button disabled={loading} style={{cursor : loading ? 'not-allowed' : 'pointer'}} className={loading ? 'opacity-50 cursor-not-allowed' : ''} type="submit">{loading ? "Please Wait...": "Login"}</button>
                    </form>
                    {/* <button onClick={() => loginWithGoogle()}>Continue with Google</button> */}

                    <p className="switch">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                    <p className='forgot-button' style={{ color: "#f39c12", fontWeight: "bold", cursor: "pointer" }}>Forgot Password?</p>
                </div>

                {/* User login Data */}
                {/* <pre style={{ color: 'white' }}>{JSON.stringify(user, user, 5)}</pre> */}
            </div>
        </>
    )
}


export { User_login_page }