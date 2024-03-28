import React, { useEffect, useState } from 'react';

const ImageSlider = ({ images, interval = 1000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, interval);

    return () => clearInterval(timer); // Cleanup the timer on component unmount

  }, [images.length, interval]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className='mt-10'>
      <div>
      <img
      className='h-60 w-full'
        src={images[currentSlide]}
        alt={`Slide ${currentSlide + 1}`}
      />
      </div>
      {/* Add navigation buttons if needed */}
      {/* <button onClick={prevSlide}>Previous</button>
      <button onClick={nextSlide}>Next</button> */}
    </div>
  );
};

export default ImageSlider;
