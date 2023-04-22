import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../utility/constants";

// Home component containing a carousel with slides
const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = 3;

  // Handles next slide action
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  // Handles previous slide action
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  // Renders a single carousel item with given index, heading, and content
  const renderCarouselItem = (index, heading, content) => {
    const isActive = activeIndex === index ? "active" : "";
    const carouselItemClass = `carousel-item carousel-image-${index + 1} ${isActive}`;

    return (
      <div className={carouselItemClass}>
        <div className="fade_layer">
          <div className="container">
            <div
              className="carousel-caption d-none d-sm-block mb-5"
              style={{ marginBottom: 150 }}
            >
              <h1 className="display-3">{heading}</h1>
              <p className="lead">{content}</p>
              <div
                className="container d-flex justify-content-center"
                style={{ paddingTop: 50 }}
              >
                <Link
                  to={ROUTE_PATHS.TREND_MATCH}
                  className="btn custom_primary_color btn-lg"
                  style={{ marginRight: 10 }}
                >
                  Get Styled Now
                </Link>
                <Link
                  to={ROUTE_PATHS.CURRENT_MATCH}
                  className="btn custom_primary_color btn-lg"
                  style={{ marginLeft: 10 }}
                >
                  Explore Trends
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render the carousel with its items and controls
  return (
    <>
      <section id="showcase">
        <div id="myCarousel" className="carousel slide">
          <div className="carousel-inner">
            {renderCarouselItem(
              0,
              "Discover the Latest Trends",
              "Stay ahead of the curve with the hottest styles and latest fashion trends. Browse through our curated collection, and find your perfect outfit today!"
            )}
            {renderCarouselItem(
              1,
              "Personalized Style Recommendations",
              "Not sure what suits you best? Let us be your personal stylist! Our AI-powered recommendations will help you find the perfect outfit tailored to your preferences and body type."
            )}
            {renderCarouselItem(
              2,
              "Sustainable Fashion Choices",
              "Make a positive impact on the environment and look fabulous at the same time. Discover our selection of sustainable fashion options that don't compromise on style."
            )}
          </div>

          <a
            href="#myCarousel"
            className="carousel-control-prev"
            onClick={handlePrev}
          >
            <span className="carousel-control-prev-icon"></span>
          </a>

          <a
            href="#myCarousel"
            className="carousel-control-next"
            onClick={handleNext}
          >
            <span className="carousel-control-next-icon"></span>
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
