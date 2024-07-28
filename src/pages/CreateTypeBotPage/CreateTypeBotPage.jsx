import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
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
import dark from "../../assets/theme-dark.png";
import light from "../../assets/theme-light.png";
import tailblue from "../../assets/theme-tail-blue.png";
import profileImage from "../../assets/profile.png";
import dot from "../../assets/dot.png";
import { FormBuilderContext } from "../../contexts/FormBuilderContext";
import { decrypt, encrypt } from "../../utils/encryptionUtils";

const CreateTypeBotPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("flow");
    const [selectedTheme, setSelectedTheme] = useState("light");
    const [formName, setFormName] = useState("");
    const [flowItems, setFlowItems] = useState([]);
    const [errors, setErrors] = useState({});
    const [formNameError, setFormNameError] = useState("");
    const [folderId, setFolderId] = useState(null);
    const [itemCounts, setItemCounts] = useState({});
    const [savedTypeBotId, setSavedTypeBotId] = useState(null);
    const [views, setViews] = useState(0);
    const [starts, setStarts] = useState(0);
    const [completionRate, setCompletionRate] = useState(0);

    const {
        handleCreateTypeBot,
        handleGetTypeBotById,
        responses,
        fetchResponses,
    } = useContext(FormBuilderContext);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const encryptedFolderId = queryParams.get("folderId");
        if (encryptedFolderId) {
            try {
                const decryptedFolderId = decrypt(
                    decodeURIComponent(encryptedFolderId)
                );
                setFolderId(decryptedFolderId);
            } catch (error) {
                console.error("Failed to decrypt folder ID:", error);
                toast.error("Failed to load folder ID.");
            }
        }
    }, [location]);

    useEffect(() => {
        if (id) {
            const fetchTypeBotData = async () => {
                const decryptedId = decrypt(decodeURIComponent(id));
                const fetchedTypeBot = await handleGetTypeBotById(decryptedId);
                setFormName(fetchedTypeBot.name);
                setFlowItems(fetchedTypeBot.flow);
                setSelectedTheme(fetchedTypeBot.theme);
                fetchResponses(decryptedId);
                setViews(fetchedTypeBot.views);
                setStarts(fetchedTypeBot.starts);
                setCompletionRate(
                    fetchedTypeBot.starts
                        ? Math.round(
                              (fetchedTypeBot.completions /
                                  fetchedTypeBot.starts) *
                                  100
                          )
                        : 0
                );
            };
            fetchTypeBotData();
        }
    }, [id, handleGetTypeBotById, fetchResponses]);

    const themes = [
        { id: "light", name: "Light", image: `${light}` },
        { id: "dark", name: "Dark", image: `${dark}` },
        {
            id: "tailBlue",
            name: "Tail Blue",
            image: `${tailblue}`,
        },
    ];

    const handleThemeClick = (themeId) => {
        setSelectedTheme(themeId);
    };

    const saveTypeBot = async () => {
        const newErrors = {};
        flowItems.forEach((item) => {
            if (
                ["Text", "Image", "Video", "GIF", "Input Button"].includes(
                    item.baseType
                ) &&
                !item.text
            ) {
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

        const filteredFlowItems = flowItems.map(({ baseType, type, text }) => ({
            baseType,
            type,
            text,
        }));

        const typeBotData = {
            name: formName,
            flow: filteredFlowItems,
            theme: selectedTheme,
            folderId,
        };

        try {
            const response = await handleCreateTypeBot(typeBotData);
            if (response && response.data && response.data.data) {
                setSavedTypeBotId(response.data.data._id);
                toast.success("TypeBot saved successfully!");
            }
        } catch (error) {
            console.error("Error saving TypeBot:", error);
            toast.error("Failed to save TypeBot.");
        }
    };

    const shareTypeBot = () => {
        if (savedTypeBotId) {
            const encryptedId = encrypt(savedTypeBotId);
            const shareableLink = `${window.location.origin}/chat/${encodeURIComponent(encryptedId)}`;
            navigator.clipboard.writeText(shareableLink);
            toast.success("Link copied to clipboard!");
        } else {
            toast.error("Please save the TypeBot before sharing.");
        }
    };

    const addFlowItem = (type, icon) => {
        setItemCounts((prevCounts) => {
            const newCounts = { ...prevCounts };
            if (newCounts[type]) {
                newCounts[type]++;
            } else {
                newCounts[type] = 1;
            }

            const newFlowItem = {
                id: Date.now(),
                type: `${type} ${newCounts[type]}`,
                baseType: type,
                icon,
                text: "",
            };

            setFlowItems((prevItems) => [...prevItems, newFlowItem]);
            return newCounts;
        });
    };

    const deleteFlowItem = (id) => {
        const itemType = flowItems.find((item) => item.id === id)?.baseType;
        if (itemType) {
            setItemCounts((prevCounts) => {
                const newCounts = { ...prevCounts };
                if (newCounts[itemType]) {
                    newCounts[itemType]--;
                }
                return newCounts;
            });

            setFlowItems((prevItems) => {
                const updatedItems = prevItems
                    .filter((item) => item.id !== id)
                    .map((item) => {
                        if (item.baseType === itemType) {
                            const lastSpaceIndex = item.type.lastIndexOf(" ");
                            const type = item.type.substring(0, lastSpaceIndex);
                            const count = item.type.substring(
                                lastSpaceIndex + 1
                            );
                            const newCount = parseInt(count, 10);
                            return {
                                ...item,
                                type: `${type} ${newCount > 1 ? newCount - 1 : newCount}`,
                            };
                        }
                        return item;
                    });
                return updatedItems;
            });
        }

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
                    <button
                        className={styles.shareButton}
                        onClick={shareTypeBot}
                    >
                        Share
                    </button>
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
                                    addFlowItem("Input Text", <RxText />)
                                }
                            >
                                <RxText className={styles.inputIcon} />
                                Text
                            </button>
                            <button
                                className={styles.input}
                                onClick={() =>
                                    addFlowItem("Input Number", <FaHashtag />)
                                }
                            >
                                <FaHashtag className={styles.inputIcon} />
                                Number
                            </button>
                            <button
                                className={styles.input}
                                onClick={() =>
                                    addFlowItem("Input Email", <FiAtSign />)
                                }
                            >
                                <FiAtSign className={styles.inputIcon} />
                                Email
                            </button>
                            <button
                                className={styles.input}
                                onClick={() =>
                                    addFlowItem("Input Phone", <FiPhone />)
                                }
                            >
                                <FiPhone className={styles.inputIcon} />
                                Phone
                            </button>
                            <button
                                className={styles.input}
                                onClick={() =>
                                    addFlowItem(
                                        "Input Date",
                                        <CiCalendarDate />
                                    )
                                }
                            >
                                <CiCalendarDate className={styles.inputIcon} />
                                Date
                            </button>
                            <button
                                className={styles.input}
                                onClick={() =>
                                    addFlowItem("Input Rating", <CiStar />)
                                }
                            >
                                <CiStar className={styles.inputIcon} />
                                Rating
                            </button>
                            <button
                                className={styles.input}
                                onClick={() =>
                                    addFlowItem(
                                        "Input Button",
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
                                        "Input Button",
                                    ].includes(item.baseType) ? (
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
                                                Hint: User will{" "}
                                                {item.baseType.toLowerCase()} on
                                                his form
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
            {activeTab === "response" && (
                <div className={styles.responseContent}>
                    {responses.length > 0 ? (
                        <>
                            <div className={styles.analytics}>
                                <div className={styles.card}>
                                    <h4>Views</h4>
                                    <p>{views}</p>
                                </div>
                                <div className={styles.card}>
                                    <h4>Starts</h4>
                                    <p>{starts}</p>
                                </div>
                                <div className={styles.card}>
                                    <h4>Completion Rate</h4>
                                    <p>{completionRate}%</p>
                                </div>
                            </div>
                            <div className={styles.responseTable}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Submitted at</th>
                                            {flowItems.map((item, index) => (
                                                <th key={index}>{item.type}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {responses.map((response, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {new Date(
                                                        response.submittedAt
                                                    ).toLocaleString()}
                                                </td>
                                                {flowItems.map((item, idx) => (
                                                    <td key={idx}>
                                                        {response.data.get(
                                                            item.type
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <div className={styles.noData}>
                            <p>No Response yet collected</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CreateTypeBotPage;
