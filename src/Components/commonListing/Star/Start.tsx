import { FaStar } from "react-icons/fa";

interface StarProps {
    numberStar: number;
}

const Star: React.FC<StarProps> = ({ numberStar }) => {
    const stars = Array.from({ length: numberStar });

    return (
        <ul className="flex items-center gap-1 text-[#f59e0b]">
            {stars.map((_, index) => (
                <li key={index}>
                    <FaStar />
                </li>
            ))}
        </ul>
    );
};

export default Star;
