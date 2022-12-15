import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import Single from "./pages/Single";
import New from "./pages/New";
import { userInputs } from "./formSource";
import Login from "./pages/Login";
import PrivateRoutes from "./PrivateRoute";
import NewHotel from "./pages/NewHotel";

//import { auth } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoutes />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="users" element={<PrivateRoutes />}>
          <Route index element={<List />} />
          <Route path=":userID" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={userInputs} title="Add New User" />}
          />
        </Route>
        <Route path="hotels" element={<PrivateRoutes />}>
          <Route index element={<List />} />
          <Route path=":hotelId" element={<Single />} />
          <Route path="new" element={<NewHotel />} />
        </Route>
        <Route path="rooms" element={<PrivateRoutes />}>
          <Route index element={<List />} />
          <Route path=":roomId" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={userInputs} title="Add New Room" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
