import { useEffect, useState } from 'react';
import useLensHub from '../hooks/useLensHub';
import { useWeb3Polygon } from '../hooks/useWeb3';
import { useAccount } from '@web3modal/react'

const CheckWhitelist = () => {

    const { account, isReady } = useAccount();
    const [granted, setGranted] = useState(false);
    
    const web3Polygon = useWeb3Polygon();
    const LensHub = useLensHub();

    useEffect(()=>{
        const getUserData = async () => {
            if(account.address == "") return;
            const checkSumAddress = web3Polygon.utils.toChecksumAddress(account.address);
            const profileId = await LensHub.methods.defaultProfile(checkSumAddress).call();

            setGranted(profileId != 0) // if profileId different to zero it means that this wallet get an Lens profile
        }
        getUserData()
    })

    return(
        <>
            {!!isReady && <p className="text-white">{account.address}</p>}
            {!granted ? <p className="text-white">Connect to another wallet</p> : <><img src="https://lens.xyz/static/media/lensfrens.2f28dc59c1c3058c6d170c5c6a5fecca.svg" /><br /><p className="text-white" style={{fontSize: '20px', fontWeight: '700'}}>Granted</p></>}
        </>
    )
}

export default CheckWhitelist
