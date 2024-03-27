import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function How() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div style={{ 
            background: "linear-gradient(#eaccf5 35%, #aca7eb 77%)", 
            minHeight: "100vh", 
            width: "100%", 
            paddingTop: "50px", 
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
        </div>
    );
}

export default How;
