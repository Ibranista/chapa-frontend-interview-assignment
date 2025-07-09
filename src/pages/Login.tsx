import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { selectUser } from "@/features/selectors/user.selector";
import { login } from "@/features/thunk/auth.thunk";
import { loginSchema, registerInitialValues } from "@/schema/auth.schema";
import logo from "@/assets/logo.svg";
import { FaLock, FaUser } from "react-icons/fa";

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const userData = useSelector(selectUser);

    if (userData.loading) {
        return (
            <div className="form-main-wrapper">
                <div className="form-main-loading-text">
                    Loading...
                </div>
            </div>
        );
    }

    if (userData.user) {
        return <Navigate to="/" replace />;
    }

    const handleSubmit = async (values: typeof registerInitialValues) => {
        await dispatch(login({ username: values.username, password: values.password }) as any);
    };

    return (
        <div className="form-main-wrapper">
            <div className="form-inner-wrapper">
                <div className="login-form">
                    <img src={logo} alt="Logo" className="w-20 h-20 mb-3" />
                    <h2 className="login-welcome">Welcome Back</h2>
                    <p className="text-[#4B6B1A] text-base">Sign in to your account</p>
                </div>
                <Formik
                    initialValues={registerInitialValues}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-8 p-3">
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7DC242]">
                                    <FaUser className="mb-4" />
                                </span>
                                <Field
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    autoComplete="username"
                                    className="field-style"
                                />
                                <ErrorMessage name="username" component="div" className="text-red-500 text-xs mt-1 ml-1" />
                            </div>

                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7DC242]">
                                    <FaLock className="mb-4" />
                                </span>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    className="field-style"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1 ml-1" />
                            </div>

                            {userData.error && (
                                <div className="error-style animate-fade-in">
                                    {userData.error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting || userData.loading}
                                className={`w-full py-3 px-4 rounded-xl text-white font-bold shadow-md text-lg transition-all duration-200 ${userData.loading || isSubmitting
                                    ? "bg-[#A6E67B] cursor-not-allowed"
                                    : "not-submitting-btn-style"}
                                `}
                            >
                                {userData.loading || isSubmitting ? "Logging in..." : "Login"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
