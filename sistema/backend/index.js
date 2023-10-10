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

app.get("/tickets", async (req, res) => {
    console.log("holaa paul inicial");
    console.log(req.get);
    try{
        let db = await connectDB();
        //console.log(data);
        let token=request.get("Authentication");
        //console.log(token);
        console.log("auth data");
        let verifiedToken = await jwt.verify(token, "secretKey");
        console.log(verifiedToken);
        let authData = await db.collection("users").findOne({"usuario": verifiedToken.usuario});
        console.log(authData.rol);
      
        let parameterFind = {};
        if(authData.rol == "coordinador_aula"){ 
            parameterFind["usuario"] = verifiedToken.usuario;
        }

        if("_sort" in req.query){
            let sortBy = req.query._sort;
            let sortOrder = req.query._order == "ASC" ? 1 : -1;
            let start = Number(req.query._start);
            let end = Number(req.query._end);
            let sorter = {};
            sorter[sortBy] = sortOrder;
            let data = await db.collection("tickets").find(parameterFind).sort(sorter).project({_id:0}).toArray();


            res.set("Access-Control-Expose-Headers", "X-Total-Count");
            res.set("X-Total-Count", data.length);
            data = data.slice(start, end);
            res.json(data);
        }
        else if("id" in req.query){
            let data = [];
            for(let i = 0; i < req.query.id.length; i++){
                let dataObtain=await db.collection('tickets').find({id: Number(req.query.id[index])}).project({_id:0}).toArray();
                data = await data.concat(dataObtain);
            }

            console.log(data);
            res.json(data);
        } 
        else{
            let data = [];
            data=await db.collection('tickets').find(req.query).project({_id:0}).toArray();
            res.set("Access-Control-Expose-Headers", "X-Total-Count");
            res.set("X-Total-Count", data.length);
            res.json(data);
        }      
    }catch{
        res.status(401); //Unauthorized
    }
});



app.post("/new_ticket", async (req, res) => {
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
        addValue["user"]=verifiedToken.usuario;
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
                res.json({"token": token, "id": data.usuario, "usuario": data.usuario})
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
