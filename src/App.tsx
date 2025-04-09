import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Folders } from "./components/Folders";
import { Main } from "./components/MainSection/Main";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Signup } from "./components/Signup";
import { Signin } from "./components/Signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex h-full">
              <Sidebar />
              <Folders />
              <Main />
            </div>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
