const Map = () => {
  return (
    <div className="map-area-one p-30 mt-120 lg-mt-80 wow fadeInUp">
      <div className="box-layout">
        <div className="mapouter">
          <div className="gmap_canvas">
        
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.4153443302957!2d77.59962847494522!3d13.07284268725188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae19595c5f5533%3A0xe686e681aa9c42dc!2sWayOnC%20Investments%20Pvt%20Ltd.!5e0!3m2!1sen!2sin!4v1685340076996!5m2!1sen!2sin"
              className="gmap_iframe"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
