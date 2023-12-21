import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
    const router = useNavigate();
    return (
        <div className="bg-gray-200 w-full px-16 md:px-0 h-screen flex items-center justify-center">
            <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
                <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">
                    404
                </p>
                <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">
                    Trang không tồn tại
                </p>
                <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">
                    vui lòng quay trở lại
                </p>
                <button
                    onClick={() => router("/")}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150"
                >
                    <MdArrowBack size={22} />
                    <span>Return Home</span>
                </button>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
