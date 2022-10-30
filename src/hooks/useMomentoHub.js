import MomentoHubABI from '../ABI/MomentoHubABI';
import { useWeb3PolygonTestnet } from './useWeb3.js';


const useMomentoHub = () => {
    const web3 = useWeb3PolygonTestnet();
    const MomentoHubContractAddress = web3.utils.toChecksumAddress('0x2C36fD1981465F40B199f8A869B2D2f8F9692F36');
    const MomentoHub = new web3.eth.Contract(MomentoHubABI, MomentoHubContractAddress);
    return MomentoHub;
};

export default useMomentoHub;
