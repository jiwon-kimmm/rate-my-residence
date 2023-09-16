
export default function SchoolBanner ({school, setSchool, schoolImage, setSchoolImage}) {
  const divStyle = {
    backgroundImage: `url("${schoolImage}")`,
  };

    return (
        <div 
        className={"shadow-md rounded px-8 pt-6 pb-8 mb-4 font-extrabold font-dmsans"} style={divStyle}
        >
          <h1 class="text-4xl" >{school}</h1>
        </div> 
    );
};