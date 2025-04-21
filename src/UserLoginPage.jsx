import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase"; // your Firebase auth config
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getFirestore } from "firebase/firestore";

export default function LoginPage() {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const db = getFirestore(); // initialize Firestore

  async function authSignInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user info in Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
        },
        { merge: true }
      );

      // Example condition to allow only specific user (optional)
      // if (user.email === 'developedbyjk@gmail.com') {
      console.log("Signed in and user data saved");
      navigate("/products");
      // } else {
      //   navigate("/loginpage");
      // }

    } catch (error) {
      console.error("Login error:", error.message);
    }
  }

  return (
    <section>
      <button
        id="sign-in-with-google-btn"
        onClick={authSignInWithGoogle}
        className="provider-btn"
      >
        Sign in with Google
      </button>
    </section>
  );
}
