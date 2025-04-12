import { useQuery } from "@tanstack/react-query";
import { note } from "../../types/note";
import useAxiosApi from "../../utils/axiosClient";
import noteIcon from "../../assets/icons/Page-Icon.svg";

export const Recent = () => {
  const axiosApi = useAxiosApi();
  const fetchRecentNotes = () => {
    return axiosApi.get<{ data: note[]; total: number }>("/note/recent");
  };

  const { data } = useQuery({
    queryKey: ["recent-notes"],
    queryFn: fetchRecentNotes,
  });

  return (
    <div className="flex flex-col gap-y-4 px-2 py-1">
      <h1 className="text-white/60 text-sm">Recents</h1>
      <div className="flex flex-col gap-y-4">
        {data?.data.data.slice(0, 3).map((item) => {
          return (
            <div
              className="flex justify-between gap-x-4 items-center cursor-pointer basis-[33%] overflow-hidden"
              key={item.id}
            >
              <img src={noteIcon} alt="note icon" />
              <span className="text-white/60 text-sm grow">{item.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
