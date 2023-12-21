interface SaleItemProps {
    title: string;
    active?: boolean;
    link: string;
    handleActiveSale: (title: string) => void;
}
const SaleItem: React.FC<SaleItemProps> = ({
    title,
    link,
    active,
    handleActiveSale,
}) => {
    const handleActiveSaleChil = () => {
        handleActiveSale(link);
    };
    return (
        <button
            className={`px-2 py-1 md:text-lg rounded-border font-semibold text-sm ${
                active ? "bg-black text-white" : "bg-white  text-black"
            }`}
            onClick={handleActiveSaleChil}
        >
            {title}
        </button>
    );
};

export default SaleItem;
