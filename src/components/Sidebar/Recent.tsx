import { useQuery } from "@tanstack/react-query";
import { note } from "../../types/note";
import useAxiosApi from "../../utils/axiosClient";
import noteIcon from "../../assets/icons/Page-Icon.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateNote } from "../../store/store";

interface RecentComponentProps {
  addNoteClicked: boolean;
}

export const Recent = ({ addNoteClicked }: RecentComponentProps) => {
  const axiosApi = useAxiosApi();
  const navigate = useNavigate();
  const fetchRecentNotes = () => {
    return axiosApi.get<{ data: note[]; total: number }>("/note/recent");
  };
  const isNoteUpdated = useUpdateNote((state) => state.updateNote);

  const { data, refetch } = useQuery({
    queryKey: ["recent-notes"],
    queryFn: fetchRecentNotes,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (addNoteClicked || isNoteUpdated) {
      refetch();
    }
  }, [addNoteClicked, isNoteUpdated]);

  return (
    <div className="flex flex-col gap-y-4 px-2 py-1">
      <h1 className="text-white/60 text-sm">Recents</h1>
      <div className="flex flex-col gap-y-4">
        {data?.data.data.slice(0, 3).map((item) => {
          return (
            <div
              onClick={() => {
                navigate(`/folder/${item.folderId}/note/${item.id}`);
              }}
              className="flex justify-between gap-x-4 items-center cursor-pointer overflow-hidden"
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
