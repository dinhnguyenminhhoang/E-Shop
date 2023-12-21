import { FaAngleLeft } from "react-icons/fa";

interface PreBtnProps {
    onClick: () => void;
}
const PreBtn: React.FC<PreBtnProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute -left-1 top-1/2 -translate-y-1/2 z-10 bg-backgroundRgba py-3 px-1 rounded-r-search opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-300"
        >
            <FaAngleLeft className="text-3xl font-light text-white" />
        </button>
    );
};

export default PreBtn;
