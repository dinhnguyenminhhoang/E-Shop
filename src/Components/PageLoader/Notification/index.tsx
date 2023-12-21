import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Notification() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            rtl={false}
            limit={3}
        />
    );
}
