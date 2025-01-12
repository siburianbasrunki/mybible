import Navbar from "./components/Navbar";
import KitabSuciPage from "./components/kitabSuci";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BooksPage from "./components/bookPage";

const App = () => {
  return (
    <Router>
      <div className="h-screen flex flex-col bg-white">
        <Navbar />

        <div className="flex-grow flex justify-center items-center overflow-hidden">
          <Routes>
            <Route path="/" element={<KitabSuciPage />} />
            <Route path="/bible/:bibleId/books" element={<BooksPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
