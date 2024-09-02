import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Button,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from "axios";
import { API_URL } from "./constant/constant";
import { toast, ToastContainer } from "react-toastify";

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: new Date(),
    endTime: new Date(),
     streamerCode: "",
    viewerCode: ""
   
  });

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageURL, setImageURL] = useState("");


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl("");
    setImage(null);
    setImageURL(""); // Clear the image URL if the image is removed
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, newValue) => {
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleApproveImage = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("No image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status != 200) {
        toast.error("Failed to upload image");
      }

      toast.success("Image uploaded successfully");
      console.log("Image URL:", response.data);
      setImageURL(response.data.url);
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const handleSubmit = async (event) => {
    localStorage.getItem("token");
    event.preventDefault();
    const completeFormData = {
      ...formData,
      imageUrl: imageURL,
    };
console.log("HELO",completeFormData);
    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Properly format the Authorization header
      };

      const response = await axios.post(
        `${API_URL}/events/create-event`,
        completeFormData,
        { headers }
      );

      if (!response) {
        toast.error("Failed to create event");
      }
      console.log("Event created:", response.data);
      toast.success("Event created successfully");
      setFormData({
        title: "",
        description: "",
        startTime: new Date(),
        endTime: new Date(),
        streamerCode: "",
        viewerCode: ""
      });
      setPreviewUrl("");
      setImage(null);
      setImageURL("");

    } catch (error) {
      
      toast.error("Failed to create event");
    }
  };


  
  const ImagePreview = ({ src, onRemove, onApprove }) => {
    return (
      <div style={{ position: "relative", marginTop: 20, marginBottom: 20 }}>
        <img
          src={src}
          alt="Preview"
          style={{ width: "100%", height: "auto" }}
        />
        <button
          onClick={onRemove}
          style={{
            position: "absolute",
            top: 10,
            right: 40,
            cursor: "pointer",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: 30,
            height: 30,
          }}
        >
          ×
        </button>
        <button
          onClick={onApprove}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            cursor: "pointer",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: 30,
            height: 30,
          }}
        >
          ✓
        </button>
      </div>
    );
  };
  return (
    <Container component="main" maxWidth="md" >
  <Card raised sx={{ mt: 4, overflow: 'hidden', borderRadius: '15px' }}>
    <CardContent>
      <Typography variant="h5" component="h2" gutterBottom style={{ fontWeight: 'bold', color: '#333' }}>
        Create Event
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          required
          InputLabelProps={{ style: { color: '#6b5b95' } }}
          InputProps={{ style: { color: '#333', fontWeight: '500' } }}
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          required
          InputLabelProps={{ style: { color: '#6b5b95' } }}
          InputProps={{ style: { color: '#333' } }}
        />
            <TextField
              fullWidth
              label="Viewer Code"
              name="viewerCode"
              value={formData.viewerCode}
              onChange={handleChange}
              margin="normal"
              required
            />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label="Start Time"
                value={formData.startTime}
                onChange={(newValue) => handleDateChange("startTime", newValue)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label="End Time"
                value={formData.endTime}
                onChange={(newValue) => handleDateChange("endTime", newValue)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required />
                )}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>

        {previewUrl ? (
          <ImagePreview
            src={previewUrl}
            onRemove={handleRemoveImage}
            onApprove={handleApproveImage}
            style={{ marginTop: '15px' }}
          />
        ) : (
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2, backgroundColor: '#6b5b95', color: '#fff' }}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, backgroundColor: '#6b5b95', color: '#fff' }}
        >
          Create Event
        </Button>
      </form>
    </CardContent>
  </Card>
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

export default CreateEvent;
