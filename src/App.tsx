import * as React from "react";
import styled from "styled-components";
import Port from "./components/Port";

export default function App() {
  return (
    <Box className="App" id="js_container">
      <svg width="190" height="160" xmlns="http://www.w3.org/2000/svg">
        {/* <path d="M 10 80 C 40 10 , 65 10, 95 80 S 150 150, 180 80" stroke="black" fill="transparent"/> */}
        {/* <path d="M 10 80 Q 40 10 , 95 80 T 180 80" stroke="black" fill="transparent"/> */}
        {/* <path d="M 0, 80 Q 95 80, 95 80 T 190 80" stroke="black" fill="transparent"/> */}
      </svg>
      <Port />
    </Box>
  );
}

const Box = styled.div`
  position: relative;
  height: 1000px;
  width: 1000px;
  overflow: auto;
`;
