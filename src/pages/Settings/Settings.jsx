import { useState } from "react";
import styles from "./Settings.module.css";

const Settings = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        oldPassword: "",
        newPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className={styles.settings}>
            <h2>Settings</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Update Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Old Password</label>
                    <input
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className={styles.updateButton}>
                    Update
                </button>
            </form>
        </div>
    );
};

export default Settings;
