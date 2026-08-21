import Usuario from './usuario.model.js';
import Atividade from './atividade.model.js';

Usuario.hasMany('Atividade', {foreignKey: 'usuarioId'});
Atividade.belongsTo('Usuario', {foreignKey: 'usuarioId'});

export {Usuario, Atividade};