import { motion } from "framer-motion";

const LoginPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                    Login
                </h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phone"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="mb-4 flex items-center">
                        <input type="checkbox" id="save-info" className="mr-2" />
                        <label htmlFor="save-info" className="text-sm text-gray-700">Save Information</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Log In
                    </button>

                    <div className="text-center mt-4">
                        <a href="/forgotpassword" className="text-sm text-blue-500 hover:underline">
                            Forgot Password?
                        </a>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default LoginPage;
