import { trusted } from "mongoose"
import conexao from "../coonfig/conexao.js"

const ItensSchema = conexao.Schema ({
 nomeIt: {
    type: String,
    required: true
 },
 tipo: {
    type: String,
    required: true
 },
 preco: {
    type: String,
    required: true
 },
 efeito: {
    type: String,
    required: true
 }
})

const Item = conexao.model("Item", ItensSchema)

export default Item