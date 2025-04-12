import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosApi from "../utils/axiosClient";
import { note } from "../types/note";

export const Notes = () => {
  const params = useParams();
  const folderId = params.folderId;
  const axiosApi = useAxiosApi();

  const getNotesByFolderId = async () => {
    return await axiosApi.get<{
      data: note[];
      total: number;
      folderName: string;
    }>(folderId ? `/note?folderId=${folderId}` : `/note/recent`);
  };

  const { data } = useQuery({
    queryKey: ["notes", folderId],
    queryFn: getNotesByFolderId,
  });
  return (
    <div className="bg-gray-700 w-[20%] h-full px-4 py-4">
      <h1 className="text-white text-xl font-medium px-4 py-2">
        {folderId ? data?.data.folderName : "Recent Notes"}
      </h1>
      <div className="flex flex-col px-2 py-2 gap-y-4">
        {data?.data.data.map((item) => {
          return (
            <div className="flex flex-col gap-y-2 bg-gray-600 px-2 py-4 rounded-md">
              <h1 className="text-white font-medium">{item.title}</h1>
              <span className="text-white/60">{item.preview}</span>
              <span className="text-white/60 text-sm">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
