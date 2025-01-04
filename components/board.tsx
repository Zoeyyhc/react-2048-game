import styles from "@/styles/board.module.css";
import { JSX } from "react";

export default function Board() {
  const renderGrid = () => {
    const cells: JSX.Element[] = [];
    const totalCellsCount = 16;
    for (let i = 0; i < totalCellsCount; i++) {
      cells.push(<div key={i} className={styles.cell}></div>);
    }

    return cells;
  };

  return (
    <div className={styles.board}>
      <div className={styles.grid}>{renderGrid()}</div>
    </div>
  );
}
