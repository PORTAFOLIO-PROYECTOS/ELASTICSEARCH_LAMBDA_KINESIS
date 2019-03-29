"use strict";

const AWS = require("aws-sdk");
const kinesis = new AWS.Kinesis({
    apiVersion: "2013-12-02",
    region: "us-east-1"
});

module.exports = class Base {
    async describeStream(streamName){
        return new Promise((resolve, reject) => {
            
        });

    } 
}