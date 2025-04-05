import { Link } from 'react-router-dom';
import styles from './Landing.module.scss';

export default function Landing() {
  return (
    <div className={styles.container}>
      <h1>Welcome to the App</h1>
      <p>
        <Link to="/login">Login</Link> or <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
