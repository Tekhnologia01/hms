export const getEpochTime = (inputDate) => {
    return Math.floor(new Date(inputDate).getTime() / 1000);
};

export const convertEpochToDate = (epochTime) => {
    if (!epochTime || isNaN(epochTime)) {
        return "Invalid Date";
    }
    return new Date(Number(epochTime) * 1000).toLocaleString();
};