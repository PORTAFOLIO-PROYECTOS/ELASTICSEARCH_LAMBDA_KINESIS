const config = require("./config");
const AWS = require("aws-sdk");
const ESCliente = require("elasticsearch");

const ES = new ESCliente.Client({
    host: config.elasticSearch.url
});

const kinesis = new AWS.Kinesis({
    //apiVersion: "2013-12-02",
    region: "us-east-1",
    params: { StreamName: config.kinesis.streamName }
});


(async () => {
    try {

        // see below for options
        /*var readable = require('kinesis-readable')(kinesis);

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
            });*/

        kinesis.describeStream({ StreamName: config.kinesis.streamName }, (err, streamData) => {
            if (err) return console.log("error", err.stack);
            let shardId = streamData.StreamDescription.Shards[0].ShardId;

            if (!shardId) return console.error("Shard does not exist");

            let params = {
                ShardId: shardId,
                StreamName: config.kinesis.streamName,
                ShardIteratorType: "AT_SEQUENCE_NUMBER",
                StartingSequenceNumber: "49593293221786655550237029411129333670633979209767190530"
            }
            kinesis.getShardIterator(params, (err, shardIteratorData) => {
                if (err) return console.log("err", err.stack);
                console.log(shardIteratorData);

                let paramsRecords = {
                    ShardIterator: shardIteratorData.ShardIterator
                }

                kinesis.getRecords(paramsRecords, (err, records) => {
                    if (err) return console.log("err", err.stack);
                    //console.log("dataRecords", records);

                    for (const key in records) {
                        const element = records[key];
                        console.log("elemnto", element.length);
                        if (element) {
                            element.forEach(e => {
                                let payload = new Buffer(e.Data, 'base64').toString('ascii');
                                console.log("Data", payload);

                            });
                        }
                        //console.log('records.Data:', element.Data);
                    }

                })

            });
        });

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



