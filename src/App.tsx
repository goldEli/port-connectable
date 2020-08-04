import * as React from "react";
import styled from "styled-components";
import Port from "./components/Port";

export default function App() {
  return (
    <Box className="App" id="js_container">
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
