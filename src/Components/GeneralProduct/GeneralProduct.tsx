import { DevicesType } from "../../common/Device";

interface GeneralProductProps {
    data: any;
    col?: number;
    bg?: string;
}
const GeneralProduct: React.FC<GeneralProductProps> = ({
    col = 1,
    data,
    bg,
}) => {
    return (
        <div
            className={`md:col-span-1 sm:col-span-2 col-span-5 cursor-pointer`}
        >
            <div
                className={`min-h-[125px] bg-right-top bg-[#f28376] p-1 rounded-borderContnet`}
                style={{
                    backgroundImage: `url(${data.src})`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "contain",
                    backgroundColor: bg,
                }}
            >
                <span className="text-md font-medium text-white block">
                    {data.title}
                </span>
            </div>
        </div>
    );
};

export default GeneralProduct;
