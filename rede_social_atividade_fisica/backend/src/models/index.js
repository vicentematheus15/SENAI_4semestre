import {Usuario} from "./usuarios.model.js";
import {Atividade} from "./atividades.model.js";

Usuario.hasMany('Atividade', {foreignKey: 'usuarioId'});
Atividade.belongsTo('Usuario', {foreignKey: 'usuarioId'});

export {Usuario, Aluno}