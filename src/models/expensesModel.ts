import db from '../config/dbConfig';

export const createExpenses = (userId: number, amount: number, description: string, callback: (err: any, results?: any) => void) => {
    const query = 'INSERT INTO expenses (user_id, amount, description) VALUES (?, ?, ?)';
    db.query(query, [userId, amount, description], callback);
};

export const findExpenses = (userId: string, callback: (err: any, results?: any) => void) => {
    const sql = 'SELECT * FROM expenses WHERE user_id = ?';
    db.query(sql, [userId], callback);
};
