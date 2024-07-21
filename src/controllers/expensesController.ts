import { Request, Response } from 'express';
import {findExpenses, createExpenses } from '../models/expensesModel';

export const addExpenses = (req: Request, res: Response) => {
    const { userId, amount, description } = req.body;
    createExpenses(userId,amount,description,(err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ id: result.insertId });
    })
};

export const getExpenses = (req: Request, res: Response) => {
    const { userId } = req.params;
    findExpenses(userId,(err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(results);
    })
};