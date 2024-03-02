export const handleSingleSelect = (value: string) => {
    return [value];
};

export const handleBubble = (currentOptions: string[], value: string) => {
    const optionIndex = currentOptions.indexOf(value);
    if (optionIndex === -1 && currentOptions.length < 3) {
        return [...currentOptions, value];
    } else if (optionIndex !== -1) {
        return currentOptions.filter((option) => option !== value);
    }
    return currentOptions;
};

export const handleDefault = (currentOptions: string[], value: string) => {
    const optionIndex = currentOptions.indexOf(value);
    if (optionIndex === -1) {
        return [...currentOptions, value];
    }

    return currentOptions.filter((option) => option !== value);
};
