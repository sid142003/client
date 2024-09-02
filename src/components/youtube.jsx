import React from 'react';
import axios from 'axios';
import { API_URL } from "./constant/constant";
function AuthButton() {
    const authenticate = async () => {
       await  axios.get(`${API_URL}/youtube/authenticate`)
            .then(response => {
                console.log('Response:', response);
                // Redirect to Google's OAuth 2.0 server
                window.location.href = response.request.responseURL;
            })
            .catch(error => console.log('Error fetching auth URL:', error));
    };

    return (
        <button onClick={authenticate}>Authorize YouTube Access</button>
    );
}

export default AuthButton;
