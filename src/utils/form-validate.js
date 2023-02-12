export const emailValidate = {
    required:{
        value: true,
        message: "Please enter an email address",
    },
    pattern:{
        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
        message: "Email address is not valid",
    }
};

export const passwordValidate = {
    required:{
        value: true,
        message: "Please enter a password",
    },
    minLength:{
        value: 6,
        message: "Password must be at least 6 characters long",
    }
};

export const usernameValidate = {
    required:{
        value: true,
        message: "Please enter a username",
    },
    minLength:{
        value: 6,
        message: "Username must be at least 6 characters long",
    },
    pattern:{
        value: /^[a-zA-Z0-9]+$/,
        message: "Username must only contain letters or numbers",
    }
};
