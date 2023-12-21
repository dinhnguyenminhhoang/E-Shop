import { useNavigate } from "react-router-dom";

interface GenerralProductHeaderProps {
    heading?: string;
    link?: string;
}
const GenerralProductHeader: React.FC<GenerralProductHeaderProps> = ({
    heading = "Linh kiện",
    link,
}) => {
    const router = useNavigate();
    return (
        <div className="flex justify-between items-center my-2">
            <h1 className="font-bold text-2xl">{heading}</h1>
            <button
                onClick={() => {
                    if (link) router(link);
                }}
                className="border-none hover:underline font-normal text-sm text-[#111]"
            >
                xem thêm
            </button>
        </div>
    );
};

export default GenerralProductHeader;
