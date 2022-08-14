import CryptoJS from "crypto-js";

export default (data) => {
    return CryptoJS.AES.encrypt(data, import.meta.env.VITE_SECRET_KEY).toString()
}