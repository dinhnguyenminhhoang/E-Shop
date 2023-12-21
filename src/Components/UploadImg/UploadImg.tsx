import { setImgUrl } from "@/app/Slices/user/UploadSlice";
import { uploadFile } from "@/app/action/UserAction";
import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
interface UploadImgProps {
    imgUrl: string;
}
const UploadImg: React.FC<UploadImgProps> = ({ imgUrl }) => {
    const imgRef = useRef<any>();
    const dispatch = useDispatch<any>();
    const [imgUpdated, setImgUpdated] = useState<string>("");
    const handleFileChange = async (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("ImageFile", file, file.name);
            const res = await dispatch(uploadFile(formData));
            try {
                if (res.payload) {
                    setImgUpdated(res.payload);
                    dispatch(setImgUrl(res.payload));
                }
            } catch (error) {}
        } else {
            console.error("No file selected.");
        }
    };
    return (
        <div className="text-center">
            <div className="mt-2">
                <img
                    alt=""
                    src={imgUpdated !== "" ? imgUpdated : imgUrl}
                    className="w-32 h-32 m-auto rounded-full shadow"
                />
            </div>

            <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                id="photo"
                ref={imgRef}
            />

            <label htmlFor="photo">
                <button
                    onClick={() => imgRef.current.click()}
                    type="button"
                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-custom-Colorprimary focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3"
                >
                    Select New Photo
                </button>
            </label>
        </div>
    );
};

export default UploadImg;
