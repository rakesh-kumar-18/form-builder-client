import { useContext, useState } from "react";
import styles from "./Signup.module.css";
import { toast } from "react-toastify";
import {
    validatePassword,
    validateEmail,
    validateUsername,
} from "../../utils/validation";
import { FormBuilderContext } from "../../contexts/FormBuilderContext";
import { Link, useNavigate } from "react-router-dom";
import triangle from "../../assets/triangle.png";
import ellipseDown from "../../assets/Ellipse 1.png";
import ellipseRight from "../../assets/Ellipse 2.png";
import { FaArrowLeft } from "react-icons/fa6";

const Signup = () => {
    const { register, login } = useContext(FormBuilderContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const { username, email, password, confirmPassword } = formData;
        let formErrors = {};

        if (!username) {
            formErrors.username = "Username is required";
        } else if (!validateUsername(username)) {
            formErrors.username =
                "Username must be at least 3 characters long and contain only alphanumeric characters.";
        }

        if (!email) {
            formErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            formErrors.email = "Invalid email address.";
        }

        if (!password) {
            formErrors.password = "Password is required";
        } else if (!validatePassword(password)) {
            formErrors.password =
                "Password must be at least 6 characters long and contain a mix of letters, numbers, and symbols.";
        }

        if (!confirmPassword) {
            formErrors.confirmPassword = "Confirm Password is required";
        } else if (password !== confirmPassword) {
            formErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            try {
                const { username, email, password, confirmPassword } = formData;
                await register({ username, email, password, confirmPassword });
                toast.success("User registered successfully");

                // Automatically log in the registered user
                await login({ email, password });
                toast.success("Login successful");
                navigate("/dashboard");
            } catch (error) {
                toast.error(
                    error.response?.data?.message || "Registration failed"
                );
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <img
                src={triangle}
                alt="triangle shape"
                className={styles.triangle}
            />
            <img
                src={ellipseRight}
                alt="ellipse right"
                className={styles.ellipseRight}
            />
            <img
                src={ellipseDown}
                alt="ellipse down"
                className={styles.ellipseDown}
            />
            <FaArrowLeft
                style={{
                    position: "absolute",
                    left: "5%",
                    top: "5%",
                    cursor: "pointer",
                }}
                onClick={() => navigate("/")}
            />
            <div className={styles.signupContainer}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label
                            className={errors.username ? styles.errorLabel : ""}
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter a username"
                            className={errors.username ? styles.errorInput : ""}
                        />
                        {errors.username && (
                            <p className={styles.error}>{errors.username}</p>
                        )}
                    </div>
                    <div className={styles.inputGroup}>
                        <label
                            className={errors.email ? styles.errorLabel : ""}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className={errors.email ? styles.errorInput : ""}
                        />
                        {errors.email && (
                            <p className={styles.error}>{errors.email}</p>
                        )}
                    </div>
                    <div className={styles.inputGroup}>
                        <label
                            className={errors.password ? styles.errorLabel : ""}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className={errors.password ? styles.errorInput : ""}
                        />
                        {errors.password && (
                            <p className={styles.error}>{errors.password}</p>
                        )}
                    </div>
                    <div className={styles.inputGroup}>
                        <label
                            className={
                                errors.confirmPassword ? styles.errorLabel : ""
                            }
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className={
                                errors.confirmPassword ? styles.errorInput : ""
                            }
                        />
                        {errors.confirmPassword && (
                            <p className={styles.error}>
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className={styles.signupButton}
                        disabled={loading}
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
