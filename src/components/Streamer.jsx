import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from './constant/constant';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StreamerComponent = () => {
    const { eventId } = useParams();
    const [eventDetails, setEventDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [streamKey, setStreamKey] = useState('');


    const handleStreamControl = async (action) => {
        // Placeholder for controlling the stream, e.g., start or stop
        try {
            const response = await axios.post(`${API_URL}/stream/control`, {
                eventId,
                action
            });
            toast.info(response.data.message);
        } catch (error) {
            toast.error("Failed to control stream.");
            console.error("Error controlling stream:", error);
        }
    };

    if (loading) {
        return <div>Loading event details...</div>;
    }

    if (!eventDetails) {
        return <div>No event details available.</div>;
    }

    return (
        <div>
            <h1>Live Streaming Dashboard</h1>
            <p>Here you can manage your live stream for event ID: {eventId}</p>
            <p>Stream Key: {streamKey}</p>
            <div>
                <button onClick={() => handleStreamControl('start')}>Start Stream</button>
                <button onClick={() => handleStreamControl('stop')}>Stop Stream</button>
            </div>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default StreamerComponent;
