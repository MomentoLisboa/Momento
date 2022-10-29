import React, { useState } from 'react';
import { ethers } from "ethers";
import { NFTStorage, File } from 'nft.storage';
import { useSigner, useAccount, Web3Button } from '@web3modal/react'

import { loadCameraStream } from "../utils/camera";
import { getCurrentLocation } from "../utils/location";
import MomentoABI from "../utils/MomentoABI.json";

const CreateNFTView = ({ appState }) => {
    const [isLocationEnabled, setIsLocationEnabled] = useState();
    const [currentPosition, setCurrentPosition] = useState({});
    const [timeOfPicture, setTimeOfPicture] = useState();
    const [pictureTaken, setPictureTaken] = useState(false);
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [imageData, setImageData] = useState();
    const { account, isReady } = useAccount();

    const [fontSize, setFontSize] = useState(20)

    const createNFT = async (e) => {
        e.preventDefault();

        if(window.ethereum) {
            await window.ethereum.enable();
            console.log("we have ethereum");
        }
        const [owner] = await window.ethereum.request({ method: 'eth_requestAccounts' });

        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const signer = await provider.getSigner(owner);

        const momento = new ethers.Contract(
            "0x92e16023C1201aEf432cEb15677791AE03966De6",
            MomentoABI.abi,
            signer
        );

        console.log("UPLOADING DATA");
        const storage = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZGOTMwMEMxNWRmMTIxMEMyRTA4YTVEZWY5OTkwRDM4ZTE1MTNmN0IiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NzA1NDM4Nzg1NCwibmFtZSI6Im1vbWVudG8ifQ.HIWCpDx1iBfNWkcB-oRH80rMj7ZkQVDKf6F6oLCotok" })
        const metadata = await storage.store({
            name: title,
            description: description,
            image: new File(
                [
                    imageData
                ],
                'profile_picture.jpg',
                { type: 'image/jpg' }
            ),
            properties: {
                type: "image",
                coords: currentPosition,
                timestamp: timeOfPicture,
                tags: ["WEB3", "CRYPTO", "CONFERENCE"]
            }
        });

        console.log("MINTING");

        const result = await momento.connect(signer).mint(owner, metadata.url);

        console.log(result);
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
        setImageData(image_data_url);
    
        console.log(image_data_url);
    }

    return (<>
        <h1 className="text-white">CREATE</h1>
        <form onSubmit={createNFT}>
            <input
                style={{width:'100%', fontSize}}
                id={"title"}
                type={"text"}
                className={""}
                placeholder={"Event Title"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                style={{width:'100%', fontSize}}
                id={"description"}
                type={"text"}
                className={""}
                placeholder={"Event Description"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            {!pictureTaken && <video id="video" autoplay="" width="370" height="277"/>}
            <button onClick={loadPhoto} style={{width:'50%', fontSize}}>Load Camera</button>
            <canvas id="canvas"/>
            <button onClick={takePhoto} style={{width:'50%', fontSize}}>Take Picture</button>
            <Web3Button/>
            <button type="submit" style={{width:'50%', fontSize}}>Mint</button>
        </form>
    </>)
}

export default CreateNFTView;
