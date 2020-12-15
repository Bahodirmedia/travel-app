//Function to validate URL
function checkInputs(fromCity, toCity) {
    console.log("::: Running checkURL :::", fromCity, toCity);
    var regexp = /^[a-zA-Z\s]{0,255}$/;
    if (regexp.test(fromCity) && regexp.test(toCity)) {
        return true;
    } else {
        return false;
    }
}

export {
    checkInputs
}