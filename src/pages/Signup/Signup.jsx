import { useContext, useState } from 'react';
import styles from './Signup.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validatePassword, validateEmail, validateUsername } from '../../utils/validation';
import { FormBuilderContext } from "../../contexts/FormBuilderContext";
import { Link } from 'react-router-dom';

const Signup = () => {
    const { register } = useContext(FormBuilderContext);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        setError("");
        const { username, email, password, confirmPassword } = formData;
        if (!username || !email || !password || !confirmPassword) {
            toast.error("All fields are required");
            return false;
        }
        if (!validateUsername(username)) {
            setError("Please enter a valid username");
            toast.error("Invalid username. Username must be at least 3 characters long and contain only alphanumeric characters.");
            return false;
        }
        if (!validateEmail(email)) {
            toast.error("Invalid email address.");
            return false;
        }
        if (!validatePassword(password)) {
            toast.error("Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols");
            return false;
        }
        if (password !== confirmPassword) {
            setError("enter same password in both fields");
            toast.error("Passwords do not match");
            return false;
        }
        setLoading(true);
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const { username, email, password, confirmPassword } = formData;
                await register({ username, email, password, confirmPassword });
                toast.success("User registered successfully");
            } catch (error) {
                // setError(error.response?.data?.message || "Registration failed");
                toast.error(error.response?.data?.message || "Registration failed");
                console.log(error);
            }
        }
        setLoading(false);
    };

    return (
        <div className={styles.signupContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter a username"
                    />
                </div>
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
                <div className={styles.inputGroup}>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.signupButton} disabled={loading}>Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
            <ToastContainer />
        </div>
    );
};

export default Signup;
