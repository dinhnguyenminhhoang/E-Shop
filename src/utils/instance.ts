import axios from "axios";

const instance = axios.create({
    baseURL: "http://shop-ttlhg-2.somee.com",
    validateStatus: function (status) {
        return status >= 200 && status < 500;
    },
});

// Interceptor cho response thành công
instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return error.response.data;
    }
);

export default instance;
