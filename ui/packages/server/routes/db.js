const { Client } = require('pg');

const INVENTORY_DATABASE_HOST = process.env.INVENTORY_DATABASE_HOST || "inventory-db";
const INVENTORY_DATABASE_PORT = process.env.INVENTORY_DATABASE_PORT || 5432;
const INVENTORY_DATABASE_USER = process.env.INVENTORY_DATABASE_USER || "user";
const INVENTORY_DATABASE_PASSWORD = process.env.INVENTORY_DATABASE_PASSWORD || "password";
const INVENTORY_DATABASE_NAME = process.env.INVENTORY_DATABASE_NAME || "name";

async function connect() {
    const client = new Client({
        user: INVENTORY_DATABASE_USER,
        host: INVENTORY_DATABASE_HOST,
        database: INVENTORY_DATABASE_NAME,
        password: INVENTORY_DATABASE_PASSWORD,
        port: INVENTORY_DATABASE_PORT,
    })
    try {
        await client.connect();
    } catch (error) {
        throw "Could not connect to database";
    }
    return client;
}

// TODO: Get 

// Add
async function _insertUploadSession(username, ipAddress, userAgent, projectNumber, subjectLabel, sessionLabel, dataType, startTime) {
    var client;
    var uploadSessionId;
    try {
        client = await connect()
    } catch (error) {
        throw "Could not connect to database";
    }
    try {
        const result = await client.query(`INSERT INTO uploadsession(username, ip_address, user_agent, project_number, subject_label, session_label, data_type, start_time) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;`, [username, ipAddress, userAgent, projectNumber, subjectLabel, sessionLabel, dataType, startTime]);
        uploadSessionId = result.rows[0].id;
    } catch (error) {
        throw "Could not insert row to database table uploadsession";
    }
    try {
        await client.end();
    } catch (error) {
        throw "Could not disconnect database";
    }

    const insertUploadSessionResult = {
        "uploadSessionId": uploadSessionId,
        "username": username,
        "ipAddress": ipAddress,
        "projectNumber": projectNumber,
        "subjectLabel": subjectLabel,
        "sessionLabel": sessionLabel,
        "dataType": dataType,
        "startTime": startTime
    }
    return insertUploadSessionResult;
}

// Update
async function _updateUploadSession(uploadSessionId, endTime) {
    var client;

    try {
        client = await connect()
    } catch (error) {
        throw "Could not connect to database";
    }

    try {
        const result = await client.query(`UPDATE uploadsession SET end_time=($1) WHERE id=($2);`, [endTime, uploadSessionId]);
        if (result.rowCount === 0) {
            throw `uploadSessionId ${uploadSessionId} not found`;
        }
    } catch (error) {
        throw `Could not update row in database table uploadsession: ${error}`;
    }

    try {
        await client.end();
    } catch (error) {
        throw "Could not disconnect database";
    }

    const updateUploadSessionResult = {
        "uploadSessionId": uploadSessionId,
        "endTime": endTime
    }
    return updateUploadSessionResult;
}

module.exports.insertUploadSession = _insertUploadSession;
module.exports.updateUploadSession = _updateUploadSession;
