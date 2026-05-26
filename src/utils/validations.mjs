
// Write a function to validate emails
function validateEmail(email) {
    if (!email)
        return false;

    email = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? email : false;
}

// Write a function to validate passwords
function validatePassword(pass) {
    if (!pass) return false;

    if (pass.length < 8 || pass.length > 32) return false;

    if (!/[A-Z]/.test(pass)) return false;

    if (!/[a-z]/.test(pass)) return false;

    if (!/\d/.test(pass)) return false;

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)) return false;

    return true;
}

// Write a function to validate names
function validateName(name) {
    if (!name) return false;

    name = name.trim().toLowerCase()
    // Only allow alphabets and spaces
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name) ? name : false;
}


export {
    validateEmail,
    validateName,
    validatePassword
}