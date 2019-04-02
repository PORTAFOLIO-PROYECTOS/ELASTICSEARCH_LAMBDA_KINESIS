"use strict";

const elasticsearch = require("../utils/elasticSearch");

module.exports = class EstrategiaService {
    async ejecutar(record) {
        for (const key in record) {
            const element = record[key];
            let jsonData = JSON.parse(new Buffer(element.Data, "base64").toString("ascii"));
            console.log("---- ", jsonData.descripcion);
            let campania = jsonData.codigoCampania;
            let query = {
                
            }

        }
    }
}