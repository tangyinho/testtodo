'use strict'
var getRawBody = require('raw-body');
var getFormBody = require('body/form');
var body = require('body');
const todoList = require('./todoList.js')

module.exports.handler = function(req, resp, context) {
    
    resp.setHeader('content-type', 'application/json')
    var uri = (req.url).split('/')
    if(uri.length == 0) {
        resp.send(JSON.stringify({'code': 400, 'body': 'Bad Request'}, null, ''))
    }else{
        var route = uri[uri.length -1]
        if(route == ""){
            switch(req.method){
                case 'POST':
                    getRawBody(req, function(err, body){
                        const mybody = JSON.parse(body.toString())
                        //console.log(mybody)
                        todoList.add(resp, mybody)
                    })
                    //resp.send(JSON.stringify({'code': 200, 'body': 'Call Add item function'}))
                    break;
                
                case 'DELETE':
                    getRawBody(req, function(err, body){
                        const mybody = JSON.parse(body.toString())
                        todoList.remove(resp, mybody)
                    })
                    //resp.send(JSON.stringify({'code': 200, 'body': 'Call Delete item function'}))
                    break;

                case 'GET':
                    getRawBody(req, function(err, body){
                        const mybody = JSON.parse(body.toString())
                        todoList.list(resp)
                    })
                    //resp.send(JSON.stringify({'code': 200, 'body': 'List All item function'}))
                    break;

                default:
                    resp.send(JSON.stringify({
                        'code': 400, 
                        'body': 'Bad Request'
                    }, null, ''))
                    break;
            }
        }
    }
}
