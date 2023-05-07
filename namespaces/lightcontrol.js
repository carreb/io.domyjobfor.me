const namespace = (io) => {
    const lightcontrol = io.of("/lightcontrol");
    let users = {};
    let activitylog = [];
    const logActivity = (message) => {
        activitylog.push({message: message, timestamp: Date.now()});
        return lightcontrol.emit("activitylog", activitylog);

    }
    const log = (message) => {
        console.log(`[lightcontrol] ${message}`);
    }
    const CheckIfUsernameAlreadyExists = (username) => {
        let userExists = false;
        for (let user in users) {
            if (users[user].name === username) {
                userExists = true;
            }
        }
        return userExists;
    }

    lightcontrol.on("connection", (socket, data) => {
        log("New socket connection")
        socket.on("register", (data) => {
            if (users[socket.id]) return log("Ignoring request to register already registered user")
            if (CheckIfUsernameAlreadyExists(data.name)) data.name = `${data.name} (${socket.id})`;
            log("Registering user");
            // add the user to the users object
            users[socket.id] = data;
            // emit updated user object to all clients
            lightcontrol.emit("users", users);
            // send back a successful response to the newly registered socket
            socket.emit("registered")
            logActivity(`${data.name} has connected.`);
            log(`${data.name} has connected.`);
        })

        socket.on("test", () => {
            log("Test received")
        })




        socket.on("disconnect", () => {
            log("Socket disconnected")
            if (!users[socket.id]) return log("Ignoring request to unregister unregistered user")
            log("Unregistering user");
            // remove the user from the users object
            logActivity(`${users[socket.id].name} has disconnected.`);
            log(`${users[socket.id].name} has disconnected.`);
            delete users[socket.id];
        })
    })
}

module.exports = namespace;