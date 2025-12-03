import { trusted } from "mongoose"
import conexao from "../coonfig/conexao.js"

const HeroisSchema = conexao.Schema ({
 nome: {
    type: String,
    required: true
 },
 elemento: {
    type: String,
    required: true
 },
 posicao: {
    type: String,
    required: true
 },
 habilidades: {
    type: String,
    required: true
 },
 image: {
   type: Buffer
 }
})

const Heroi = conexao.model("Heroi", HeroisSchema)

export default Heroi