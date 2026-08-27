import Usuario from './usuario.model.js';
import Atividade from './atividade.model.js';
import Comentario from './comentario.model.js';
import Curtida from './curtida.model.js';

// Usuario <-> Atividade
Usuario.hasMany(Atividade, {foreignKey: 'usuarioId'});
Atividade.belongsTo(Usuario, {foreignKey: 'usuarioId'});

// Usuario <-> Curtidas
Usuario.hasMany(Curtida, {foreignKey: 'usuarioId'});
Curtida.belongsTo(Usuario, {foreignKey: 'usuarioId'});

// Atividade <-> Curtida
Atividade.hasMany(Curtida, {foreignKey: 'atividadeId'});
Curtida.belongsTo(Atividade, {foreignKey: 'atividadeId'});

// Usuario <-> Comentario
Usuario.hasMany(Comentario, {foreignKey: 'usuarioId'});
Comentario.belongsTo(Usuario, {foreignKey: 'usuarioId'});

// Atividade <-> Comentario
Atividade.hasMany(Comentario, {foreignKey: 'atividadeId'});
Comentario.belongsTo(Atividade, {foreignKey: 'atividadeId'});

export {Usuario, Atividade, Comentario, Curtida};