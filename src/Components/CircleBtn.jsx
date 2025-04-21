import React from "react";
import './CircleBtn.css'; // Import your CSS file for styling
import { Link } from "react-router-dom";

export default function CircleBtn({ icon, onClick, mylink }) {

    console.log("link", mylink)
    return (
        <Link id ="awesomelink"  to={mylink}>
            <button className="button" onClick={onClick}>
                <p className="button__text">
                    <span style={{ "--index": 0 }}>T</span>
                    <span style={{ "--index": 1 }}>R</span>
                    <span style={{ "--index": 2 }}>Y</span>
                    <span style={{ "--index": 3 }}> </span>
                    <span style={{ "--index": 4 }}>I</span>
                    <span style={{ "--index": 5 }}>T</span>
                    <span style={{ "--index": 6 }}> </span>
                    <span style={{ "--index": 7 }}>V</span>
                    <span style={{ "--index": 8 }}>I</span>
                    <span style={{ "--index": 9 }}>R</span>
                    <span style={{ "--index": 10 }}>T</span>
                    <span style={{ "--index": 11 }}>U</span>
                    <span style={{ "--index": 12 }}>A</span>
                    <span style={{ "--index": 13 }}>L</span>
                    <span style={{ "--index": 14 }}>L</span>
                    <span style={{ "--index": 15 }}>Y</span>
                    <span style={{ "--index": 16 }}></span>
                    <span style={{ "--index": 17 }}>!</span>
                    <span style={{ "--index": 18 }}>@</span>
                    <span style={{ "--index": 19 }}></span>
                </p>

                <div className="button__circle">
                    <svg
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="button__icon"
                        width="14"
                    >
                        <path
                            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                            fill="currentColor"
                        ></path>
                    </svg>

                    <svg
                        viewBox="0 0 14 15"
                        fill="none"
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                        className="button__icon button__icon--copy"
                    >
                        <path
                            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                            fill="currentColor"
                        ></path>
                    </svg>
                </div>
            </button>
        </Link>
    );
}
