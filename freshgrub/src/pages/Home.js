import { Link } from "react-router-dom";
import Base from "../components/Base";

const Home = () => {
  return (
    <Base>
      <div>
        {/* <CustomNavbar /> */}
        <h1>This is homepage</h1>
        <p>Welcome to home page</p>
        {/* <p>
          <Link to="/login">Login</Link>
        </p>
        <p>
          <Link to="/about">About us</Link>
        </p> */}
      </div>
    </Base>
  );
};
export default Home;
