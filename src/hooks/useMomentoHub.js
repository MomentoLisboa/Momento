import MomentoHubABI from '../ABI/MomentoHubABI';
import { useWeb3 } from './useWeb3';


const useMomentoHub = () => {
    const web3 = useWeb3();
    const MomentoHubContractAddress = web3.utils.toChecksumAddress('0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d');
    const MomentoHub = new web3.eth.Contract(MomentoHubABI, MomentoHubContractAddress);
    return MomentoHub;
};

export default useMomentoHub;
