import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const BackPage = () => {
    return (
        <Link
            to="/"
            className="flex items-center gap-1 cursor-pointer text-custom-primary font-medium text-lg md:p-2 p-1 lg:mr-12 md:mr-6 mr-1 m-4  border-b border-custom-primary"
        >
            <FaArrowCircleLeft />
            <span className="hidden lg:block">quay về trang chủ</span>
        </Link>
    );
};

export default BackPage;
