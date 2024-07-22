import { useContext, useState } from "react";
import styles from "./Login.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateEmail } from "../../utils/validation";
import { FormBuilderContext } from "../../contexts/FormBuilderContext";
import { Link, useNavigate } from "react-router-dom";
import triangle from "../../assets/triangle.png";
import ellipseDown from "../../assets/Ellipse 1.png";
import ellipseRight from "../../assets/Ellipse 2.png";
import { FaArrowLeft } from "react-icons/fa6";

const Login = () => {
    const { login } = useContext(FormBuilderContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
        const { email, password } = formData;
        let formErrors = {};

        if (!email) {
            formErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            formErrors.email = "Invalid email address.";
        }

        if (!password) {
            formErrors.password = "Password is required";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            try {
                const { email, password } = formData;
                const response = await login({ email, password });
                if (response.data) {
                    toast.success("Login successful");
                    navigate("/dashboard");
                } else {
                    toast.error("Login failed. Please check your credentials.");
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Login failed");
                console.log("Login error:", error);
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
            <div className={styles.loginContainer}>
                <form className={styles.form} onSubmit={handleSubmit}>
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
                    <button
                        type="submit"
                        className={styles.loginButton}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>
                <p>
                    Don&apos;t have an account?{" "}
                    <Link to="/signup">Register now</Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
