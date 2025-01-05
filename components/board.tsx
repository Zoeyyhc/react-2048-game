import styles from "@/styles/board.module.css";
import { useReducer, useEffect, useRef, useContext, useCallback } from "react";
import gameReducer, { initialState } from "@/reducers/game-reducer";
import { JSX } from "react";
import Tile from "./tile";
import { Tile as TileModel } from "@/models/tile";
import { mergeAnimationDuration } from "@/constant";
import { GameContext } from "@/context/game-context";

export default function Board() {
  const { appendRandomTile, getTiles, dispatch } = useContext(GameContext);
  const initialized = useRef(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.code) {
        case "ArrowUp":
          dispatch({ type: "move_up" });
          break;
        case "ArrowDown":
          dispatch({ type: "move_down" });
          break;
        case "ArrowLeft":
          dispatch({ type: "move_left" });
          break;
        case "ArrowRight":
          dispatch({ type: "move_right" });
          break;
      }
      setTimeout(() => {
        dispatch({ type: "clean_up" });
        appendRandomTile();
      }, mergeAnimationDuration);
    },
    [appendRandomTile, dispatch],
  );

  const renderGrid = () => {
    const cells: JSX.Element[] = [];
    const totalCellsCount = 16;
    for (let i = 0; i < totalCellsCount; i++) {
      cells.push(<div key={i} className={styles.cell}></div>);
    }

    return cells;
  };

  const renderTiles = () => {
    const tiles = getTiles();
    if (!tiles || tiles.length === 0) return null;

    return tiles.map((tile: TileModel) => {
      if (!tile || !tile.id) return null;

      return (
        <Tile
          key={tile.id}
          id={tile.id}
          position={tile.position}
          value={tile.value}
        />
      );
    });
  };

  useEffect(() => {
    if (initialized.current === false) {
      dispatch({ type: "create_tile", tile: { position: [0, 1], value: 2 } });
      dispatch({ type: "create_tile", tile: { position: [0, 2], value: 2 } });
      initialized.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={styles.board}>
      <div className={styles.tiles}>{renderTiles()}</div>

      <div className={styles.grid}>{renderGrid()}</div>
    </div>
  );
}
