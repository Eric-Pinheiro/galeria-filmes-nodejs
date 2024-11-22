import express from "express";
import multer from "multer";
const app = express();
import connection from "./Config/sequelize-config.js";
import Galeria from "./Model/Filmes.js";


// tentando conectar no banco
connection.authenticate().then(()=>{
    console.log("Conexão realizada com sucesso");
}).catch((error)=>{
    console.log(error)
});

// criação do banco
connection.query(`create database if not exists cinemaGaleria;`).then(()=>{
    console.log("O banco foi criado com sucesso")
}).catch((error)=>{
    console.log(error)
})

app.use(express.static('public'))
app.set('view engine', 'ejs')
const upload = multer({dest: "public/uploads/"})

// rota index
app.get("/", (req,res)=>{
    Galeria.findAll().then(imagens=>{
        res.render("index", {
            imagens:imagens
        })
    })
})

//upload dos dados do formulario
app.post("/upload",upload.single("file"), (req,res)=>{
    const file = req.file.filename;
    const titulo = req.body.titulo;
    const ano = req.body.ano;
    Galeria.create({
    file:file,
    titulo:titulo,
    ano:ano,
    })
    res.redirect("/");
    })

// ligando a porta 8080
    app.listen(8080,(error)=> {
    if(error){
        console.log(`Ocorreu um erro ${error}`)
    } else {
        console.log(`http://localhost:8080`)
    }
    })