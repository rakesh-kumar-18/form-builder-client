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
                            value={inputState.text || ""}
                            onChange={(e) => onInputChange(e, "text")}
                            placeholder="Enter your text"
                            disabled={submittedFields.text}
                        />
                        <button
                            onClick={() => onInputSubmit("text")}
                            disabled={!inputState.text || submittedFields.text}
                        >
                            <IoMdSend />
                        </button>
                    </div>
                );
            case "Input Number":
                return (
                    <div className={styles.inputBubble}>
                        <input
                            type="number"
                            value={inputState.number || ""}
                            onChange={(e) => onInputChange(e, "number")}
                            placeholder="Enter your number"
                            disabled={submittedFields.number}
                        />
                        <button
                            onClick={() => onInputSubmit("number")}
                            disabled={
                                !inputState.number || submittedFields.number
                            }
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
                            value={inputState.email || ""}
                            onChange={(e) => onInputChange(e, "email")}
                            placeholder="Enter your email"
                            disabled={submittedFields.email}
                        />
                        <button
                            onClick={() => onInputSubmit("email")}
                            disabled={
                                !inputState.email || submittedFields.email
                            }
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
                            value={inputState.phone || ""}
                            onChange={(e) => onInputChange(e, "phone")}
                            placeholder="Enter your phone"
                            disabled={submittedFields.phone}
                        />
                        <button
                            onClick={() => onInputSubmit("phone")}
                            disabled={
                                !inputState.phone || submittedFields.phone
                            }
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
                            value={inputState.date || ""}
                            onChange={(e) => onInputChange(e, "date")}
                            disabled={submittedFields.date}
                        />
                        <button
                            onClick={() => onInputSubmit("date")}
                            disabled={!inputState.date || submittedFields.date}
                        >
                            <IoMdSend
                                style={{ fontSize: "x-large", display: "flex" }}
                            />
                        </button>
                    </div>
                );
            case "Input Rating":
                return (
                    <div className={styles.inputBubble}>
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <span
                                key={rating}
                                className={
                                    inputState.rating === rating
                                        ? styles.selectedRating
                                        : styles.rating
                                }
                                onClick={() =>
                                    !submittedFields.rating &&
                                    onInputChange(
                                        { target: { value: rating } },
                                        "rating"
                                    )
                                }
                            >
                                {rating}
                            </span>
                        ))}
                        <button
                            onClick={() => onInputSubmit("rating")}
                            disabled={
                                !inputState.rating || submittedFields.rating
                            }
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
                            onClick={() => onInputSubmit("button")}
                            disabled={
                                submittedFields.button || inputState.button
                            }
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
            className={`${styles.chatBubble} ${item.baseType.includes("Input") ? styles.userBubble : styles.botBubble}`}
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
