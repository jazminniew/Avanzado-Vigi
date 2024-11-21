import { Pedido } from "../models/pedidos.model.js";
import { PedidosPlatos } from "../models/pedidosplatos.model.js";
import { Plato } from "../models/platos.model.js"; 

const getPlatosByPedido = async (idPedido) => {
    const pedidosplato = await pedidos_platos.findAll({
        where:{
            idPedido: idPedido
        }});
        if (pedidosplato.lenght === 0) throw new Error("Pedido no encontrado");
        return pedidosplato.map(pedidosplato => ({
        ...pedidoPlato.Plato.toJSON(),
        cantidad: pedidosplato.cantidad,
        }));
};

const getPedidos = async () => await Pedido.findAll();

const getPedidoById = async (id) => await Pedido.findByPk(id);

const getPedidosByUser = async (idUsuario) => {
    await Pedido.findAll({
        where:{
            id_usuario: idUsuario,
        }
    })
}

const createPedido = async (idUsuario, platos) => {
    const idPlatos = platos.map(plato => plato.id);
    const platosDB = await Plato.findAll({where: {id: idPlatos}});
    if(platosDB.lenght !== platos.lenght) throw new Error ("Hay platos que no existen");
    const pedido = await Pedido.create({
        id_usuario: 1,
        fecha: new Date(),
        estado: "pendiente",
    });
    await Promise.all(
        platos.map(plato=>
            PedidosPlatos.create({
                idPedido: pedido.id,
                idPlato: plato.id,
                cantidad: plato.cantidad,
            })
        )
    );
}

const updatePedido = async (id, estado) => {
    if (
        estado !== "aceptado" &&
        estado !== "en camino" &&
        estado !== "entregado"
    ) throw new Error("Estado inválido");

    const pedido = await Pedido.findByPk(id);
    if(!pedido) throw new Error ("Pedido no encontrado");
    pedido.estado = estado;
    await pedido.save();
};


const deletePedido = async (id) => {
    const pedido = await Pedido.findByPk(id);
    if(!pedido) throw new Error("Pedido no encontrado");
    await pedido.destroy();
}

export default {
    getPedidos,
    getPedidoById,
    getPedidosByUser,
    createPedido,
    updatePedido,
    deletePedido,
    getPlatosByPedido,
};
