import { Link } from "react-router-dom";
import Base from "../components/Base";
import styles from "./body.module.css";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const routeChangeToLogin = () =>{ 
    navigate('/login');
  }
  const routeChangeToSignup = () =>{ 
    navigate('/signup');
  }
  return (
      <Base>
        <div class={styles.image}>
    
    <div class={styles.topcontainer}>
        <p class={styles.p}>Fresh Grub</p>
        <h1 class={styles.h1}>Get It Fast</h1>
    </div>
    <div class={styles.bottomcontainer}>
        <button class={styles.btnone} onClick={routeChangeToLogin}>Log In</button>
        <button class={styles.btntwo} onClick={routeChangeToSignup}>Sign Up</button>
    </div>
</div>
    </Base>

  );
};
export default Home;
