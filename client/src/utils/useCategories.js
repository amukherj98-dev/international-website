import { useEffect, useState } from "react";
import apiClient from "../api/client.js";

// Fetches the shared category taxonomy from the server so the frontend never
// hardcodes it separately from the Mongoose enums.
export default function useCategories() {
  const [categories, setCategories] = useState({
    guideCategories: [],
    newsCategories: [],
    submissionCategories: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    apiClient
      .get("/meta/categories")
      .then((res) => {
        if (!cancelled) setCategories(res.data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { ...categories, loading };
}
