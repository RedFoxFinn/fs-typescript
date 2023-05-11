
import express from 'express';
import cors from 'cors';
const app = express();
app.use(express.json());
if (process.env.NODE_ENV !== 'development') {
    app.use(cors());
}

import { NewPatient, Patient } from './types/patientType';
import { addEntry, getDiagnoses, getPatients, getOmittedPatients, addPatient, toNewPatient, toNewEntry} from './utilities/dataUtils';

const PORT = 3001;

app.route('/api/ping')
    .get((_req,res) => {
        console.info(`frontend pinged the API`);
        res.json({'answer': 'pong'});
    });

app.route('/api/diagnoses')
    .get((_req, res) => {
        console.info(`frontend requested diagnoses`);
        res.json(getDiagnoses());
    });

app.route('/api/patients')
    .get((_req,res) => {
        console.info(`frontend requested patients`);
        res.json(getOmittedPatients());
    })
    .post((req,res) => {
        console.info(`frontend is adding new patient`);
        try {
            const newPatient: NewPatient = toNewPatient(req.body);
            const addedPatient: Patient = addPatient(newPatient);
            res.json(addedPatient);
        } catch (error: unknown) {
            res.json({'error':'maybe the data was invalid or partial?'});
        }
    });

app.route('/api/patients/:id')
    .get((req,res) => {
        console.info(`frontend requested patient with id ${req.params.id}`);
        res.json(getPatients().find(p => p.id === req.params.id));
    });

app.route('/api/patients/:id/entries')
    .post((req,res) => {
        console.info(`frontend is adding new entry for patient with id ${req.params.id}`);
        res.json(addEntry(getPatients(),req.params.id,toNewEntry(req.body)));
    });

app.listen(PORT, () => {
    console.log(`FS-Patientor running on port ${PORT}`);
});