import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.home}>
      <header className={styles.header}>
        <h1>Welcome</h1>
        <p>Your campus food experience starts here</p>
      </header>

      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${styles.student}`}
          onClick={() => navigate("/student")}
        >
          <span className={styles.icon}>🎓</span>
          <span className={styles.buttonContent}>
            <strong>Student</strong>
            <small>Student information and services</small>
          </span>
          <span className={styles.arrow}>→</span>
        </button>

        <button
          className={`${styles.button} ${styles.menu}`}
          onClick={() => navigate("/menu")}
        >
          <span className={styles.icon}>🍽️</span>
          <span className={styles.buttonContent}>
            <strong>Food Menu</strong>
            <small>Explore today's meals and food options</small>
          </span>
          <span className={styles.arrow}>→</span>
        </button>

        <button
          className={`${styles.button} ${styles.subscribe}`}
          onClick={() => console.log("Subscribe clicked")}
        >
          <span className={styles.icon}>📅</span>
          <span className={styles.buttonContent}>
            <strong>Subscribe</strong>
            <small>Subscribe to your meal plan</small>
          </span>
          <span className={styles.arrow}>→</span>
        </button>
      </div>
    </main>
  );
};

export default Home;