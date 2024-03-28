//Homepage
import { Link } from 'react-router-dom'; // Importa il componente Link
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Contact from "./Contact";
import Newsletter from "./Newsletter";
import FadeIn from "react-fade-in/lib/FadeIn";
import Intro from "./Intro";
import Infocard from "./Infocards";
function Homepage() {
  return (
    <section>
 
<Intro></Intro>
  <Infocard></Infocard>

  <footer style={{ fontFamily: 'Lucida fax', textAlign: 'center', padding: '20px', backgroundColor: '#f0f0f0' }}>
        
        <strong> Need help or do you want to subscribe to out Newsletter?</strong>

        <Link to="/Contact"> Contact Us</Link>
      </footer>
  
  
</section>



  );
}

export default Homepage;
