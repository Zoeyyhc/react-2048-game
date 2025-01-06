import { createContext, PropsWithChildren, useEffect, useReducer } from "react";
import gameReducer, { initialState } from "@/reducers/game-reducer";
import { tileCountPerDimension } from "@/constant";
import { isNil } from "lodash";
import { Tile } from "@/models/tile";
import { mergeAnimationDuration } from "@/constant";

export const GameContext = createContext({
  score: 0,
  getTiles: () => [] as Tile[],
  dispatch: (_: any) => {},
});

export default function GameProvider({ children }: PropsWithChildren) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  const getEmptyCells = () => {
    const results: [number, number][] = [];

    for (let x = 0; x < tileCountPerDimension; x++) {
      for (let y = 0; y < tileCountPerDimension; y++) {
        if (isNil(gameState.board[y][x])) {
          results.push([x, y]);
        }
      }
    }
    return results;
  };
  const appendRandomTile = () => {
    const emptyCells = getEmptyCells();
    if (emptyCells.length > 0) {
      const cellIndex = Math.floor(Math.random() * emptyCells.length);
      const newTile = {
        position: emptyCells[cellIndex],
        value: 2,
      };
      dispatch({ type: "create_tile", tile: newTile });
    }
  };
  const getTiles = () => {
    return gameState.tilesByIds.map(
      (tileId: string) => gameState.tiles[tileId],
    );
  };
  useEffect(() => {
    if (gameState.hasChanged) {
      setTimeout(() => {
        dispatch({ type: "clean_up" });
        appendRandomTile();
      }, mergeAnimationDuration);
    }
  }, [gameState.hasChanged]);
  return (
    <GameContext.Provider
      value={{ score: gameState.score, getTiles, dispatch }}
    >
      {children}
    </GameContext.Provider>
  );
}
