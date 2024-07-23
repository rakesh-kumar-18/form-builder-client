/* eslint-disable react/prop-types */
import styles from "./DeleteModal.module.css";

const DeleteModal = ({ onClose, onConfirm }) => {
    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
                <h2>Are you sure you want to delete this folder?</h2>
                <div className={styles.actions}>
                    <button
                        className={styles.confirmButton}
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                    <div className={styles.verticalLine}></div>
                    <button className={styles.cancelButton} onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
