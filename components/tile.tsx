import { containerWidth, tileCountPerDimension } from "@/constant";
import styles from "../styles/tile.module.css";
import {Tile as TileProps} from "@/models/tile";

export default function Tile({position, value}: TileProps) {
    const positionToPixels = (position: number) => {
        return (position / tileCountPerDimension) * containerWidth;
    };

    const style = {
        left: positionToPixels(position[0]),
        top: positionToPixels(position[1]),
    }
    return <div className={styles.tile} style = {style}> {value} </div>;
}
