function Infocard(){

    return(<><div className="container h-100 position-relative" style={{ top: "-50px" }}>
    <div
    
      className="row gy-5 gy-lg-0 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-lg-4"
      style={{ paddingTop: 0, paddingBottom: 85, margin: "-118px -12px 0px" }}
    >
      <div className="col" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div
         data-aos="fade-up"
         data-aos-duration={1500}
         data-aos-once="true"
          id="cardEntrada-2"
          className="p-4 text-center shadow-lg m-5 rounded-5"
          style={{
            background:
              "linear-gradient(171deg, var(--bs-primary-border-subtle) 0%, var(--bs-indigo) 100%), var(--bs-purple)",
            width: 280
          }}
        >
          <img 
          
          className="pt-2 w-50" src="assets/img/privacy-svgrepo-com.svg" />
          <h3 className="text-white text-center pt-2">Privacy</h3>
          <hr className="text-white" />
          <p style={{ color: "var(--bs-body-bg)" }} />
          <p style={{ color: "var(--bs-body-bg)" }}>
            <strong>
              This principle emphasizes the importance of protecting personal
              and sensitive data processed by AI systems, ensuring
              confidentiality and compliance with data protection regulations
            </strong>
          </p>
        </div>
      </div>
      <div className="col">
        <div
         data-aos="fade-up"
         data-aos-duration={1500}
         data-aos-once="true"
          id="cardEntrada-1"
          className="p-4 text-center shadow-lg m-5 rounded-5"
          style={{
            background:
              "linear-gradient(171deg, var(--bs-primary-border-subtle) 0%, var(--bs-indigo) 100%), var(--bs-purple)",
            width: 280
          }}
        >
          <img className="pt-2 w-50" src="assets/img/security-svgrepo-com.svg" />
          <h3 className="text-white text-center pt-2">Security</h3>
          <hr className="text-white" />
          <p style={{ color: "var(--bs-body-bg)", fontWeight: "bold" }}>
            Security in trustworthy AI focuses on safeguarding AI systems from
            unauthorized access and attacks, ensuring the integrity and
            reliability of their operations and data
            <br />
            <br />
          </p>
        </div>
      </div>
      <div className="col">
        <div
         data-aos="fade-up"
         data-aos-duration={1500}
         data-aos-once="true"
          id="cardEntrada-3"
          className="p-4 text-center shadow-lg m-5 rounded-5"
          style={{
            background:
              "linear-gradient(171deg, var(--bs-primary-border-subtle) 0%, var(--bs-indigo) 100%), var(--bs-purple)",
            width: 280
          }}
        >
          <img className="pt-2 w-50" src="assets/img/ai-explainability-svgrepo-com.svg" />
          <h3 className="text-white text-center pt-2">Explainability</h3>
          <hr className="text-white" />
          <p style={{ color: "var(--bs-body-bg)" }}>
            <strong>
              Explainability involves the ability of AI systems to provide
              understandable and interpretable reasoning for their decisions and
              actions, making them transparent and accountable to users
            </strong>
          </p>
        </div>
      </div>
      <div className="col">
        <div
         data-aos="fade-up"
         data-aos-duration={1500}
         data-aos-once="true"
          id="cardEntrada-4"
          className="p-4 text-center shadow-lg m-5 rounded-5"
          style={{
            background:
              "linear-gradient(171deg, var(--bs-primary-border-subtle) 0%, var(--bs-indigo) 100%), var(--bs-purple)",
            width: 280
          }}
        >
          <img className="pt-2 w-50" src="assets/img/fairness-svgrepo-com.svg" />
          <h3 className="text-white text-center pt-2">Fairness</h3>
          <hr className="text-white" />
          <p>
            <strong>
              <span style={{ color: "rgb(255, 255, 255)" }}>
                Fairness refers to the principle of ensuring AI systems do not
                create or perpetuate bias, treating all individuals and groups
                equitably
              </span>
            </strong>
            <br />
            <br />
            <br />
          </p>
        </div>
      </div>
    </div>
  </div></>)
}

export default Infocard; 