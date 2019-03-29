const config = require("./config");
const AWS = require("aws-sdk");

let kinesis = new AWS.Kinesis({
    //apiVersion: "2013-12-02",
    region: "us-east-1",
    params: { StreamName: config.kinesis.streamName }
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

        // see below for options
        var readable = require('kinesis-readable')(kinesis);

        readable
            // 'data' events will trigger for a set of records in the stream
            .on('data', function (records) {
                //console.log(records);
                for (const key in records) {
                    const element = records[key];
                    let payload = new Buffer(element.Data, 'base64').toString('ascii');
                    console.log('records.Data:', payload);
                }
            })
            // each time a records are passed downstream, the 'checkpoint' event will provide
            // the last sequence number that has been read
            .on('checkpoint', function (sequenceNumber) {
                console.log(sequenceNumber);
            })
            .on('error', function (err) {
                console.error(err);
            })
            .on('end', function () {
                console.log('all done!');
            });

        /*setTimeout(function () {
            readable.close();
        }, 2000);*/
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
        /*kinesis.describeStream({
            StreamName: config.kinesis.streamName
        }, (err, streamData) => {
            if (err) console.log(err, err.stack);
            else {
                console.log("**** streamData", streamData);
                console.log("streamData.StreamDescription.Shards", JSON.stringify(streamData.StreamDescription.Shards));

                streamData.StreamDescription.Shards.forEach(shard => {

                    kinesis.getShardIterator({
                        ShardId: shard.ShardId,
                        ShardIteratorType: "TRIM_HORIZON",
                        StreamName: config.kinesis.streamName
                    }, (err, shardIteratorData) => {
                        if (err) console.log(err, err.stack);
                        else {
                            console.log("**** shardIteratorData", shardIteratorData);
                            console.log("**** shardIteratorData", shardIteratorData);

                            kinesis.getRecords({
                                ShardIterator: shardIteratorData.ShardIterator,
                                Limit: 1000
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
        });*/
    } catch (error) {
        console.error(error);
    }
})();



