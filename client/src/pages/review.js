import React, { useEffect, useState } from "react";
import { useGetSchoolID } from "../hooks/useGetSchoolID";
import axios from "axios";

export const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const schoolID = useGetSchoolID();
  
    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/reviews/${schoolID}`
          );
          setReviews(response.data);
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchReviews();
    }, []);
    return (
      <div>
        <div class="m-6">
          <h1 class="text-4xl mb-5 font-dmsans font-bold"> Reviews </h1>
          <ul class="font-dmsans">
            {reviews.map((review) => (
              <div class="rounded bg-slate-100 mb-4 p-5">
              <li key={review._id}>
                <div>
                  <h2 class="text-xl font-extrabold">{review.residence}</h2>
                </div>
                <p>{review.room_type}</p>
                <p>{review.review_text}</p>
              </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
      
    );
  };



