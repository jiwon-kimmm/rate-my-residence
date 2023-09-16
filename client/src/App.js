import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/home';
import { Auth } from './pages/auth';
import { Reviews } from './pages/review';
import { AddUni } from './pages/add-uni';
import { SearchResultsList } from "./components/SearchResultsList";
import { CreateReview } from "./components/CreateReview";
import { useState } from "react";
import Navbar from "./components/Navbar";
// import {Container} from "./components/styles/Container.styled"
import GlobalStyles from './components/styles/Global';
import SchoolBanner from "./components/SchoolBanner.js";
import { UploadImage } from "./components/UploadImage.js";

function App() {
  const [results, setResults] = useState([]);
  const [school, setSchool] = useState([]);
  const [schoolImage, setSchoolImage] = useState([]);

  return (
    // <Container>
      <Router>
        <GlobalStyles />
        <Navbar />
        <Routes>
          <Route 
            path="/" 
            element={
              <div>
                <Home results={results} setResults={setResults} school={school} setSchool={setSchool} schoolImage={schoolImage}setSchoolImage={setSchoolImage}/>
              </div> 
            }
          />
          <Route path="/auth" element={<Auth />} />
          <Route 
            path="/reviews" 
            element={
              <>
              <SchoolBanner school={school} setSchool={setSchool} schoolImage={schoolImage} setSchoolImage={setSchoolImage}/>
              <div class="grid grid-cols-2">
              <Reviews />
              <CreateReview />
              <UploadImage />
              </div>
              </>
            }
          />
          <Route path="/add-uni" element={<AddUni />} 
          />
        </Routes>
      </Router>
    //</Container>
  );
}

export default App;
