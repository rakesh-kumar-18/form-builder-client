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

const Dashboard = () => {
    const [isFolderModalOpen, setFolderModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const navigate = useNavigate();

    const {
        folders,
        handleCreateFolder,
        handleDeleteFolder,
        fetchUserFolders,
    } = useContext(FormBuilderContext);

    useEffect(() => {
        fetchUserFolders();
    }, []);

    const createFolder = (folderName) => {
        handleCreateFolder({ name: folderName });
        setFolderModalOpen(false);
    };

    const deleteFolder = () => {
        handleDeleteFolder(selectedFolder._id);
        setDeleteModalOpen(false);
    };

    const createTypeBot = () => {
        navigate("/create-typebot");
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
                    onClick={createTypeBot}
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
