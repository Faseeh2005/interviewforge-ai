import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";



import {

    loginUser,

    getCurrentUser

} from "../services/authService";



import { useAuth } from "../context/AuthContext";



import Button from "../components/ui/Button";

import Card from "../components/ui/Card";

import Input from "../components/ui/Input";



function Login() {



    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");



    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);



    const navigate = useNavigate();

    const { setUser } = useAuth();



    const handleLogin = async () => {



        setError("");

        setLoading(true);



        try {



            const response = await loginUser(

                email,

                password

            );



            localStorage.setItem(

                "token",

                response.access_token

            );



            const user = await getCurrentUser();



            setUser(user);



            navigate("/dashboard");



        } catch (err) {



            setError(

                err.response?.data?.detail ||

                err.message ||

                "Login failed."

            );



        } finally {



            setLoading(false);



        }



    };



    return (



        <div

            style={{

                minHeight: "100vh",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                background: "#0f172a",

                padding: "30px",

            }}

        >



            <Card>



                <h1

                    style={{

                        fontSize: "42px",

                        fontWeight: "700",

                        color: "white",

                        textAlign: "center",

                        marginBottom: "12px",

                    }}

                >

                    InterviewForge AI

                </h1>



                <p

                    style={{

                        color: "#94a3b8",

                        textAlign: "center",

                        fontSize: "18px",

                        marginBottom: "40px",

                    }}

                >

                    Practice AI-powered mock interviews and improve your technical skills.

                </p>



                <div style={{ marginBottom: "24px" }}>

                    <Input

                        type="email"

                        placeholder="Email"

                        value={email}

                        onChange={(e) => setEmail(e.target.value)}

                    />

                </div>



                <div style={{ marginBottom: "24px" }}>

                    <Input

                        type="password"

                        placeholder="Password"

                        value={password}

                        onChange={(e) => setPassword(e.target.value)}

                    />

                </div>



                {error && (

                    <p

                        style={{

                            color: "#ef4444",

                            marginBottom: "20px",

                            textAlign: "center",

                        }}

                    >

                        {error}

                    </p>

                )}



                <Button

                    onClick={handleLogin}

                    disabled={loading}

                >

                    {loading ? "Logging in..." : "Login"}

                </Button>



                <p

                    style={{

                        textAlign: "center",

                        marginTop: "35px",

                        color: "#94a3b8",

                    }}

                >

                    Don't have an account?{" "}



                    <Link

                        to="/register"

                        style={{

                            color: "#3b82f6",

                            textDecoration: "none",

                            fontWeight: "600",

                        }}

                    >

                        Register

                    </Link>

                </p>



            </Card>



        </div>



    );



}



export default Login;