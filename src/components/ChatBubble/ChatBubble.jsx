/* eslint-disable react/prop-types */
import styles from "./ChatBubble.module.css";
import profileImage from "../../assets/profile.png";
import { IoMdSend } from "react-icons/io";

const ChatBubble = ({
    item,
    onInputChange,
    onInputSubmit,
    inputState,
    submittedFields,
    isLastBotMessage,
}) => {
    console.log("Item", item);
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
            case "Video":
                return (
                    <video
                        src={item.text}
                        controls
                        className={styles.videoBubble}
                    />
                );
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
                            disabled={submittedFields}
                        />
                        <button
                            onClick={() => onInputSubmit(item.type, item.id)}
                            disabled={!inputState[item.type] || submittedFields}
                        >
                            <IoMdSend
                                style={{ fontSize: "x-large", display: "flex" }}
                            />
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
                            disabled={submittedFields}
                        />
                        <button
                            onClick={() => onInputSubmit(item.type, item.id)}
                            disabled={!inputState[item.type] || submittedFields}
                        >
                            <IoMdSend
                                style={{ fontSize: "x-large", display: "flex" }}
                            />
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
                            disabled={submittedFields}
                        />
                        <button
                            onClick={() => onInputSubmit(item.type, item.id)}
                            disabled={!inputState[item.type] || submittedFields}
                        >
                            <IoMdSend
                                style={{ fontSize: "x-large", display: "flex" }}
                            />
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
                            disabled={submittedFields}
                        />
                        <button
                            onClick={() => onInputSubmit(item.type, item.id)}
                            disabled={!inputState[item.type] || submittedFields}
                        >
                            <IoMdSend
                                style={{ fontSize: "x-large", display: "flex" }}
                            />
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
                            disabled={submittedFields}
                        />
                        <button
                            onClick={() => onInputSubmit(item.type, item.id)}
                            disabled={!inputState[item.type] || submittedFields}
                        >
                            <IoMdSend
                                style={{ fontSize: "x-large", display: "flex" }}
                            />
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
                            onClick={() => onInputSubmit(item.type, item.id)}
                            disabled={!inputState[item.type] || submittedFields}
                        >
                            <IoMdSend
                                style={{ fontSize: "x-large", display: "flex" }}
                            />
                        </button>
                    </div>
                );
            case "Input Button":
                return (
                    <div className={styles.inputBubble}>
                        <button
                            onClick={() => onInputSubmit(item.type, item.id)}
                            disabled={submittedFields}
                            className={styles.inputButton}
                        >
                            {item.text}
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
