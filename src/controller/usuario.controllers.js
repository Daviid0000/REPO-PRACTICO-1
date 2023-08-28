import  {usuario}  from '../models/usuario.js';
const usuarioCtrl = {}

usuarioCtrl.createUser = async (req, res) => {
    const { userName, lastName, age, email } = req.body;

    try {
        const existeUsuario = await usuario.findOne({
            where: {
                email: email
            }
        });

        if (existeUsuario) {
            throw ({
                status: 400,
                message: 'El usuario ya existe',
            })
        };

        const nuevoUsuario = new usuario({
            userName,
            lastName,
            age,
            email
        });


        const usuarioCreado = await nuevoUsuario.save();

        if (!usuarioCreado) {
            throw ({
                message: 'Error al crear el usuario',
            })
        }

        return res.status(201).json({
            message: 'Usuario creado exitosamente',
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message:'Error al crear el usuario' });
    }
};

usuarioCtrl.viewOneUser = async (req, res) => {
    const { id_user } = req.params;

    try {
        const User = await usuario.findByPk(id_user);

        if (!User) {
            throw ({
                status: 404, 
                message: 'No se ha encontrado el usuario' })
        }

        return res.json(User);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    };

};

usuarioCtrl.viewEvents = async (req, res) => {
    try {
        const User = await usuario.findAll({
            where: {
                estadoUser: true,
            }
        });

        if (!User) {
            throw ({
                status: 404,
                message: 'No se encontraron usuarios' });
        }

        return res.status(200).json(User);

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Error al obtener los usuarios' });
    }
};

usuarioCtrl.updateEvent = async (req, res) => {

    const { eventName, eventLocation, eventDateStart, eventDateEnd  } = req.body;


    try {

        const eventoActualizado = await evento.update({
            eventName,
            eventLocation,
            eventDateStart,
            eventDateEnd
        }, {
            where: {
                id_event: id_event
            }
        })

        if (!eventoActualizado) {
            throw ({
                status: 400,
                message: 'No se pudo actualizar'
            })
        }

        return res.json({
            message: 'Actualizado correctamente', eventoActualizado });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error de servidor, contacte al area de sistemas'})
    }


};

usuarioCtrl.deleteEvent = async (req, res) => {

    const { id_user } = req.params;

    try {

        const usuarioEliminado = usuario.update({
            estadoUser: false
        }, {
            where: {
                id_user: id_user,
                estadoUser: true
            }
        })


        if (!usuarioEliminado) {
            throw ({
                status: 404,
                message: 'Error al eliminar el usuario'
            })
        }

        return res.json({ message: 'Usuario eliminado con éxito' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error de servidor, contacte al área de sistemas' })
    }

};




export  {usuarioCtrl};