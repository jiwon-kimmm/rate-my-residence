import React from 'react';
import { Link, useNavigate } from "react-router-dom";

export const SearchResult = ({ result, school, setSchool, schoolImage, setSchoolImage }) => {
    const navigate = useNavigate();

    const clickSchool = (event) => {
        //alert(`you clicked on ${result.school} and ${result._id}`);
        window.localStorage.setItem("schoolID", result._id);
        setSchool(result.school);
        setSchoolImage(result.image);
        navigate("/reviews");
    }

    return (
        <div 
            className="search-result" 
            onClick={clickSchool}
            class="text-gray-400 cursor-pointer"
        >
            {result.school}
        </div>
        
    );
};
