
import { isString } from "./stringUtils";

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

export const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};