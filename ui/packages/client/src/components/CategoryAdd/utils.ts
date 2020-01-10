// Description must contain at least one non-space character
export const validateDescriptionExplanation = "must contain at least one non-space character";

const regexpDescription = new RegExp("^(?!\s*$).+");

export const validateDescription = (text: string) => {
    return regexpDescription.test(text);
};