//Homepage

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
  
</section>

  );
}

export default Homepage;
