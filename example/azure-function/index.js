var request = require('request');
var uuidV4 = require('uuid/v4');

const FACE_API_ENDPOINT = 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect';
const FACE_API_KEY = '<YOUR_FACE_API_KEY>';

/**
 * Analyze the avatar with Microsoft Cognitive Services Face API.
 * 
 * @param {binary} image The binary data of the uploaded avatar.
 * @param {function} callback The callback function the handle the response of Microsoft Cognitive Services API.
 */
function analyzeFace(image, callback) {
    var postOpt = {
        url: FACE_API_ENDPOINT + "?returnFaceAttributes=gender,age",
        body: image,
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': FACE_API_KEY
        }
    };
    request(postOpt, callback);
}

module.exports = function (context, avatar, filename) {

    context.bindings.faceTable = [];

    analyzeFace(avatar, function(error, response, body){
        if (error === null) {
            var faces = JSON.parse(body);
            for (var i = 0; i < faces.length; ++i) {
                var face = faces[i];
                context.bindings.faceTable.push({
                    "PartitionKey": "AvatarImage",
                    "RowKey": uuidV4(),
                    "Gender": face.faceAttributes.gender,
                    "Age": face.faceAttributes.age
                });
            }
        }
        context.done();
    });

};