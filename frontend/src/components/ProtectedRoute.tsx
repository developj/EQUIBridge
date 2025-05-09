import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { useProfile } from "../api/hooks/useProfile";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { data: user, isLoading } = useProfile();
  if (isLoading) return null;
  if (!user) {
    toast.error("Unauthorized", {
      description: "Please login or register to access this page",
    });
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
