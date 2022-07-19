import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Help from "./components/Help/Help";

export default function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/help" element={<Help />} />
    </Routes>
    </>
  );
}
