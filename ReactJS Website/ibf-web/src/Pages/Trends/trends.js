import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Trends = () => {
  const ldaVisRef = useRef();
  let isRendered = false;

  // Fetches LDA data from the API and adds it to the DOM
  const fetchLDAData = async () => {
    try {
      const response = await axios.post("https://www.fashiontrendcheck.com/lda");
      // TrendData;
      const scriptRegex = /<script type="text\/javascript">(.*?)<\/script>/s;
      const match = response.data.match(scriptRegex);
      if (match) {
        const contentWithoutScript = response.data.replace(scriptRegex, '');
        if (ldaVisRef.current) {
          ldaVisRef.current.innerHTML = contentWithoutScript;
        }

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = match[1].trim();

        // Adding a delay of 200 milliseconds
        setTimeout(() => {
          if (ldaVisRef.current) {
            ldaVisRef.current.appendChild(script);
          }
        }, 200); // Adding a delay of 200 milliseconds
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch LDA data on component mount, but only once
  useEffect(() => {
    if(!isRendered) {
        
      fetchLDAData();
      isRendered = true
    }
  }, []);

  // Render the LDA visualization container
  return (
    <div className="container-fluid mt-5 mb-5 d-flex justify-content-center">
      <div
        ref={ldaVisRef}
        id="ldavis_el177791403853336439686395151240"
        style={{ backgroundColor: "white", paddingLeft: 100 }}
        dangerouslySetInnerHTML={{ __html: '' }}
      ></div>
    </div>
  );
};

export default Trends;
