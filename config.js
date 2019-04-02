const config = {
    name: "Buscador.ChangeStreamProducto",
    ambiente: "QA",
    paisActual: "PE",
    kinesis: {
        partitionKey: "somosbelcorp-sbbuscador-producto-qa",
        streamName: "somosbelcorp-sbbuscador-producto-qa"
    },
    elasticSearch: {
        url: "https://vpc-es-sbsearch-qa-6lqloaf2kfljixcaekbyqxu2aa.us-east-1.es.amazonaws.com",
        index: "producto_v2"
    }
}

module.exports = config;