import React from "react";
import { SearchResult } from "./SearchResult"

export const SearchResultsList = ({ results, school, setSchool, schoolImage, setSchoolImage }) => {

    return (
        <div className="results-list"> 
            {
                results.map((result, id) => {
                    console.log(id);
                    return <SearchResult result={result} key={id} school={school} setSchool={setSchool} schoolImage={schoolImage} setSchoolImage={setSchoolImage}/>;
                })
            }
        </div>
    );

};