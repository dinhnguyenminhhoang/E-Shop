import PageLoader from "@/Components/PageLoader/PageLoader";
import EditAddress from "@/Components/profileListing/EditAddress/EditAddress";
import EditAccount from "@/Components/profileListing/EditProfile/EditProfile";
import SideBarProfile from "@/Components/profileListing/SideBarProfile/SideBarProfile";
import UserInfo from "@/Components/profileListing/UserInfo/UserInfo";
import AddressInfo from "@/Components/profileListing/addressInfor/AddressInfo";
import { addressType } from "@/common/Address";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageLevelLoading } from "../Slices/common/PageLeveLoadingSlice";
import { getProfile } from "../action/UserAction";
import { getAllAddresses } from "../action/address";
const Profile = () => {
    const [showUpdateAccount, setShowUpdateAccount] = useState<boolean>(false);
    const [showUpdateAddress, setShowUpdateAddress] = useState<boolean>(false);
    const [addNewAddress, setAddNewAddress] = useState<boolean>(false);
    const [addressUpdate, setAddressUpdate] = useState<addressType[]>([]);
    const [reloadData, setReloadData] = useState<boolean>(false);
    const pageLevelLoading = useSelector(
        (sate: any) => sate.pageLevelLoading.pageLevelLoading
    );
    const dispatch = useDispatch<any>();
    const allAddresses = useSelector(
        (state: any) => state.allAddresses.data as addressType[]
    );
    const profile = useSelector((state: any) => state.profile.data);
    useEffect(() => {
        dispatch(setPageLevelLoading(true));
        dispatch(getProfile());
        dispatch(getAllAddresses());
        if (reloadData) setReloadData(false);
    }, [dispatch, reloadData]);
    useEffect(() => {
        if (profile?.firstName) {
            dispatch(setPageLevelLoading(false));
        }
    }, [profile, allAddresses, dispatch]);
    if (pageLevelLoading) {
        return <PageLoader pageLevelLoading={pageLevelLoading} />;
    }
    const getAddressIdByClick = (id: number) => {
        if (allAddresses) {
            const addressIpdate = allAddresses.filter(
                (address) => address.id === id
            );
            setAddressUpdate(addressIpdate);
            setShowUpdateAddress(true);
        }
    };

    return (
        profile &&
        allAddresses && (
            <div className="flex gap-4 min-h-full">
                <div className="w-[20%] border-r-[1px] bg-whiterounded-t-borderContnet overflow-hidden">
                    <SideBarProfile />
                </div>
                <div className="w-[80%] flex flex-col gap-4 mb-10">
                    <div className="flex gap-2">
                        <UserInfo
                            data={profile}
                            setShowUpdateAccount={(show: boolean) =>
                                setShowUpdateAccount(show)
                            }
                        />

                        {allAddresses.map((address: addressType) => {
                            if (address.isDefault) {
                                return (
                                    <AddressInfo
                                        setReloadData={(isReload: boolean) => {
                                            setReloadData(isReload);
                                        }}
                                        key={address.id}
                                        data={address}
                                        getAddressIdByClick={
                                            getAddressIdByClick
                                        }
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                    <div className="flex flex-col gap-4 p-2 border-t">
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl font-medium uppercase">
                                quản lí địa chỉ
                            </h1>
                            <button
                                onClick={() => setAddNewAddress(true)}
                                className="bg-custom-bg_button hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-custom-Colorprimary hover:border-red-500 rounded"
                            >
                                thêm mới
                            </button>
                        </div>
                        <div className="flex flex-wrap items-center">
                            {allAddresses.map(
                                (address: addressType, index: number) => {
                                    return (
                                        <AddressInfo
                                            setReloadData={(
                                                isReload: boolean
                                            ) => {
                                                setReloadData(isReload);
                                            }}
                                            key={address.id}
                                            width={
                                                allAddresses.length === 2 ||
                                                (address.id ===
                                                    allAddresses[
                                                        allAddresses.length - 1
                                                    ].id &&
                                                    index % 2 === 0)
                                                    ? 1
                                                    : undefined
                                            }
                                            data={address}
                                            getAddressIdByClick={
                                                getAddressIdByClick
                                            }
                                        />
                                    );
                                }
                            )}
                        </div>
                        {addNewAddress && (
                            <EditAddress
                                setReloadData={(isReload: boolean) => {
                                    setReloadData(isReload);
                                }}
                                showUpdateAddress={addNewAddress}
                                handleSetShowUpdateAddress={(show: boolean) => {
                                    setAddNewAddress(show);
                                    setAddressUpdate([]);
                                }}
                            />
                        )}
                    </div>
                </div>
                <EditAccount
                    setReloadData={(isReload: boolean) => {
                        setReloadData(isReload);
                    }}
                    data={profile}
                    showUpdateAccount={showUpdateAccount}
                    setShowUpdateAccount={(show: boolean) =>
                        setShowUpdateAccount(show)
                    }
                />
                {addressUpdate?.length ? (
                    <EditAddress
                        setReloadData={(isReload: boolean) => {
                            setReloadData(isReload);
                        }}
                        data={addressUpdate[0]}
                        showUpdateAddress={showUpdateAddress}
                        handleSetShowUpdateAddress={(show: boolean) => {
                            setShowUpdateAddress(show);
                            setAddressUpdate([]);
                        }}
                    />
                ) : null}
            </div>
        )
    );
};

export default Profile;
