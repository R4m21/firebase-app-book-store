import React, { createContext, useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

const firebaseConfig = {
  apiKey: "AIzaSyCrQGYvTrzVrYCUWYesozdZOCOsCTEJ6eU",
  authDomain: "books-store-80bc0.firebaseapp.com",
  projectId: "books-store-80bc0",
  storageBucket: "books-store-80bc0.appspot.com",
  messagingSenderId: "398470571365",
  appId: "1:398470571365:web:5f70b461bd3520f664ed8c",
};

// initialize firebase app
const firebaseApp = initializeApp(firebaseConfig);

// setup to authentication
const firebaseAuth = getAuth(firebaseApp);

const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const signupCreateUserWithEmailAndPassword = async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FirebaseContext.Provider
      value={{ user, signupCreateUserWithEmailAndPassword }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
