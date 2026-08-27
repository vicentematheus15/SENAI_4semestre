import sequelize from "../database/database.js";
import { DataTypes } from "sequelize";

const Comentario = sequelize.define('Comentarios',
    {
        comentarioId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        texto: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        atividadeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'comentarios',
        timestamps: true
    }
)

export default Comentario;