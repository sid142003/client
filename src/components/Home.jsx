import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { Container, Grid,  Dialog, DialogActions, DialogTitle ,DialogContent, TextField, DialogContentText,CardActionArea,CardActions, Typography, Button, Card, CardMedia, CardContent } from '@mui/material';
import { API_URL } from "./constant/constant";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

import LiveTvIcon from '@mui/icons-material/LiveTv';
function HomePage() {

    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [eventId, setEventId] = useState(null);
    const [code, setCode] = useState('');
    const [error, setError] = useState(false);
  
    const handleClose = () => {
      setOpen(false);
      setError(false);
      setCode('');
    };
  
    const handleCodeChange = (event) => {
      setCode(event.target.value);
      if (error) {
        setError(false); // Reset error when user starts typing again
      }
    };
  
    const handleJoinStream = async () => {
      const data = await  axios.get(`${API_URL}/events/get-event-by-eventid/${eventId}`);
      if (code==data.data.viewerCode) { // Example: Hardcoded validation code
        navigate(`/upload/${eventId}/viewer`);
        setOpen(false);
      } else {
        toast.error("Invalid access code. Please try again.");
        setError(true);
      }
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${API_URL}/events/get-events`);
                console.log(response.data); // Axios automatically handles the JSON parsing
                setEvents(response.data); // Assuming setEvents is your state setter function
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
    
        fetchEvents();
    }, []); // Don't forget to include the dependency array
    
    function LiveDot() {
        return (
          <span style={{
            height: '10px',
            width: '10px',
            backgroundColor: 'white', // Changed color to white for contrast
            borderRadius: '50%',
            display: 'inline-block',
            marginRight: '5px',
            position: 'relative',
            top: '-1px',
            boxShadow: '0 0 5px #ff0000', // Red glow for visibility
            animation: 'blink-animation 1s infinite'
          }} />
        );
      }
    function formatDateTime(isoString) {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
          weekday: 'long', // "Monday"
          year: 'numeric', // "2024"
          month: 'long', // "August"
          day: 'numeric', // "5"
          hour: 'numeric', // "12 AM/PM"
          minute: '2-digit' // "00"
        });
      }

      const createBooking = async (eventId) => {
        try {
            const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
            const headers = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}` // Properly format the Authorization header
            };
      console.log(headers);
      console.log(eventId);
            const response = await axios.post(
              `${API_URL}/bookings/create-booking`,
               {eventId} ,
              {headers}
            );
    
            if (!response) {
              toast.error("Failed to create booking");
            }
            console.log("Booking created:", response.data);
            toast.success("Booking created successfully");
            // fetchAllRsvpStatuses();
        } catch (error) {
          console.error('Error creating booking:', error);
          alert('Failed to RSVP');
        }
      };
      const [rsvpStatuses, setRsvpStatuses] = useState({}); // Stores RSVP status by eventId

      useEffect(() => {
        const fetchAllRsvpStatuses = async () => {
            const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
            if (!token) return;
    
            // This assumes you have an API endpoint that can check multiple events at once or you can loop through events
            const eventIds = events.map(event => event._id);
            try {
              const responses = await Promise.all(
                eventIds.map(eventId =>
                    axios.get(`${API_URL}/bookings/mybookings/${eventId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                )
            );
                console.log("Hello",responses);
                const statusMap = {};
                responses.forEach((response, index) => {
                    statusMap[eventIds[index]] = response.data.hasBooking;
                });
    console.log(statusMap);
                setRsvpStatuses(statusMap);
            } catch (error) {
                console.error('Error fetching RSVP statuses:', error);
            }
        };
    
        if (events.length > 0) {
            fetchAllRsvpStatuses();
        }
    }, [events]); // Dependency array, re-run when events change
    const isEventLive = (startTime, endTime) => {
        const now = new Date();
        return now >= new Date(startTime) && now < new Date(endTime);
      };


      const joinLiveStream = async (id) => {
      const data = await  axios.get(`${API_URL}/events/get-event-by-eventid/${id}`);

      const user= JSON.parse(localStorage.getItem("user"));
      

        if (data.data.organizer === user.id) {
          navigate(`/upload/${id}/streamer`);
          return;
        }
        else{
        setEventId(id);
        setOpen(true);
        }
      };

        const isEventFutureOrLive = (endTime) => {
            const now = new Date();
            return now < new Date(endTime);
          };
      
          
    return (
        <>
        <style>
        {`
          @keyframes blink-animation {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}
      </style>
      <Container maxWidth="lg" style={{ backgroundColor: '#f4f4f9', color: '#333' }}>
      <header style={{ padding: '40px 0', textAlign: 'center', background: 'linear-gradient(145deg, #6b5b95, #black)' }}>
          <Typography variant="h3" style={{ color: 'black', fontWeight:'bold', marginBottom: '10px' }}>Virtual Event Planner</Typography>
          <Typography variant="subtitle1" style={{ color: 'grey', fontSize: '1.2rem' }}>Plan and attend the best virtual events from around the world.</Typography>
      </header>
  
      <section style={{ margin: '50px 0' }}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: '600' }}>Upcoming Events</Typography>
      <Grid container spacing={5}>
      {events.filter(event => isEventFutureOrLive(event.endTime)).map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event._id || event.id}>
                  <Card raised sx={{
                      maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '15px',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.15)', transition: "0.3s",
                      '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 12px 20px rgba(0,0,0,0.2)' }
                  }}>
                      <CardActionArea sx={{ flexGrow: 1 }}>
                          <CardMedia
                              component="img"
                              height="200"
                              image={event.imageUrl}
                              alt={event.title}
                              style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                          />
                          <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                  {event.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                  {event.description}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                  Start: {formatDateTime(event.startTime)}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                  End: {formatDateTime(event.endTime)}
                              </Typography>
                          </CardContent>
                      </CardActionArea>
      
                      <CardActions sx={{ justifyContent: 'space-between' }}>
                      {!isEventLive(event.startTime, event.endTime) && (
                            rsvpStatuses[event._id] ? (
                                <Button
                                size="small"
                                color="primary"
                                disabled
                                sx={{
                                    color: 'white !important',
                                    '&.Mui-disabled': {
                                            opacity: 0.7
                                        }
                                    }}
                                >
                                Registered
                                </Button>
                            ) : (
                                <Button size="small" color="primary" onClick={() => createBooking(event._id)}>
                                    RSVP
                                </Button>
                            )
                          )}
                          {isEventLive(event.startTime, event.endTime) ? (
                              <Button
                                  size="small"
                                  sx={{
                                      color: '#fff',
                                      backgroundColor: '#ff0000', // Red color
                                      '&:hover': {
                                          backgroundColor: '#cc0000' // Darker shade on hover
                                      },
                                      marginLeft: 'auto' // Align to the right
                                  }}
                                  startIcon={<LiveDot />}
                                  onClick={() => joinLiveStream(event._id)}
                              >
                                  Join Live  <LiveTvIcon />
                              </Button>
                          ):(
                                <Button
                                size="small"
                                color="primary"
                                
                                sx={{
                                    color: 'white !important',
                                    '&.Mui-disabled': {
                                            opacity:1
                                        }
                                    }}
                                    onClick={() => joinLiveStream(event._id)}
                                >
                                    Join
                                </Button>

                                

                          )}
                      </CardActions>
                  </Card>
              </Grid>
          ))}
      </Grid>
    </section>
  
      <section style={{ textAlign: 'center',borderRadius:'10px', margin: '60px 0', padding: '20px', background: 'rgba(107, 91, 149, 0.1)' }}>
          <Typography variant="h4" gutterBottom style={{ fontWeight: '600' }}>Become a Host</Typography>
          <Typography variant="subtitle1" gutterBottom>Start hosting your own events and reach a global audience instantly.</Typography>
          <Button variant="contained" color="primary" onClick={() => window.location.href = '/create-event'}>Start Hosting</Button>
      </section>
      <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
  <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Your Access Code</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="accessCode"
            label="Access Code"
            type="text"
            fullWidth
            variant="standard"
            value={code}
            onChange={handleCodeChange}
            error={error}
            helperText={error ? "Invalid code, please try again." : "Please enter the code to proceed."}
          />
        </DialogContent>
        <DialogActions>
        
          <Button onClick={ handleJoinStream}>Join </Button>
        </DialogActions>
      </Dialog>
  </Container>
  </>
    );
}

export default HomePage;
