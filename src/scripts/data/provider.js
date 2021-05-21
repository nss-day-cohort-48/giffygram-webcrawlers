const apiURL = "http://localhost:3000";
const applicationElement = document.querySelector(".giffygram");

const applicationState = {
    currentUser: {},
    feed: {
        chosenUser: null,
        displayLikes: false,
        displayMessages: false,
    },
    filters: {},
    "users": [],
    "posts": [],
    "likes": [],
    "messages": []
};



export const fetchUsers = () => {
    return fetch(`${apiURL}/users`)
        .then((res) => res.json())
        .then((users) => {
            applicationState.users = users;
        });
};

export const fetchPosts = () => {
    return fetch(`${apiURL}/posts`)
        .then((res) => res.json())
        .then((posts) => {
            applicationState.posts = posts;
        });
};

export const fetchLikes = () => {
    return fetch(`${apiURL}/likes`)
        .then((res) => res.json())
        .then((likes) => {
            applicationState.likes = likes;
        });
};

export const fetchMessages = () => {
    return fetch(`${apiURL}/messages`)
        .then((res) => res.json())
        .then((messages) => {
            applicationState.messages = messages;
        });
};

export const fetchFollows = () => {
    return fetch(`${apiURL}/follows`)
        .then((res) => res.json())
        .then((follows) => {
            applicationState.follows = follows;
        });
};


export const deletePost = (id) => {
    return fetch(`${apiURL}/posts/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const getUsers = () => {
    return [...applicationState.users];
};

export const getPosts = () => {
    return [...applicationState.posts];
};

export const getLikes = () => {
    return [...applicationState.likes];
};

export const getMessages = () => {
    return [...applicationState.messages];
};

export const getFollows = () => {
    return [...applicationState.follows]
}

export const getFilters = () => {
    return {...applicationState.filters }
}

export const addPost = (postObject) => {
    const fetchPost = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObject)
    }

    return fetch(`${apiURL}/posts`, fetchPost)
        .then(res => res.json())
        .then(() => {
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const sendMessage = (messageObject) => {
    const fetchMessage = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageObject)
    }

    return fetch(`${apiURL}/messages`, fetchMessage)
        .then(res => res.json())
        .then(() => {
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
export const setDateFilter = (date) => {
    applicationState.filters.date = date
}

export const setUserFilter = (userId) => {
    applicationState.filters.userId = userId
}

export const setFavoritesFilter = (isChecked) => {
    applicationState.filters.favoritesOnly = isChecked
}

export const setPostCount = (postCount) => {
    applicationState.filters.postCount = postCount
}

export const clearFilters = () => {
    applicationState.filters.date = null
    applicationState.filters.userId = null
    applicationState.filters.favoritesOnly = null
}
