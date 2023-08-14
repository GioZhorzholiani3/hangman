import classes from "./HangmanDrawing.module.css";

type HangmanDrawingProps = {
  numberOfGuesses: number;
};

const HangmanDrawing: React.FC<HangmanDrawingProps> = (props) => {
  const HEAD = <div key="head" className={classes.head} />;
  const BODY = <div key="body" className={classes.body} />;
  const LEFT_ARM = <div key="leftArm" className={classes.leftArm} />;
  const RIGHT_ARM = <div key="rightArm" className={classes.rightArm} />;
  const LEFT_LEG = <div key="leftLeg" className={classes.leftLeg} />;
  const RIGHT_LEG = <div key="rightLeg" className={classes.rightLeg} />;

  const BODY_PARTS = [HEAD, BODY, LEFT_ARM, RIGHT_ARM, LEFT_LEG, RIGHT_LEG];

  return (
    <div className={classes.drawingWrapper}>
      {BODY_PARTS.slice(0, props.numberOfGuesses)}
      <div className={classes.topStick} />
      <div className={classes.top} />
      <div className={classes.stick} />
      <div className={classes.bottom} />
    </div>
  );
};

export default HangmanDrawing;
