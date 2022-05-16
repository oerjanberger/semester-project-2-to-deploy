export function checkEmail(email) {
    const regEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}

export function checkPassword(password) {
    const regEx = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{6,}$/;
    const patternMatches = regEx.test(password);
    return patternMatches;
};

export function checkPrice(price) {
    const regEx = /((\d+)(\.\d{2}))$/;
    const patternMatches = regEx.test(price);
    return patternMatches;
};


export function checkLength(value, len) {
    if (value.trim().length < len) {
        return true;
    } else {
        return false;
    }
}