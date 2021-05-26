import { registerUser } from "../data/provider.js"
import { LoginForm } from "./Login.js"

const applicationElement = document.querySelector(".giffygram")

document.addEventListener("click", event => {
    if (event.target.id === "signUpButton") {
        // sets the main html container to the register form
        applicationElement.innerHTML = RegisterForm()
    }
})

document.addEventListener("click", event => {
    if (event.target.id === "registerButton") {
        //stores the user input in variables
        const firstName = document.querySelector("input[name='firstName']").value
        const lastName = document.querySelector("input[name='lastName']").value
        const email = document.querySelector("input[name='email']").value
        const passwordOne = document.querySelector("input[name='passwordOne']").value
        const passwordTwo = document.querySelector("input[name='passwordTwo']").value

        // checks whether passwords match, if so, it creates a new user object and then passes it into the register form function
        if (passwordCheck(passwordOne, passwordTwo)) {
            const newUser = {
                    name: capitalize(firstName) + ' ' + capitalize(lastName),
                    email: email,
                    password: passwordOne
                }
                // this sends the new user object to the API through this fetch POST
            registerUser(newUser)
                // applicationElement.innerHTML = LoginForm()
        } else {
            // if passwords don't match, user will get an error message
            document.querySelector(".passwordMessage").innerHTML = "Passwords do not match!"
        }

    }
})

// returns html string of register form
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