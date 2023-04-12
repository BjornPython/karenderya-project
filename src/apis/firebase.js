import { initializeApp } from "firebase/app";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { collection, getFirestore } from "firebase/firestore";

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

const foodsCollection = collection(firestoreDb, "foods")


// Gets the menu from the database.
export const getMenu = async () => {
  const docRef =  doc(foodsCollection, "Menu")
  const document = await getDoc(docRef)
  const menu = document.data().dishes
  return menu
}

// Updates the Menu document
export const updateDbMenu = async (updatedMenu) => {
  const docRef =  doc(foodsCollection, "Menu")
  const updatedDoc = await updateDoc(docRef, {dishes: updatedMenu})
}

// Gets the orderHistory from firestore
export const getOrderHistory =  async() => {
  const docRef = doc(foodsCollection, "Orders") 
  const document = await getDoc(docRef)
  const data = document.data().ordered
  return data
}

// adds a new order to the orderHistory.
export const updateOrderHistory = async (newOrder) => {
  const docRef = doc(foodsCollection, "Orders") 
  const newDocument = await updateDoc(docRef, {ordered: arrayUnion(newOrder)})
}