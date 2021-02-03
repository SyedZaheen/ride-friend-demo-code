import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Box, Text } from "@chakra-ui/react";

const Search = (props) => {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);
    props.setLocation(term);
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const response = await axios.get("/api/autocomplete", {
        params: {
          input: debouncedTerm,
          latitude,
          longitude,
        },
      });

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
    return (
      <Box
        p={2}
        fontWeight={600}
        cursor="pointer"
        _hover={{ bg: "gray.50" }}
        key={result.description}
        onMouseDownCapture={() => {
          setTerm(result.description);
        }}
      >
        {result.description}
      </Box>
    );
  });

  return (
    <Box>
      <Box>
        <Text>{props.label}</Text>
        <Input
          onFocus={() => setSuggestionsOpen(true)}
          onBlur={() => setSuggestionsOpen(false)}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          value={term}
          type="text"
        />
      </Box>
      <Box boxShadow="xl" display={suggestionsOpen ? "static" : "none"}>
        {renderedResults}
      </Box>
    </Box>
  );
};

export default Search;
