import React from "react";
import styled from "styled-components";
import PortConnectable from "./PortConnectable";

interface PortProps {}

const Port: React.FC<PortProps> = props => {
  const circleRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (circleRef.current !== null) {
      new PortConnectable(circleRef.current);
    }

    return () => {};
  }, []);

  return <Circle ref={circleRef} />;
};

const Circle = styled.div`
  width: 16px;
  height: 16px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: 200px;
  left: 200px;
`;

export default Port;
