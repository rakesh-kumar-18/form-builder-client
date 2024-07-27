/* eslint-disable react/prop-types */
import styles from "./ChatBubble.module.css";

const ChatBubble = ({ item, onInputChange, onInputSubmit, inputState }) => {
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
                            disabled={inputState.submitted}
                        />
                        <button
                            onClick={() => onInputSubmit("text")}
                            disabled={inputState.submitted}
                        >
                            Send
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
                            disabled={inputState.submitted}
                        />
                        <button
                            onClick={() => onInputSubmit("number")}
                            disabled={inputState.submitted}
                        >
                            Send
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
                            disabled={inputState.submitted}
                        />
                        <button
                            onClick={() => onInputSubmit("email")}
                            disabled={inputState.submitted}
                        >
                            Send
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
                            disabled={inputState.submitted}
                        />
                        <button
                            onClick={() => onInputSubmit("phone")}
                            disabled={inputState.submitted}
                        >
                            Send
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
                            placeholder="Select a date"
                            disabled={inputState.submitted}
                        />
                        <button
                            onClick={() => onInputSubmit("date")}
                            disabled={inputState.submitted}
                        >
                            Send
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
                                    !inputState.submitted &&
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
                            disabled={inputState.submitted}
                        >
                            Send
                        </button>
                    </div>
                );
            case "Input Button":
                return (
                    <div className={styles.inputBubble}>
                        <button
                            onClick={() => onInputSubmit("button")}
                            disabled={inputState.submitted || inputState.button}
                        >
                            {item.text}
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return <div className={styles.chatBubble}>{renderBubbleContent()}</div>;
};

export default ChatBubble;
