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
      style={{ border: "1px solid white" }}
      onClick={() => {
        markGrid(gridIndex);
      }}
    >
      {gridState && <div>{gridState}</div>}
    </div>
  );
}
