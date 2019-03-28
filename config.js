const config = {
    name: "Buscador.ChangeStreamProducto",
    ambiente: "QA",
    paisActual: "PE",
    kinesis: {
        partitionKey: "somosbelcorp-sbbuscador-producto-qa",
        streamName: "somosbelcorp-sbbuscador-producto-qa"
    }
}

module.exports = config;