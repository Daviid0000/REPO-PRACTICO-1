import  {asistencia}  from '../models/asistencia.js';
const asistenciaCtrl = {}

asistenciaCtrl.createGuest = async (req, res) => {
    const { userNameGuest, lastNameGuest, ageGuest, emailGuest } = req.body;

    try {
        const existeInvitado = await asistencia.findOne({
            where: {
                emailGuest: emailGuest
            }
        });

        if (existeInvitado) {
            throw ({
                status: 400,
                message: 'El usuario ya existe',
            })
        };

        const nuevoUsuario = new asistencia({
            userNameGuest,
            lastNameGuest,
            ageGuest,
            emailGuest
        });


        const usuarioCreado = await nuevoUsuario.save();

        if (!usuarioCreado) {
            throw ({
                message: 'Error al registrarte en el evento',
            })
        }

        return res.status(201).json({
            message: 'Usuario creado exitosamente',
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message:'Error al registrarte en el evento' });
    }
};

asistenciaCtrl.viewOneGuest = async (req, res) => {
    const { id } = req.params;

    try {
        const Guest = await asistencia.findByPk(id);

        if (!Guest) {
            throw ({
                status: 404, 
                message: 'No se ha encontrado el invitado' })
        }

        return res.json(Guest);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    };

};

asistenciaCtrl.viewGuests = async (req, res) => {
    try {
        const Guest = await asistencia.findAll({
            where: {
                estado: true,
            }
        });

        if (!Guest) {
            throw ({
                status: 404,
                message: 'No se encontraron invitados' });
        }

        return res.status(200).json(Guest);

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Error al obtener los invitados' });
    }
};

asistenciaCtrl.updateGuest = async (req, res) => {

    const { id } = req.params;

    const { userNameGuest, lastNameGuest, ageGuest, emailGuest } = req.body;


    try {

        const invitadoActualizado = await asistencia.update({
            userNameGuest,
            lastNameGuest,
            ageGuest,
            emailGuest
        }, {
            where: {
                id: id
            }
        })

        if (!invitadoActualizado) {
            throw ({
                status: 400,
                message: 'No se pudo actualizar'
            })
        }

        return res.json({
            message: 'Actualizado correctamente', invitadoActualizado });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error de servidor, contacte al area de sistemas'})
    }


};

asistenciaCtrl.deleteGuest = async (req, res) => {

    const { id } = req.params

    try {

        const invitadoEliminado = asistencia.update({
            estado: false
        }, {
            where: {
                id: id,
                estado: true
            }
        })


        if (!invitadoEliminado) {
            throw ({
                status: 400,
                message: 'Error al eliminar el invitado'
            })
        }

        return res.json({ message: 'Invitado eliminado con éxito' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error de servidor, contacte al área de sistemas' })
    }

};




export  {asistenciaCtrl};