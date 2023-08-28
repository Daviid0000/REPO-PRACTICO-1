
import { sequelize, DataTypes } from '../setting/database.js';


const usuario = sequelize.define('usuario', {
    
    id_user: {
        type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    
    userName: {
         type: DataTypes.STRING,
    allowNull: false
    },
    
    lastName: {
        type: DataTypes.STRING,
    allowNull: false
    },

    age: {
        type: DataTypes.INTEGER,
    allowNull: false
    },

    email: {
        type: DataTypes.STRING,
    allowNull: false
    },

    estadoUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    timestamps: false,
    tableName: 'usuario',
    
});

usuario.sync()

export {usuario}