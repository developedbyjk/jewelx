
  


    import React, { useState } from "react";

    import { collection, addDoc } from "firebase/firestore";
    import { app, db } from "./firebase";
    // import Sidebar from "./Sidebar";

  
    import "./UserFeedback.css"; // Import the CSS file

    export function Feedback()  {
      const [formData, setFormData] = useState({
         name: "",
         email: "",
         feedback: "",
         usage: "",
         comments: ""
      });
      console.log("formData", formData);

      const handleChange = (e) => {
         const { name, value } = e.target;
         setFormData((prevData) => ({
            ...prevData,
            [name]: value
         }));
      };

      const handleSubmit = async (e) => {
         e.preventDefault();
         try {
            await addDoc(collection(db, "feedback"), formData);
            alert("Feedback submitted successfully!");
         } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error submitting feedback. Please try again.");
         }
      };

      return (
         <>
         <div className="feedback-container">

         {/* <div>
            <Sidebar />
         </div> */}
         <div className="feedback-form-container">

         <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="feedback">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="feedback">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="feedback">
              <label htmlFor="feedback">Feedback:</label>
              <textarea id="feedback" name="feedback" value={formData.feedback} onChange={handleChange} required></textarea>
            </div>
            <div className="feedback">
              <label htmlFor="usage">How long have you used the app?</label>
              <select id="usage" name="usage" value={formData.usage} onChange={handleChange} required>
                 <option value="">Select...</option>
                 <option value="less_than_week">Less than a week</option>
                 <option value="1-4_weeks">1-4 weeks</option>
                 <option value="1-3_months">1-3 months</option>
                 <option value="more_than_3_months">More than 3 months</option>
              </select>
            </div>
            {/* <div className="feedback">
              <label htmlFor="comments">Additional Comments:</label>
              <textarea id="comments" name="comments" value={formData.comments} onChange={handleChange}></textarea>
            </div> */}
            <button id="feedbak" type="submit">Submit</button>
         </form>
         </div>
         </div>
         </>
      );
    };

    export default Feedback;
   