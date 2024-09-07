import React, { useState } from 'react';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Container, Input, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { API_URL } from './constant/constant';

const InputStyled = styled(Input)({
  display: 'none', // Hides the default HTML file input styling
});
function VideoUpload() {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [organizerId, setOrganizerId] = useState('');
  const { eventId, userType } = useParams();
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
        try {
            const response = await axios.get(`${API_URL}/videoList/getVideo`, {
                params: { eventId }  // Pass eventId as a query parameter
            });
            console.log('Videos:', response.data);
            setVideos(response.data);  // Assuming the response data is an array of videos
        } catch (error) {
            console.error('Failed to fetch videos:', error);
        }
    };

    fetchVideos();
}, [eventId]);


  useEffect(() => {
    // Fetch organizerId from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      setOrganizerId(user.id);
    }
  }, []);


  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !organizerId || !eventId) {
      toast.error('Please ensure all required fields are filled.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const uploadResponse = await axios.post(
        `${API_URL}/upload`, // Updated URL to include eventId and viewer
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      if (uploadResponse.status != 200) {
        toast.error("Failed to upload image");
      }
console.log("HELLO",uploadResponse.data.url);
      setVideoUrl(uploadResponse.data.url);
      const datatopodt=  await axios.post( 
          `${API_URL}/videoList/upload`, // Updated URL to include eventId and viewer
          {
            videoUrl: videoUrl,
            organizer: organizerId,
            eventId,
          }
        );

        console.log('Video uploaded is:', datatopodt);

        if((datatopodt.status != 201)){
          toast.error('Failed to upload video');
        }
        toast.success('Video uploaded successfully');
        setVideoUrl('');
        setFile(null);

    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      toast.error('Error uploading video.');
    }
  };
  


  return (
    <Container>
    {userType=="streamer"? <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <Typography variant="h6" color="primary" gutterBottom>Upload Video</Typography>
  
  <label htmlFor="contained-button-file">
    <InputStyled accept="video/*" id="contained-button-file" multiple type="file" onChange={handleFileChange} />
    <Button variant="contained" component="span" color="primary" sx={{ mb: 2 }}>
      {loading ? <CircularProgress color="inherit" size={24} /> : 'Choose File'}
    </Button>
  </label>
  <Button type="submit" variant="contained" color="primary" disabled={!file || loading}>
    Upload
  </Button>
</Box>
:""}


<Grid container spacing={5}>
            {videos.map((video) => (
                <Grid item xs={12} sm={6} md={4} key={video.eventId}>
                    <Card raised sx={{
                        maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '15px',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.15)', transition: "0.3s",
                        '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 12px 20px rgba(0,0,0,0.2)' }
                    }}>
                        <CardActionArea sx={{ flexGrow: 1 }}>
                        <CardMedia
    component="video"
    height="200"
    controls  // Optional but usually necessary for video playback
    src={video.videoUrl}  // Use src instead of video to specify the video source
    alt="Video thumbnail"  // alt is not used in video tags, so it can be removed
/>

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Organizer: {video.organizer}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Button size="small" color="primary" onClick={() => window.open(video.videoUrl, '_blank')}>
                                Watch Video
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
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

    </Container>
   
  );
}

export default VideoUpload;
