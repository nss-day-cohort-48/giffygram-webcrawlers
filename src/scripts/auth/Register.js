import { registerUser } from "../data/provider.js"
import { LoginForm } from "./Login.js"

const applicationElement = document.querySelector(".giffygram")

document.addEventListener("click", event => {
    if (event.target.id === "signUpButton") {
        applicationElement.innerHTML = RegisterForm()
    }
})

document.addEventListener("click", event => {
    if (event.target.id === "registerButton") {
        const firstName = document.querySelector("input[name='firstName']").value
        const lastName = document.querySelector("input[name='lastName']").value
        const email = document.querySelector("input[name='email']").value
        const passwordOne = document.querySelector("input[name='passwordOne']").value
        const passwordTwo = document.querySelector("input[name='passwordTwo']").value

        if (passwordCheck(passwordOne, passwordTwo)) {
            const newUser = {
                name: capitalize(firstName) + ' ' + capitalize(lastName),
                email: email,
                password: passwordOne
            }
            registerUser(newUser)
                // applicationElement.innerHTML = LoginForm()
        } else {
            document.querySelector(".passwordMessage").innerHTML = "Passwords do not match!"
        }

    }
})

export const RegisterForm = () => {
    return `
    <div class="registerForm">
        <form>
            <fieldset>
                <input type="text" name="firstName" autofocus placeholder="First Name" />
            </fieldset>
            <fieldset>
                <input type="text" name="lastName" autofocus placeholder="Last Name" />
            </fieldset>
            <fieldset>
                <input type="text" name="email" autofocus placeholder="Email address" />
            </fieldset>
            <fieldset>
                <input type="password" name="passwordOne" placeholder="Password" />
            </fieldset>
            <fieldset>
                <input type="password" name="passwordTwo" placeholder="Verify Password" />
            </fieldset>
        </form>
        <button id="registerButton">Register</button>
        <div class="passwordMessage"></div>
    </div>
`
}

const passwordCheck = (passwordOne, passwordTwo) => {
    if (passwordOne === passwordTwo) {
        return true
    } else {
        return false
    }
}

const capitalize = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
}