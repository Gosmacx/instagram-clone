import CryptoJS from "crypto-js";

export default (data) => {
    return CryptoJS.AES.decrypt(data, process.env.secretKey).toString(CryptoJS.enc.Utf8)
}