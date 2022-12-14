import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { NFTStorage, File } from 'nft.storage';
import { useSigner, useAccount, Web3Button } from '@web3modal/react'

import useLensHub from '../hooks/useLensHub';
import { useWeb3Polygon } from '../hooks/useWeb3';

import MenuOptions from '../componants/MenuOptions';

import { loadCameraStream } from "../utils/camera";
import { getCurrentLocation } from "../utils/location";
import MomentoABI from "../utils/MomentoABI.json";

const CreateNFTView = ({ appState, goToMap, goToList }) => {
    const [isLocationEnabled, setIsLocationEnabled] = useState();
    const [currentPosition, setCurrentPosition] = useState({});
    const [timeOfPicture, setTimeOfPicture] = useState();
    const [pictureTaken, setPictureTaken] = useState(false);
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [imageData, setImageData] = useState();
    const { account, isReady } = useAccount();

    const [fontSize, setFontSize] = useState(20)

    const [granted, setGranted] = useState(false);
    
    const web3Polygon = useWeb3Polygon();
    const LensHub = useLensHub();

    console.log(account.address)

    useEffect(()=>{
        const getUserData = async () => {
            if(account.address == ""){
                setGranted(false)
                return
            };
            const checkSumAddress = web3Polygon.utils.toChecksumAddress(account.address);
            const profileId = await LensHub.methods.defaultProfile(checkSumAddress).call();

            setGranted(profileId != 0) // if profileId different to zero it means that this wallet get an Lens profile
        }
        getUserData()
    }, [account])


    

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

    const shortenString = (stringToShorten) => {
        const firstPart = stringToShorten.substring(0, 6);
        const secondPart = stringToShorten.substring(stringToShorten.length - 6, stringToShorten.length)
        return `${firstPart}..${secondPart}`;
    }

    var GrandView = (<></>)

    if(granted == true){
        GrandView = (<><img src="https://lens.xyz/static/media/lensfrens.2f28dc59c1c3058c6d170c5c6a5fecca.svg" style={{width: '50px'}}/><br /><p className="text-white" style={{fontSize: '20px', fontWeight: '700'}}>Granted</p></>)
    }

    return (
        <div className="main-content">
            <h3 className="text-white main-title">MOMENTO</h3>
            <MenuOptions goToLeft={goToList} leftText="List view" goToRight={goToMap} rightText="Map view" />
            <div className="flex-row">
                <p className="text-white">{shortenString(account.address)}</p> <Web3Button/><br />
                {GrandView}
            </div>
            <form onSubmit={createNFT} className="form-control">
                <input
                    style={{fontSize}}
                    id={"title"}
                    type={"text"}
                    className={"input-field"}
                    placeholder={"Event Title"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    style={{fontSize}}
                    id={"description"}
                    type={"text"}
                    className={"input-field"}
                    placeholder={"Event Description"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {!timeOfPicture && <button className="secondary-button" onClick={loadPhoto} style={{fontSize}}>Load Camera</button>}
                {!pictureTaken && <video id="video" autoplay="" width="325" height="244"/>}
                {(!!timeOfPicture && !pictureTaken) && <button className="secondary-button" onClick={takePhoto} style={{fontSize}}>Take Picture</button>}
                <canvas id="canvas"/>
                {!account.address && <p className="text-primary">You must connect your wallet before minting.</p>}
                <button className="primary-button mb-standard" type="submit" style={{fontSize}} disabled={!account.address}>Mint</button>
            </form>
        </div>
    )
}

export default CreateNFTView;
