import { useContext, useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import FolderModal from "../../components/FolderModal/FolderModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import NavbarWithDropdown from "../../components/NavbarWithDropdown/NavbarWithDropdown";
import { PiFolderSimplePlusBold } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FormBuilderContext } from "../../contexts/FormBuilderContext";
import { encrypt } from "../../utils/encryptionUtils";

const Dashboard = () => {
    const [isFolderModalOpen, setFolderModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [deletedFolder, setDeletedFolder] = useState(null);
    const navigate = useNavigate();

    const {
        folders,
        handleCreateFolder,
        handleDeleteFolder,
        fetchUserFolders,
        typeBots,
        fetchUserTypeBots,
        handleGetTypeBotsByFolder,
        handleDeleteTypeBot,
    } = useContext(FormBuilderContext);

    useEffect(() => {
        fetchUserFolders();
    }, [fetchUserFolders]);

    useEffect(() => {
        if (selectedFolder) {
            handleGetTypeBotsByFolder(selectedFolder._id);
        } else {
            fetchUserTypeBots();
        }
    }, [selectedFolder, handleGetTypeBotsByFolder, fetchUserTypeBots]);

    const createFolder = (folderName) => {
        handleCreateFolder({ name: folderName });
        setFolderModalOpen(false);
    };

    const deleteFolder = () => {
        handleDeleteFolder(deletedFolder._id);
        setDeleteModalOpen(false);
        setDeletedFolder(null);
    };

    const createTypeBot = () => {
        if (selectedFolder) {
            const encryptedFolderId = encrypt(selectedFolder._id);
            navigate(
                `/create-typebot?folderId=${encodeURIComponent(encryptedFolderId)}`
            );
        } else {
            navigate("/create-typebot");
        }
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
                            <div
                                key={index}
                                className={`${styles.folder} ${selectedFolder && selectedFolder._id === folder._id ? styles.activeFolder : ""}`}
                                onClick={() => setSelectedFolder(folder)}
                            >
                                <span>{folder.name}</span>
                                <RiDeleteBin6Line
                                    className={styles.deleteButton}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDeletedFolder(folder);
                                        setDeleteModalOpen(true);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.typebotContainer}>
                    <button
                        className={styles.typebotButton}
                        onClick={createTypeBot}
                    >
                        <FiPlus
                            style={{
                                fontSize: "xx-large",
                                marginBottom: "2rem",
                            }}
                        />
                        Create a typebot
                    </button>
                    {typeBots.map((typebot, index) => (
                        <div key={index} className={styles.typebot}>
                            <span>{typebot.name}</span>
                            <RiDeleteBin6Line
                                className={styles.deleteButton}
                                onClick={() => handleDeleteTypeBot(typebot._id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {isFolderModalOpen && (
                <FolderModal
                    onClose={() => setFolderModalOpen(false)}
                    onSave={createFolder}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteModal
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={deleteFolder}
                />
            )}
        </div>
    );
};

export default Dashboard;
