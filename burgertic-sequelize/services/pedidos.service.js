import { Pedido } from "../models/pedidos.model.js";
import pg from pg;
import { PedidoPlato } from "../models/pedidoplato.model.js";
import { Plato } from "../models/pedidos.model.js";
import { Usuario } from "../models/usuario.model.js";

const getPlatosByPedido = async (idPedido) => {
    
        const pedidosplato = await pedidos_platos.findAll({
        where:{
            idPedido: idPedido
        },
         include: [{model: Plato}],
    });
            if (!pedidosplato.lenght) throw new Error("Pedido no encontrado");
            return pedidosplato.map(pedidosplato => ({
            ..pedidoPlato.Plato.toJSON(),
            cantidsd: pedidosplato.cantidad,
         }));
     };
    

const getPedidos = async () => 
await Pedido.findAll();

const getPedidoById = async (id) => {
const pedido = await Pedido.findByPk(id);
if (!pedido) throw new Error("Pedido no encontrado")
return pedido;

const getPedidosByUser = async (idUsuario) => {
const pedidos = await Pedido.findAll({
      where:{idUsuario},
    include:{
    model:PedidoPlato,
    include:{ model: Plato},
    },
    });
    
    if (!pedidos.lenght) return [];
    
    return pedidos.map(pedido=> ({
    ...pedido.toJSON(),
    platos:pedido.PedidoPlatos.map(pedidoPlato => ({
    ...pedidoPlato.Plato.toJSON(),
    cantidad: pedidoPlato.cantidad,
    })),
    }));
    };

const createPedido = async (idUsuario, platos) => {
    const idPlatos = platos.map(plato => plato.id);
    const platos = await Plato.findAll({where: {id: idPlatod}});
    if(platos.lenght !== platos.lenght) throw new Error ("Hay platos que no existen");
    
    const pedido = await Pedido.create({
    idUsuario,
    fecha: new Date(),
    estado: "pendiente",
    });
    
    await Promise.all(
    platos.map(plato=>
    PedidoPlato.create({
    idPedido: pedido.id,
    idPlato: plato.id,
    cantidad: plato.cantidad,
    })
    )
    );
    return pedido;
    );

const updatePedido = async (id, estado) => {
 const estados = ["pendiente", "aceptado", "en camino", "entregado", "cancelado"];
 if (!estados.includes(estado)) throw new Error ("Estado Invalido");

const pedido = await Pedido.findByPk(id);
if(!pedido) throw new Error ("Pedido no encontrado");

pedido.estado = estado;
await pedido.save();
return pedido;
};


const deletePedido = async (id) => {
 const pedido = await Pedido.findByPk(id);
if (!pedido) throw new Error("Pedido no encontrado");

await Pedido.destroy();
return pedido;

export default {
    getPedidos,
    getPedidoById,
    getPedidosByUser,
    createPedido,
    updatePedido,
    deletePedido,
    getPlatosByPedido,
};
