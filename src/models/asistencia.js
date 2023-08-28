
import { sequelize, DataTypes } from '../setting/database.js';

const asistencia = sequelize.define('asistencia', {
    
    idGuest: {
        type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },

    userNameGuest: {
        type: DataTypes.STRING,
    allowNull: false
    },

    lastNameGuest: {
        type: DataTypes.STRING,
    allowNull: false
    },

    ageGuest: {
        type: DataTypes.INTEGER,
    allowNull: false
    },

    emailGuest:{
        type: DataTypes.STRING,
    allowNull: false
    },

    estado: {
        type: DataTypes.BOOLEAN,
    defaultValue: true
    },

}, {
    timestamps: false,
    tableName: 'asistencia',

});

asistencia.sync()

export {asistencia}