import React from "react";

interface Props {
  index: number;
}

export default function Grid({ index }: Props): JSX.Element {
  const [isClicked, setIsClicked] = React.useState<boolean>(false);

  const handleClick = (index: number) => {
    index;
    setIsClicked(true);
  };
  return (
    <div
      style={{ border: "1px solid white" }}
      onClick={() => {
        handleClick(index);
      }}
    >
      {isClicked && <div>❌</div>}

      {/* <div>⭕</div> */}
    </div>
  );
}
