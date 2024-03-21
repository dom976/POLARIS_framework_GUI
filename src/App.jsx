import { render } from "react-dom";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Contact from "./Contact";
import Catalogue from "./Catalogue";
import About from "./About";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Catalogue" element={<Catalogue />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
