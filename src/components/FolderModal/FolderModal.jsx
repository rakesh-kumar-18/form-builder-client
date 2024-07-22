/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./FolderModal.module.css";

const FolderModal = ({ onClose, onSave }) => {
    const [folderName, setFolderName] = useState("");

    const handleSave = () => {
        if (folderName.trim()) {
            onSave(folderName);
        }
    };

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
                <h2>Create New Folder</h2>
                <input
                    type="text"
                    placeholder="Enter folder name"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                />
                <div className={styles.actions}>
                    <button className={styles.saveButton} onClick={handleSave}>
                        Done
                    </button>
                    <button className={styles.cancelButton} onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FolderModal;
