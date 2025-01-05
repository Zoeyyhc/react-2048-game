import { createContext, PropsWithChildren, useReducer } from "react";
import gameReducer, { initialState } from "@/reducers/game-reducer";
import { tileCountPerDimension } from "@/constant";
import { isNil } from "lodash";

export const GameContext = createContext({
  appendRandomTile: () => {},
  gameState: initialState,
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
  return (
    <GameContext.Provider value={{ appendRandomTile, gameState, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}