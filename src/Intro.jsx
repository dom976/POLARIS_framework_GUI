function Intro(){
    return(<> <div
    style={{
      height: 800,
      background: "linear-gradient(#eaccf5 35%, #aca7eb 77%)",
      margin: 0,
      position: "relative"
    }}
  >
<div className="container" >
  <div className="row" style={{ marginTop: 50 }}>
    <div className="col-md-6 text-left">
      <h1 
      
      data-aos="fade-right"
      data-aos-duration={1000}
      data-aos-once="true"
      
      
      
      style={{ fontSize: "45px", fontWeight: 900, marginTop: 58, fontFamily: "Lucida Fax" }}>
        Your number one tool to handle Trustworthy AI&nbsp;
      </h1>
      <div className="btn-group" role="group">
      <a  data-aos="fade-right"
                  data-aos-duration={1000}
                  data-aos-once="true"
            className="btn btn-primary ms-md-2"
            role="button"
            href="/How"
            style={{ fontSize: 30 }}
          >
            <strong>HowTo</strong>
          </a>
      </div>
    
    </div>



      
    <div className="col-md-6 col-lg-6 offset-lg-0 text-center">
      <img
                data-aos="fade-left"
                data-aos-duration={1000}
                data-aos-once="true"
      
      
      
      src="assets/img/wella-Photoroom-1.png-Photoroom-1.png" />
    </div>
  </div>
</div>

  </div>
</>)

}

export default Intro;