const socket = io()
const messageForm = document.getElementById('messageForm')
const usernameInput = document.getElementById('usernameInput')
const messageInput = document.getElementById('messageInput')
const messagesPool = document.getElementById('messagesPool')

// Definimos la funcion que envia mensajes, se ejecuta al cliquear el boton Enviar
const sendMessage = (messageInfo) => {
    socket.emit('client:message', messageInfo)
}

const renderMessage = (messagesData) => {

    const html = messagesData.map(messageInfo => {
        return `
        <div>
            <strong>${messageInfo.username}</strong>
            <em>${messageInfo.message}</em>
        </div> `
    }).join(' ')

    messagesPool.innerHTML = html
}

const submitHandler = (e) => {

    e.preventDefault()

    const massageInfo = {
        username: usernameInput.value,
        message: messageInput.value,
    }
    sendMessage(massageInfo)

    messageInput.value = ""
    usernameInput.readOnly = true

}

messageForm.addEventListener('submit', submitHandler)

socket.on("server:message", renderMessage)

