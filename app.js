const config = require("./config");
const aws = require("aws-sdk");

let kinesis = new aws.Kinesis({
    apiVersion: "2013-12-02",
    region: "us-east-1"
});

(async () => {
    try {
        kinesis.describeStream({
            StreamName: config.kinesis.streamName
        }, (err, streamData) => {
            if (err) console.log(err, err.stack);
            else{
                console.log("streamData", streamData);

                streamData.StreamDescription.Shards.forEach(shard => {
                    kinesis.getShardIterator({
                        ShardId: shard.ShardId,
                        ShardIteratorType: "TRIM_HORIZON",
                        StreamName: config.kinesis.streamName
                    }, (err, shardIteratorData) => {
                        if (err) console.log(err, err.stack);
                        else{
                            console.log("shardIteratorData", shardIteratorData);
                            
                            kinesis.getRecords({
                                ShardIterator: shardIteratorData.ShardIterator
                            }, (err, recordsData) => {
                                if (err) console.log(err, err.stack);
                                else{
                                    console.log("recordsData", recordsData);
                                }
                            });
                        }
                    });
                });
            }
        })
    } catch (error) {
        console.error(error);
    }
})();



