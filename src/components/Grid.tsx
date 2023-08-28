interface Props {
  gridIndex: number;
  gridState: boolean | string;
  handleMarkGrid?: (gridIndex: number) => void;
}

export default function Grid({
  gridIndex,
  gridState,
  handleMarkGrid,
}: Props): JSX.Element {
  const markGrid = (gridIndex: number) => {
    !gridState && handleMarkGrid && handleMarkGrid(gridIndex);
  };

  return (
    <div
      className="gridCell"
      style={{ position: "relative" }}
      onClick={() => {
        markGrid(gridIndex);
      }}
    >
      {gridState && (
        <div
          style={{
            zoom: "400%",
            margin: "0",
            position: "absolute",
            top: "0%",
            left: "5%",
            transform: "translateY(-50%, -50%)",
          }}
        >
          {gridState}
        </div>
      )}
    </div>
  );
}
