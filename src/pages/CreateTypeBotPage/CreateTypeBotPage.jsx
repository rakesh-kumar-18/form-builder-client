import { useContext, useState } from "react";
import styles from "./CreateTypeBotPage.module.css";
import { toast } from "react-toastify";
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
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillFlag } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import dark from "../../assets/theme-dark.png";
import light from "../../assets/theme-light.png";
import tailblue from "../../assets/theme-tail-blue.png";
import profileImage from "../../assets/profile.png";
import dot from "../../assets/dot.png";
import { FormBuilderContext } from "../../contexts/FormBuilderContext";

const CreateTypeBotPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("flow");
    const [selectedTheme, setSelectedTheme] = useState("light");
    const [formName, setFormName] = useState("");
    const [flowItems, setFlowItems] = useState([]);
    const [errors, setErrors] = useState({});
    const [formNameError, setFormNameError] = useState("");

    const { handleCreateTypeBot } = useContext(FormBuilderContext);

    const themes = [
        { id: "light", name: "Light", image: `${light}` },
        { id: "dark", name: "Dark", image: `${dark}` },
        { id: "tail-blue", name: "Tail Blue", image: `${tailblue}` },
    ];

    const handleThemeClick = (themeId) => {
        setSelectedTheme(themeId);
    };

    const saveTypeBot = () => {
        const newErrors = {};
        flowItems.forEach((item) => {
            if (!item.text) {
                newErrors[item.id] = true;
            }
        });

        if (!formName.trim()) {
            setFormNameError("Form name is required");
            toast.error("Form name is required");
            return;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const typeBotData = {
            name: formName,
            flow: flowItems,
            theme: selectedTheme,
        };
        handleCreateTypeBot(typeBotData);
        navigate("/dashboard");
    };

    const addFlowItem = (type, icon) => {
        setFlowItems([...flowItems, { id: Date.now(), type, icon, text: "" }]);
    };

    const deleteFlowItem = (id) => {
        setFlowItems(flowItems.filter((item) => item.id !== id));
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[id];
            return newErrors;
        });
    };

    const updateFlowItemText = (id, text) => {
        setFlowItems(
            flowItems.map((item) => (item.id === id ? { ...item, text } : item))
        );
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[id];
            return newErrors;
        });
    };

    const handleFormNameChange = (e) => {
        setFormName(e.target.value);
        if (e.target.value.trim()) {
            setFormNameError("");
        }
    };

    return (
        <div className={styles.createTypeBotPage}>
            <div className={styles.navbar}>
                {activeTab === "flow" ? (
                    <div className={styles.formNameContainer}>
                        <input
                            type="text"
                            placeholder="Enter Form Name"
                            className={styles.formNameInput}
                            value={formName}
                            onChange={handleFormNameChange}
                        />
                        {formNameError && (
                            <span className={styles.errorText}>
                                {formNameError}
                            </span>
                        )}
                    </div>
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
                    <button className={styles.saveButton} onClick={saveTypeBot}>
                        Save
                    </button>
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
                            <button
                                className={styles.bubble}
                                onClick={() =>
                                    addFlowItem("Text", <MdOutlineTextsms />)
                                }
                            >
                                <MdOutlineTextsms
                                    className={styles.bubbleIcon}
                                />
                                Text
                            </button>
                            <button
                                className={styles.bubble}
                                onClick={() =>
                                    addFlowItem("Image", <CiImageOn />)
                                }
                            >
                                <CiImageOn className={styles.bubbleIcon} />
                                Image
                            </button>
                            <button
                                className={styles.bubble}
                                onClick={() =>
                                    addFlowItem("Video", <TbMovie />)
                                }
                            >
                                <TbMovie className={styles.bubbleIcon} />
                                Video
                            </button>
                            <button
                                className={styles.bubble}
                                onClick={() => addFlowItem("GIF", <MdGif />)}
                            >
                                <MdGif className={styles.bubbleIcon} />
                                GIF
                            </button>
                        </div>
                        <h5>Inputs</h5>
                        <div className={styles.inputGroup}>
                            <button
                                className={styles.input}
                                onClick={() =>
                                    addFlowItem("TextInput", <RxText />)
                                }
                            >
                                <RxText className={styles.inputIcon} />
                                Text
                            </button>
                            <button
                                className={styles.input}
                                onClick={() =>
                                    addFlowItem("NumberInput", <FaHashtag />)
                                }
                            >
                                <FaHashtag className={styles.inputIcon} />
                                Number
                            </button>
                            <button
                                className={styles.input}
                                onClick={() =>
                                    addFlowItem("EmailInput", <FiAtSign />)
                                }
                            >
                                <FiAtSign className={styles.inputIcon} />
                                Email
                            </button>
                            <button
                                className={styles.input}
                                onClick={() =>
                                    addFlowItem("PhoneInput", <FiPhone />)
                                }
                            >
                                <FiPhone className={styles.inputIcon} />
                                Phone
                            </button>
                            <button
                                className={styles.input}
                                onClick={() =>
                                    addFlowItem("DateInput", <CiCalendarDate />)
                                }
                            >
                                <CiCalendarDate className={styles.inputIcon} />
                                Date
                            </button>
                            <button
                                className={styles.input}
                                onClick={() =>
                                    addFlowItem("RatingInput", <CiStar />)
                                }
                            >
                                <CiStar className={styles.inputIcon} />
                                Rating
                            </button>
                            <button
                                className={styles.input}
                                onClick={() =>
                                    addFlowItem(
                                        "ButtonInput",
                                        <LuCheckSquare />
                                    )
                                }
                            >
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
                        {flowItems.map((item) => (
                            <div key={item.id} className={styles.flowItem}>
                                <div className={styles.flowDetails}>
                                    <h4>{item.type}</h4>
                                    {[
                                        "Text",
                                        "Image",
                                        "Video",
                                        "GIF",
                                        "ButtonInput",
                                    ].includes(item.type) ? (
                                        <>
                                            <div
                                                className={`${styles.inputContainer} ${
                                                    errors[item.id]
                                                        ? styles.errorInput
                                                        : ""
                                                }`}
                                            >
                                                <span>{item.icon}</span>
                                                <input
                                                    type="text"
                                                    placeholder="Click here to edit"
                                                    className={styles.flowInput}
                                                    value={item.text}
                                                    onChange={(e) =>
                                                        updateFlowItemText(
                                                            item.id,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            {errors[item.id] && (
                                                <span
                                                    className={styles.errorText}
                                                >
                                                    Required Field
                                                </span>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <p
                                                style={{
                                                    color: "#555555",
                                                    textAlign: "left",
                                                    fontSize: "smaller",
                                                }}
                                            >
                                                Hint: User will input a{" "}
                                                {item.type.toLowerCase()} on his
                                                form
                                            </p>
                                        </>
                                    )}
                                </div>
                                <RiDeleteBin6Line
                                    className={styles.deleteIcon}
                                    onClick={() => deleteFlowItem(item.id)}
                                />
                            </div>
                        ))}
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
