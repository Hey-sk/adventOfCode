import "./homePage.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  const availablePages = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];
  const chistmasZebra = (index) => {
    return {
      backgroundColor: index % 2 ? "rgb(255, 80, 80)" : "rgba(80, 180, 80)",
    };
  };

  const getLinks = availablePages.map((num, index) => {
    return (
      <Link
        key={index}
        className="dayLink"
        to={`day${num}`}
        style={{ textDecoration: "none" }}
      >
        <div className="homePageLink" style={chistmasZebra(index)}>
          <div>Day</div>
          {num}
        </div>
      </Link>
    );
  });

  return (
    <>
      <div className="homePage">
        <h2 className="title">Advent of Code!</h2>
        <div className="homePageTree">{getLinks}</div>
      </div>
    </>
  );
}
