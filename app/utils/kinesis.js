const config = require("../../config");
const AWS = require("aws-sdk");
const kinesis = new AWS.Kinesis({
    //apiVersion: "2013-12-02",
    region: "us-east-1",
    params: { StreamName: config.kinesis.streamName }
});

module.exports = class Kineses {

    async describeStream() {
        return new Promise((resolve, reject) => {
            let paramsStream = {
                StreamName: config.kinesis.streamName
            }

            kinesis.describeStream(paramsStream, (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        });
    }

    async getShardIterator(shardId) {
        return new Promise((resolve, reject) => {
            let params = {
                ShardId: shardId,
                StreamName: config.kinesis.streamName,
                ShardIteratorType: "LATEST"
                //Timestamp: new Date("2019-04-01 00:00:00")
            }

            kinesis.getShardIterator(params, (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        });
    }

    async getRecords(iterator) {
        return new Promise((resolve, reject) => {
            let paramsRecords = {
                ShardIterator: iterator
            }

            kinesis.getRecords(paramsRecords, (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        });
    }
}