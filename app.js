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

class Base {

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
                ShardIteratorType: "AT_TIMESTAMP",
                Timestamp: new Date("2019-04-01 00:00:00")
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

(async () => {
    try {
        let clsBase = new Base();

        let describeStream = await clsBase.describeStream();
        //console.log(describeStream);
        let shardId = describeStream.StreamDescription.Shards[0].ShardId;
        //console.log("shardId", shardId);
        let getShardIterator = await clsBase.getShardIterator(shardId);
        //console.log(getShardIterator);
        let iterator = getShardIterator.ShardIterator;
        //
        let bucle = true;

        while (bucle) {
            console.log("************************");
            let getRecords = await clsBase.getRecords(iterator);
            console.log("TAMAÑO", getRecords.Records.length);
            if (getRecords.Records) {
                for (const key in getRecords.Records) {
                    const element = getRecords.Records[key];
                    let payload = new Buffer(element.Data, 'base64').toString('ascii');
                    //console.log('------- records.Data:', payload);
                }
            }

            iterator = getRecords.NextShardIterator;
            if (!iterator) bucle = false;
        }
    } catch (error) {
        console.error(error);
    }
})();



