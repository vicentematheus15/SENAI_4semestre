import sequelize from "../database/database.js";
import { DataTypes } from "sequelize";

const Usuario = sequelize.define('Usuarios',
    {
        usuarioId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        nome_usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        imagem: {
            type: DataTypes.STRING,
            allowNull: true
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
        {
            tableName: 'usuarios',
            timeStamps: true
        }
)

export default Usuario;