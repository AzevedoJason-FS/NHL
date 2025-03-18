import './style.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NHLMatches from "./nhl-matches"; // Ensure this points to the correct file

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NHLMatches />} />
      </Routes>
    </Router>
  );
};

export default App;
