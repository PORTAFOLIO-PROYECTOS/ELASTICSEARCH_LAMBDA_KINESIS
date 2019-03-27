const config = {
    name: "Buscador.ChangeStreamProducto",
    ambiente: "QA",
    paisActual: "PE",
    // aws: {
    //     accessKeyId: "AKIAJCBNUY6ALCNRBJ3Q",
    //     secretAccessKey: "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"
    // },
    kinesis: {
        partitionKey: "somosbelcorp-sbbuscador-producto-qa",
        streamName: "somosbelcorp-sbbuscador-producto-qa"
    }
}

module.exports = config;