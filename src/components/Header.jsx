import "./Header.css";
import { FaFaceSmile } from "react-icons/fa6";
import { IoIosContact } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
function Header() {
  return (
    <nav>
      <div className="nav-container">
        <p className="logo">🎵 MoodPlay</p>

        <div className="nav-right">
          <p
            style={{
              display: "flex",
              gap: "5px",
              fontSize: "20px",
              backgroundColor: "#f4f4f4",
              padding: "3px 6px",
              borderRadius: "30px",
              alignItems: "center",
            }}
          >
            <small style={{ color: "#ffd166" }}>
              {" "}
              <FaFaceSmile />
            </small>{" "}
            <small style={{ color: "#555" }}>Happy</small>
          </p>

          <p style={{ fontSize: "20px" }}>
            <IoSettingsOutline />
          </p>

          <p style={{ color: "#118ab2", fontSize: "20px" }}>
            <IoIosContact />{" "}
          </p>
        </div>
      </div>
    </nav>
  );
}

export default Header;
