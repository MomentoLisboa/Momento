import CardPost from "../componants/CardPost/CardPost"
import useMomentoHub from "../hooks/useMomentoHub";
import { useWeb3 } from "../hooks/useWeb3";
import { useEffect, useState } from 'react'

const PostListView = () => {
    const web3 = useWeb3();

    const [walletAddress, setWalletAddress] = useState('0x13d36a0a444e76d83e01b7fd2affeeac7d0bb827');
    const [NFTBalance, setNFTBalance] = useState(0);
    const [totalSupply, setTotalSupply] = useState();

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
        const getTotalSupply = async () => {
            const totalSupply_ = await MomentoHub.methods.totalSupply().call();
            return totalSupply_
        }
        getTotalSupply().then(result => setTotalSupply(result));
    }, [])

    useEffect(()=>{
        let getTokenURI = async(tokenId) => {
            const tokenURI = await MomentoHub.methods.tokenURI(tokenId).call();
            return tokenURI
        }
        let getAllTokenURI = async() => {
            
            const tokenURIs = []
            for (let index = 1; index <= totalSupply; index++) {
                const tokenURI= await getTokenURI(index);
                tokenURIs.push(tokenURI)
            }
            console.log(tokenURIs)
            return tokenURIs
        }
        getAllTokenURI();
    }, [totalSupply]);

    useEffect(()=>{
        console.log(NFTBalance);
    }, [NFTBalance])

    return (<>
        <CardPost rate={4}/>
    </>)
}

export default PostListView
