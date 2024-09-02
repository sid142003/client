import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 3 }}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>Quick Links</Typography>
                        <Link href="#" color="inherit" underline="hover">About Us</Link><br/>
                        <Link href="#" color="inherit" underline="hover">Privacy Policy</Link><br/>
                        <Link href="#" color="inherit" underline="hover">Terms of Service</Link>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>Contact Us</Typography>
                        <Typography>email@example.com</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>Follow Us</Typography>
                        <IconButton color="inherit"><FacebookIcon /></IconButton>
                        <IconButton color="inherit"><TwitterIcon /></IconButton>
                        <IconButton color="inherit"><InstagramIcon /></IconButton>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>Subscribe</Typography>
                        <Typography>Get the latest news and updates right at your inbox.</Typography>
                        {/* Insert subscription form or link here */}
                    </Grid>
                </Grid>
                <Typography textAlign="center" sx={{ pt: 4 }}>
                    © 2024 Virtual Event Planner
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;
