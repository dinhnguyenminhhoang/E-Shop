interface AccountProps {
    src: string;
    name: string;
}
const Account: React.FC<AccountProps> = ({ src, name }) => {
    return (
        <div className="flex gap-2 cursor-pointer">
            <img src={src} alt="avata" className="w-[32px] h-[32px] object-cover rounded-full border-[1px]" />
            <span className="text-sm text-start mt-[1px] font-medium text-[#4a4a4a]">{name}</span>
        </div>
    );
}

export default Account;