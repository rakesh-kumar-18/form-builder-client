export const validatePassword = (password) => {
    const regex = /^.{6,}$/;
    return regex.test(password);
};

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9\s]{3,}$/;
    return regex.test(username);
};
