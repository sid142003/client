import React from 'react';
import VideoPlayer from './Livestream';

const ViewerComponent= ({ streamUrl }) => {
    const videoOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: streamUrl,
            type: 'application/x-mpegURL' // Assuming HLS stream
        }]
    };

    return <VideoPlayer options={videoOptions} />;
};

export default ViewerComponent;
