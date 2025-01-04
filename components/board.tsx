import styles from "@/styles/board.module.css";
import { useReducer,useEffect,useRef } from "react";
import gameReducer, {initialState} from "@/reducers/game-reducer";
import { JSX } from "react";
import Tile from "./tile";
import { Tile as TileModel } from "@/models/tile";

export default function Board() {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  const initialized = useRef(false);

  const renderGrid = () => {
    const cells: JSX.Element[] = [];
    const totalCellsCount = 16;
    for (let i = 0; i < totalCellsCount; i++) {
      cells.push(<div key={i} className={styles.cell}></div>);
    }

    return cells;
  };

  const renderTiles = () => {
    return Object.values(gameState.tiles).map((tile: TileModel, index: number) => {
      return<Tile key={`${index}`} {...tile}/>;
  });
  };

  useEffect(()=>{
    if (initialized.current === false){
      dispatch({type: 'create_tile', tile: {position: [0, 1],value: 2}})
      dispatch({type: 'create_tile', tile: {position: [0, 2],value: 2}})
      initialized.current = true;
    }
  },[])

  return (
    <div className={styles.board}>
      <div className={styles.tiles}>
        {renderTiles()}
      </div>

      <div className={styles.grid}>{renderGrid()}</div>
    </div>
  );
}
