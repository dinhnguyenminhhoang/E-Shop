import React from "react";
import { MdClear, MdOutlineDeleteOutline } from "react-icons/md";
import CenterModal from "../CenterModal/CenterModal";

interface DeleModalProps {
    modalDelete: boolean;
    setIsModaleDelete: (check: boolean) => void;
    setConfirmationDelete: (check: boolean) => void;
}
const DeleModal: React.FC<DeleModalProps> = ({
    modalDelete,
    setIsModaleDelete,
    setConfirmationDelete,
}) => {
    return (
        <CenterModal
            show={modalDelete}
            setShow={setIsModaleDelete}
            isBorder={false}
            bgAll="h"
            mainContent={
                <div className="relative w-full h-full md:h-auto m-auto">
                    <div className="relative p-4 text-center rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <button
                            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => setIsModaleDelete(false)}
                        >
                            <MdClear />
                            <span className="sr-only">Close modal</span>
                        </button>
                        <MdOutlineDeleteOutline className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                        <p className="mb-4 text-gray-500 dark:text-gray-300">
                            Bạn có chắc muốn xóa sản phẩm này không ?
                        </p>
                        <div className="flex justify-center items-center space-x-4">
                            <button
                                onClick={() => setIsModaleDelete(false)}
                                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={() => {
                                    setIsModaleDelete(false);
                                    setConfirmationDelete(true);
                                }}
                                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                            >
                                xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            }
        />
    );
};

export default DeleModal;
