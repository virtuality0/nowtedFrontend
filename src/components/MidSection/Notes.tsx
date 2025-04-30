import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosApi from "../../utils/axiosClient";
import { note } from "../../types/note";
import { useEffect, useRef, useState } from "react";
import { NoteDiv } from "./NoteDiv";
import { useUpdateFolder, useUpdateNote } from "../../store/store";
import { Edit } from "../ui/icons/Edit";
import { ChevronLeft } from "../ui/icons/ChevronLeft";
import { ChevronRight } from "../ui/icons/ChevronRight";

interface NotesComponentProps {
  addNoteClicked: boolean;
}

export const Notes = ({ addNoteClicked }: NotesComponentProps) => {
  const params = useParams();
  const folderId = params.folderId;
  const axiosApi = useAxiosApi();
  const isNoteUpdated = useUpdateNote((state) => state.updateNote);
  const [editFolderClicked, setEditFolderClicked] = useState(false);
  const [folderTitle, setFolderTitle] = useState("");
  const setUpdateFolder = useUpdateFolder((state) => state.setUpdateFolder);
  const [page, setPage] = useState(1);
  const pageRef = useRef(page);

  const queryParams = {
    isDeleted: folderId === "Trash" ? "true" : "false",
    isArchived: folderId === "Archived" ? "true" : "false",
    isFavorite: folderId === "Favorites" ? "true" : "false",
  };

  const isSpecialFolder = () => {
    return (
      folderId === "Trash" ||
      folderId === "Favorites" ||
      folderId === "Archived"
    );
  };

  const getNotesByFolderId = async () => {
    return await axiosApi.get<{
      data: note[];
      total: number;
      folderName: string;
    }>(
      folderId && !isSpecialFolder()
        ? `/note?folderId=${folderId}&page=${page}`
        : `/note/recent?isDeleted=${queryParams.isDeleted}&isArchived=${queryParams.isArchived}&isFavorite=${queryParams.isFavorite}`
    );
  };

  const { data, refetch } = useQuery({
    queryKey: ["notes", folderId],
    queryFn: getNotesByFolderId,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (page != pageRef.current) {
      pageRef.current = page;
      refetch();
    } else {
      setFolderTitle(
        folderId && isSpecialFolder() ? folderId : data?.data.folderName ?? ""
      );
    }
  }, [data, page]);

  useEffect(() => {
    if (addNoteClicked || isNoteUpdated) {
      refetch();
    }
  }, [addNoteClicked, isNoteUpdated]);

  const updateFolder = async () => {
    setUpdateFolder(false);
    await axiosApi.patch(`/folder/${folderId}`, {
      name: folderTitle,
    });
    setUpdateFolder(true);
  };

  const onBlurHandler = async () => {
    setEditFolderClicked((prev) => !prev);
    await updateFolder();
  };

  const onKeyDownHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setEditFolderClicked(false);
      await updateFolder();
    }
  };

  return (
    <div className="bg-gray-700 w-[20%] h-full px-4 py-4 flex flex-col justify-around">
      <div className="flex justify-between items-center text-white">
        {editFolderClicked ? (
          <input
            onKeyDown={onKeyDownHandler}
            value={folderTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFolderTitle(e.target.value);
            }}
            autoFocus={true}
            onBlur={onBlurHandler}
            onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
              e.target.select();
            }}
            type="text"
            className="border-1 border-white/60 px-2 py-1"
          />
        ) : (
          <h1 className="text-white text-xl font-medium px-2 py-1 grow truncate">
            {folderTitle}
          </h1>
        )}
        {!["Trash", "Archived", "Favorites"].includes(folderId ?? "") &&
          !(data?.data.folderName === "Recent Notes") && (
            <div
              onClick={() => {
                setEditFolderClicked((prev) => !prev);
              }}
              className="cursor-pointer px-2 py-1"
            >
              {!editFolderClicked && <Edit size="md" strokeWidth={1.5} />}
            </div>
          )}
      </div>
      <div
        style={{ maxHeight: "calc((7 * 7rem) + (6 * 0.75rem))" }}
        className="flex flex-col px-2 py-2 gap-y-3 overflow-y-scroll grow"
      >
        {data?.data.data.map((item) => {
          return (
            <NoteDiv
              key={item.id}
              noteId={item.id}
              title={item.title}
              preview={item.preview ?? ""}
              createdAt={item.createdAt}
              folderId={
                isSpecialFolder() ? folderId ?? "" : item.folderId ?? ""
              }
            />
          );
        })}
      </div>
      {!isSpecialFolder() && !(data?.data.folderName === "Recent Notes") && (
        <div className="flex justify-between px-2 py-1">
          <div
            onClick={() => {
              if (page !== 1) {
                setPage((prev) => prev - 1);
              }
            }}
            className={`${page === 1 ? "text-white/60" : "text-white"}`}
          >
            <ChevronLeft size="lg" />
          </div>
          <span className="text-white">{page}</span>
          <div
            onClick={() => {
              if ((data?.data.total ?? 1) / (8 * page) > 1) {
                setPage((prev) => prev + 1);
              }
            }}
            className={`${
              (data?.data.total ?? 1) / (10 * page) > 1
                ? "text-white"
                : "text-white/60"
            }`}
          >
            <ChevronRight size="lg" />
          </div>
        </div>
      )}
    </div>
  );
};
