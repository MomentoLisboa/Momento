import useMomentoHub from "./useMomentoHub";
import Web3 from 'web3';
import MomentoHubABI from '../ABI/MomentoHubABI';
import { useWeb3 } from "./useWeb3";
import { useEffect, useState } from 'react'

const getAllMomentoNFTs = async () => {

    const MaticTestnetRPC = "https://matic-mumbai.chainstacklabs.com";
    const web3 = new Web3(MaticTestnetRPC);

    const MomentoHubContractAddress = web3.utils.toChecksumAddress('0x92e16023C1201aEf432cEb15677791AE03966De6');
    const MomentoHub = new web3.eth.Contract(MomentoHubABI, MomentoHubContractAddress);

    
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
