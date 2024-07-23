import { useContext, useState, useEffect } from "react";
import styles from "./Settings.module.css";
import { FaRegUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import { FormBuilderContext } from "../../contexts/FormBuilderContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Settings = () => {
    const { logout, updateUser, user, loading } =
        useContext(FormBuilderContext);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        oldPassword: "",
        newPassword: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setFormData({
                ...formData,
                username: user.username,
                email: user.email,
            });
        }
    }, [user]);

    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleTogglePasswordVisibility = (field) => {
        setShowPassword({
            ...showPassword,
            [field]: !showPassword[field],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(formData);
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error("Failed to update profile:", error);
            toast.error("Failed to update profile");
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className={styles.container}>
            <div className={styles.settings}>
                <h3>Settings</h3>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <FaRegUser className={styles.icon} />
                        <input
                            type="text"
                            name="username"
                            placeholder="Name"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <MdOutlineEmail className={styles.icon} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Update Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <CiLock className={styles.icon} />
                        <input
                            type={
                                showPassword.oldPassword ? "text" : "password"
                            }
                            name="oldPassword"
                            placeholder="Old Password"
                            value={formData.oldPassword}
                            onChange={handleChange}
                        />
                        <span
                            className={styles.eyeIcon}
                            onClick={() =>
                                handleTogglePasswordVisibility("oldPassword")
                            }
                        >
                            {showPassword.oldPassword ? (
                                <FaEyeSlash />
                            ) : (
                                <FaEye />
                            )}
                        </span>
                    </div>
                    <div className={styles.inputGroup}>
                        <CiLock className={styles.icon} />
                        <input
                            type={
                                showPassword.newPassword ? "text" : "password"
                            }
                            name="newPassword"
                            placeholder="New Password"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />
                        <span
                            className={styles.eyeIcon}
                            onClick={() =>
                                handleTogglePasswordVisibility("newPassword")
                            }
                        >
                            {showPassword.newPassword ? (
                                <FaEyeSlash />
                            ) : (
                                <FaEye />
                            )}
                        </span>
                    </div>
                    <button
                        type="submit"
                        className={styles.updateButton}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </form>
            </div>
            <div className={styles.logout} onClick={handleLogout}>
                <HiOutlineLogout className={styles.logoutIcon} />
                <span>Log out</span>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Settings;
