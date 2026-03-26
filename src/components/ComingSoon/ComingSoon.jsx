
const ComingSoon = () => {
    return (
        <div className="flex items-center justify-center w-full h-full p-12 bg-linear-to-r from-purple-400 via-pink-500 to-red-400">
            <div className="text-center p-8 bg-white bg-opacity-90 rounded-2xl shadow-xl max-w-md">
                <h1 className="text-5xl font-extrabold text-gray-800 mb-4 animate-bounce">
                    🚀 Coming Soon
                </h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    Feature Under Development
                </h2>
                <p className="text-gray-600 mb-6">
                    We are working hard to bring this feature to you. Stay tuned!
                </p>
                <div className="flex justify-center gap-4">
                    <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition">
                        Notify Me
                    </button>
                    <button className="px-6 py-3 bg-gray-300 text-gray-800 font-medium rounded-lg shadow hover:bg-gray-400 transition">
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;