import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Paper, Typography, CircularProgress, Link } from '@mui/material';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import Animaation from "../Animation - 1722927323769.json";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {API_URL} from '../constant/constant';

function EnhancedLogin({ history }) {  // If using React Router, you can utilize `history` for navigation
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [animationState, setAnimationState] = useState({
        isStopped: false, isPaused: false
      });
      const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Animaation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
        toast.error("Please enter all fields.");
        return;
    }

    if (!validateEmail(email)) {
        toast.error("Please enter a valid email address.");
        return;
    }

    setLoading(true);
    
    try {
        const response = await axios.post(`${API_URL}/users/login`, { email, password });
        
        // Assuming that any non-200 response is caught in the catch block, you don’t need this condition
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            toast.success("Login successful!");
            
            // Navigate to the events page after 1 second
            setTimeout(() => {
                navigate('/events');
            }, 1000);
        }
    } catch (error) {
        // Handling specific error scenarios if available
        if (error.response && error.response.status === 401) {
            toast.error("Invalid login credentials.");
            setEmail('');
            setPassword('');
        } else {
            toast.error("An error occurred during login. Please try again.");
        }
        console.error('Login error:', error);
    } finally {
        // Always ensure loading state is turned off
        setLoading(false);
    }
};


    


    const goToRegister = () => {
       navigate('/register');
    };

    return (
        <div style={{ display: 'flex',  alignItems: 'center', height: '80vh' ,gap:'100px'}}>
             <Lottie 
        options={defaultOptions}
        height={300}
        width={400}
        isStopped={animationState.isStopped}
        isPaused={animationState.isPaused}
      />
        <Container component="main" maxWidth="sm">
           
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Paper elevation={6} style={{ padding: '40px', marginTop: '10vh', borderRadius: '8px' }}>
                    <Typography component="h1" variant="h5" style={{ marginBottom: '20px', textAlign: 'center' }}>
                        Sign In
                    </Typography>
                    <form onSubmit={handleLogin}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '24px' }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                        </Button>
                        <Typography variant="body2" style={{ marginTop: '20px', textAlign: 'center' }}>
                            Not registered yet? <Link onClick={goToRegister} style={{ cursor: 'pointer' }}>Sign up here</Link>
                        </Typography>
                    </form>
                </Paper>
            </motion.div>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </Container>
        </div>
    );
}

export default EnhancedLogin;
