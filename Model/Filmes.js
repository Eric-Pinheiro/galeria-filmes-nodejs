import connection from "../Config/sequelize-config.js";
import { Sequelize } from "sequelize";


const Imagem = connection.define('imagens', {
    file:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    titulo:{
        type: Sequelize.STRING,
        allowNull:false,
    }, 
    ano:{
        type: Sequelize.INTEGER,
        allowNull:false,
    }
})
Imagem.sync({force:false})
export default Imagem