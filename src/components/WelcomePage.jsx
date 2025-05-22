import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div>
      <h1>Ai mood-base playlist generator</h1>
      <Link to="/login">Get Started</Link>
    </div>
  );
}

export default WelcomePage;
