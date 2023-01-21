import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Challenge1 from "./pages/Challenge1";
import Challenge2 from "./pages/Challenge2";
import Challenge3 from "./pages/Challenge3";
import Challenge4 from "./pages/Challenge4";
import Challenge5 from "./pages/Challenge5";
import Challenge6 from "./pages/Challenge6";
import Challenge7 from "./pages/Challenge7";
import Challenge8 from "./pages/Challenge8";
import Challenge9 from "./pages/Challenge9";
import Challenge10 from "./pages/Challenge10";
// import Challenge11 from "./pages/Challenge11";
// import Challenge12 from "./pages/Challenge12";
// import Challenge13 from "./pages/Challenge13";
// import Challenge14 from "./pages/Challenge14";
// import Challenge15 from "./pages/Challenge15";
// import Challenge16 from "./pages/Challenge16";
// import Challenge17 from "./pages/Challenge17";
// import Challenge18 from "./pages/Challenge18";
// import Challenge19 from "./pages/Challenge19";
// import Challenge20 from "./pages/Challenge20";
// import Challenge21 from "./pages/Challenge21";
// import Challenge22 from "./pages/Challenge22";
// import Challenge23 from "./pages/Challenge23";
// import Challenge24 from "./pages/Challenge24";
// import Challenge25 from "./pages/Challenge25";

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
            <Route path="day7" element={<Challenge7 />} />
            <Route path="day8" element={<Challenge8 />} />
            <Route path="day9" element={<Challenge9 />} />
            <Route path="day10" element={<Challenge10 />} />
            {/* <Route path="day11" element={<Challenge11 />} />
            <Route path="day12" element={<Challenge12 />} />
            <Route path="day13" element={<Challenge13 />} />
            <Route path="day14" element={<Challenge14 />} />
            <Route path="day15" element={<Challenge15 />} />
            <Route path="day16" element={<Challenge16 />} />
            <Route path="day17" element={<Challenge17 />} />
            <Route path="day18" element={<Challenge18 />} />
            <Route path="day19" element={<Challenge19 />} />
            <Route path="day20" element={<Challenge20 />} />
            <Route path="day21" element={<Challenge21 />} />
            <Route path="day22" element={<Challenge22 />} />
            <Route path="day23" element={<Challenge23 />} />
            <Route path="day24" element={<Challenge24 />} />
            <Route path="day25" element={<Challenge25 />} /> */}
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
