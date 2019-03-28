const config = require("./config");
const AWS = require("aws-sdk");

let kinesis = new AWS.Kinesis({
    apiVersion: "2013-12-02",
    region: "us-east-1"
});
/*
class Base {
    getRecords(shard) {
        kinesis.getShardIterator({
            ShardId: shard.ShardId,
            ShardIteratorType: "TRIM_HORIZON",
            StreamName: config.kinesis.streamName
        }, (err, shardIteratorData) => {
            if (err) console.log(err, err.stack);
            else {
                console.log("**** shardIteratorData", shardIteratorData);

                kinesis.getRecords({
                    ShardIterator: shardIteratorData.ShardIterator
                }, (err, recordsData) => {
                    if (err) console.log(err, err.stack);
                    else {
                        console.log("recordsData", recordsData);
                    }
                });
            }
        });
    }
}
*/
(async () => {
    try {
        /*kinesis.putRecord({
            Data: '{"action": "click", "productId": "product-123", "Probando": "ando"}',
            PartitionKey: config.kinesis.partitionKey,
            StreamName: config.kinesis.streamName
        }, function (err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
            } else {
                console.log(data); // successful response
            }
        });*/
        kinesis.describeStream({
            StreamName: config.kinesis.streamName
        }, (err, streamData) => {
            if (err) console.log(err, err.stack);
            else {
                console.log("**** streamData", streamData);
                console.log("streamData.StreamDescription.Shards", JSON.stringify(streamData.StreamDescription.Shards));

                streamData.StreamDescription.Shards.forEach(shard => {

                    kinesis.getShardIterator({
                        ShardId: shard.ShardId,
                        ShardIteratorType: "AT_SEQUENCE_NUMBER",
                        StreamName: config.kinesis.streamName,
                        StartingSequenceNumber: "49593293221786655550236802004103412906377425557158625282"
                    }, (err, shardIteratorData) => {
                        if (err) console.log(err, err.stack);
                        else {
                            console.log("**** shardIteratorData", shardIteratorData);

                            kinesis.getRecords({
                                ShardIterator: shardIteratorData.ShardIterator
                            }, (err, recordsData) => {
                                if (err) console.log(err, err.stack);
                                else {
                                    console.log("**** recordsData", recordsData);
                                }
                            });
                        }
                    });

                });
            }
        });
    } catch (error) {
        console.error(error);
    }
})();



