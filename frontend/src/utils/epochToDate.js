export const epochTimeToDate = (epochTime) => {
    try {
        if (epochTime) {
            const date = new Date(epochTime * 1000);
            const formattedDate = date.toISOString().split("T")[0];

            return formattedDate;
        }
    } catch (error) {
        console.error("Error converting epoch time:", error);
    }
    return null;
};