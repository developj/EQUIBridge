import { JSX } from "react";
import { useAuth } from "../api/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  if (user === null) {
    toast.error("Unauthorized", {
      description: "Please login or register to access this page",
    });
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
