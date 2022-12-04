import { useEffect, useState } from "react";

import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

import Card from "../Card";

import styles from "./List.module.css";

const PerPage = 10;

function List({ data }: { data: Array<string> }) {
  const [offset, setOffset] = useState(0);
  const [pageData, setPageData] = useState<Array<string>>([]);

  useEffect(() => {
    if (data.length > 0) {
      setPageData(data.slice(0, offset + PerPage));
    }
  }, [data, offset]);

  const { observedRef } = useIntersectionObserver({
    cb: () => setOffset((prev) => (prev < data.length ? prev + PerPage : prev)),
  });

  return (
    <>
      <ul className={styles.list}>
        {pageData.map((id) => (
          <Card key={id} id={id} />
        ))}
      </ul>

      <div ref={observedRef} className={styles.fakeFooter} />
    </>
  );
}

export default List;
