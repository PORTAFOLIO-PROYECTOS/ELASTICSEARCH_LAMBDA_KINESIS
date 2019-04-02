"use strict";
const kinesis = require("./app/utils/kinesis");
const elasticSearch = require("./app/utils/elasticSearch");

(async () => {
    try {
        let clsKinesis = new kinesis();

        let describeStream = await clsKinesis.describeStream();
        //console.log(describeStream);
        let shardId = describeStream.StreamDescription.Shards[0].ShardId;
        //console.log("shardId", shardId);
        let getShardIterator = await clsKinesis.getShardIterator(shardId);
        //console.log(getShardIterator);
        let iterator = getShardIterator.ShardIterator;
        //
        let bucle = true;

        while (bucle) {
            console.log("************************");
            let getRecords = await clsKinesis.getRecords(iterator);
            console.log("TAMAÑO", getRecords.Records.length);
            if (getRecords.Records) {
                for (const key in getRecords.Records) {
                    const element = getRecords.Records[key];
                    let payload = new Buffer(element.Data, 'base64').toString('ascii');
                    console.log('------- records.Data:', payload);
                }
            }

            iterator = getRecords.NextShardIterator;
            if (!iterator) bucle = false;
        }
    } catch (error) {
        console.error(error);
    }
})();



