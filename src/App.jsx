import { render } from "react-dom";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Contact from "./Contact";
import Catalogue from "./Catalogue";


/*    <Route index element = {<Homepage/>} />
    <Route path="/Homepage" element = {<Homepage/>} /> */
function App (){

return(


<>
<BrowserRouter>
<Navbar/>


       <Routes>
          <Route index element={<Homepage/>} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Catalogue" element={<Catalogue />} />

       </Routes>




</BrowserRouter>
        
    
</>
   

)


}

export default App