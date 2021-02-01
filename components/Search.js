import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const response = await axios.get(
        "http://localhost:3000/autocomplete-api",
        {
          params: {
            input: debouncedTerm,
            latitude,
            longitude,
          },
        }
      );

      setResults(response.data.predictions);
      console.log(response);
    };
    if (debouncedTerm.length) {
      search();
    }
  }, [debouncedTerm]);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((pos) => {
      setLatitude(pos.coords.latitude);
      setLongitude(pos.coords.longitude);
    });
  });

  const renderedResults = results.map((result) => {
    return <div>{result.description}</div>;
  });

  return (
    <div>
      <div>
        <div>
          <label>Enter Start location</label>
          <input
            onChange={(e) => setTerm(e.target.value)}
            value={term}
            type="text"
          />
        </div>
      </div>
      <div>{renderedResults}</div>
    </div>
  );
};

export default Search;
