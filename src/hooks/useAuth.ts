import { UserContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export function useAuth() {
  return useContext(UserContext);
};