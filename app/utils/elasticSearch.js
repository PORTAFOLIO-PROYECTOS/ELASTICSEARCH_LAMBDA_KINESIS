const config = require("../../config");
const ESCliente = require("elasticsearch");

module.exports = class ElasticSearch {

    setNewInstance(){
        return new ESCliente.Client({
            host: config.elasticSearch.url
        });
    }

    getIndexName(campania) {
        let prefijo = config.elasticSearch.index;
        let pais = config.paisActual;
        return `${prefijo}_${pais}_${campania}`;
    }

    async update(campania, query, script) {
        let index = this.getIndexName(campania);
        let params = {
            index,
            type: "_doc",
            body: {
                query,
                script
            }
        }
        console.log("query", params);

        let client = this.setInstance();
        /*return new Promise((resolve, reject) => {
            client.updateByQuery(params, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });*/
    }
}