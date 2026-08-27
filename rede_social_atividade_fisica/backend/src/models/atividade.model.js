import sequelize from '../database/database.js';
import { DataTypes } from 'sequelize';

const Atividade = sequelize.define('Atividades',
    {
        atividadeId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tipo_atividade: {
            type: DataTypes.ENUM('caminhada', 'corrida', 'trilha'),
            allowNull: false
        },
        distancia_percorrida: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        duracao_atividade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantidade_calorias: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },{
        tableName: 'atividades',
        timestamps: true
    }
)

export default Atividade;