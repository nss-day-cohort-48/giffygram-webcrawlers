import { getUsers } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram")


document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "loginButton") {
        let foundUser = null
            // stores the list of users
        const userState = getUsers()
            // grabs the user input from the login form
        const email = document.querySelector("input[name='email']").value
        const password = document.querySelector("input[name='password']").value
            // iterates through all the users and checks the user input to determine who has logged in
        for (const user of userState) {
            if (user.email === email && user.password === password) {
                foundUser = user
            }
        }

        if (foundUser !== null) {
            // stores the user id in the browser local storage
            localStorage.setItem("gg_user", foundUser.id)
                // calls the render function again
            document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
})

// return login form html
export const LoginForm = () => {
    return `
        <div class="loginForm">
            <form>
                <fieldset>
                    <input type="text" name="email" autofocus placeholder="Email address" />
                </fieldset>
                <fieldset>
                    <input type="password" name="password" placeholder="Password" />
                </fieldset>
            </form>
            <button id="loginButton">Login</button>
            <div>Don't Have An Account?</div>
            <button id="signUpButton">Sign Up</button>
        </div>
    `
}