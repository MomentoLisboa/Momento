import CardPost from "../componants/CardPost/CardPost"
import useMomentoHub from "../hooks/useMomentoHub";
import { useWeb3 } from "../hooks/useWeb3";
import { useEffect, useState } from 'react'

const PostListView = () => {
    const web3 = useWeb3();

    const [walletAddress, setWalletAddress] = useState('0x13d36a0a444e76d83e01b7fd2affeeac7d0bb827');
    const [NFTBalance, setNFTBalance] = useState(0);

    const MomentoHub = useMomentoHub();

    

    useEffect(()=>{
        let getNumberOfMomentoNFTWalletOwnerHave = async() => {
            const checkSumAddress = web3.utils.toChecksumAddress(walletAddress);
            const balance = await MomentoHub.methods.balanceOf(checkSumAddress).call();

            setNFTBalance(balance);

        }
        getNumberOfMomentoNFTWalletOwnerHave();
    }, [walletAddress]);

    useEffect(()=>{
        console.log(NFTBalance);
    }, [NFTBalance])

    return (<>
        <CardPost rate={4}/>
    </>)
}

export default PostListView
