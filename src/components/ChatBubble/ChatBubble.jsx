/* eslint-disable react/prop-types */
import styles from "./ChatBubble.module.css";
import profileImage from "../../assets/profile.png";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";

const ChatBubble = ({
    item,
    onInputChange,
    onInputSubmit,
    inputState,
    submittedFields,
    isLastBotMessage,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (type, id) => {
        setIsLoading(true);
        onInputSubmit(type, id).finally(() => setIsLoading(false));
    };

    const handleKeyPress = (e, type, id) => {
        if (e.key === "Enter" && !isLoading && inputState[type]) {
            handleSubmit(type, id);
        }
    };

    const renderBubbleContent = () => {
        switch (item.baseType) {
            case "Text":
                return <div className={styles.textBubble}>{item.text}</div>;
            case "Image":
                return (
                    <img
                        src={item.text}
                        alt="Image Bubble"
                        className={styles.imageBubble}
                    />
                );
            case "Video": {
                const isYouTubeLink =
                    item.text.includes("youtube.com") ||
                    item.text.includes("youtu.be");
                if (isYouTubeLink) {
                    const videoId =
                        item.text.split("v=")[1] || item.text.split("/").pop();
                    return (
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            style={{ border: "none" }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className={styles.videoBubble}
                        ></iframe>
                    );
                } else {
                    return (
                        <video
                            src={item.text}
                            controls
                            className={styles.videoBubble}
                        />
                    );
                }
            }
            case "GIF":
                return (
                    <img
                        src={item.text}
                        alt="GIF Bubble"
                        className={styles.gifBubble}
                    />
                );
            case "Input Text":
                return (
                    <div className={styles.inputBubble}>
                        <input
                            type="text"
                            value={inputState[item.type] || ""}
                            onChange={(e) =>
                                onInputChange(e, item.type, item.id)
                            }
                            placeholder="Enter your text"
                            disabled={submittedFields || isLoading}
                            onKeyDown={(e) =>
                                handleKeyPress(e, item.type, item.id)
                            }
                        />
                        <button
                            onClick={() => handleSubmit(item.type, item.id)}
                            disabled={
                                !inputState[item.type] ||
                                submittedFields ||
                                isLoading
                            }
                        >
                            {isLoading ? (
                                "..."
                            ) : (
                                <IoMdSend
                                    style={{
                                        fontSize: "x-large",
                                        display: "flex",
                                    }}
                                />
                            )}
                        </button>
                    </div>
                );
            case "Input Number":
                return (
                    <div className={styles.inputBubble}>
                        <input
                            type="number"
                            value={inputState[item.type] || ""}
                            onChange={(e) =>
                                onInputChange(e, item.type, item.id)
                            }
                            placeholder="Enter your number"
                            disabled={submittedFields || isLoading}
                            onKeyDown={(e) =>
                                handleKeyPress(e, item.type, item.id)
                            }
                        />
                        <button
                            onClick={() => handleSubmit(item.type, item.id)}
                            disabled={
                                !inputState[item.type] ||
                                submittedFields ||
                                isLoading
                            }
                        >
                            {isLoading ? (
                                "..."
                            ) : (
                                <IoMdSend
                                    style={{
                                        fontSize: "x-large",
                                        display: "flex",
                                    }}
                                />
                            )}
                        </button>
                    </div>
                );
            case "Input Email":
                return (
                    <div className={styles.inputBubble}>
                        <input
                            type="email"
                            value={inputState[item.type] || ""}
                            onChange={(e) =>
                                onInputChange(e, item.type, item.id)
                            }
                            placeholder="Enter your email"
                            disabled={submittedFields || isLoading}
                            onKeyDown={(e) =>
                                handleKeyPress(e, item.type, item.id)
                            }
                        />
                        <button
                            onClick={() => handleSubmit(item.type, item.id)}
                            disabled={
                                !inputState[item.type] ||
                                submittedFields ||
                                isLoading
                            }
                        >
                            {isLoading ? (
                                "..."
                            ) : (
                                <IoMdSend
                                    style={{
                                        fontSize: "x-large",
                                        display: "flex",
                                    }}
                                />
                            )}
                        </button>
                    </div>
                );
            case "Input Phone":
                return (
                    <div className={styles.inputBubble}>
                        <input
                            type="tel"
                            value={inputState[item.type] || ""}
                            onChange={(e) =>
                                onInputChange(e, item.type, item.id)
                            }
                            placeholder="Enter your phone"
                            disabled={submittedFields || isLoading}
                            onKeyDown={(e) =>
                                handleKeyPress(e, item.type, item.id)
                            }
                        />
                        <button
                            onClick={() => handleSubmit(item.type, item.id)}
                            disabled={
                                !inputState[item.type] ||
                                submittedFields ||
                                isLoading
                            }
                        >
                            {isLoading ? (
                                "..."
                            ) : (
                                <IoMdSend
                                    style={{
                                        fontSize: "x-large",
                                        display: "flex",
                                    }}
                                />
                            )}
                        </button>
                    </div>
                );
            case "Input Date":
                return (
                    <div className={styles.inputBubble}>
                        <input
                            type="date"
                            value={inputState[item.type] || ""}
                            onChange={(e) =>
                                onInputChange(e, item.type, item.id)
                            }
                            disabled={submittedFields || isLoading}
                            onKeyDown={(e) =>
                                handleKeyPress(e, item.type, item.id)
                            }
                        />
                        <button
                            onClick={() => handleSubmit(item.type, item.id)}
                            disabled={
                                !inputState[item.type] ||
                                submittedFields ||
                                isLoading
                            }
                        >
                            {isLoading ? (
                                "..."
                            ) : (
                                <IoMdSend
                                    style={{
                                        fontSize: "x-large",
                                        display: "flex",
                                    }}
                                />
                            )}
                        </button>
                    </div>
                );
            case "Input Rating":
                return (
                    <div
                        className={`${styles.inputBubble} ${
                            submittedFields ? styles.disabled : ""
                        }`}
                    >
                        <div>
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <span
                                    key={rating}
                                    className={
                                        inputState[item.type] === rating
                                            ? styles.selectedRating
                                            : styles.rating
                                    }
                                    onClick={() =>
                                        !submittedFields &&
                                        onInputChange(
                                            { target: { value: rating } },
                                            item.type,
                                            item.id
                                        )
                                    }
                                >
                                    {rating}
                                </span>
                            ))}
                        </div>
                        <button
                            onClick={() => handleSubmit(item.type, item.id)}
                            disabled={
                                !inputState[item.type] ||
                                submittedFields ||
                                isLoading
                            }
                        >
                            {isLoading ? (
                                "..."
                            ) : (
                                <IoMdSend
                                    style={{
                                        fontSize: "x-large",
                                        display: "flex",
                                    }}
                                />
                            )}
                        </button>
                    </div>
                );
            case "Input Button":
                return (
                    <div className={styles.inputBubble}>
                        <button
                            onClick={() => handleSubmit(item.type, item.id)}
                            disabled={submittedFields || isLoading}
                            className={styles.inputButton}
                        >
                            {isLoading ? "..." : item.text}
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div
            className={`${styles.chatBubble} ${
                item.baseType.includes("Input")
                    ? styles.userBubble
                    : styles.botBubble
            }`}
        >
            {!item.baseType.includes("Input") && isLastBotMessage && (
                <img
                    src={profileImage}
                    alt="Profile"
                    className={styles.profileImage}
                />
            )}
            {renderBubbleContent()}
        </div>
    );
};

export default ChatBubble;
