import styles from "./CreateTypeBotPage.module.css";
import { MdOutlineTextsms } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { TbMovie } from "react-icons/tb";
import { MdGif } from "react-icons/md";
import { RxText } from "react-icons/rx";
import { FaHashtag } from "react-icons/fa";
import { FiAtSign } from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import { CiCalendarDate } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { LuCheckSquare } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const CreateTypeBotPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.createTypeBotPage}>
            <div className={styles.navbar}>
                <input
                    type="text"
                    placeholder="Enter Form Name"
                    className={styles.formNameInput}
                />
                <div className={styles.tabs}>
                    <button className={`${styles.tab} ${styles.activeTab}`}>
                        Flow
                    </button>
                    <button className={styles.tab}>Theme</button>
                    <button className={styles.tab}>Response</button>
                </div>
                <div className={styles.actions}>
                    <button className={styles.shareButton}>Share</button>
                    <button className={styles.saveButton}>Save</button>
                    <RxCross1
                        style={{
                            color: "#F55050",
                            fontSize: "large",
                            cursor: "pointer",
                        }}
                        onClick={() => navigate("/dashboard")}
                    />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <h5>Bubbles</h5>
                    <div className={styles.bubbleGroup}>
                        <button className={styles.bubble}>
                            <MdOutlineTextsms className={styles.bubbleIcon} />
                            Text
                        </button>
                        <button className={styles.bubble}>
                            <CiImageOn className={styles.bubbleIcon} />
                            Image
                        </button>
                        <button className={styles.bubble}>
                            <TbMovie className={styles.bubbleIcon} />
                            Video
                        </button>
                        <button className={styles.bubble}>
                            <MdGif
                                className={styles.bubbleIcon}
                                style={{ fontSize: "x-large" }}
                            />
                            GIF
                        </button>
                    </div>
                    <h5>Inputs</h5>
                    <div className={styles.inputGroup}>
                        <button className={styles.input}>
                            <RxText className={styles.inputIcon} />
                            Text
                        </button>
                        <button className={styles.input}>
                            <FaHashtag className={styles.inputIcon} />
                            Number
                        </button>
                        <button className={styles.input}>
                            <FiAtSign className={styles.inputIcon} />
                            Email
                        </button>
                        <button className={styles.input}>
                            <FiPhone className={styles.inputIcon} />
                            Phone
                        </button>
                        <button className={styles.input}>
                            <CiCalendarDate className={styles.inputIcon} />
                            Date
                        </button>
                        <button className={styles.input}>
                            <CiStar className={styles.inputIcon} />
                            Rating
                        </button>
                        <button className={styles.input}>
                            <LuCheckSquare className={styles.inputIcon} />
                            Buttons
                        </button>
                    </div>
                </div>
                <div className={styles.workspace}>
                    <div className={styles.startBubble}>Start</div>
                </div>
            </div>
        </div>
    );
};

export default CreateTypeBotPage;
