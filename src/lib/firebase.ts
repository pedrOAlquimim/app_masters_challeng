import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCpYdhBdgS_z_d2_QZMJ02Un2iGaAEc88U",
  authDomain: "app-master-55801.firebaseapp.com",
  projectId: "app-master-55801",
  storageBucket: "app-master-55801.appspot.com",
  messagingSenderId: "1088124406904",
  appId: "1:1088124406904:web:597c74e73410f35667318d"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const dataBase = getFirestore(app)