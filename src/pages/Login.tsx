import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { selectUser } from "@/features/selectors/user.selector";
import { login } from "@/features/thunk/auth.thunk";
import { loginSchema, registerInitialValues } from "@/schema/auth.schema";
import logo from "@/assets/logo.svg";

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
                                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" /></svg>
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
                                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect width="16" height="12" x="4" y="8" stroke="currentColor" strokeWidth="2" rx="2" /><path stroke="currentColor" strokeWidth="2" d="M8 8V6a4 4 0 1 1 8 0v2" /></svg>
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
                                <div className="error-style">
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
