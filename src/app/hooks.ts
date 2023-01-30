import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { validateToken } from "../app/core/auth";

// Use throughout app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useToken = () => {
    const token: string | null = JSON.parse(
        String(sessionStorage.getItem("token"))
      );
      if (!token || !validateToken(token)) {
        return true;
      } else {
        return false;
      }
}