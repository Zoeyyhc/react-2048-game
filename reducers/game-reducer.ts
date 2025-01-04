import { Tile } from "@/models/tile";
import { uid } from "uid";
type State = { board: string[][]; tiles: { [id: string]: Tile } };
type Action = { type: 'create_tile', tile: Tile};

// Generate a blank board, each element is undefined.
function createBoard(tileCountPerDimension: number = 4) {
  const board: string[][] = [];
  for (let i = 0; i < tileCountPerDimension; i += 1) {
    board[i] = new Array(tileCountPerDimension).fill(undefined);
  }
  return board;
}

export const initialState: State = { board: createBoard(), tiles: {} };

export default function gameReducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'create_tile': {
      const tileId = uid(); // Generate a unique id for the tile
      const [x, y] = action.tile.position; // Get the position of the tile
      const newBoard = JSON.parse(JSON.stringify(state.board)); // Deep copy the board
      newBoard[y][x] = tileId; // Place the tile on the board
      return {
        ...state, // keep the rest of the state unchanged
        board: newBoard,
        tiles: {
          ...state.tiles, // keep the rest of the tiles unchanged, 将 state.tiles 对象中的所有键值对展开到新的 tiles 对象中
          [tileId]: action.tile, // add the new tile to the tiles
        },
      };
    }

    default:
      return state // return the state unchanged for unknown action types
  }
}
