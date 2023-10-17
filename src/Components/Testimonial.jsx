import React from "react";

function Testimonial({ image, name, text }) {
  const imageBasePath = '../Assets/TestimonialImage/';
  const fullImagePath = imageBasePath + image;
  console.log(fullImagePath);
  return (
    <div  className="testimonial">
      <img src={fullImagePath} alt={name} className="testimonial-image" />
      <h4 className="testimonial-name">{name}</h4>
      <p className="testimonial-text">{text}</p>
    </div>
  );
}

export default Testimonial;

