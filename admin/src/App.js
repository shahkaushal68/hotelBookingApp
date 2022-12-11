import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import Single from "./pages/Single";
import New from "./pages/New";
import { userInputs } from "./formSource";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
        <Route path="users">
          <Route index element={<List />} />
          <Route path=":userID" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={userInputs} title="Add New User" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
