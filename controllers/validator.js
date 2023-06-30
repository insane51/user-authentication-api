
// Email validation function using regex
const emailValidator = (email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Name validation function using regex
const nameValidator = (name)=>{
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
}

// Password validation function using regex
const passwordValidator = (password)=>{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}


module.exports ={
    nameValidator,
    emailValidator,
    passwordValidator
}
