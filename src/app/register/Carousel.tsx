"use client";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import React, { useState, useEffect } from "react";

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "./Images/2.jpg",
    "./Images/6.jpg",
    "./Images/4.jpg",
    "./Images/5.jpg",
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change the interval duration as needed (in milliseconds)

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="relative w-full">
      <div
        id="default-carousel"
        className="relative w-full"
        data-carousel="slide"
      >
        {/* Carousel wrapper */}
        <div className="relative h-[450px] md:h-[600px] overflow-hidden ">
          {/* Carousel items */}
          {images.map((image, index) => (
            <div
              key={index}
              className={`duration-700 ease-in-out ${
                currentIndex === index ? "" : "hidden"
              }`}
              data-carousel-item
            >
              <img
                src={image}
                className="absolute inset-0 w-full h-full object-fit"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Slider indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-black" : "bg-gray-300"
              }`}
              aria-current={currentIndex === index ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              onClick={() => handleIndicatorClick(index)}
              data-carousel-slide-to={index}
            ></button>
          ))}
        </div>
        {/* Slider controls */}
        <button
          type="button"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 hidden md:flex items-center justify-center h-10 w-10 bg-gray-300 text-white rounded-full cursor-pointer"
          onClick={handlePrev}
          data-carousel-prev
        >
          <FaAngleLeft />
        </button>
        <button
          type="button"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 hidden md:flex items-center justify-center h-10 w-10 bg-gray-300 text-white rounded-full cursor-pointer"
          onClick={handleNext}
          data-carousel-next
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
