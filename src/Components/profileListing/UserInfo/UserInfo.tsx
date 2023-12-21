import { profileType } from "@/common/user";
import { AiOutlineEdit } from "react-icons/ai";
import { BsGenderFemale, BsGenderMale, BsPhoneVibrate } from "react-icons/bs";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
interface UserInfoProps {
    data: profileType;
    setShowUpdateAccount: (show: boolean) => void;
}
const UserInfo: React.FC<UserInfoProps> = ({ data, setShowUpdateAccount }) => {
    const date = new Date(data.dayOfBirth);
    return (
        <div className="relative h-[325px] w-1/2 shadow-custom bg-white p-4 pb-8 flex flex-col gap-2 rounded-borderContnet">
            <div className="flex flex-col items-center">
                <img
                    src={data.avatarUrl}
                    alt=""
                    width={80}
                    height={80}
                    className="p-2 border rounded-full"
                />
                <span className="text-lg">Xin chào</span>
                <span className="text-2xl font-bold text-custom-Colorprimary">
                    {`${data.lastName} ${data.firstName}`}
                </span>
            </div>
            <div className="flex gap-2 justify-between mt-2">
                <div className="flex flex-col gap-1 items-center  text-lg">
                    <span>Ngày sinh</span>
                    <LiaBirthdayCakeSolid className="text-custom-Colorprimary text-[45px]" />
                    <span>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</span>
                </div>
                <div className="flex flex-col gap-1 items-center  text-lg">
                    <span>Số điện thoại</span>
                    <BsPhoneVibrate className="text-custom-Colorprimary text-[45px]" />
                    <span>{data.phoneNumber}</span>
                </div>
                {data.gender === true ? (
                    <div className="flex flex-col gap-1 items-center  text-lg">
                        <span>giới tính</span>
                        <BsGenderMale className="text-custom-Colorprimary text-[45px]" />
                        <span> nam</span>
                    </div>
                ) : (
                    <div className="flex flex-col gap-1 items-center  text-lg">
                        <span>giới tính</span>
                        <BsGenderFemale className="text-custom-Colorprimary text-[45px]" />
                        <span>nữ</span>
                    </div>
                )}
            </div>
            <div
                className="absolute top-2 right-2 cursor-pointer text-custom-Colorprimary"
                onClick={() => setShowUpdateAccount(true)}
            >
                <AiOutlineEdit size={30} />
            </div>
        </div>
    );
};

export default UserInfo;
