"use client"
import { useState } from 'react';
import axios from 'axios';

const hosts = [
  'https://api-chihuahua.pupmos.network',
  'https://api-chihuahua-ia.cosmosia.notional.ventures',
  'https://rest-chihuahua.ecostake.com',
  'https://api.chihuahua.wtf'
];

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const IndexPage = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hostIndex, setHostIndex] = useState(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let response;
    const shuffledHosts = shuffleArray(hosts);
    for (const host of shuffledHosts) {
      try {
        if (!address.startsWith('chihuahua1')) {
          throw new Error('Invalid Chihuahua address');
        }

        const query = { balance: { address } };
        const encodedQuery = Buffer.from(JSON.stringify(query)).toString('base64');

        response = await axios.get(`${host}/cosmwasm/wasm/v1/contract/chihuahua1jz5n4aynhpxx7clf2m8hrv9dp5nz83k67fgaxhy4p9dfwl6zssrq3ymr6w/smart/${encodedQuery}`);
        console.log(response.data);

        const { balance } = response.data.data;
        setBalance((balance / 1_000_000).toFixed(6));
        setError(null);
        break;
      } catch (error: any) {
        response = null;
        setBalance(null);
        setError(error.message);
      }
    }
    if (!response) {
      setError('All hosts failed');
    }
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
          style={{ width: '450px' }}
          className="border border-gray-400 rounded-md p-2 m-2 text-gray-900"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Check balance
        </button>
      </form>
      {balance !== null && <p>Balance: {balance}</p>}
      {error !== null && <p>Error: {error}</p>}
    </div>
  );

};

export default IndexPage;
