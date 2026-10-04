import { useState, useEffect } from 'react';
import { fetchTasks } from '../api';

export function useTasks(query, status, page, pageSize) {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let debounceTimer;

    setLoading(true);
    setError(null);

    // Avoid a request for every keystroke and cancel the previous request
    // when the search/filter changes.
    debounceTimer = setTimeout(() => {
      fetchTasks({ query, status, page, pageSize, signal: controller.signal })
        .then((data) => {
          setTasks(data.items);
          setTotal(data.total);
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            setError(err.message);
          }
        })
        .finally(() => {
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        });
    }, 250);

    return () => {
      clearTimeout(debounceTimer);
      controller.abort();
    };
  }, [query, status, page, pageSize]);

  return { tasks, total, loading, error };
}
