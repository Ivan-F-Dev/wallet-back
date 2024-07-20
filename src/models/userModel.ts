import db from '../config/dbConfig';

export const createUser = (username: string, password: string, callback: (err: any, results?: any) => void) => {
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, password], callback);
};

export const findUserByUsername = (username: string, callback: (err: any, results?: any) => void) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], callback);
};
