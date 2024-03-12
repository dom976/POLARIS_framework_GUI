import React, { useRef, useEffect } from 'react';
import emailjs from 'emailjs-com';
import myImage from './assets/img/Screenshot_2.png';
import './assets/css/buttonhover.css';
import Hover from './Hover';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
  const form = useRef();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_enk2iid', 'template_z9r9s74', form.current, 'hb84n2dMC1AZjkdf6')
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
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
      <div style={{
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Montserrat', sans-serif",
        height: 1000,
        background: "linear-gradient(#eaccf5 35%, #aca7eb 77%)",
        position: "relative"
      }}>
        <div className="container" data-aos="fade-up" style={{
          background: '#fff',
          width: '800px',
          height: '450px',
          borderRadius: '24px',
          boxShadow: '16px 16px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div className="picture-container" style={{
            width: '50%',
            height: '100%',
            alignSelf: 'flex-start',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img
              src={myImage}
              width={280}
              height={280}
              style={{ marginLeft: "-58px" }}
              data-aos="zoom-in"
              data-aos-duration="1000"
            />
            <div className="picture" />
          </div>
          <div className="contact-form-container" style={{
            height: '90%',
            width: '300px'
          }}>
            <form ref={form} onSubmit={handleSubmit} className="contact-form" style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              alignContent: 'space-around'
            }}>
              <span className="form-header" style={{
                fontSize: '2em',
                fontWeight: 700,
                alignSelf: 'flex-start'
              }}>Contact us</span>
              <input className="email-input" type="email" name="user_email" placeholder="Email" style={{
                border: 'none',
                outline: 'none',
                background: '#eee',
                padding: '20px',
                borderRadius: '6px',
                width: '100%',
                fontSize: '100%',
              }} />
              <textarea
                className="message"
                style={{
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  background: '#eee',
                  padding: '20px',
                  borderRadius: '6px',
                  width: '100%',
                  fontSize: '100%',
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
    </>
  );
};

export default Contact;
