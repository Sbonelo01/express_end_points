'use strict';

require('dotenv').config();

const {
    Client
} = require('pg');

const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
});

const addNewVisitor = async(visitorName, visitorAge, dateOfVisit, timeOfVisit, assistantName, comments) => {
    return new Promise(async(resolve, reject) => {
        await client.query(`INSERT INTO VISITORS(visitorName, visitorAge, dateOfVisit, timeOfVisit, assistantName, comments) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`, [vName, vAge, dateOfVisit, timeOfVisit, assistantName, comments],
            (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results.rows[0]);
            });
    })

}

const listAllVisitors = async() => {
    return new Promise(async(resolve, reject) => {
        await client.query(
            `SELECT * FROM VISITORS`,
            (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results.rows);
            }
        );
    })
};

const viewVisitor = async(id) => {
    return new Promise(async(resolve, reject) => {
        await client.query(
            `SELECT * FROM visitors WHERE id = $1`, [id],
            (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results.rows[0]);
            }
        );
    })
};

const deleteVisitors = async() => {
    return new Promise(async(resolve, reject) => {
        await client.query(
            `DELETE FROM visitors `, (err, results) => {
                if (err) {
                    reject(err);
                }
                console.log('All rows deleted!')
                resolve(results.rows);
            }
        );
    })
};

const deleteVisitor = async(id) => {
    return new Promise(async(resolve, reject) => {
        await client.query(
            `DELETE FROM visitors WHERE id = $1`, [id],
            (err, results) => {
                if (err) {
                    reject(err);
                }
                console.log('deleted!!!')
                resolve(results);
            }
        );
    })
};

const updateVisitor = async(id, visitorName, visitorAge, dateOfVisit, timeOfVisit, assistantName, comments) => {
    return new Promise(async(resolve, reject) => {
        await client.query(
            `UPDATE visitors SET visitorName = $2, visitorAge = $3,dateOfVisit = $4,timeOfVisit=$5,assistantName = $6,comments =$7 WHERE id = $1 RETURNING *`, [vid, vName, vAge, dateOfVisit, timeOfVisit, assistantName, comments],
            (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results.rows[0]);
            }
        );
    })
};


module.exports = {
    addNewVisitor,
    listAllVisitors,
    viewVisitor,
    deleteVisitors,
    deleteVisitor,
    updateVisitor
}
