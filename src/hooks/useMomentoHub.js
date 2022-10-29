import MomentoHubABI from '../ABI/MomentoHubABI';
import { useWeb3 } from './useWeb3.js';


const useMomentoHub = () => {
    const web3 = useWeb3();
    const MomentoHubContractAddress = web3.utils.toChecksumAddress('0x92e16023C1201aEf432cEb15677791AE03966De6');
    const MomentoHub = new web3.eth.Contract(MomentoHubABI, MomentoHubContractAddress);
    return MomentoHub;
};

export default useMomentoHub;
