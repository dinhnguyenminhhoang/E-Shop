import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface CenterModalProps {
    modalTitle?: React.ReactElement;
    mainContent: React.ReactElement;
    showButtons?: boolean;
    buttonComponent?: React.ReactElement;
    show: boolean;
    setShow: (show: boolean) => void;
    showModalTitle?: boolean;
    bgAll?: string;
    isBorder?: boolean;
}

const CenterModal: React.FC<CenterModalProps> = ({
    modalTitle,
    mainContent,
    showButtons,
    buttonComponent,
    show,
    setShow,
    showModalTitle,
    bgAll,
    isBorder = true,
}) => {
    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 flex items-center justify-center overflow-auto"
                onClose={setShow}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-900"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50"
                        onClick={() => setShow(false)}
                    />
                </Transition.Child>
                <div
                    className={`${
                        isBorder
                            ? "max-w-2xl w-full p-4 z-50 relative"
                            : "p-4 z-50 relative"
                    }`}
                >
                    <div
                        className="p-2 shadow-xl rounded-md"
                        style={{ backgroundColor: bgAll ? "#111827" : "#fff" }}
                    >
                        {showModalTitle ? (
                            <div className="flex items-center justify-center">
                                {modalTitle}
                            </div>
                        ) : null}
                        <div className="mt-2">{mainContent}</div>
                        {showButtons ? (
                            <div className="mt-4">{buttonComponent}</div>
                        ) : null}
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default CenterModal;
