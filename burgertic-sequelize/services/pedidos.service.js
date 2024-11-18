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
    model:PedidoPñato,
    inxlude:{ model: Plato},
    },
    });
    
    if (!pedidos.lenght) retirn [];
    
    retirn pedidos.map(pedido=> ({
    ...pedido.toJSON(),
    platos:pedido.PedidoPlatos.map(pedidoPlato => ({
    ...pedidoPlato.Plato.toJSON(),
    cantidad: pedidoPlato.cantidad,
    })),
    }));
    };

const createPedido = async (idUsuario, platos) => {
    const client = new Client(config);
    await client.connect();

    try {
        // ACÁ SE PODRÍA HACER EN ETAPAS
        // 1. Validar que los platos existan
        // 2. Crear el pedido
        // 3. Agregar los platos al pedido

        // Así, no hace falta introducir el concepto de transacciones o rollback

        const { rows } = await client.query(
            "INSERT INTO pedidos (id_usuario, fecha, estado) VALUES ($1, $2, 'pendiente') RETURNING id",
            [idUsuario, new Date()]
        );

        const idPedido = rows[0].id;

        for (let plato of platos) {
            const { rows } = await client.query(
                "SELECT * FROM platos WHERE id = $1",
                [plato.id]
            );

            if (rows.length < 1) {
                await client.query("DELETE FROM pedidos WHERE id = $1", [
                    idPedido,
                ]);
                await client.query(
                    "DELETE FROM pedidos_platos WHERE id_pedido = $1",
                    [idPedido]
                );
                throw new Error("Plato no encontrado");
            }

            await client.query(
                "INSERT INTO pedidos_platos (id_pedido, id_plato, cantidad) VALUES ($1, $2, $3)",
                [idPedido, plato.id, plato.cantidad]
            );
        }

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const updatePedido = async (id, estado) => {
    if (
        estado !== "aceptado" &&
        estado !== "en camino" &&
        estado !== "entregado"
    )
        throw new Error("Estado inválido");

    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "UPDATE pedidos SET estado = $1 WHERE id = $2",
            [estado, id]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const deletePedido = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "DELETE FROM pedidos WHERE id = $1",
            [id]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

export default {
    getPedidos,
    getPedidoById,
    getPedidosByUser,
    createPedido,
    updatePedido,
    deletePedido,
};
