import { useState } from "react";
import styles from "./Dashboard.module.css";
import FolderModal from "../../components/FolderModal/FolderModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import NavbarWithDropdown from "../../components/NavbarWithDropdown/NavbarWithDropdown";

const Dashboard = () => {
    const [folders, setFolders] = useState([]);
    const [isFolderModalOpen, setFolderModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(null);

    const handleCreateFolder = (folderName) => {
        setFolders([...folders, { name: folderName }]);
        setFolderModalOpen(false);
    };

    const handleDeleteFolder = () => {
        setFolders(folders.filter((folder) => folder !== selectedFolder));
        setDeleteModalOpen(false);
    };

    return (
        <div className={styles.dashboard}>
            <NavbarWithDropdown />
            <div className={styles.content}>
                <button
                    className={styles.createButton}
                    onClick={() => setFolderModalOpen(true)}
                >
                    Create a folder
                </button>
                <div className={styles.folders}>
                    {folders.map((folder, index) => (
                        <div key={index} className={styles.folder}>
                            <span>{folder.name}</span>
                            <button
                                className={styles.deleteButton}
                                onClick={() => {
                                    setSelectedFolder(folder);
                                    setDeleteModalOpen(true);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {isFolderModalOpen && (
                <FolderModal
                    onClose={() => setFolderModalOpen(false)}
                    onSave={handleCreateFolder}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteModal
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={handleDeleteFolder}
                />
            )}
        </div>
    );
};

export default Dashboard;
