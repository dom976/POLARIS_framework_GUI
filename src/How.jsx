import React from 'react';
import Slider from 'react-slick'; // Se non usato, rimuovere
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function How() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const images = [
        "https://i.imgur.com/EsqNo18.png",
        "https://i.imgur.com/kuqOxEg.png",
        "https://i.imgur.com/YfvVAov.png",
    ];

    return (
        <div style={{ 
            background: "linear-gradient(#eaccf5 35%, #aca7eb 77%)",
            width: "100%", 
            paddingTop: "50px", // già presente
            boxSizing: "border-box",
            textAlign: "center" 
        }}>
            <div style={{ 
                maxWidth: "800px", 
                margin: "0 auto", 
            }}>
                <video controls style={{ width: "100%", height: "auto" }}>
                    <source src="assets/img/video.mp4" type="video/mp4" />
                </video>
            </div>
            <div>
                <ul style={{ listStyle: "none", padding: "0" }}>
                    <li style={{ fontSize: "1.2em", marginTop: "20px" }}>
                        Click on the 
                        <div className="btn-group" role="group" style={{ marginRight: "10px" }}>
                            <a  
                                className="btn btn-primary ms-md-2"
                                role="button"
                                href="/How"
                                style={{ fontSize: "20px", padding: "5px 10px" }}
                            >
                                <strong>Catalogue</strong>
                            </a>
                        </div>
                        Section and click on the flashcards you need using the buttons as filtering system
                    </li>
                </ul>
            </div>

            <div className="box" style={{ paddingTop: "20px" }}> 
                <Carousel useKeyboardArrows={true} style={{ margin: "auto" }}>
                    {images.map((URL, index) => (
                        <div key={index} className="slide">
                            <img alt="sample_file" src={URL} />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

export default How;
