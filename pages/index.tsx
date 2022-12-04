import Head from "next/head";

import List from "../components/List/List";
import { useAPI } from "../hooks/useAPI";

import styles from "../styles/Home.module.css";

export default function Home() {
  const { data, loading } = useAPI<Array<string>>(() =>
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Hacker News</title>
        <meta
          name="description"
          content="Hacker News for all interested ones"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Hacker News</h1>

        {data && <List data={data} />}

        {loading && <div className="loader" />}
      </main>
    </div>
  );
}
