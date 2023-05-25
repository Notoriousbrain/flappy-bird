import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: "AIzaSyDcU-8DDII94_sUC4429cD_Rqklt2GLg4w",
//   authDomain: "flappy-bird-37a36.firebaseapp.com",
//   projectId: "flappy-bird-37a36",
//   storageBucket: "flappy-bird-37a36.appspot.com",
//   messagingSenderId: "441705051459",
//   appId: "1:441705051459:web:85982fa8c41271851fabf6",
//   measurementId: "G-BCFLH9EEM0",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCEPESUq6WQQUePxSqSYkkJpiOq9vQG6y8",
  authDomain: "flappy-bird-8f5f8.firebaseapp.com",
  projectId: "flappy-bird-8f5f8",
  storageBucket: "flappy-bird-8f5f8.appspot.com",
  messagingSenderId: "149025065482",
  appId: "1:149025065482:web:121aabe4d77f1d081aedf3",
  measurementId: "G-WZX9BSFV30",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

