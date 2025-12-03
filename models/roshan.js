import { trusted } from "mongoose"
import conexao from "../coonfig/conexao.js"

const RoshanSchema = conexao.Schema ({
 dano: {
    type: Number,
    required: true
 },
 local: {
    type: String,
    required: true
 },
 vida: {
    type: Number,
    required: true
 },
 itensEspecial: {
    type: String,
    required: true
 }
})

const Roshan = conexao.model("Roshan", RoshanSchema)

export default Roshan