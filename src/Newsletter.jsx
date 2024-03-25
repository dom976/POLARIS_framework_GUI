import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Newsletter() {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);

  const { email } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('https://v1.nocodeapi.com/trustframework/google_sheets/AufgoFggsEpmDeFU?tabId=Sheet1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([[email]]),
      });
      const data = await response.json();
      setFormData({ ...formData, email: "" });
      setSuccessMessage("Thank you for subscribing!");
      console.log("Success:", data);
    } catch (err) {
      console.log(err);
    }
  };

  // Inizializzazione AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="text-white border border-0 border-light d-flex flex-column justify-content-between align-items-center flex-lg-row p-4 p-lg-5" style={{ backgroundColor: 'rgb(179, 157, 219)' }} data-aos="fade-right">
      <div className="text-center text-lg-start py-3 py-lg-1">
        <h2 style={{ fontFamily: 'Lucida Fax', color: 'black' }}><strong>Subscribe to our newsletter</strong></h2>
        <p style={{ fontFamily: 'Lucida Fax', color: 'black' }}>Don't lose any update</p>
      </div>
      <form className="d-flex justify-content-center flex-wrap my-2" onSubmit={handleSubmit} method="post">
        <div className="my-2 position-relative d-flex align-items-center">
          {successMessage && (
            <div className="me-2 text-success">
              {successMessage}
            </div>
          )}
          <input className="form-control" type="email" name="email" placeholder="Your Email" value={email} onChange={handleChange} style={{ width: "200px" }} />
        </div>
        <div className="my-2"><button className="btn btn-primary ms-sm-2" type="submit">Subscribe </button></div>
      </form>
    </div>
  );
}

export default Newsletter;
