import { useState } from "react";
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
import dark from "../../assets/theme-dark.png";
import light from "../../assets/theme-light.png";
import tailblue from "../../assets/theme-tail-blue.png";
import profileImage from "../../assets/profile.png";
import dot from "../../assets/dot.png";
import { AiFillFlag } from "react-icons/ai";

const CreateTypeBotPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("flow");
    const [selectedTheme, setSelectedTheme] = useState("light");

    const themes = [
        { id: "light", name: "Light", image: `${light}` },
        { id: "dark", name: "Dark", image: `${dark}` },
        { id: "tail-blue", name: "Tail Blue", image: `${tailblue}` },
    ];

    const handleThemeClick = (themeId) => {
        setSelectedTheme(themeId);
    };

    return (
        <div className={styles.createTypeBotPage}>
            <div className={styles.navbar}>
                {activeTab === "flow" ? (
                    <input
                        type="text"
                        placeholder="Enter Form Name"
                        className={styles.formNameInput}
                    />
                ) : (
                    <div style={{ width: "180px" }}></div>
                )}
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${
                            activeTab === "flow" ? styles.activeTab : ""
                        }`}
                        onClick={() => setActiveTab("flow")}
                    >
                        Flow
                    </button>
                    <button
                        className={`${styles.tab} ${
                            activeTab === "theme" ? styles.activeTab : ""
                        }`}
                        onClick={() => setActiveTab("theme")}
                    >
                        Theme
                    </button>
                    <button
                        className={`${styles.tab} ${
                            activeTab === "response" ? styles.activeTab : ""
                        }`}
                        onClick={() => setActiveTab("response")}
                    >
                        Response
                    </button>
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
            {activeTab === "flow" && (
                <div className={styles.content}>
                    <div className={styles.sidebar}>
                        <h5>Bubbles</h5>
                        <div className={styles.bubbleGroup}>
                            <button className={styles.bubble}>
                                <MdOutlineTextsms
                                    className={styles.bubbleIcon}
                                />
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
                                <MdGif className={styles.bubbleIcon} />
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
                        <div className={styles.startBubble}>
                            <AiFillFlag
                                style={{
                                    marginRight: "7px",
                                    fontSize: "larger",
                                }}
                            />
                            <h4>Start</h4>
                        </div>
                    </div>
                </div>
            )}
            {activeTab === "theme" && (
                <div className={styles.themeContent}>
                    <div className={styles.themeSidebar}>
                        <h3>Customize the theme</h3>
                        {themes.map((theme) => (
                            <div
                                key={theme.id}
                                className={styles.themeOption}
                                onClick={() => handleThemeClick(theme.id)}
                            >
                                <img
                                    src={theme.image}
                                    alt={theme.name}
                                    className={styles.themeImage}
                                    style={{
                                        border:
                                            selectedTheme === theme.id &&
                                            "4px solid #1A5FFF",
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <div
                        className={styles.preview}
                        style={{
                            backgroundColor:
                                selectedTheme === "light"
                                    ? "#FFFFFF"
                                    : selectedTheme === "dark"
                                      ? "#171923"
                                      : "#508C9B",
                        }}
                    >
                        <div className={styles.botProfile}>
                            <img
                                src={profileImage}
                                alt="Profile"
                                className={styles.profileImage}
                            />
                            <div className={styles.previewBubble}>
                                <div className={styles.previewText}>Hello</div>
                            </div>
                        </div>
                        <div
                            className={`${styles.previewBubble} ${styles.botBubble}`}
                        >
                            <p>Hi</p>
                            <img src={dot} alt="dot" className={styles.dot} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateTypeBotPage;
