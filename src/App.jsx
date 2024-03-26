import { render } from "react-dom";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Contact from "./Contact";
import Catalogue from "./Catalogue";
import Learning from "./Learning";
import How from "./How";

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
          <Route path="/Learning" element={<Learning />} />
          <Route path="/How" element={<How />} />
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
