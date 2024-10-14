## **KnightCoin**

KnightCoin is a blockchain-powered dashboard where users can:
- **Mine blocks** to earn KnightCoins.
- **Redeem prizes** using KnightCoins.
- **Manage user profiles** with Firebase Authentication and Firestore.

### **Features**

- **Blockchain API**: Mine blocks via a Python backend.
- **Firebase Authentication**: Secure user login using Google Sign-In.
- **Firestore Integration**: Store and manage user data, including balances.
- **Mining Rewards**: Earn 10 KnightCoins for each successfully mined block.
- **Prize Redemption**: Redeem prizes if your balance meets the requirements.

---

## **Tech Stack**

- **Frontend**: React, Tailwind CSS
- **Backend**: Python, Flask
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication (Google Sign-In)
- **Blockchain**: Custom Python Blockchain API

---

## **Folder Structure**

```
knightcoin-dashboard/
│
├── backend/
│   ├── blockchain.py   # Flask API for Blockchain
│   └── requirements.txt  # Python dependencies
│
├── frontend/
│   ├── public/         # Static files
│   ├── src/            # React source code
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components (e.g., Profile)
│   │   └── firebase.js # Firebase configuration
│   └── package.json    # Frontend dependencies
│
└── README.md           # Project documentation
```
