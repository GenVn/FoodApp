import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFcr7FCWm3_N8KFRhWR-D8jFrud-n3rXU",
  authDomain: "restaurantapp-d2dc4.firebaseapp.com",
  databaseURL: "https://restaurantapp-d2dc4-default-rtdb.firebaseio.com",
  projectId: "restaurantapp-d2dc4",
  storageBucket: "restaurantapp-d2dc4.appspot.com",
  messagingSenderId: "364783486885",
  appId: "1:364783486885:web:51a7d505c019cb2f818a4c",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
