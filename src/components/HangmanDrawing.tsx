import styled from "styled-components";

type HangmanDrawingProps = {
  numberOfGuesses: number;
};

const DrawingWrapper = styled.div`
  position: relative;
`;

const Bottom = styled.div`
  height: 10px;
  width: 250px;
  background: black;
`;

const Stick = styled.div`
  height: 400px;
  width: 10px;
  background: black;
  margin-left: 120px;
`;

const Top = styled.div`
  height: 10px;
  width: 200px;
  background: black;
  margin-left: 120px;
`;

const TopStick = styled.div`
  height: 50px;
  width: 10px;
  background: black;
  position: absolute;
  top: 0;
  right: 0;
`;

const Head = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 10px solid black;
  position: absolute;
  top: 50px;
  right: -20px;
`;

const Body = styled.div`
  width: 10px;
  height: 100px;
  background: black;
  position: absolute;
  top: 100px;
  right: 0;
`;

const RightArm = styled.div`
  width: 100px;
  height: 10px;
  background: black;
  position: absolute;
  top: 150px;
  right: -100px;
  rotate: -30deg;
  transform-origin: left bottom;
`;

const LeftArm = styled.div`
  width: 100px;
  height: 10px;
  background: black;
  position: absolute;
  top: 150px;
  right: 10px;
  rotate: 30deg;
  transform-origin: right bottom;
`;

const RightLeg = styled.div`
  width: 100px;
  height: 10px;
  background: black;
  position: absolute;
  top: 185px;
  right: -90px;
  rotate: 60deg;
  transform-origin: left bottom;
`;

const LeftLeg = styled.div`
  width: 100px;
  height: 10px;
  background: black;
  position: absolute;
  top: 185px;
  right: 0;
  rotate: -60deg;
  transform-origin: right bottom;
`;

const HangmanDrawing: React.FC<HangmanDrawingProps> = (props) => {
  const HEAD = <Head key="head" />;
  const BODY = <Body key="body" />;
  const LEFT_ARM = <LeftArm key="leftArm" />;
  const RIGHT_ARM = <RightArm key="rightArm" />;
  const LEFT_LEG = <LeftLeg key="leftLeg" />;
  const RIGHT_LEG = <RightLeg key="rightLeg" />;

  const BODY_PARTS = [HEAD, BODY, LEFT_ARM, RIGHT_ARM, LEFT_LEG, RIGHT_LEG];

  return (
    <DrawingWrapper>
      {BODY_PARTS.slice(0, props.numberOfGuesses)}
      <TopStick />
      <Top />
      <Stick />
      <Bottom />
    </DrawingWrapper>
  );
};

export default HangmanDrawing;
