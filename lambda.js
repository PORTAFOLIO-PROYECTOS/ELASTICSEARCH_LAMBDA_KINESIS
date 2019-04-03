"use strict";

const _estrategia = require("./app/estrategia/EstrategiaService");

exports.handler = async (event, context) => {
    try {
        let estrategia = new _estrategia();
        await estrategia.ejecutar(event.Records);
    } catch (error) {
        console.error("Lambda", error);
    }
};