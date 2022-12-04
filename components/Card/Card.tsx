import React, { useMemo } from "react";
import cx from "classnames";
import { useAPI } from "../../hooks/useAPI";

import styles from "./Card.module.css";
import { randomText } from "../../helpers/randomText";

function Card({ id }: { id: string }) {
  const { data, error, loading } = useAPI<{
    title: string;
    by: string;
    url: string;
  }>(() => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));

  const skeleton = useMemo(
    () => ({
      title: randomText(20),
      author: randomText(10),
    }),
    []
  );

  if (!data && !loading) return null;

  return (
    <li className={styles.card}>
      {loading ? (
        <div className={styles.cardContent}>
          <h2 className={cx(styles.title, styles.skeleton)}>
            {skeleton.title}
          </h2>
          <p className={cx(styles.author, styles.skeleton)}>
            {skeleton.author}
          </p>
        </div>
      ) : (
        <a className={styles.cardContent} href={data?.url} target="_blank">
          <h2 className={styles.title}>{data?.title}</h2>
          <p className={styles.author}>{data?.by}</p>
        </a>
      )}
    </li>
  );
}

export default Card;
