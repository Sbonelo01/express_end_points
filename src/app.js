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

client.connect();

const createTable = async() => {
    return new Promise(async(request, response) => {
        let sql = await client.query(`CREATE TABLE IF NOT EXISTS VISITORS(
                id SERIAL PRIMARY KEY,
                visitorName varchar(255) NOT NULL,
                assistant varchar(255) NOT NULL,
                visitorAge int NOT NULL,
                dateOfVisit date NOT NULL,
                timeOfVisit time NOT NULL,
                comments text NOT NULL
                )`,
            (error, results) => {
                if (error) {
                    throw error;
                }
                //console.log(sql
            }
        )
    })
}

const addNewVisitor = async(visitorName, assistant, visitorAge, dateOfVisit, timeOfVisit, comments) => {
    return new Promise(async(request, response) => {
        let results = await client.query(`INSERT INTO VISITORS(visitorName, assistant, visitorAge, dateOfVisit, timeOfVisit, comments) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`, [visitorName, assistant, visitorAge, dateOfVisit, timeOfVisit, comments],
            (error, results) => {
                if (error) {
                    throw error;
                }
                console.log(results.rows);
            });
    })
};

const listAllVisitors = async(request, response) => {
    let results = await client.query(
        `SELECT * FROM visitors ORDER BY id ASC`,
        (error, results) => {
            if (error) {
                throw error;
            }
            console.log(results.rows)
        }
    );
};

const viewVisitor = async(id) => {
    return new Promise(async(request, response) => {
        let results = await client.query(
            `SELECT * FROM visitors WHERE id = $1`, [id],
            (err, results) => {
                if (err) {
                    throw err;
                }
                request(results.rows[0]);
            }
        );
    })
};

const deleteVisitors = async() => {
    return new Promise(async(request, response) => {
        let results = await client.query(
            `DELETE FROM visitors `, (err, results) => {
                if (err) {
                    throw err;
                }
                console.log('All rows deleted!')
                request(results.rows);
            }
        );
    })
};

const deleteVisitor = async(id) => {
    return new Promise(async(request, response) => {
        let results = await client.query(
            `DELETE FROM visitors WHERE id = $1`, [id],
            (error, results) => {
                if (error) {
                    throw error;
                }
                request(results.rows);
                console.log('deleted!!!')
            }
        );
    })
};

const updateVisitor = async(id, visitorName, visitorAge, dateOfVisit, timeOfVisit, assistantName, comments) => {
    return new Promise(async(request, response) => {
        let results = await client.query(
            `UPDATE visitors SET visitorName = $2, visitorAge = $3,dateOfVisit = $4,timeOfVisit=$5,assistantName = $6,comments =$7 WHERE id = $1 RETURNING *`, [vid, vName, vAge, dateOfVisit, timeOfVisit, assistantName, comments],
            (err, results) => {
                if (err) {
                    throw err;
                }
                request(results.rows[0]);
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
