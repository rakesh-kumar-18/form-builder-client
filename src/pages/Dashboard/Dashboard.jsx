import { useState } from "react";
import styles from "./Dashboard.module.css";
import FolderModal from "../../components/FolderModal/FolderModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import NavbarWithDropdown from "../../components/NavbarWithDropdown/NavbarWithDropdown";
import { PiFolderSimplePlusBold } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

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

    const handleCreateBot = () => {
        // Add your logic to handle creating a bot
        console.log("Create a typebot clicked");
    };

    return (
        <div className={styles.dashboard}>
            <NavbarWithDropdown />
            <div className={styles.content}>
                <div className={styles.folderContainer}>
                    <button
                        className={styles.createButton}
                        onClick={() => setFolderModalOpen(true)}
                    >
                        <PiFolderSimplePlusBold
                            style={{ fontSize: "large", marginRight: "10px" }}
                        />
                        Create a folder
                    </button>
                    <div className={styles.folders}>
                        {folders.map((folder, index) => (
                            <div key={index} className={styles.folder}>
                                <span>{folder.name}</span>
                                <RiDeleteBin6Line
                                    className={styles.deleteButton}
                                    onClick={() => {
                                        setSelectedFolder(folder);
                                        setDeleteModalOpen(true);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    className={styles.typebotButton}
                    onClick={handleCreateBot}
                >
                    <FiPlus
                        style={{ fontSize: "xx-large", marginBottom: "2rem" }}
                    />
                    Create a typebot
                </button>
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
