import sequelize from '../database/database.js';
import { DataTypes } from 'sequelize';

const Atividade = sequelize.define('Atividades',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        tipo_atividade: {
            type: DataTypes.ENUM('Caminhada', 'Corrida', 'Trilha'),
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
        timeStamps: true
    }
)

export default Atividade;

/*
id,
tipo_atividade,
distancia_percorrida,
duracao_atividade,
quantidade_calorias,
createdAt,
updatedAt,
usuario_id
*/