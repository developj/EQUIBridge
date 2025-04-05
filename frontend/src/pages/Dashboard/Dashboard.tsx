import { logout } from '../../api/api';
import { useProfile } from '../../api/hooks/useProfile';
import styles from './Dashboard.module.scss';

export default function Dashboard() {
  const { data: user, isLoading, isError } = useProfile();

  if (isLoading) return <p className={styles.message}>Loading profile...</p>;
  if (isError) return <p className={styles.message}>Error loading profile.</p>;

  return (
    <div className={styles.container}>
      <h2>Dashboard</h2>
      <p>Welcome, {user.first_name} {user.middle_name || ''} {user.last_name}!</p>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
