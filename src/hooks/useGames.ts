import { GamesContext } from "@/contexts/GamesContext";
import { useContext } from "react";

export function useGames() {
  return useContext(GamesContext)
}