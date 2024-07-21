import express from 'express';
import {addExpenses, getExpenses} from "../controllers/expensesController";

const router = express.Router();

router.post('', addExpenses);
router.get('/:userId', getExpenses);

export default router;