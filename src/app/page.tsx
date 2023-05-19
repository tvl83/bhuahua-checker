import { useState } from 'react';
import axios from 'axios';

const hosts = [
  'https://api-chihuahua.pupmos.network',
  'https://api-chihuahua-ia.cosmosia.notional.ventures',
  'https://rest-chihuahua.ecostake.com',
  'https://api.chihuahua.wtf'
];

const IndexPage = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hostIndex, setHostIndex] = useState(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!address.startsWith('chihuahua1')) {
        throw new Error('Invalid Chihuahua address');
      }

      const query = { balance: { address } };
      const encodedQuery = Buffer.from(JSON.stringify(query)).toString('base64');

      const response = await axios.get(`${hosts[hostIndex]}/cosmwasm/wasm/v1/contract/chihuahua1jz5n4aynhpxx7clf2m8hrv9dp5nz83k67fgaxhy4p9dfwl6zssrq3ymr6w/smart/${encodedQuery}`);
      console.log(response.data);

      const { balance } = response.data.data;
      setBalance((balance / 1_000_000).toFixed(6));
      setError(null);
    } catch (error:any) {
      setBalance(null);
      setError(error.message);
    }
  };

  const handleHostChange = () => {
    const nextIndex = (hostIndex + 1) % hosts.length;
    setHostIndex(nextIndex);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Check bHUAHUA Balance</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="address"> Chihuahua address: </label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          maxLength={45}
          style={{ width: '450px' }}
          className="border border-gray-400 rounded-md p-2 m-2 text-gray-900"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Check balance
        </button>
        <button
          type="button"
          onClick={handleHostChange}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4"
        >
          Change host
        </button>
      </form>
      {balance !== null && <p>Balance: {balance}</p>}
      {error !== null && <p>Error: {error}</p>}
    </div>
  );
};

export default IndexPage;
