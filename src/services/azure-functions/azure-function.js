'use strict';
const path = require('path');
const express = require ('express');
let fs = require('fs');
const CloudLocal = require ('./../azure/cloud-local');

let localPath = "/api/HttpTriggerJS/";

let filePath = (process.argv[3]);
let root = require('../../example/azure-function');
//let root = require('../../example/azure-function'+filePath);

let pathToFunction = './src/example/azure-function';

const EXTENTION = '.js';
let fileList;  
let contents;

class AzureFunction extends CloudLocal {
  
  init() {
    this.port = 9574;
    this.app.use(express.static(__dirname + './../../assets'));

    this.app.get('/', (req, res) => {
       res.sendFile(path.join(__dirname)+ '/azure-func-home.html')
    });

   // fs.readdir(pathToFunction, function(err, files){

      // fileList = files.filter(function(file) { 
      //     return path.extname(file) === EXTENTION;
      //   })
     // fileList.forEach(function(file) { 
        // fs.readFile(pathToFunction+'/'+filePath, function(err, data) { 
        //   if (err){
        //     throw err;
        //   }
        //   contents = data.toString('utf8');
        //   //  console.log("FileList:"+ fileList+"\n\nContent \n"+ contents);            
        //   }); 
     //   });
     // }); 

   //   function inspectFilter(fileList){
     //   console.log(fileList)
      //}

    this.app.get(localPath, (req, res) => {
        root(req, res); 
    });
  }
}
module.exports = AzureFunction;
