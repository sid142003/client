import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreateEvent from './components/CreateEvent';
import { Container } from '@mui/material';
import AuthCheck from './components/auth/check';  // Ensure this path is correct
import CoffeeButton from './components/coffeeButton';
// import StreamerComponent from './components/Streamer';
// import ViewerComponent from './components/Viewer';
// import Youtube from './components/youtube';
import VideoUpload from './components/videoUpload';

function App() {
  return (
    <PayPalScriptProvider options={{ "client-id": "AU6nLSQW8dEaFgB7eEdzG5thaHcxCCMnKWvK839GIHkC-V6sc_JlEZTVjrhZOUAbWvF5Hck3OboKbnyq", "currency": "USD" }}>
        <Router>
      <AuthCheck>  
          <Navbar />
          <Container style={{ padding: '20px'
           }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/events" element={<Home />} />
              <Route path="/create-event" element={<CreateEvent />} />
              {/* <Route path="/livestream/:eventId/streamer" element={<StreamerComponent />} />
              <Route path="/livestream/:eventId/viewer" element={<ViewerComponent />} /> */}
              {/* <Route path="/youtube" element={<Youtube/>}/> */}
              <Route path="/upload/:eventId/:userType" element={<VideoUpload />} />
            </Routes>
          </Container>
          <CoffeeButton />
          <Footer />
      </AuthCheck>
        </Router>
    </PayPalScriptProvider>
  );
}

export default App;
