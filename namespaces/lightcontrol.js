const namespace = (io) => {
    const lightcontrol = io.of("/lightcontrol");
    lightcontrol.on("connection", (socket) => {
        console.log("A user connected to the lightcontrol namespace");
        socket.on("disconnect", () => {
            console.log("A user disconnected from the lightcontrol namespace");
        })
    })
}

module.exports = namespace;