// names
const firstName = document.getElementById('first-name')
const lastName = document.getElementById('last-name')
firstName.addEventListener('input', () => {
    if (firstName.value !== '') {
        firstName.classList.remove('i-error')
        firstName.parentElement.querySelector('.error').style.display = 'none'
        firstName.setAttribute('aria-invalid', 'false');
        firstName.removeAttribute('aria-describedby');
    }
})
lastName.addEventListener('input', () => {
    if (lastName.value !== '') {
        lastName.classList.remove('i-error')
        lastName.parentElement.querySelector('.error').style.display = 'none'
        lastName.setAttribute('aria-invalid', 'false');
        lastName.removeAttribute('aria-describedby');
    }
})

// email
const email = document.getElementById('email')
email.addEventListener('input', () => { 
    if (email.value !== '') {
        email.classList.remove('i-error')
        email.parentElement.querySelector('.error').style.display = 'none'
        email.setAttribute('aria-invalid', 'false');
        email.removeAttribute('aria-describedby');
    }
})

// textarea
const textArea = document.getElementById('message')
textArea.addEventListener('input', () => { 
    if (textArea.value !== '') {
        textArea.classList.remove('i-error')
        textArea.parentElement.querySelector('.error').style.display = 'none'
        textArea.setAttribute('aria-invalid', 'false');
        textArea.removeAttribute('aria-describedby');
    }
})

// radio inputs
const radioContainers = document.querySelectorAll('.radio')
radioContainers.forEach((radioEl) => {
    radioEl.addEventListener('click', (e) => {
        const radio = radioEl.querySelector('input')
        radio.checked = true
        const fieldset = document.querySelector('fieldset')
        const queryError = fieldset.querySelector('.error')
        queryError.style.display = 'none'

        // Remove aria-invalid from the clicked radio input
        radio.removeAttribute('aria-invalid');
        radio.removeAttribute('aria-describedby');

        // Set aria-invalid to false for all other radio inputs
        const otherRadioInputs = document.querySelectorAll('.radio input:not(:checked)')
        otherRadioInputs.forEach((input) => {
            input.setAttribute('aria-invalid', 'false');
            input.removeAttribute('aria-describedby');
        });
    })
})

// checkbox
document.getElementById('consent').addEventListener('change', (e) => { 
    e.target.checked = !e.target.checked
    const checkError = e.target.parentElement.parentElement.parentElement.querySelector('.error')
    checkError.style.display = 'none'
    e.target.removeAttribute('aria-invalid');
    e.target.removeAttribute('aria-describedby');
})
document.querySelector('.check-flex').addEventListener('click', (e) => { 
    const check = document.querySelector('.check-flex input')
    if (e.target.tagName === 'LABEL') return
    check.checked = !check.checked
})


const checkRadioValidity = () => {
    const radio = document.querySelector('input[name="query-type"]:checked')
    const radioInputs = document.querySelectorAll('input[name="query-type"]')

    if (!radio) {
        const fieldset = document.querySelector('fieldset')
        const queryError = fieldset.querySelector('.error')
        queryError.style.display = 'block'

        // Set aria-invalid to true for all radio inputs
        radioInputs.forEach((input) => {
            input.setAttribute('aria-invalid', 'true');
            input.setAttribute('aria-describedby', 'query-type-error');
        });

        return false
    } else {
        // If a radio input is selected, set aria-invalid to false for all radio inputs
        radioInputs.forEach((input) => {
            input.setAttribute('aria-invalid', 'false');
            input.removeAttribute('aria-describedby');
        });
    }

    return true
}

const checkBoxValidity = () => {
    const checkBox = document.querySelector('.check-flex input')
    if (!checkBox.checked) {
        checkBox.setAttribute('aria-invalid', 'true');
        checkBox.setAttribute('aria-describedby', 'consent-error');
        const checkError = checkBox.parentElement.parentElement.parentElement.querySelector('.error')
        checkError.style.display = 'block'
        return false
    }
    return true
}

const showError = (input) => { 
    const error = input.parentElement.querySelector('.error')
    input.classList.add('i-error')
    error.style.display = 'block'
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', `${input.id}-error`);
}

const checkNamesValidity = () => {
    const firstName = document.getElementById('first-name')
    const lastName = document.getElementById('last-name')

    if (firstName.value === '' && lastName.value === '') {
        showError(firstName)
        showError(lastName)
        return false
    }

    if (firstName.value === '') {
        showError(firstName)
        return false
    }

    if (lastName.value === '') {
        showError(lastName)
        return false
    }

    return true
}

const checkEmailValidity = () => {
    const email = document.getElementById('email')
    const emailValue = email.value

    if (emailValue === '') {
        showError(email)
        return false
    }

    if (!emailValue.includes('@')) {
        showError(email)
        return false
    }

    return true
}

const checkTextAreaValidity = () => {
    const textArea = document.getElementById('message')
    const textAreaValue = textArea.value

    if (textAreaValue === '') {
        showError(textArea)
        return false
    }

    return true
}


const form = document.getElementById('form')
form.addEventListener('submit', (e) => { 
    e.preventDefault()

    const isRadioValid = checkRadioValidity()
    const isCheckBoxValid = checkBoxValidity()
    const isNamesValid = checkNamesValidity()
    const isEmailValid = checkEmailValidity()
    const isTextAreaValid = checkTextAreaValidity()

    if (isRadioValid && isCheckBoxValid && isNamesValid && isEmailValid && isTextAreaValid) {
        form.reset()
        const successDisplay = document.querySelector('.success')
        successDisplay.style.display = 'block'
        setTimeout(() => {
            successDisplay.style.display = 'none'
        }, 3000)
    }
})