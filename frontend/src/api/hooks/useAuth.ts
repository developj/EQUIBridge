import { useEffect, useState } from "react";
import { getProfile, UserProfile } from "../api";

export const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    getProfile()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  return { user };
};
