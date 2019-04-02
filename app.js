"use strict";
const _kinesis = require("./app/utils/Kinesis");
const _estrategia = require("./app/estrategia/EstrategiaService");

(async () => {
    try {
        let kinesis = new _kinesis();
        let estrategia = new _estrategia();

        let describeStream = await kinesis.describeStream();
        let shardId = describeStream.StreamDescription.Shards[0].ShardId;
        let getShardIterator = await kinesis.getShardIterator(shardId);
        let iterator = getShardIterator.ShardIterator;
        let bucle = true;

        while (bucle) {
            let getRecords = await kinesis.getRecords(iterator);
            if (getRecords.Records) {
                let response = await estrategia.ejecutar(getRecords.Records);
                console.log("response", response);
            }
            iterator = getRecords.NextShardIterator;
            if (!iterator) bucle = false;
        }
    } catch (error) {
        console.error(error);
    }
})();



