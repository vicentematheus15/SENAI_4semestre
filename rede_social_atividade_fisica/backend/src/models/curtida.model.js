import sequelize from "../database/database.js";
import { DataTypes } from "sequelize";

const Curtida = sequelize.define('Curtida',
    {
        curtidaId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
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
        tablename: 'curtidas',
        timestamps: true,
        indexes: [
            {
                unique: true,
                filds: ['usuarioId', 'atividadeId']
            }
        ]
    }
)

export default Curtida; 