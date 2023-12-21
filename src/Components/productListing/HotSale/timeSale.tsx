import React, { useState, useEffect } from "react";
import CountdownTimer from "./CountdownTimer";
import { toast } from "react-toastify";
import Notification from "@/Components/PageLoader/Notification";

function TimeSale() {
    const handleCountdownComplete = () => {
        toast.success("kết thúc giảm giá cuối tuần");
    };
    return (
        <div>
            <CountdownTimer onComplete={handleCountdownComplete} />
            <Notification />
        </div>
    );
}

export default TimeSale;
