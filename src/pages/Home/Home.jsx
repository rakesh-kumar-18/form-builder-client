import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const handleSignup = () => {
        navigate("/signup");
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <>
            <div>Home</div>
            <button onClick={handleSignup}>Signup</button>
            <button onClick={handleLogin}>Login</button>
        </>
    );
}

export default Home;
