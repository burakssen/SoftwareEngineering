import {toast} from "wc-toast";

const Notification = (message, type, duration) => {
    toast(message, {
        icon: {
            type: type
        },
        duration: duration
    })
}

export default Notification;