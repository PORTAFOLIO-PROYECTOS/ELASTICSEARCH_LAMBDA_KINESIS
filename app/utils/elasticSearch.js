const config = require("../../config");
const ESCliente = require("elasticsearch");

const client = new ESCliente.Client({
    host: config.elasticSearch.url
});

module.exports = class ElasticSearch {

    getNameIndex(data) {
        let prefijo = config.elasticSearch.index;
        let pais = config.paisActual;
        return `${prefijo}_${pais}_${data.codigoCampania}`;
    }

    async update(data) {
        let index = this.getNameIndex(data);
        let params = {
            index,
            type: "_doc",
            body
        }

        return new Promise((resolve, reject) => {
            client.updateByQuery(params, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }
}