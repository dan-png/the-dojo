import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCHYyxVvd70olYrXrcXx4YknpCmOfFisiQ",
  authDomain: "dojo-app-19337.firebaseapp.com",
  projectId: "dojo-app-19337",
  storageBucket: "dojo-app-19337.appspot.com",
  messagingSenderId: "152705697854",
  appId: "1:152705697854:web:7ab0f856be8386e7f4a96f"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)


// Services
export const db = getFirestore(app)

export const auth = getAuth(app)

export const storage = getStorage(app)


