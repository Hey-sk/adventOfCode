import "./navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="navLeft">
          <h2 className="navTitle">Advent of Code</h2>
          <h6 className="navSubTitle">2022</h6>
        </div>
        <div>
          <div className="navRight">
            <img
              className="navImg"
              src="https://images.pexels.com/photos/716658/pexels-photo-716658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="santa"
            />
            <Link to="home">
              <button className="navButton">Home</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
