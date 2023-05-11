
import { v1 as uuid } from 'uuid';

import { Diagnose } from '../types/diagnoseType';
import diagnoses from '../data/diagnoses';
import { Patient, NonSensitivePatient, NewPatient } from '../types/patientType';
import patientData from '../data/patients';
import { parseName, parseOccupation, parseSSN } from './stringUtils';
import { parseDate } from './dateUtils';
import { parseGender } from './enumUtils';
import { NewEntry } from '../types/entryType';
import { parseDischarge, parseSickLeave } from './sickUtils';

export const getDiagnoses = (): Diagnose[] => {
    return diagnoses;
};

export const toNewEntry = (object: unknown): NewEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if (
        'date' in object &&
        'description' in object &&
        'specialist' in object &&
        'type' in object
    ) {
        let newEntry: NewEntry;
        if (object.type === 'HealthCheck' && 'healthCheckRating' in object && typeof object.healthCheckRating === 'number') {
            newEntry = {
                date: parseDate(object.date),
                description: parseName(object.description),
                specialist: parseName(object.specialist),
                type: 'HealthCheck',
                healthCheckRating: object.healthCheckRating
            };
            if ('diagnosisCodes' in object && object.diagnosisCodes instanceof Array<string>) {
                newEntry.diagnosisCodes = object.diagnosisCodes;
            }
            return newEntry;
        }
        if (object.type === 'Hospital' && 'discharge' in object) {
            newEntry = {
                date: parseDate(object.date),
                description: parseName(object.description),
                specialist: parseName(object.specialist),
                type: 'Hospital',
                discharge: parseDischarge(object.discharge)
            };
            if ('diagnosisCodes' in object && object.diagnosisCodes instanceof Array<string>) {
                newEntry.diagnosisCodes = object.diagnosisCodes;
            }
            return newEntry;
        }
        if (object.type === 'OccupationalHealthcare' && 'employerName' in object) {
            newEntry = {
                date: parseDate(object.date),
                description: parseName(object.description),
                specialist: parseName(object.specialist),
                type: 'OccupationalHealthcare',
                employerName: parseName(object.employerName)
            };
            if ('sickLeave' in object && object.sickLeave instanceof Object) {
                newEntry.sickLeave = parseSickLeave(object.sickLeave);
            }
            if ('diagnosisCodes' in object && object.diagnosisCodes instanceof Array<string>) {
                newEntry.diagnosisCodes = object.diagnosisCodes;
            }
            return newEntry;
        }
    }
    throw new Error('Incorrect or missing data');
};

export const getPatients = (): Patient[] => {
    return patientData;
};

export const getOmittedPatients = (): NonSensitivePatient[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if (
        'name' in object &&
        'dateOfBirth' in object &&
        'ssn' in object &&
        'gender' in object &&
        'occupation' in object
    ) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };
        return newPatient;
    }
    throw new Error('Invalid data: fields partially missing');
};

export const addPatient = (patientInformation: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        entries: [],
        ...patientInformation
    };
    console.log(newPatient);
    patientData.push(newPatient);
    return newPatient;
};

export const addEntry = (patientInformation: Patient[], id: String, entryInformation: NewEntry): Patient => {
    const patientIndex = patientInformation.findIndex((patient) => patient.id === id);
    if (patientIndex === -1) {
        throw new Error('Incorrect or missing data');
    }
    const newEntry = {
        ...entryInformation,
        id: uuid()
    };
    console.info(newEntry);
    patientInformation[patientIndex].entries.push(newEntry);
    return patientInformation[patientIndex];
};
