import Promise from 'bluebird';
import IPFS from 'ipfs';

const getIpfs = new Promise(resolve => {
  const node = new IPFS();
  node.on('ready', () => {
    resolve(node);
  });
});

export default getIpfs;