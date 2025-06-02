const { faker } = require('@faker-js/faker');
const mysql=require("mysql2");
const express=require("express");
const app=express();
const port=8080;
const path=require("path");
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
const { v4: uuidv4 } = require('uuid');
 const methodOverride=require("method-override");
app.use(methodOverride("_method"));

const connection =  mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'ashu',
  password:'830774'
});

app.listen(port,(req,res)=>{
  console.log("server start by port",port);
});

app.get("/",(req,res)=>{
  let q="select count(*) from persons";
  try{
connection.query(q,(err,result)=>{
    if(err) throw err;
    let count=result[0]["count(*)"];
    res.render("home.ejs",{count});
});
}catch(err){
    console.log(err);
}


});
app.get("/users",(req,res)=>{
let q="select * from persons";
try{
connection.query(q,(err,result)=>{
    if(err) throw err;
    let infos=result;
    res.render("info.ejs",{infos});

});
}catch(err){
    console.log(err);
    res.send("error in db");
}



});
app.get("/users/:id/edit",(req,res)=>{
  let {id}=req.params;
  console.log(id);
let q=`select *from persons where id='${id}'`;
try{
connection.query(q,(err,result)=>{
    if(err) throw err;
    let usr=result[0];
    res.render("edit.ejs",{usr});
 });
}catch(err){
    console.log(err);
}


});
app.patch("/users/:id",(req,res)=>{
  let {id}=req.params
let {username}=req.body;
let q=`update persons set name='${username}' where id='${id}' `;
 try{
connection.query(q,(err,result)=>{
    if(err) throw err;
    res.redirect("/users");
    
})
}catch(err){
    console.log(err);

}});

// try{
// connection.query(q,[data],(err,result)=>{
//     if(err) throw err;
// });
// }catch(err){
//     console.log(err);
// }
// connection.end();


