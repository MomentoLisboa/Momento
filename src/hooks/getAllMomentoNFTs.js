import useMomentoHub from "./useMomentoHub";
import Web3 from 'web3';
import MomentoHubABI from '../ABI/MomentoHubABI';
import { useWeb3 } from "./useWeb3";
import { useEffect, useState } from 'react'

const getAllMomentoNFTs = async () => {

    const MaticTestnetRPC = "https://matic-mumbai.chainstacklabs.com";
    const web3 = new Web3(MaticTestnetRPC);

    const walletAddress = '0x13d36a0a444e76d83e01b7fd2affeeac7d0bb827'

    const MomentoHubContractAddress = web3.utils.toChecksumAddress('0x2C36fD1981465F40B199f8A869B2D2f8F9692F36');
    const MomentoHub = new web3.eth.Contract(MomentoHubABI, MomentoHubContractAddress);

    

    let getNumberOfMomentoNFTWalletOwnerHave = async() => {
        const checkSumAddress = web3.utils.toChecksumAddress(walletAddress);
        const balance = await MomentoHub.methods.balanceOf(checkSumAddress).call();

    }

    const getTotalSupply = async () => {
        const totalSupply_ = await MomentoHub.methods.totalSupply().call();
        return totalSupply_
    }

    let getTokenURI = async(tokenId) => {
        const tokenURI = await MomentoHub.methods.tokenURI(tokenId).call();
        return tokenURI
    }

    let getAllTokenURILinks = async(totalSupply) => {
        
        const tokenURIs = []
        for (let index = 1; index <= totalSupply; index++) {
            const tokenURI= await getTokenURI(index);
            tokenURIs.push(tokenURI)
        }
        return tokenURIs
    }
    let getURIs = async() => {
        const totalSupply = await getTotalSupply()
        const URILinks = await getAllTokenURILinks(totalSupply)
        let URIs = []
        for (let index = 0; index < URILinks.length; index++) {
            const URILink =  URILinks[index]?.replace('ipfs://','https://cloudflare-ipfs.com/ipfs/');
            const response = await fetch(URILink)
            URIs = [...URIs, await response.json()]
        }
        return URIs
        
    }

    const URIs = await getURIs()
    return URIs
}

export default getAllMomentoNFTs
