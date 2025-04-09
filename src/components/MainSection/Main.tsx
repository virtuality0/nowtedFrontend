import { Button } from "../ui/Button";

export const Main = () => {
  return (
    <div className="flex flex-col grow px-4 py-4">
      <div className="flex gap-x-4 justify-end">
        <Button size="md" variant="secondary" text="Sign Out" />
      </div>
    </div>
  );
};
