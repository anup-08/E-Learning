import { Link } from "react-router-dom";

function Home() {
  // Background image URL
  const bgUrl = "/imgg.png";

  return (
    
    <>
      

      <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full max-w-6xl mx-auto p-5">
          <div className="flex flex-col justify-center items-center gap-1">
            <h1 className="font-sans font-semibold text-4xl md:text-5xl mb-4 text-white leading-tight tracking-widest">
              ONLINE
            </h1>
            <h2 className="font-sans font-extrabold text-5xl md:text-6xl text-[#2e2a54] mb-8 tracking-widest">
              EDUCATION
            </h2>
            <Link to="/getoption"
              type="button"
              className="inline-block w-1/2 md:w-1/3 bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 text-white font-medium rounded-full px-8 py-3
              transition-transform duration-200 transform hover:scale-105 text-center"
            >
              GET STARTED
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <img src={bgUrl} alt="Cute girl working on a computer" className="w-full h-auto max-w-xs md:max-w-md" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
