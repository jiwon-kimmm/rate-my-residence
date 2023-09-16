import React, { useState } from "react";
import axios from "axios";
import { useGetSchoolID } from "../hooks/useGetSchoolID";
import { useGetUserID } from "../hooks/useGetUserID";
// import { ReviewModel } from "rate-my-residence/server/src/models/Reviews.js";

export const CreateReview = () => {
    const userID = useGetUserID();

    const [review, setReview] = useState({
        school: "",
        residence: "",
        room_type: "",
        review_text: "",
        rating: 0,
        userOwner: userID,
    });

    const schoolID = useGetSchoolID();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setReview({ ...review, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/reviews", review);

            const reviewID = response.data._id;
            console.log(reviewID);

            
            const res = await axios.patch(
                `http://localhost:3001/reviews/${schoolID}/${response.data._id}`, {
                        reviewID, 
                        schoolID,
                    });
            alert(`Review created`);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="create-review" class="bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 class="mb-5 font-dmsans font-extrabold text-xl"> Add a Review </h2>
            <form onSubmit={handleSubmit} class="font-dmsans">
                <div class="mb-5">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="school">School</label>
                    <input type="text" id="school" name="school" class="border text-black ring-gray-300 shadow" onChange={handleChange}/>
                </div>

                <div class="mb-5">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="residence">Residence</label>
                <input type="text" 
                        class="border text-black ring-gray-300 shadow"
                        id="residence" name="residence" onChange={handleChange}/>
                </div>

                <div class="mb-5">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="room_type">Room Type</label>
                    <input class="border text-black ring-gray-300 shadow" type="text" id="room_type" name="room_type" onChange={handleChange}/>
                </div>

                <div class="mb-5">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="review_text">Review Text</label>
                <textarea id="review_text" name="review_text" onChange={handleChange}></textarea>
                </div>

                <div class="mb-5">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="rating">Rating</label>
                    <input class="border text-black ring-gray-300 shadow" type="number" id="rating" name="rating" onChange={handleChange}/>
                </div>

                <div class="mb-5">
                    <button class="border rounded px-3 py-2 bg-green-600 text-white font-dmsans" type="submit">Submit</button>
                </div>
            </form>
            
        </div>
    );
};

