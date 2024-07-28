import { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FormBuilderContext } from "../../contexts/FormBuilderContext";
import styles from "./ChatPage.module.css";
import { decrypt } from "../../utils/encryptionUtils";
import Loader from "../../components/Loader/Loader";
import ChatBubble from "../../components/ChatBubble/ChatBubble";

const ChatPage = () => {
    const { id } = useParams();
    const { handleGetTypeBotById } = useContext(FormBuilderContext);
    const [typeBot, setTypeBot] = useState(null);
    const [currentFlowIndex, setCurrentFlowIndex] = useState(0);
    const [chatHistory, setChatHistory] = useState([]);
    const [inputState, setInputState] = useState({});
    const [submittedFields, setSubmittedFields] = useState({});

    const resetChat = useCallback(() => {
        setCurrentFlowIndex(0);
        setChatHistory([]);
        setInputState({});
        setSubmittedFields({});
    }, []);

    const displayNextFlowItem = useCallback(() => {
        if (currentFlowIndex < typeBot.flow.length) {
            const nextItem = {
                ...typeBot.flow[currentFlowIndex],
                id: currentFlowIndex,
            };
            setChatHistory((prevHistory) => [...prevHistory, nextItem]);

            if (!nextItem.baseType.includes("Input")) {
                setTimeout(() => {
                    setCurrentFlowIndex((prevIndex) => prevIndex + 1);
                }, 1500);
            }
        }
    }, [currentFlowIndex, typeBot]);

    useEffect(() => {
        const fetchTypeBot = async () => {
            const decryptedId = decrypt(decodeURIComponent(id));
            const fetchedTypeBot = await handleGetTypeBotById(decryptedId);
            setTypeBot(fetchedTypeBot);
            resetChat();
        };

        fetchTypeBot();
    }, [id, handleGetTypeBotById, resetChat]);

    useEffect(() => {
        if (typeBot) {
            displayNextFlowItem();
        }
    }, [typeBot, displayNextFlowItem]);

    const handleInputChange = (e, inputType, id) => {
        setInputState((prev) => ({
            ...prev,
            [id]: { ...prev[id], [inputType]: e.target.value },
        }));
    };

    const handleInputSubmit = (inputType, id) => {
        if (
            (inputType === "email" &&
                !validateEmail(inputState[id][inputType])) ||
            (inputType === "phone" && !validatePhone(inputState[id][inputType]))
        ) {
            return;
        }
        setSubmittedFields((prev) => ({ ...prev, [id]: true }));
        setCurrentFlowIndex((prevIndex) => prevIndex + 1);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone) => {
        const re = /^[0-9]{10}$/;
        return re.test(String(phone));
    };

    if (!typeBot) {
        return <Loader />;
    }

    const getBackgroundColor = () => {
        switch (typeBot.theme) {
            case "light":
                return "#FFFFFF";
            case "dark":
                return "#171923";
            case "tailBlue":
                return "#508C9B";
            default:
                return "#FFFFFF";
        }
    };

    return (
        <div
            className={styles.chatPage}
            style={{ backgroundColor: getBackgroundColor() }}
        >
            {chatHistory.map((item, index) => (
                <ChatBubble
                    key={index}
                    item={item}
                    onInputChange={handleInputChange}
                    onInputSubmit={handleInputSubmit}
                    inputState={inputState[item.id] || {}}
                    submittedFields={submittedFields[item.id]}
                    isLastBotMessage={
                        !item.baseType.includes("Input") &&
                        (index === chatHistory.length - 1 ||
                            chatHistory[index + 1].baseType.includes("Input"))
                    }
                />
            ))}
        </div>
    );
};

export default ChatPage;
