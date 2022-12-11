import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import List from "./pages/List";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleHotel from "./pages/SingleHotel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <>
                <Navbar />
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/hotel"
            element={
              <>
                <Navbar />
                <Header type="list" />
                <List />
              </>
            }
          />
          <Route
            path="/hotels"
            element={
              <>
                <Navbar />
                <Header type="list" />
                <Hotels />
              </>
            }
          />
          <Route
            path="/hotel/:id"
            element={
              <>
                <SingleHotel />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
