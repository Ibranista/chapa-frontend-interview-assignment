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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7DC242] via-[#A6E67B] to-[#7DC242]">
                <div className="text-center text-lg font-semibold text-[#4B6B1A] bg-white/80 px-8 py-6 rounded-xl shadow-lg">
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7DC242] via-[#A6E67B] to-[#7DC242]">
            <div className="w-full max-w-lg mx-auto p-12 bg-white/95 rounded-3xl shadow-2xl border border-[#7DC242]/20">
                <div className="flex flex-col items-center mb-10">
                    <img src={logo} alt="Logo" className="w-20 h-20 mb-3" />
                    <h2 className="text-4xl font-extrabold text-[#7DC242] mb-2 tracking-tight">Welcome Back</h2>
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
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7DC242] focus:border-[#7DC242] transition placeholder-gray-400 text-lg"
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
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7DC242] focus:border-[#7DC242] transition placeholder-gray-400 text-lg"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1 ml-1" />
                            </div>

                            {userData.error && (
                                <div className="bg-red-100 border border-red-300 text-red-600 text-sm rounded-md px-3 py-2 text-center animate-fade-in">
                                    {userData.error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting || userData.loading}
                                className={`w-full py-3 px-4 rounded-xl text-white font-bold shadow-md text-lg transition-all duration-200 ${userData.loading || isSubmitting
                                    ? "bg-[#A6E67B] cursor-not-allowed"
                                    : "bg-gradient-to-r from-[#7DC242] to-[#4B6B1A] hover:from-[#6BBF2B] hover:to-[#3E5C16] focus:ring-2 focus:ring-[#7DC242] focus:outline-none"}
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
