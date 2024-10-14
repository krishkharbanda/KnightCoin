import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import axios from 'axios';
import SideMenu from './components/SideMenu';
import { useNavigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [prizes, setPrizes] = useState([]);
  const [mining, setMining] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);

        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setBalance(userDoc.data().amount);
        }
      } else {
        navigate('/login');
      }
    };

    const fetchPrizes = async () => {
      const prizeCollection = collection(db, 'prizes');
      const prizeSnapshot = await getDocs(prizeCollection);
      const prizeList = prizeSnapshot.docs.map((doc) => doc.data());
      setPrizes(prizeList);
    };

    fetchUserData();
    fetchPrizes();
  }, [navigate]);

  const mineBlock = async () => {
    setMining(true);

    try {
      const response = await axios.post('http://localhost:1766/mine', { data: user.uid });
      alert(`Block Mined! Hash: ${response.data.hash}`);

      const newBalance = balance + 10;
      setBalance(newBalance);

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { amount: newBalance });
    } catch (error) {
      console.error('Error mining block:', error);
      alert('Failed to mine block.');
    } finally {
      setMining(false);
    }
  };

  const redeemPrize = async (prize) => {
    if (balance >= prize.price) {
      const newBalance = balance - prize.price;

      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, { amount: newBalance });
        setBalance(newBalance);

        alert(`Successfully redeemed ${prize.name}!`);
      } catch (error) {
        console.error('Error redeeming prize:', error);
        alert('Failed to redeem prize. Please try again.');
      }
    } else {
      alert('Insufficient KnightCoins to redeem this prize.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-primary p-4 flex items-center">
        <SideMenu />
        <h1 className="text-secondary text-xl ml-4">KnightCoin Dashboard</h1>
      </nav>

      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-semibold text-primary mb-4 text-center">
          Your Balance: {balance} KnightCoins
        </h2>

        <div className="flex justify-center mb-8">
          <button
            onClick={mineBlock}
            disabled={mining}
            className={`w-64 py-2 rounded-lg ${
              mining ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary text-secondary hover:bg-white hover:text-primary border'
            }`}
          >
            {mining ? 'Mining Block...' : 'Start Mining'}
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-primary mb-4 text-center">
          Available Prizes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className="bg-secondary p-6 rounded-lg shadow-lg hover:shadow-xl border border-gray-300"
            >
              <img
                src={prize.imageUrl}
                alt={prize.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold text-primary">{prize.name}</h3>
              <p className="text-gray-700 mb-2">{prize.description}</p>
              <p className="text-primary font-semibold mb-4">
                Cost: {prize.price} KnightCoins
              </p>
              <button
                onClick={() => redeemPrize(prize)}
                className={`w-full py-2 rounded-lg ${
                  balance >= prize.price
                    ? 'bg-primary text-secondary hover:bg-white hover:text-primary border'
                    : 'bg-gray-400 text-white cursor-not-allowed'
                }`}
                disabled={balance < prize.price}
              >
                Redeem
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
