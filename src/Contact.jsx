import React, { useRef, useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import myImage from './assets/img/Screenshot_2.png';
import './assets/css/buttonhover.css';
import Hover from './Hover';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Newsletter from './Newsletter';


const Contact = () => {
  const form = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false); // Inizializza lo stato isSubmitted a false

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_enk2iid', 'template_z9r9s74', form.current, 'hb84n2dMC1AZjkdf6')
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          setIsSubmitted(true); // Imposta lo stato a true dopo l'invio del form
          setTimeout(() => setIsSubmitted(false), 5000); // Reimposta lo stato dopo 5 secondi
          form.current.reset(); // Resetta i campi del form
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <>
      <link rel="stylesheet" href="assets/css/buttonhover.css" />
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
      />
      <div
        style={{
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: "'Montserrat', sans-serif",
          minHeight: '100vh',
          background: "linear-gradient(#eaccf5 35%, #aca7eb 77%)",
          position: "relative"
        }}
      >
        <div
          className="container"
          data-aos="fade-up"
          style={{
            background: '#fff',
            maxWidth: '600px', // Riduci la larghezza massima
            width: '90%',
            borderRadius: '24px',
            boxShadow: '16px 16px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <div
            className="picture-container"
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10px' // Riduci il margine inferiore
            }}
          >
            <img
              src={myImage}
              width={200} // Riduci le dimensioni dell'immagine
              height={200}
              style={{ marginBottom: '10px' }}
              data-aos="zoom-in"
              data-aos-duration="1000"
            />
          </div>
          <div
            className="contact-form-container"
            style={{
              width: '100%'
            }}
          >
        {isSubmitted && (
              <p style={{ color: 'green' }}>Thanks for your report! We'll answer soon.</p>
            )}
            <form
              ref={form}
              onSubmit={handleSubmit}
              className="contact-form"
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <span
                className="form-header"
                style={{
                  fontSize: '1.5em', // Riduci la dimensione del titolo
                  fontWeight: 700,
                  marginBottom: '10px' // Riduci il margine inferiore
                }}
              >
                Contact us
              </span>
              <input
                className="email-input"
                type="email"
                name="user_email"
                placeholder="Email"
                style={{
                  border: 'none',
                  outline: 'none',
                  background: '#eee',
                  padding: '15px', // Riduci il padding
                  borderRadius: '6px',
                  width: '100%',
                  fontSize: '90%', // Riduci la dimensione del testo
                  marginBottom: '10px', // Riduci il margine inferiore
                }}
              />
              <textarea
                className="message"
                style={{
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  background: '#eee',
                  padding: '15px', // Riduci il padding
                  borderRadius: '6px',
                  width: '100%',
                  fontSize: '90%', // Riduci la dimensione del testo
                  marginBottom: '10px', // Riduci il margine inferiore
                }}
                cols={30}
                name="message"
                placeholder="Message..."
                rows={5}
                defaultValue={""}
              />
              <Hover />
            </form>
          </div>
        </div>
      </div>
      <Newsletter />
    </>
  );
};

export default Contact;
