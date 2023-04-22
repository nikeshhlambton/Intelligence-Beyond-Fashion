import React from "react";
import { useLocation } from 'react-router-dom';
import { ROUTE_PATHS } from "../../utility/constants";

const Footer = () => {
  
  const location = useLocation();

  return (
    <footer id="main-footer" className={`text-center custom_footer ${location.pathname === ROUTE_PATHS.HOME ? "fixed-bottom" : ""}`}>
      <div className="container-fluid">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h6 className="col-md-4 p-1 mt-2 text-dark footer_fonts">Copyright &copy; 2023 Group 1</h6>
          <ul className="nav col-md-4 mt-2 justify-content-end">
            <li className="nav-item">
              <h6 href="#" className="nav-link px-2 text-dark footer_fonts">
                Privacy policy
              </h6>
            </li>
            <li className="nav-item">
              <h6 href="#" className="nav-link px-2 text-dark footer_fonts">
                Terms and Conditions
              </h6>
            </li>
            {/* <li className="nav-item">
              <h6 href="#" className="nav-link px-2 text-dark">
                Pricing
              </h6>
            </li>
            <li className="nav-item">
              <h6 href="#" className="nav-link px-2 text-dark">
                FAQs
              </h6>
            </li> */}
            {/* <li className="nav-item"><h6 href="#" className="nav-link px-2 text-dark">About</h6></li> */}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
