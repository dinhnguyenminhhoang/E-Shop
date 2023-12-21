import CommentBox from "@/Components/Comments/commentBox";
import Star from "@/Components/commonListing/Star/Start";
import { getProfile } from "@/app/action/UserAction";
import { createReview, getAllReview } from "@/app/action/review";
import { ProductType, productVersion } from "@/common/product";
import { allReviewType } from "@/common/reviewType";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CenterModal from "../Modal/CenterModal/CenterModal";
interface ReviewProps {
    data: ProductType;
    productVersion?: productVersion;
}
const Reviews: React.FC<ReviewProps> = ({ data, productVersion }) => {
    const [comment, setComment] = useState("");
    const [isReview, setIsReview] = useState<boolean>(false);
    const [rateReviewsScore, setRateReviewsScore] = useState<number>(5);
    const dispatch = useDispatch<any>();
    const allReviewData = useSelector(
        (state: any) => state.allReview.data
    ) as allReviewType;
    useEffect(() => {
        if (data?.id) dispatch(getAllReview(Number(data.id)));
        dispatch(getProfile());
    }, [dispatch, data]);
    const handleCreateReview = async () => {
        if (
            comment &&
            comment.trim() !== "" &&
            rateReviewsScore > 0 &&
            rateReviewsScore < 5
        ) {
            if (productVersion?.id) {
                const res = await dispatch(
                    createReview({
                        content: comment.trim(),
                        productVersionId: Number(productVersion?.id),
                        score: data.reviewsScore,
                    })
                );
                try {
                    if (res.payload.success) {
                        toast.success("Đánh giá thành công");
                        dispatch(getAllReview(Number(data?.id)));
                        setIsReview(false);
                    } else {
                        toast.error(
                            `Đánh giá thất bại :${res.payload.message}`
                        );
                    }
                } catch (error) {}
            } else {
                toast("vui lòng chọn sản phẩm để đánh giá");
            }
        } else {
            toast("cần có nội dung để đánh giá");
        }
    };
    return (
        <>
            <div className="shadow-custom p-2 mt-4 rounded-borderContnet">
                <h1 className="font-semibold text-lg">{data.name}</h1>
                <div className="flex w-full mb-3">
                    <div className="flex items-center justify-center w-full">
                        <div className="felx-1 flex  flex-col items-center text-center  border-r-[1px] min-h-[200px] w-full justify-center">
                            <span className="text-xl font-bold">
                                {data.reviewsScore === 0
                                    ? "5 / 5"
                                    : `${data.reviewsScore} / 5`}
                            </span>
                            <Star
                                numberStar={
                                    Math.floor(Number(data.reviewsScore)) | 5
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2 border-t py-6 mb-4">
                    <h1 className="text-center font-bold text-lg">
                        Bạn đánh giá sản phẩm này như thế nào ?
                    </h1>
                    <button
                        onClick={() => {
                            if (
                                !Cookies.get("token") ||
                                !localStorage.getItem("userName")
                            ) {
                                toast(
                                    "vui lòng đăng nhập và mua hàng để đánh giá"
                                );
                            } else if (!productVersion?.id) {
                                toast("vui lòng chọn sản phẩm để đánh giá");
                            } else setIsReview(true);
                        }}
                        className="bg-custom-bg_button text-white px-3 py-2 rounded-borderContnet cursor-pointer max-w-[50%]"
                    >
                        đánh giá ngay
                    </button>
                </div>
            </div>
            <div className="flex gap-2 flex-col shadow-custom mt-4 rounded-borderContnet p-4 pb-6 bg-[#f9fafb]">
                {allReviewData?.reviews ? (
                    <CommentBox listReview={allReviewData} />
                ) : null}
            </div>
            <CenterModal
                show={isReview}
                setShow={setIsReview}
                bgAll="fsd"
                showModalTitle={true}
                modalTitle={
                    <h1 className="font-bold text-2xl text-white select-none mt-2">
                        Đánh giá
                    </h1>
                }
                mainContent={
                    <div className="flex flex-col gap-6 w-full">
                        <div className="flex justify-between">
                            <div className="flex-1">
                                <p className="text-gray-300 text-sm text-start">
                                    nhập điểm đánh giá:
                                </p>
                                <input
                                    className="w-full h-[48px] px-2 rounded-[8px]"
                                    type="number"
                                    value={rateReviewsScore}
                                    name="rateReviewsScore"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        if (
                                            Number(e.target.value) < 0 ||
                                            Number(e.target.value) > 5
                                        ) {
                                            toast.error(
                                                "đánh giá không được dưới 0 và vượt quá 5"
                                            );
                                        } else {
                                            setRateReviewsScore(
                                                Number(e.target.value)
                                            );
                                        }
                                    }}
                                    placeholder="nhập điểm đánh giá"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex-1">
                                <p className="text-gray-300 text-sm text-start">
                                    nhập nội dung:
                                </p>
                                <input
                                    className="w-full h-[48px] px-2 rounded-[8px]"
                                    type="text"
                                    value={comment}
                                    name="comment"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setComment(e.target.value)}
                                    placeholder="nhập nội dung đánh giá"
                                />
                            </div>
                        </div>
                    </div>
                }
                showButtons={true}
                buttonComponent={
                    <div className="flex gap-2 justify-center mb-2">
                        <button
                            onClick={handleCreateReview}
                            className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                        >
                            Hoàn tất
                        </button>
                        <button
                            onClick={() => {
                                setIsReview(false);
                                setRateReviewsScore(0);
                            }}
                            className="px-4 py-2 border-b-4 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200"
                        >
                            Đóng
                        </button>
                    </div>
                }
            />
        </>
    );
};

export default Reviews;
