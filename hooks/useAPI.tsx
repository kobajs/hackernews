import { useCallback, useEffect, useState } from "react";

export type UseAPIHook<T> = {
  loading: boolean;
  data: T | null;
  error: unknown;
};

export function useAPI<T extends object>(
  apiFn: () => Promise<Response>
): UseAPIHook<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const invoke = useCallback(async () => {
    setLoading(true);

    let data, error;

    try {
      data = await apiFn().then((r) => r.json());
      setData(data);
    } catch (e) {
      setError(e);
      error = e;
    } finally {
      setLoading(false);
    }
  }, [apiFn]);

  useEffect(() => {
    invoke();
  }, []);

  return { loading, data, error };
}
