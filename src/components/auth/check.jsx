import { useEffect , useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthCheck = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
   
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        const authPaths = ['/', '/register'];
console.log("hello byee")
        // Redirect to home if on auth pages and token exists
        if (token && authPaths.includes(location.pathname) ) {
            console.log('redirecting to home');
            navigate('/events');
        }

        // Redirect to login if not on auth pages and no token exists
        if (!token && !authPaths.includes(location.pathname)) {
            navigate('/');
        }
    }, [navigate, location.pathname]);
    

    return children;
};

export default AuthCheck;
