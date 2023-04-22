import React from "react";

const About = () => {
  return (
    <>
      {/* About Section */}
      <section id="about" className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>What We Do</h1>
              {/* About Text */}
              <p className="about_content">
                Welcome to IBF, your ultimate destination for exploring
                the latest trends, matching them to your unique style, and
                curating your personal collection of favorites. Our mission is
                to inspire and empower individuals to embrace the fast-paced
                world of trends while staying true to their own tastes and
                preferences.
              </p>

              <p className="about_content">
                At IBF, we believe that being in the know should be
                easy and enjoyable. Our dedicated team constantly scours the
                internet, social media platforms, and industry events to bring
                you a curated selection of the most current trends across
                various categories, including fashion, technology,
                entertainment, and more. With our user-friendly interface, you
                can effortlessly navigate the ever-changing world of trends and
                stay updated on what's new and popular.
              </p>

              <p className="about_content">
                Our innovative Trend Match feature allows you to explore trends
                that align with your interests and style. By leveraging advanced
                algorithms and your input, we create personalized
                recommendations tailored to your preferences. Whether you're a
                fashion-forward individual, a tech enthusiast, or simply curious
                about what's making waves, Trend Match will help you discover
                trends that resonate with you.
              </p>

              <p className="about_content">
                We understand the importance of saving and organizing the trends
                you love most. That's why we've created the Favorites screen,
                where you can easily curate and access your personal collection
                of trend favorites. This feature allows you to save trends that
                catch your eye and refer back to them whenever you need
                inspiration or want to share them with friends.
              </p>

              <p className="about_content">
                At IBF, we're passionate about helping you stay
                informed, inspired, and engaged with the world around you. We
                invite you to join our community and embark on an exciting
                journey through the ever-evolving landscape of trends. Let us be
                your guide to a more stylish, innovative, and on-trend future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section id="staff" className="py-5 text-center bg-dark text-white">
        <div className="container">
          <h1>Our Team</h1>
          <hr />
          <div className="row">
            {/* Team Member 1 */}
            <div className="col-md-2 mr-3">
              <img
                src="img/nikeshh.jpeg"
                alt=""
                className="img-fluid rounded-circle mb-2"
              />
              <h4>Nikeshh</h4>
            </div>
            {/* Team Member 2 */}
            <div className="col-md-2 mr-5">
              <img
                src="img/Raghu.jpeg"
                alt=""
                className="img-fluid rounded-circle mb-2"
              />
              <h4>Raghavendra</h4>
            </div>
            {/* Team Member 3 */}
            <div className="col-md-2 mr-4 ml-2">
              <img
                src="img/shravan.png"
                alt=""
                style={{ height: 170, minWidth: 170 }}
                className="img-fluid rounded-circle mb-2"
              />
              <h4>Shravan</h4>
            </div>
            {/* Team Member 4 */}
            <div className="col-md-2 mr-3">
              <img
                src="img/deeksha.jpeg"
                alt=""
                className="img-fluid rounded-circle mb-2"
              />
              <h4>Deeksha</h4>
            </div>
            {/* Team Member 5 */}
            <div className="col-md-2">
              <img
                src="img/jebin.jpeg"
                alt=""
                className="img-fluid rounded-circle mb-2"
              />
              <h4>Jebin</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
