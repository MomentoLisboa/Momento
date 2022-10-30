import LensHubABI from '../ABI/LensHub';
import { useWeb3Polygon } from './useWeb3';


const useLensHub = () => {
    const web3Polygon = useWeb3Polygon();
    const LensHubContractAddress = web3Polygon.utils.toChecksumAddress('0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d');
    const LensHub = new web3Polygon.eth.Contract(LensHubABI, LensHubContractAddress);
    return LensHub;
};

export default useLensHub;
