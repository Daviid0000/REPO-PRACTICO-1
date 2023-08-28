import  {evento}  from '../models/event.js';
const eventoCtrl = {}

eventoCtrl.createEvent = async (req, res) => {

    const { eventName, eventLocation, eventDateStart, eventDateEnd, id_user } = req.body;

    try {
        const existeEvento = await evento.findOne({
            where: {
                eventLocation: eventLocation
            }
        });

        if (existeEvento) {
            throw ({
                status: 400,
                message: 'El evento ya existe',
            })
        };

        const nuevoEvento = evento.create({
            eventName,
            eventLocation,
            eventDateStart,
            eventDateEnd,
            id_user
        });


        const eventoCreado = await nuevoEvento.save();

        if (!eventoCreado) {
            throw ({
                message: 'Error al crear el evento',
            })
        }

        return res.status(201).json({
            message: 'Evento creado exitosamente',
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message:'Error al crear el evento' });
    }
};

eventoCtrl.viewOneEvent = async (req, res) => {
    const { id_event } = req.params;

    try {
        const Event = await evento.findByPk(id_event);

        if (!Event) {
            throw ({
                status: 404, 
                message: 'No se ha encontrado el evento' })
        }

        return res.json(Event);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    };

};

eventoCtrl.viewEvents = async (req, res) => {
    try {
        const Event = await evento.findAll({
            where: {
                estadoEvent: true,
            }
        });

        if (!Event) {
            throw ({
                status: 404,
                message: 'No se encontraron eventos' });
        }

        return res.status(200).json(Event);

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Error al obtener los eventos' });
    }
};

eventoCtrl.updateEvent = async (req, res) => {

    const { id_event } = req.params;

    const { eventName, eventLocation, eventDateStart, eventDateEnd } = req.body;


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

eventoCtrl.deleteEvent = async (req, res) => {

    const { id_event } = req.params

    try {

        const eventoEliminado = evento.update({
            estadoEvent: false
        }, {
            where: {
                id_event: id_event,
                estadoEvent: true
            }
        })


        if (!eventoEliminado) {
            throw ({
                status: 400,
                message: 'Error al eliminar el evento'
            })
        }

        return res.json({ message: 'Evento eliminado con éxito' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error de servidor, contacte al área de sistemas' })
    }

};




export  {eventoCtrl};