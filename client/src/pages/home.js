import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { SearchResultsList } from "../components/SearchResultsList.js"

export const Home = ({results, setResults, school, setSchool, schoolImage, setSchoolImage}) => {

    const [input, setInput] = useState("");

    const fetchData = (value) => {
        fetch("http://localhost:3001/school")
            .then((response) => response.json())
            .then(json => {
                const results = json.filter((university) => {
                    return (
                        university && 
                        university.school && 
                        university.school.toLowerCase().includes(value)
                   );    
                });
                setResults(results);
            });
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <>
        <div class="px-5 mt-8 grid grid-cols-2 grid-rows-2 gap-1">
            <div>
                <h1 className="font-dmsans text-7xl">Here is where our catchy, amazing, fantastic tagline will go.</h1>
                <h3 className="font-dmsans text-4xl mt-8">And here is where our small text will go.</h3>
            </div>
            <h1>Picture goes here</h1>
         
        <div class="mt-20">
            <div className="search-wrapper relative flex items-center text-gray-400">
                <FaSearch class="w-5 h-5 absolute ml-3 pointer-events-none"/>
                <input 
                type="text"
                placeholder="Search for a university..."
                class="pr-3 pl-10 py-2 text-black rounded-2xl ring-2 ring-gray-300"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                />
            </div>
            <SearchResultsList results={results} school={school} setSchool={setSchool} schoolImage={schoolImage} setSchoolImage={setSchoolImage}/>
        </div>
         
        </div>  
        </>

    );
};