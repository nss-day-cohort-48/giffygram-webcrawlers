const apiURL = "http://localhost:3000";
const applicationElement = document.querySelector(".giffygram");

const applicationState = {
  currentUser: {},
  feed: {
    chosenUser: null,
    displayLikes: false,
    displayMessages: false,
  },
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

<<<<<<< HEAD
export const getFollows = () => {
    return [...applicationState.follows]
=======
export const fetchUsers = () => {
    return fetch(`${apiURL}/users`)
        .then(res => res.json())
        .then(
            (users) => {
                applicationState.users = users
            }
        )
}
export const fetchPosts = () => {
    return fetch(`${apiURL}/posts`)
        .then(res => res.json())
        .then(
            (posts) => {
                applicationState.posts = posts
            }
        )
}
export const fetchLikes = () => {
    return fetch(`${apiURL}/likes`)
        .then(res => res.json())
        .then(
            (likes) => {
                applicationState.likes = likes
            }
        )
}
export const fetchMessages = () => {
    return fetch(`${apiURL}/messages`)
        .then(res => res.json())
        .then(
            (messages) => {
                applicationState.messages = messages
            }
        )
}
export const fetchFollows = () => {
    return fetch(`${apiURL}/follows`)
        .then(res => res.json())
        .then(
            (follows) => {
                applicationState.follows = follows
            }
        )
>>>>>>> a2ba16f117538b07cb71aaeefb4d48503ceedad8
}