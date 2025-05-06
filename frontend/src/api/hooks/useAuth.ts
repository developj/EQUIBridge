import { useEffect, useState } from "react";
import { getProfile } from "../api";
import { UserProfile } from "../interface";

export const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    getProfile()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  return { user };
};
