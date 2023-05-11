
import { Gender } from "../types/genderType";
import { isString } from "./stringUtils";

const isGender = (parameter: string): parameter is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(parameter);
};

export const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Invalid or missing gender');
    }
    return gender;
};