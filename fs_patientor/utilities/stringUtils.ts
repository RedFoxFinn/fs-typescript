
export const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Invalid or missing name');
    }
    return name;
};

const isSSN = (ssn: string): boolean => {
    for (let i = 0; i < 6; i++) {
        if (isNaN(Number(ssn[i]))) {
            return false
        }
    }
    return true
};

export const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn) || !isSSN(ssn)) {
        throw new Error('Invalid or missing SSN');
    }
    return ssn;
};

export const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Invalid or missing occupation');
    }
    return occupation;
};

export const parseCriteria = (criteria: unknown): string => {
    if (!criteria || !isString(criteria)) {
        throw new Error('Invalid or missing criteria');
    }
    return criteria;
};