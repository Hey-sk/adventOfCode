import "./homePage.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  const availablePages = [1, 2, 3, 4, 5, 6];

  const getLinks = availablePages.map((num, index) => {
    return (
      <span className="homePageLink" key={index}>
        <Link to={`day${num}`}>{`Day${num}`}</Link>
      </span>
    );
  });

  return (
    <>
      <div className="homePage">
        <h2 className="title">Advent of Code!</h2>
        <div className="homePageTree">
          {getLinks}
        </div>
      </div>
    </>
  );
}
