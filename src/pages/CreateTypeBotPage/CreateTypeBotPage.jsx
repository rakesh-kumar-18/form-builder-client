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

const CreateTypeBotPage = () => {
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
                    />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.bubbles}>
                    <div className={styles.bubbleGroup}>
                        <button className={styles.bubble}>
                            <MdOutlineTextsms />
                            Text
                        </button>
                        <button className={styles.bubble}>
                            <CiImageOn />
                            Image
                        </button>
                        <button className={styles.bubble}>
                            <TbMovie />
                            Video
                        </button>
                        <button className={styles.bubble}>
                            <MdGif />
                            GIF
                        </button>
                    </div>
                    <div className={styles.inputGroup}>
                        <button className={styles.input}>
                            <RxText />
                            Text
                        </button>
                        <button className={styles.input}>
                            <FaHashtag />
                            Number
                        </button>
                        <button className={styles.input}>
                            <FiAtSign />
                            Email
                        </button>
                        <button className={styles.input}>
                            <FiPhone />
                            Phone
                        </button>
                        <button className={styles.input}>
                            <CiCalendarDate />
                            Date
                        </button>
                        <button className={styles.input}>
                            <CiStar />
                            Rating
                        </button>
                        <button className={styles.input}>
                            <LuCheckSquare />
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
