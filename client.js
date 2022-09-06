// const socket = io('http://localhost:8000')

// const name = prompt("Enter Your Name to Join the Chat : ")
// socket.emit("new-user-joined",name)

// const messageContainer = document.getElementById("message-container")
// function appendMessage(message,pos){
//     const msg = document.createElement("div")
//     msg.innerHTML = message
//     msg.classList.add("alert")
//     msg.classList.add("alert-secondary")
//     if(pos=='left'){
//         msg.classList.add("left")
//         msg.classList.add("alert-primary")
//     }
//     else{
//         msg.classList.add("right")
//         msg.classList.add("alert-success")
//     }

//     messageContainer.appendChild(msg)
// }

// socket.on("user-joined",(name)=>{
//     appendMessage(`${name} Joined the Chat`,"left")
// })
// socket.on("user-left",(name)=>{
//     appendMessage(`${name} left the chat`,"left")
// })
// socket.on("receive",(data)=>{
//     appendMessage(`${data.name} : ${data.message}`,"left")
// })

// function sendMessage(){
//     const msg=document.getElementById("msg")
//     socket.emit("send",msg.value)
//     appendMessage(`You : ${msg.value}`,"right")
//     msg.value=""
// }














const socket = io('http://localhost:8000')

const name = prompt("Enter Your Name to Join the Group Chat")
socket.emit("new-user-joined",name)

const messageContainer = document.getElementById("message-container")
function appendMessage(message,pos){
    const msg = document.createElement("div")
    msg.innerHTML = message
    msg.classList.add("alert")
    msg.classList.add("alert-secondary")
    if(pos=='left'){
        msg.classList.add("left")
        msg.classList.add("alert-primary")
    }
    else{
        msg.classList.add("right")
        msg.classList.add("alert-success")
    }

    messageContainer.appendChild(msg)
}
function add(message){
    const msg = document.createElement("h6")
    msg.innerHTML = message
    msg.classList.add("text-dark")
    msg.classList.add("p-2")
        msg.classList.add("text-center")
        msg.classList.add("w-100")
        msg.classList.add("bg-light")
        msg.classList.add("join")
    messageContainer.appendChild(msg)
}
function removed(message){
    const msg = document.createElement("p")
    msg.innerHTML = message
    msg.classList.add("text-secondary")
        msg.classList.add("text-center")
        msg.classList.add("w-100")
        msg.classList.add("join")
    messageContainer.appendChild(msg)
}

socket.on("user-joined",(name)=>{
    add(`${name} Joined the Chat`)
})
socket.on("user-left",(name)=>{
    removed(`${name} left the chat`,"left")
})
socket.on("receive",(data)=>{
    appendMessage(`${data.name} : ${data.message}`,"left")
})

function sendMessage(){
    const msg=document.getElementById("msg")
    const wrong=document.getElementById("wrongmessage")
    if(msg.value==""){
       wrong.style.display="block",
       wrong.innerHTML="Please Write Something..." 
       wrong.classList.add("text-danger")
       wrong.classList.add("text-center")
    }
    else{
    wrong.style.display="none"
    socket.emit("send",msg.value)
    appendMessage(`You : ${msg.value}`,"right")
    msg.value=""
}
}
