const validators = {
    birth: (element) => validateBirth(element)
}

const errorTypes = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
] 

const errorMessages = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío."
    },
    email: {
        valueMissing: "El campo correo no puede estar vacío.",
        typeMismatch: "El correo no es válido."
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacío.",
        patternMismatch: "Mínimo 6 caracteres, máximo 12, debe contener 1 letra minúscula, 1 mayúscula, 1 número y ningún carácter especial."
    },
    birth: {
        valueMissing: "El campo Fecha de Nacimiento no puede estar vacío.",
        customError: "The minimum age required is 18."
    },
    numero: {
        valueMissing: "El campo Número Telefónico no puede estar vacío.",
        patternMismatch: "Deben ser 10 dígitos"
    },
    address: {
        valueMissing: "El campo Dirección no puede estar vacío.",
        patternMismatch: "La dirección debe contener entre 10 y 40 caracteres."
    },
    ciudad: {
        valueMissing: "El campo Ciudad no puede estar vacío.",
        patternMismatch: "La ciudad debe contener entre 10 y 40 caracteres."
    }, 
    estado: {
        valueMissing: "El campo Estado no puede estar vacío.",
        patternMismatch: "El estado debe contener entre 10 y 40 caracteres."
    }
}

export function validate(element) {
    const inputType = element.dataset.tipo;
    if (validators[inputType]) {
        validators[inputType](element)
    }

    if (element.validity.valid) {
        element.parentElement.classList.remove("input-container--invalid");
        element.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        element.parentElement.classList.add("input-container--invalid");
        element.parentElement.querySelector(".input-message-error").innerHTML = changeErrorMessage(inputType, element);
    }
}

function validateBirth(element) {
    const userBirthDate = new Date(element.value);
    let message = "";

    if (!isAdult(userBirthDate)) {
        message = "The minimum age required is 18.";
    }

    element.setCustomValidity(message);
}

function isAdult(date) {
    const currentDate = new Date();
    return (new Date(date.getUTCFullYear() + 18, date.getUTCMonth(), date.getUTCDate()) <= currentDate);
}

function changeErrorMessage(inputType, input) {
    let message = ""
    for (let index = 0; index < errorTypes.length; index++) {
        const error = errorTypes[index];
        if (input.validity[error]) {
            message = errorMessages[inputType][error];
            break;
        }
        
    }

    return message;
}