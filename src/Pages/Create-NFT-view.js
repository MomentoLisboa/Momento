import React, { useState } from 'react';
import { loadCameraStream } from "../utils/camera";
import { getCurrentLocation } from "../utils/location";

const CreateNFTView = () => {
    const [isLocationEnabled, setIsLocationEnabled] = useState();
    const [currentPosition, setCurrentPosition] = useState({});
    const [timeOfPicture, setTimeOfPicture] = useState();
    const [pictureTaken, setPictureTaken] = useState(false);
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");

    const createNFT = (e) => {
        e.preventDefault();
        console.log("TODO");
    }

    const loadPhoto = async (e) => {
        e.preventDefault();
        const location = await getCurrentLocation();
    
        if (!location) {
            console.log("LOCATION IS NOT ENABLED");
            setIsLocationEnabled(false);
        } else {
            console.log("LOCATION IS ENABLED");
            setIsLocationEnabled(true);
        }
        console.log("INSIDE GET GEOLOCATION");
        console.log(location);
    
        setCurrentPosition({ latitude: location.coords.latitude, longitude: location.coords.longitude });
        setTimeOfPicture(location.timestamp);

        const stream = await loadCameraStream();
        if (stream) {
            console.log("We have a stream");
            console.log("Setting src");
            const videoElement = document.querySelector("#video");
            if (videoElement) {
                videoElement.srcObject = stream;
            } else {
                console.log("Unable to bind src video");
            }
        }
    }

    const takePhoto = async (e) => {
        e.preventDefault();
        const videoElement = document.querySelector("#video");
        const canvasElement = document.querySelector("#canvas");
        canvasElement.setAttribute("width", videoElement.width);
        canvasElement.setAttribute("height", videoElement.height);
        canvasElement.getContext('2d').drawImage(videoElement, 0, 0, videoElement.width, videoElement.height);
        const image_data_url = canvasElement.toDataURL('image/jpeg');
        setPictureTaken(true)
    
        console.log(image_data_url);
    }

    return (<>
        <h1 className="text-white">CREATE</h1>
        <form onSubmit={createNFT}>
            <input
                id={"title"}
                type={"text"}
                className={""}
                placeholder={"Event Title"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                id={"description"}
                type={"text"}
                className={""}
                placeholder={"Event Description"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            {!pictureTaken && <video id="video" autoplay="" width="370" height="277"/>}
            <button onClick={loadPhoto}>Load Camera</button>
            <canvas id="canvas"/>
            <button onClick={takePhoto}>Take Picture</button>
            <button type="submit">Mint</button>
        </form>
    </>)
}

export default CreateNFTView;
