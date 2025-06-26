import React from "react";

const VideoBackground = () => {
    return (
        <div className="video-background">
            <video autoPlay muted loop className="video-element">
                <source
                    src="https://assets.mixkit.co/videos/30222/30222-720.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
            <div className="overlay"></div>
        </div>
    );
};

export default VideoBackground;