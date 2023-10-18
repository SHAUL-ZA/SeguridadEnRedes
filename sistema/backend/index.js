require('dotenv').config();
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
let cors = require('cors');
bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const https = require('https');
const fs = require('fs');

const { ObjectId } = require('mongodb');
const { Console } = require('console');
const { fileURLToPath } = require('url');

let db;
const app = express();
app.use(cors()); 
app.use(bodyParser.json()); // support json encoded bodies


//Funcion para entrar a la base de datos
async function connectDB(){
    let client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db("TicketsDB");
    console.log("Conectado a la base de datos");
    return db;
}


async function log(sujeto, accion, objeto){
    toLog={};
    toLog["timestamp"]=new Date();
    toLog["sujeto"]=sujeto;
    toLog["accion"]=accion;
    toLog["objeto"]=objeto;
    await db.collection("logs").insertOne(toLog);
}

app.get("/tickets", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        // console.log(verifiedToken.usuario);
        let authData = await db.collection("users").findOne({ "usuario": verifiedToken.usuario });//Por alguna razon esta busqueda requiere la contraseña hasheada
        // console.log("Bindex.js - authData: ", authData);
        // console.log("Bindex.js - authData.rol: ",authData.rol);
       

        let parametersFind = {};
        if (authData.rol === "coordinador_aula") {
            parametersFind["Propietario"] = authData.id;
        }
     
        if ("_sort" in req.query) {
            let sortBy = req.query._sort;
            let sortOrder = req.query._order == "ASC" ? 1 : -1;
            let start = Number(req.query._start);
            let end = Number(req.query._end);
          
            let sorter = {};
            sorter[sortBy] = sortOrder;
            if("id" in req.query){
                parametersFind["id"]=Number(req.query.id);
            }
            if("usuario" in req.query){
                parametersFind["usuario"]=req.query.usuario;
            }
            if("Estado" in req.query){
                parametersFind["Estado"]=req.query.Estado;
            }

            let data = await db.collection("tickets").find(parametersFind).sort(sorter).project({ _id: 0 }).toArray();
            res.set("Access-Control-Expose-Headers", "X-Total-Count");
            res.set("X-Total-Count", data.length);
            data = data.slice(start, end);
            res.json(data);
            // console.log("parametersFind: ", parametersFind);
        } else if ("id" in req.query) { //getMany
            let data = [];
            for (let index = 0; index < req.query.id.length; index++) {
                let dataObtain = await db.collection("tickets").find({ id: Number(req.query.id[index]) }).project({ _id: 0 }).toArray();
                data = await data.concat(dataObtain);
            }
            res.json(data);
        } else { //getManyReference
            let data = [];
            data = await db.collection("tickets").find(req.query).project({ _id: 0 }).toArray();
            res.set("Access-Control-Expose-Headers", "X-Total-Count");
            res.set("X-Total-Count", data.length);
            res.json(data);
        }
    } catch(error) {
        console.log(error)
        res.sendStatus(401);
    }
});

app.get("/getUser", async (req, res)=>{
    try{
        // Authenticate
        let token=req.get("Authentication");
        // console.log("tokennnnnnnnnn: ", token);
        let verifiedToken = await jwt.verify(token, "secretKey");
        // console.log("verifiedToken: ", verifiedToken);
        // Data extraction
        // console.log("verifiedToken.usuario: ", verifiedToken.usuario);
        let Data = await db.collection("users").findOne({"usuario": verifiedToken.usuario});
        // console.log("Bindex.js - getUser Data: ", Data);
        res.send(Data);
    } catch {
        res.sendStatus(401);
    }
})

//create
app.post("/tickets", async (req, res)=>{
    try{
        // Authentication
        let token=req.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        // Data extraction
        console.log(req.body);
        let addValue=req.body
        let data=await db.collection('tickets').find({}).toArray();
        let id=data.length+1;
        addValue["id"]=id;
        addValue["usuario"]=verifiedToken.usuario;
        // Insert the new ticket
        data=await db.collection('tickets').insertOne(addValue);
        res.json(data);
    }catch{
        res.sendStatus(401);
    }
}) 

//Get one
app.get("/tickets/:id", async (req, res)=>{
    try{
        let token=req.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData=await db.collection("users").findOne({"usuario": verifiedToken.usuario})
        let parametersFind={"id": Number(req.params.id)}
        let data=await db.collection('tickets').find(parametersFind).project({_id:0}).toArray();
        //console.log("Bindex-data: ", data);
        log(verifiedToken.usuario, "ver objeto", req.params.id)
        res.json(data[0]);
    }catch{
        res.sendStatus(401);
    }
})

//update
app.put("/tickets/:id", async (req, res)=>{
    console.log("req: ", req.body);

    let addValue=req.body
    addValue["id"]=Number(req.params.id);
    if(req.body.Estado == "Cerrado"){
        fechaActual = new Date().toISOString().split('T')[0];
        console.log("fechaActual: ", fechaActual);
        addValue["Fecha_de_cierre"]= fechaActual;
    }
    let data=await db.collection("tickets").updateOne({"id": addValue["id"]}, {"$set": addValue});
    data=await db.collection('tickets').find({"id": Number(req.params.id)}).project({_id:0, id:1}).toArray();
    res.json(data[0]);
})  


app.post("/registrarse", async(req, res)=>{
    let user=req.body.username;
    let pass=req.body.password;
    let fname=req.body.fullName;
    let rol = req.body.rol;
    let lugar = req.body.lugar;
    // console.log(req.body) 
    let data= await db.collection("users").findOne({"user": user});
    let dataSearch= await db.collection("users").find({}).toArray();
    if(data==null){
        try{
            bcrypt.genSalt(10, (error, salt)=>{
                bcrypt.hash(pass, salt, async(error, hash)=>{
                    let usuarioAgregar={"usuario": user, "password": hash, "fullName": fname, "rol": rol, "lugar": lugar,  id: dataSearch.length+1};
                    data= await db.collection("users").insertOne(usuarioAgregar);
                    res.sendStatus(201);
                })
            })
        }catch{
            res.sendStatus(401);
        }
    }else{
        res.sendStatus(401)
    }
})


app.post("/login", async(req, res)=>{
    // console.log(req.body);
    let user=req.body.username;
    let pass=req.body.password;
    let data= await db.collection("users").findOne({"usuario": user});
    // console.log(user);
    // console.log(data);  
    if(data==null){
        res.sendStatus(401);
    }else{
        bcrypt.compare(pass, data.password, (error, result)=>{
            if(result){
                let token=jwt.sign({usuario: data.usuario}, "secretKey", {expiresIn: "3h"});
                log(user, "login", "");
                // console.log(token);
                // console.log(data.id);
                res.json({"token": token, "id": data.id, "usuario": data.usuario})
            }else{
                res.sendStatus(401)
            }
        })
    }
})

//delete
// app.delete("/tickets/:id", async (req, res)=>{
//     try{
//         let token=req.get("Authentication");
//         let verifiedToken = await jwt.verify(token, "secretKey");
//         let data=await db.collection('tickets').deleteOne({"id": Number(req.params.id)});
//         res.json(data);
//     }catch{
//         res.sendStatus(401);
//     }
// })

// app.listen(1337, ()=>{
//     connectDB();
//     console.log("Servidor escuchando en puerto 1337")
// })

// Cambiarlo a https
https.createServer({cert: fs.readFileSync("backend.cer"), key: fs.readFileSync("backend.key")}, app).listen(1337, ()=>{
    connectDB();
    console.log("Servidor escuchando en puerto 1337")
})