exports.video = {
    register: "/register",
    get: "/get",
    getAll: "/getAll",
    erase: "/erase",
    update: "/update"
}

exports.stream = {
    stream: "/:videoId",
    videoToken: "/videoToken"
}

exports.streamingMicroServiceAddress = "http://localhost:5001/api/video"
exports.streamingAddress = "http://localhost:5001/api/stream"