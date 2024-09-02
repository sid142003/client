import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
import {API_URL} from '../constant/constant';
import axios from 'axios';
import Lottie from 'react-lottie';
import Animaation from "../Animation - 1722927323769.json";
function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: ''
    });
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
    

    const navigate = useNavigate();
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, email, password, phone } = formData;

        if (!username || !email || !password || !phone) {
            toast.error("All fields are required.");
            return;
        }

        // Example validation for email format
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email.");
            return;
        }

        // Example validation for phone format
        if (!/^\d{10}$/.test(phone)) {
            toast.error("Please enter a valid phone number (10 digits).");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/users/register`, {
                username,
                email,
                password,
                phone
            });

            console.log(response);

            console.log(response.data);

            if (response.status !== 201) {
                // Assuming 'error' is the key where the error message is stored
                toast.error(response.data.error || 'An unexpected error occurred');
                return;
            }


    toast.success("Registration successful!");
    

            setFormData({
                username: '',
                email: '',
                password: '',
                phone: ''
            });

            setTimeout(() => {
                navigate('/');  // Navigate after showing toast
            }, 1000);  // Delay of 2000 milliseconds (2 seconds)
            
        } catch (error) {
            toast.error("An error occurred during registration. Please try again.");
        }

       
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
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} style={{ padding: '20px', marginTop: '10vh' }}>
                <Typography component="h1" variant="h5" style={{ marginBottom: '20px' }}>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
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
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="phone"
                        label="Phone Number"
                        type="tel"
                        id="phone"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '24px' }}
                        
                    >
                        Register
                    </Button>
                </form>
            </Paper>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </Container>
        </div>
    );
}

export default Register;
