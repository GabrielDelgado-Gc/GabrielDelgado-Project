import mongoose from "mongoose";

const url = "mongodb+srv://gabrieldelgadobg007_db_user:123@cluster0.phhrcbr.mongodb.net/?appName=Cluster0"

const conexao = await mongoose.connect(url)

export default conexao