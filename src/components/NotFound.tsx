import notFound from "../assets/images/not_found_page.svg";
export const NotFound = () => {
  return (
    <div className="size-full bg-black flex justify-center items-center">
      <div className="w-[60%] flex justify-center">
        <img
          className="rounded-lg w-[36rem]"
          src={notFound}
          alt="not found image"
        />
      </div>
    </div>
  );
};
