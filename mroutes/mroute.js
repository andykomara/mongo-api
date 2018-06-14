var express = require('express');
var route = express.Router();
var companies = require('../schema/schema');
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
    reponse.json(data);

});
});


module.exports=route;