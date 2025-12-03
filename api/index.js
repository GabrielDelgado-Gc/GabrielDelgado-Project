import { createServer } from 'http';

import express from 'express'
const app = express();

// Import Models
import Heroi from "../models/herois.js";
import Itens from "../models/itens.js";
import Lanes from "../models/lanes.js";
import Roshan from "../models/roshan.js";

// Chama o Multer
import multer from 'multer';

const storage = multer.memoryStorage()
const upload = multer({ storage })


app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')


//Liberar acesso a pasta public
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Converte o caminho do arquivo atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('views', __dirname + '/../views')
app.use(express.static(process.cwd() + '/public'))

// Rotas
app.get('/', (req, res) => {
    res.render("index")
})

// Heróis
app.get('/herois/lst', async (req, res) => {
    const heroi = await Heroi.find()

    res.render("herois/lst", {heroi})
})


app.post("/herois/lst", async (req,res) => {
 const pesquisa = await req.body.pesquisa
    
      const heroi = await Heroi.find({
        $or: [
       { nome: { $regex: pesquisa, $options: "i" } },
       { elemento: {$regex: pesquisa, $options: "i" } },
       { posicao: {$regex: pesquisa, $options: "i"} },
       { habilidades: {$regex: pesquisa}}
        ]
    });


    res.render("herois/lst", {heroi: heroi})
})

app.get('/herois/add', (req, res) => {
    res.render("herois/add")
})

app.post('/herois/add/ok', upload.single("image"), async   (req, res) => {
     //await Heroi.create(req.body)
     // Para gravar no banco com a imagem é necessario mandar um a um
   
     await Heroi.create({
      nome: req.body.nome,
      elemento: req.body.elemento,
      posicao: req.body.posicao,
      habilidades: req.body.habilidades,
      image: req.file.buffer
     })

    const nome = req.body.nome;
    const elemento = req.body.elemento;
    const posicao = req.body.posicao;
    const habilidades = req.body.habilidades;
    const image = req.file.buffer; // multer salva em req.file
     
    res.render("herois/addok", {nome, elemento, posicao, habilidades, image})
})

app.get("/herois/del/:id", async (req,res)=>{
    const id = req.params.id

    await Heroi.findByIdAndDelete(id)

   res.redirect("/herois/lst")
})

app.get("/herois/edit/:id", async (req,res)=>{
    const id = req.params.id
    
    const heroi = await Heroi.findById(id)

    res.render("herois/edit", {heroi})
})

app.post("/herois/edit/:id", upload.single("image"), async (req,res)=>{
    const id = req.params.id

    const updateData = {
    nome: req.body.nome,
    elemento: req.body.elemento,
    posicao: req.body.posicao,
    habilidades: req.body.habilidades,
     }

      if (req.file) {
    updateData.image = req.file.buffer; // só se o usuário enviou uma nova imagem
  }
    await Heroi.findByIdAndUpdate(id, updateData)

res.render("herois/editok")
})


// Itens 
app.get('/itens/lst', async (req, res) => {
         const itens = await Itens.find()
    res.render("itens/lst", { itens }) 
})

app.post("/itens/lst", async (req,res) => {
 const pesquisa = await req.body.pesquisa
    
      const itens = await Itens.find({
        $or: [
       { nomeIt: { $regex: pesquisa, $options: "i" } },
       { tipo: {$regex: pesquisa, $options: "i" } },
       { preco: {$regex: pesquisa, $options: "i"} },
       { efeito: {$regex: pesquisa}}
        ]
    });


    res.render("itens/lst", {itens: itens})
})

app.get('/itens/add', (req, res) => {
    res.render("itens/add")
})

app.post('/itens/add/ok', async(req, res) => {
    await Itens.create(req.body)
    const nome = req.body.nomeIt;
    res.render("itens/addok", { nome });
})

app.get("/itens/edit/:id", async (req,res)=>{
    const id = req.params.id
    
    const itens = await Itens.findById(id)

    res.render("itens/edit", {itens})
})

app.post("/itens/edit/:id", async (req,res)=>{
     const id = req.params.id
     const item = await Itens.findByIdAndUpdate(id, req.body)

res.render("itens/editok")
})


app.get("/itens/del/:id", async (req,res) =>{
const id = req.params.id

    await Itens.findByIdAndDelete(id)

   res.redirect("/itens/lst")
})

// Lanes 
app.get("/lanes/lst", async (req,res)=>{
    const lanes = await Lanes.find()
    res.render("lanes/lst", { lanes })
})

app.post("/lanes/lst", async (req,res) => {
 const pesquisa = await req.body.pesquisa
    
      const lanes = await Lanes.find({
        $or: [
       { nomeLa: { $regex: pesquisa, $options: "i" } },
       { tipoDeLane: {$regex: pesquisa, $options: "i" } },
       { tipoDeFarm: {$regex: pesquisa, $options: "i"} },
       { heroisPresentes: {$regex: pesquisa}}
        ]
    });


    res.render("lanes/lst", {lanes: lanes})
})


app.get("/lanes/add", (req,res)=>{
    res.render("lanes/add")
})

app.post('/lanes/add/ok', async(req, res) => {
    await Lanes.create(req.body)
    const nome = req.body.nomeLa;
    res.render("lanes/addok", { nome });
})

app.get("/lanes/del/:id", async (req,res) => {
    const id = req.params.id

    await Lanes.findByIdAndDelete(id)

    res.redirect("/lanes/lst")

})

app.get("/lanes/edit/:id", async (req,res) => {
    const id = req.params.id
    
    const lane = await Lanes.findById(id)

    res.render("lanes/edit", {lane})

})

app.post("/lanes/edit/:id", async (req,res)=>{
     const id = req.params.id
     await Lanes.findByIdAndUpdate(id, req.body)

res.render("lanes/editok")
})



// Roshan
app.get("/roshan/lst", async (req,res)=>{
    const roshan = await Roshan.find()
    res.render("roshan/lst", { roshan })
})

app.get("/roshan/add", async (req,res)=>{
    res.render("roshan/add")
})

app.post('/roshan/add/ok', async(req, res) => {
    await Roshan.create(req.body)
    res.render("roshan/addok");
})

app.get("/roshan/del/:id", async (req,res) => {
    const id = req.params.id

    await Roshan.findByIdAndDelete(id)

    res.redirect("/roshan/lst")

})

app.get("/roshan/edit/:id", async (req,res) => {
    const id = req.params.id
    
    const roshan = await Roshan.findById(id)

    res.render("roshan/edit", {roshan})

})

app.post("/roshan/edit/:id", async (req,res)=>{
     const id = req.params.id
     await Roshan.findByIdAndUpdate(id, req.body)

res.render("roshan/editok")
})

app.post("/roshan/lst", async (req,res) => {
 const pesquisa = await req.body.pesquisa
    
      const roshan = await Roshan.find({
        $or: [
       { dano2: { $regex: pesquisa } },
       { local: {$regex: pesquisa, $options: "i" } },
       { vida2: {$regex: pesquisa} },
       { itensEspecial: {$regex: pesquisa}}
        ]
    });
//hhhhh3213

    res.render("roshan/lst", {roshan: roshan})
})

app.listen(3000, console.log("Rodando"))