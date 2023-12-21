import { useEffect, useState } from "react";
import { endOfDay, differenceInSeconds } from "date-fns";

interface CountdownTimerProps {
    onComplete: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const currentDate = new Date();
        const endOfDayDate = endOfDay(currentDate);
        const secondsUntilEndOfDay = differenceInSeconds(
            endOfDayDate,
            currentDate
        );

        setTimeLeft(secondsUntilEndOfDay);

        const countdownInterval = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
            } else {
                clearInterval(countdownInterval);
                onComplete();
            }
        }, 1000);

        return () => {
            clearInterval(countdownInterval);
        };
    }, [timeLeft, onComplete]);

    const days = Math.floor(timeLeft / (60 * 60 * 24));
    const hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="flex text-black gap-1 font-semibold md:ml-2">
            <p className="text-white hidden md:text-sm">kết thúc sau: </p>
            <p className="bg-white px-2 rounded-border">{days}</p>
            <span className="">:</span>
            <p className="bg-white px-2 rounded-border">{hours}</p>
            <span className="">:</span>
            <p className="bg-white px-2 rounded-border">{minutes}</p>
            <span className="">:</span>
            <p className="bg-white px-2 rounded-border">{seconds}</p>
        </div>
    );
};

export default CountdownTimer;
