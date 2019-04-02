const config = require("../../config");
const AWS = require("aws-sdk");

module.exports = class Kineses {

    setNewInstance(){
        return new AWS.Kinesis({
            //apiVersion: "2013-12-02",
            region: "us-east-1",
            params: { StreamName: config.kinesis.streamName }
        });
    }

    async describeStream() {
        let kinesis = this.setNewInstance();
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
        let kinesis = this.setNewInstance();
        return new Promise((resolve, reject) => {
            let params = {
                ShardId: shardId,
                StreamName: config.kinesis.streamName,
                ShardIteratorType: "AT_TIMESTAMP",
                Timestamp: new Date("2019-04-02 14:50:00")
            }

            kinesis.getShardIterator(params, (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        });
    }

    async getRecords(iterator) {
        let kinesis = this.setNewInstance();
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