import { Main } from "./MainSection/Main";
import { Notes } from "./Notes";
import { Sidebar } from "./Sidebar/Sidebar";

export const Dashboard = () => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <Notes />
      <Main />
    </div>
  );
};
