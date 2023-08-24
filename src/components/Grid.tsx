interface Props {
  gridIndex: number;
  gridState: boolean | number;
  handleMarkGrid: (gridIndex: number) => void;
}

export default function Grid({
  gridIndex,
  gridState,
  handleMarkGrid,
}: Props): JSX.Element {
  const markGrid = (gridIndex: number) => {
    !gridState && handleMarkGrid(gridIndex);
  };

  return (
    <div
      style={{ border: "1px solid white" }}
      onClick={() => {
        markGrid(gridIndex);
      }}
    >
      {gridState && <div>{gridState}</div>}
    </div>
  );
}