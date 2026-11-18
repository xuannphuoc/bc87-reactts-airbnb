import { useNavigate } from "react-router-dom";

export const useGotoDetail = () => {
  const navigate = useNavigate();
  return (id?: number, location?: string) => {
    if (id === undefined) return;
    navigate(`/detail/${id}/${encodeURIComponent(location || "Việt Nam")}`);
  };
};
