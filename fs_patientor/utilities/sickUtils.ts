
import { Discharge } from "../types/dischargeType";
import { SickLeave } from "../types/sickLeaveType";
import { parseDate } from "./dateUtils";
import { parseCriteria } from "./stringUtils";

export const parseDischarge = (discharge: unknown): Discharge => {
    if (!discharge || typeof discharge !== 'object' || !('date' in discharge) || !parseDate(discharge.date) || !('criteria' in discharge) || !parseCriteria(discharge.criteria)) {
        throw new Error('invalid or missing fields in object intended as type \'Discharge\'');
    }
    return discharge as Discharge;
};

export const parseSickLeave = (sickLeave: unknown): SickLeave => {
    if (!sickLeave || typeof sickLeave !== 'object' || !('startDate' in sickLeave) || !parseDate(sickLeave.startDate) || !('endDate' in sickLeave) || !parseDate(sickLeave.endDate)) {
        throw new Error('invalid or missing fields in object intended as type \'SickLeave\'');
    }
    return sickLeave as SickLeave;
};

