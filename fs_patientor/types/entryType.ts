
import { Diagnose } from "./diagnoseType";
import { Discharge } from "./dischargeType";
import { SickLeave } from "./sickLeaveType";

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface BaseEntry {
    id: string;
    date: string;
    description: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;

export type NewEntry = NewHealthCheckEntry | NewHospitalEntry | NewOccupationalHealthcareEntry;