import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Challenge1 from "./pages/day1/Challenge1";
import Challenge2 from "./pages/day2/Challenge2";
import Challenge3 from "./pages/day3/Challenge3";
import Challenge4 from "./pages/day4/Challenge4";
import Challenge5 from "./pages/day5/Challenge5";
import Challenge6 from "./pages/day6/Challenge6";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="day1" element={<Challenge1 />} />
            <Route path="day2" element={<Challenge2 />} />
            <Route path="day3" element={<Challenge3 />} />
            <Route path="day4" element={<Challenge4 />} />
            <Route path="day5" element={<Challenge5 />} />
            <Route path="day6" element={<Challenge6 />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
