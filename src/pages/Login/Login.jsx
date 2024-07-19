// src/components/Login.js
import { useContext, useState } from 'react';
import styles from './Login.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateEmail } from '../../utils/validation';
import { FormBuilderContext } from "../../contexts/FormBuilderContext";
import { Link } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(FormBuilderContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const { email, password } = formData;
        if (!email || !password) {
            toast.error("All fields are required");
            return false;
        }
        if (!validateEmail(email)) {
            toast.error("Invalid email address.");
            return false;
        }
        setLoading(true);
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (validateForm()) {
                const { email, password } = formData;
                await login({ email, password });
                toast.success("Login successful");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <div className={styles.loginContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Log In</h2>
                <div className={styles.inputGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className={styles.loginButton} disabled={loading}>Log In</button>
            </form>
            <p>Don&apos;t have an account? <Link to="/signup">Register now</Link></p>
            <ToastContainer />
        </div>
    );
};

export default Login;
