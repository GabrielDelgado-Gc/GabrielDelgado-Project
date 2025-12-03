import { trusted } from "mongoose"
import conexao from "../coonfig/conexao.js"

const LanesSchema = conexao.Schema ({
 nomeLa: {
    type: String,
    required: true
 },
 tipoDeLane: {
    type: String,
    required: true
 },
 tipoDeFarm: {
    type: String,
    required: true
 },
 heroisPresentes: {
    type: String,
    required: true
 }
})

const Lanes = conexao.model("Lane", LanesSchema)

export default Lanes