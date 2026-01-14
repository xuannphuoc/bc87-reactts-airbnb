import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getListDataRoom } from "../getAPI/getListRoom.ts";
import type { AppDispatch } from "@/store/index.ts";

export const useGotoDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  return (id?: number, location?: string) => {
    if (id === undefined) return;

    dispatch(getListDataRoom(id));
    navigate(`detail/${id}/${location ?? ""}`);
  };
};
