import React from "react";

const Contact = () => {
  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-3">
        <div className="container">
          <div className="row">
            {/* Contact Information */}
            <div className="col-md-4">
              <div className="card p-4">
                <div className="card-body">
                  <h4>Get In Touch</h4>
                  {/* <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Pariatur, odio!
                  </p> */}
                  <h4>Address</h4>
                  <p>265 Yorkland Blvd #400, North York, ON M2J 1S5</p>
                  <h4>Email</h4>
                  <p>lambton@cestarcollege.com'</p>
                  <h4>Phone</h4>
                  <p>(416) 485-2098</p>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <div className="col-md-8">
              <div className="card p-4">
                <div className="card-body">
                  <h3 className="text-center">
                    Please fill out this form to contact us
                  </h3>
                  <hr />
                  <div className="row">
                    {/* First Name */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                        />
                      </div>
                    </div>
                    {/* Last Name */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    {/* Email */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    {/* Phone Number */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {/* Message */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          placeholder="Message"
                        ></textarea>
                      </div>
                    </div>
                    {/* Submit Button */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="submit"
                          value="Submit"
                          className="btn btn-outline-custom_primary btn-block"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
