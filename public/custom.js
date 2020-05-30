// global vairables....
let client, channel, username, activeUser;

client = new StreamChat("g8yfg5w2yd32")

const inputElement = document.getElementById("message-input");
inputElement.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        sendMessage(inputElement.value)
        inputElement.value = ""
    }
});

async function generateToken(username) {
    const { token } = (await axios.get(`/token?username=${username}`)).data
    return token
}

async function sendMessage(message) {
    return await channel.sendMessage({
        text: message,
    });
}

function appendMessage(message) {
    const messageContainer = document.getElementById("messages")
    
    // Create and append the message div
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${ message.user.id === username ? 'message-right' : 'message-left' }`

    // Create the username div
    const usernameDiv = document.createElement("div")
    usernameDiv.className = "message-username"
    usernameDiv.textContent = `${message.user.id}:`
    // Append the username div to the MessageDiv
    messageDiv.append(usernameDiv)

    // Create the main message text div
    const messageTextDiv = document.createElement("div")
    messageTextDiv.textContent = message.text
    // Append the username div to the MessageDiv
    messageDiv.append(messageTextDiv)

    // Then append the messageDiv to the "messages" div
    messageContainer.appendChild(messageDiv)
}

const user = document.getElementById("user-login-input")
user.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        checkAuthState()
    }
});
checkAuthState()

async function checkAuthState() {
  var url_string = window.location.href; 
  var urls = new URL(url_string);
  var name = urls.searchParams.get("uname");
  // alert(name);
    // alert(user.value);
    if (!name) {
        document.getElementById("login-block").style.display = "grid"
        document.getElementsByClassName("chat-container")[0].style.display = "none";
    } else {
        username = name

        await initializeClient()

        document.getElementsByClassName("chat-container")[0].style.display = "grid";
        document.getElementById("login-block").style.display = "none"
    }
}

async function initializeClient() {
    const token = await generateToken(username)

    await client.setUser({
        id: username,
        name: "Jon Snow", // Update this name dynamically
        image: "https://bit.ly/2u9Vc0r",
      }, token); // token generated from our Node server
    
    await updateUser(username)

    // await groupUsers(username)

    await listUsers()

    return client
}

async function initializeChannel(members) {
    channel = client.channel('messaging', {
        members: members,
        session: 8 // custom field, you can add as many as you want
    });
    
    await channel.watch();

    channel.on("message.new", event => {
        appendMessage(event.message)
    });

    channel.state.messages.forEach(message => {
        appendMessage(message)
    }) 
}

async function groupUsers(username) {

    //public based channel
    // const filters = { type: 'public' }
    //mentor based channel
   
    const filters = { members: { $in: [username] } };
    const sort = { last_message_at: -1 }
    const response = await client.queryChannels(filters, sort, {
    watch: true,
    state: true,
   });

    for (const c of response) {
        // console.log(c);
        // console.log(c.id)

    }

    
    // console.log(response);
    populateChannels(response)
        return response
  
    // const destroy = await client.delete(['!members-FmEByN6sjhQsEz6P8xm_mGv4sPUKpkHiheAypb3ig0A']);
    // console.log(destroy)
    
}



async function listUsers() {
    const filters = {  }
    const response = await client.queryUsers(filters)
    // alert(JSON.stringify(response))
    populateUsers(response.users)
    return response
}

async function selectUserHandler(userPayload) {
    if (activeUser === userPayload.id) return // current active user, so do not proceed...

    activeUser = userPayload.id

    // remove the 'active' class from all users
    const allUsers = document.getElementsByClassName("user")
    Array.from(allUsers).forEach(user => {
        user.classList.remove('active')
    })
    
    // add the 'active' class to the current selected user
    const userElement = document.getElementById(userPayload.id)
    userElement.classList.add('active')

    // remove all previous messages in the message container...
    const messageContainer = document.getElementById("messages")
    messageContainer.innerHTML = ''

    await initializeChannel([username, userPayload.id])
}

function populateUsers(users) {
    // remove the current users from the list of users
    const otherUsers = users.filter(user => user.id !== username)

    const usersElement = document.getElementById("users")

    otherUsers.map(user => {
        const userElement  = document.createElement("div")
        userElement.className = "user"
        userElement.id = user.id
        userElement.textContent = user.id

        userElement.onclick = () => selectUserHandler(user)

        usersElement.append(userElement)
    })
}

function populateChannels(users) {
    // remove the current users from the list of users
    
    const otherUsers = users.filter(user => user.id !== username)

    const usersElement = document.getElementById("users")

    otherUsers.map(user => {
       // console.log(user.data.name)
        // console.log(user.data.name)
       
        const userElement  = document.createElement("div")
        userElement.className = "user"
        userElement.id = user.data.name
        userElement.textContent = user.data.name

        userElement.onclick = () => selectUserHandler(user)

        if(userElement.id == "undefined"){

        }else{


        usersElement.append(userElement)

        }
      
    })
}

async function updateUser(user) {
    const response = await axios.post("/updateUser", {userID: user})
    return response
}