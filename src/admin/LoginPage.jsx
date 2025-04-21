import React from "react";
// import googleLogo from './assets/providers/google.png';
import {signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){


const Navigate = useNavigate()
    


    const provider = new GoogleAuthProvider()

    function authSignInWithGoogle() {
        signInWithPopup(auth, provider)
            .then((result) => {
                
                // Check if the user's email is 'developedbyjk@gmail.com'
            if (result.user.email === 'developedbyjk@gmail.com' || result.user.email === 'designedbyjk123@gmail.com'|| result.user.email === 'webniversdigital@gmail.com') {
                console.log("Signed in with Google");
                Navigate("/admin");
            } else {
                // Sign out the user if the email does not match
                signOut(auth).then(() => {
                    alert("Access denied: Only the specified email is allowed.");
                }).catch((error) => {
                    console.error("Error signing out:", error);
                });

            }
        }).catch((error) => {
                console.error(error.message)
            })
    }




    return(
        <>

        <section >
           
                 <button id="sign-in-with-google-btn" onClick={authSignInWithGoogle} className="provider-btn">
                     Sign in with Google
                 </button>
         
        </section>
     
        </>
    )
}