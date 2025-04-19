import React from "react";
import Container from "./Container";

const Banner = () => {
  return (
    <Container>
      <div className="relative bg-cover bg-center h-[300px] md:h-[400px] ">
        <div className="absolute inset-0 bg-[#001a2c] flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-white text-3xl md:text-5xl font-bold">
              Discover Hyderabad’s Hidden Gems
            </h1>
            <p className="text-gray-200 mt-3 text-lg">
              Restaurants, cafes, malls and more – handpicked for you.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
