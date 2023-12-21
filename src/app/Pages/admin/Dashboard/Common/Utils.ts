export const formatNumberValue = (value: any, index: number): string => {
    if (value >= 1000) return `${value / 1000}K`;
    else if (value >= 1000000) return `${value / 1000000}M`;
    return value as string;
};
export const handleFomatDate = (date: Date) => {
    const startDate = new Date(date);

    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };
    const formattedStartDate = startDate
        .toLocaleDateString("en-US", options as any)
        .replace(/\//g, "-");
    return formattedStartDate;
};
