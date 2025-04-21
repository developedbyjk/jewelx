import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { onSnapshot, collection, doc, deleteDoc } from 'firebase/firestore';
import Navbar from "./Navbar";

import "./Admin.css";

export default function AdminFeedback() {
  const Navigate = useNavigate();

  const [user, setUser] = React.useState({});
  const [feedback, setFeedback] = React.useState([]);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.email === "designedbyjk123@gmail.com") {
        setUser(user);
        Navigate("/admin/feedback");
      } else {
        Navigate("/admin/login");
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'feedback'), (snapshot) => {
      const notesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFeedback(notesList);
    });

    return () => unsubscribe();
  }, []);

  async function DeleteWebsite(note) {
    alert("You are about to delete feedback with ID: " + note.id);
    try {
      const postRef = doc(db, "note", note.id);
      await deleteDoc(postRef);
      alert("Feedback deleted successfully!");
    } catch (error) {
      console.error("Error deleting feedback: ", error);
      alert("Failed to delete feedback: " + error.message);
    }
  }

  const feedbackList = feedback.map((item) => (
    <div className="feedback-box" key={item.id}>
      <p className="feedback-text">{item.feedback}</p>
      <div className="feedback-footer">
        <span className="feedback-name">{item.name}</span>
        <button className="feedback-delete" onClick={() => DeleteWebsite(item)}>❌</button>
      </div>
    </div>
  ));

  return (
    <div className="admin-dashboard">
        <Navbar />
      <h2 className="feedback-heading">User Feedback</h2>
      <div className="feedback-container">
        {feedbackList}
      </div>
    </div>
  );
}
