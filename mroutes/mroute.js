var express = require('express');
var route = express.Router();
var companies = require('../schema/schema');
var logger= require("../logger");
var emitter= require("../events/eventhub");
route.get('/companies/:name',function(request,reponse){
    let name = request.params.name;
    companies.find({name:name},function(err,data){
        if(err)
        response.json({});
        else 
        reponse.json(data);
    });
});
//
route.get("/cnames/:pattern",function(request,reponse){
companies.find({name:{$regex:request.params.pattern,$options:'i'}},{_id:0,name:1},
function(err,data){
    if(err)
    reponse.json([]);
    if(data.length>=50)
    emitter.emit("more",data.length);
    reponse.json(data);

});
});

route.put("/empcount/:name",function(request,response){
    let cname =request.params.name;
    companies.update({name:cname},{$set:request.body},function(err,data){
        if(err)
        response.send({result:"Not Updated"});
        emitter.emit('update',cname);
        response.send({result:"successfully Updated"});
    });
});


module.exports=route;