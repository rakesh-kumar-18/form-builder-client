import styles from "./WorkspaceDropdown.module.css";

const WorkspaceDropdown = () => {
    return (
        <div className={styles.dropdown}>
            <ul>
                <li>Settings</li>
                <li>Log Out</li>
            </ul>
        </div>
    );
};

export default WorkspaceDropdown;
