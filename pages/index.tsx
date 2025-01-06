import Head from "next/head";
import Board from "../components/board";
import styles from "@/styles/index.module.css";
import Score from "@/components/score";

export default function Home() {
  return (
    <div className={styles.twenty48}>
      <Head>
        <title>Play 2048</title>
        <meta name="description" content="2048 in React" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>2048</h1>
        <Score />
      </header>
      <main>
        <Board />
      </main>
      <footer> Made with ❤️ by Yuhan</footer>
    </div>
  );
}
