// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getDoc, getDocs } from "firebase/firestore";

    import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgkvAeO7mCo9Xd4gUg1sn5hc_Wn3IhRf0",
  authDomain: "karenderya-project.firebaseapp.com",
  projectId: "karenderya-project",
  storageBucket: "karenderya-project.appspot.com",
  messagingSenderId: "1087424496980",
  appId: "1:1087424496980:web:96a3b14cc57bf95facb4c1",
  measurementId: "G-EXD5NFW618"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestoreDb = getFirestore(app)

export const foodsCollection = collection(firestoreDb, "foods")

export const getMenu = async () => {
  const docRef =  doc(foodsCollection, "Menu")

  const document = await getDoc(docRef)
  console.log("DOCUMENT: ", document.data().dishes);
  const menu = document.data().dishes

  console.log("menu: ", menu);
  return menu
}

