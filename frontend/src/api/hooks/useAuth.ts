import { useEffect, useState } from "react";
import { getProfile } from "../api";
import { UserProfile } from "../interface";

export const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getProfile()
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Auth error:", err);
        setUser(null);
        setLoading(false);
      });
  }, []);

  return { user, loading };
};
