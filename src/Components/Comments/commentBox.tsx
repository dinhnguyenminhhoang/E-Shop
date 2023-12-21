import { allReviewType } from "@/common/reviewType";
import { FaStar } from "react-icons/fa";
import { MdOutlineStarRate } from "react-icons/md";

interface CommentBoxProps {
    listReview: allReviewType;
}
const CommentBox: React.FC<CommentBoxProps> = ({ listReview }) => {
    const handleDate = (time: string) => {
        const date = new Date(time);
        return `${date.getDay()} / ${date.getMonth()} / ${date.getFullYear()}`;
    };
    return (
        <>
            <div className="flex items-center gap-2 text-md text-yellow-400">
                <MdOutlineStarRate size={20} />
                <h1 className="font-bold py-2">ĐÁNH GIÁ :</h1>
            </div>

            {listReview?.reviews?.length ? (
                listReview.reviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white w-full h-auto shadow px-3 py-2 flex flex-col space-y-2 rounded-md"
                    >
                        <div className="flex items-center space-x-2">
                            <div className="group relative flex flex-shrink-0 self-start cursor-pointer">
                                <img
                                    src={review.avatarUrl}
                                    alt=""
                                    className="h-12 w-12 object-fill rounded-full"
                                />
                            </div>

                            <div className="flex items-center justify-center space-x-2">
                                <div className="block">
                                    <div className="flex justify-center items-center space-x-2">
                                        <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2">
                                            <div className="flex items-center gap-1">
                                                <div className="font-medium">
                                                    <span>
                                                        {review.fullname}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-yellow-500 flex items-center gap-1">
                                                    {Array.from(
                                                        {
                                                            length: Number(
                                                                review.score
                                                            ),
                                                        },
                                                        (_, index) => {
                                                            return <FaStar />;
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-sm">
                                                {review.content}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-start items-center text-sm w-full">
                                        <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                                            <span className="hover:underline">
                                                <small>thời gian :</small>
                                            </span>
                                            <span className="hover:underline">
                                                <small>
                                                    {handleDate(
                                                        review.createdAt
                                                    )}
                                                </small>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {review?.reply ? (
                            <div className="flex items-start justify-start space-x-2 ml-16 pt-2">
                                <div className="flex flex-shrink-0">
                                    <img
                                        src={review.reply.avatarUrl}
                                        alt=""
                                        className="h-12 w-12 object-fill rounded-full"
                                    />
                                </div>
                                <div className="block">
                                    <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2">
                                        <div className="font-medium">
                                            <span className="hover:underline text-sm">
                                                {review.reply.fullname}
                                            </span>
                                        </div>
                                        <div className="text-xs">
                                            {review.reply.content}
                                        </div>
                                    </div>
                                    <div className="flex justify-start gap-1 items-center text-sm w-full">
                                        <span className="hover:underline">
                                            <small>thời gian :</small>
                                        </span>
                                        <span className="hover:underline">
                                            <small>
                                                {handleDate(
                                                    review.reply.updatedAt
                                                )}
                                            </small>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                ))
            ) : (
                <h1 className="flex justify-center items-center font-bold text-2xl mt-4">
                    Trở thành người đánh đầu tiên
                </h1>
            )}
        </>
    );
};

export default CommentBox;
