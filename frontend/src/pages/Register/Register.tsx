import { useState } from 'react';
import { useRegister } from '../../api/hooks/useRegister';
import styles from './Register.module.scss';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    password: '',
  });

  const { mutate, isPending } = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form };
    mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Register</h2>
      <input name="username" onChange={handleChange} placeholder="Username" required />
      <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
      <input name="first_name" onChange={handleChange} placeholder="First Name" required />
      <input name="last_name" onChange={handleChange} placeholder="Last Name" required />
      <input name="middle_name" onChange={handleChange} placeholder="Middle Name (optional)" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}
