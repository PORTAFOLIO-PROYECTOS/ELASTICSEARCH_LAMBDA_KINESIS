const config = require("../config");
const ESCliente = require("elasticsearch");

const ES = new ESCliente.Client({
    host: config.elasticSearch.url
});

module.exports = class ElasticSearch{
    async update(){

    }
}