require('dotenv').config();
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
let cors = require('cors');
bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ObjectId } = require('mongodb');

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

app.get("/tickets", async (request, response) => {
    try {
        let token = request.get("Authentication");
        if (!token) {
            response.sendStatus(401);
            return;
        }
        let verifiedToken = await jwt.verify(token, "secretKey");
       

        let parametersFind = {};
        if(authData.permissions=="admin"){
            parametersFind["usuario"]=verifiedToken.usuario; //
        }
        // if (authData. === "coordinador_aula") {
        //     parametersFind["id"] = authData.id;
        // } else if (authData.rol === "coordinador_nacional") {
        //     parametersFind["lugar"] = authData.lugar;
        // }
        if ("_sort" in request.query) {
            let sortBy = request.query._sort;
            let sortOrder = request.query._order == "ASC" ? 1 : -1;
            let start = Number(request.query._start);
            let end = Number(request.query._end);
            let sorter = {};
            sorter[sortBy] = sortOrder;
            let data = await db.collection("tickets").find(parametersFind).sort(sorter).project({ _id: 0 }).toArray();
            response.set("Access-Control-Expose-Headers", "X-Total-Count");
            response.set("X-Total-Count", data.length);
            data = data.slice(start, end);
            response.json(data);
        } else if ("id" in request.query) {
            let data = [];
            for (let index = 0; index < request.query.id.length; index++) {
                let dataObtain = await db.collection("tickets").find({ id: Number(request.query.id[index]) }).project({ _id: 0 }).toArray();
                data = await data.concat(dataObtain);
            }
            response.json(data);
        } else {
            let data = [];
            data = await db.collection("tickets").find(request.query).project({ _id: 0 }).toArray();
            response.set("Access-Control-Expose-Headers", "X-Total-Count");
            response.set("X-Total-Count", data.length);
            response.json(data);
        }
    } catch {
        response.sendStatus(401);
    }
});




app.post("tickets/create", async (req, res) => {
    try {

        // Send a success response with the ID of the new ticket
        res.status(200).json({ id: newTicket.insertedId });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    //-----------------------------------------------------------------------
    // User authentication


    // Data extraction
    let { aula, anio, titulo, descripcion, propietario_id, clasificacion, tipo_de_incidencia, prioridad, estado, proceso, resolucion } = req.body;
    let FechaDeInicio = new Date();
    let FechaDeCierre = null;

    // Retrieve the value associated with 'aula' from the MongoDB document
    const query = { _id: new ObjectId("6520acd74d3a749b59890ad5") };
    const projection = { _id: 0, [`next_id.${aula}`]: 1 };

    let next_idObj = await db.collection('tickets').findOne(query, projection);
    console.log(next_idObj);
    console.log(aula);
    console.log(next_idObj.next_id.Ciudad_de_Mexico);
    console.log(next_idObj.next_id[aula]);
    console.log(next_idObj.next_id.aula);

    if (next_idObj && next_idObj.next_id[aula] !== undefined) {
        let next_id = next_idObj.next_id[aula]; // Extract the value

        // Update the next_id for the specified 'aula'
        next_idObj = {};
        next_idObj[`next_id.${aula}`] = next_id + 1;

        // Update the value in the MongoDB document
        await db.collection('tickets').updateOne(query, { $set: next_idObj });

        // Insert the new ticket
        const newTicket = await db.collection('tickets').insertOne({
            aula,
            anio,
            id: next_id,
            titulo,
            descripcion,
            propietario_id,
            clasificacion,
            tipo_de_incidencia,
            prioridad,
            estado,
            proceso,
            resolucion,
            FechaDeInicio: FechaDeInicio,
            FechaDeCierre
        });

        // Send a success response with the ID of the new ticket
        res.status(200).json({ id: newTicket.insertedId });
    } else {
        console.error("Document not found or 'next_id' not present for 'aula'.");
        return res.status(404).json({ error: "Document not found or 'next_id' not present for 'aula'" });
    }
    

});

//Get one
app.get("/tickets/:id", async (req, res)=>{
    try{
        let token=req.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData=await db.collection("users").findOne({"nombre": verifiedToken.usuario})
        let parametersFind={"id": Number(req.params.id)}
        if(authData.permissions=="2"){ //Si es un usuario coordinador nacinal es 2
            parametersFind["users"]=verifiedToken.usuario;
        }
        let data=await db.collection('tickets').find(parametersFind).project({_id:0}).toArray();
        log(verifiedToken.usuario, "ver objeto", req.params.id)
        res.json(data[0]);
    }catch{
        res.sendStatus(401);
    }
})

//create
app.post("/tickets", async (req, res)=>{
    try{
        let token=req.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let addValue=req.body
        let data=await db.collection('tickets').find({}).toArray();
        let id=data.length+1;
        addValue["id"]=id;
        addValue["usuario"]=verifiedToken.usuario;
        data=await db.collection('tickets').insertOne(addValue);
        res.json(data);
    }catch{
        res.sendStatus(401);
    }
}) 


//update
app.put("/tickets/:id", async (req, res)=>{
    try{
        let token=req.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        console.log(verifiedToken);
        if(!verifiedToken){
            res.sendStatus(401);
        }
        //let dataaauth
        let addValue=req.body
        addValue["id"]=Number(req.params.id);
        let data=await db.collection("tickets").updateOne({"id": addValue["id"]}, {"$set": addValue});
        data=await db.collection('tickets').find({"id": Number(req.params.id)}).project({_id:0, id:1, nombre:1, materia:1}).toArray();
        res.json(data[0]);
    }catch{
        res.sendStatus(401);
    }
})  


app.post("/registrarse", async(req, res)=>{
    let user=req.body.username;
    let pass=req.body.password;
    let fname=req.body.fullName;
    let rol = req.body.rol;
    let lugar = req.body.lugar;
    console.log(req.body) 
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
    console.log(req.body);
    let user=req.body.username;
    let pass=req.body.password;
    let data= await db.collection("users").findOne({"usuario": user});
    console.log(user);
    console.log(data);  
    if(data==null){
        res.sendStatus(401);
    }else{
        bcrypt.compare(pass, data.password, (error, result)=>{
            if(result){
                let token=jwt.sign({usuario: data.usuario}, "secretKey", {expiresIn: "2h"});
                log(user, "login", "");
                console.log(token);
                console.log(data.id);
                res.json({"token": token, "id": data.id, "usuario": data.usuario})
            }else{
                res.sendStatus(401)
            }
        })
    }
})


//delete
app.delete("/tickets/:id", async (req, res)=>{
    try{
        let token=req.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let data=await db.collection('tickets').deleteOne({"id": Number(req.params.id)});
        res.json(data);
    }catch{
        res.sendStatus(401);
    }
})

app.listen(1337, ()=>{
    connectDB();
    console.log("Servidor escuchando en puerto 1337")
})
