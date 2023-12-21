import { FaChevronRight } from "react-icons/fa";

interface NextBtnProps {
    onClick: () => void;
}
const NextBtn: React.FC<NextBtnProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute -right-1 top-1/2 -translate-y-1/2 z-10 bg-backgroundRgba py-3 px-1 rounded-l-search  opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-300"
        >
            <FaChevronRight className="text-3xl font-light text-white" />
        </button>
    );
};

export default NextBtn;
