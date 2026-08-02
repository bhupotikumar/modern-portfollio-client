import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import auth from '../../../../firebase/firebase.auth';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/admin"

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate(from, { replace: true });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
            <form onSubmit={handleSubmit}
                className="fieldset bg-base-200 border-base-300 rounded-box w-96 border p-6 shadow-lg">

                <legend className="fieldset-legend text-xl font-semibold">
                    Admin Login
                </legend>

                {/* Email */}
                <label className="label">Email</label>
                <input
                    type="email"
                    name='email'
                    className="input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* Password */}
                <label className="label mt-2">Password</label>
                <input
                    type="password"
                    name='password'
                    className="input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                )}

                {/* Button */}
                <button
                    type="submit"
                    className="btn btn-neutral mt-4"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;