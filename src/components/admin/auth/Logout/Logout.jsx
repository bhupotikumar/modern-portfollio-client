import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router';
import auth from '../../../../firebase/firebase.auth';

const Logout = ({ className, children }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className={className || 'btn btn-primary'}
        >
            {children || "Logout"}
        </button>
    );
};

export default Logout;