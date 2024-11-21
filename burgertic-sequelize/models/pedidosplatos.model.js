import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class PedidosPlatos extends Model {}

PedidosPlatos.init( 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_pedido: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
            model: 'Pedidos',
            key: 'id',
            },
        }, 
        id_plato: {
            type: DataTypes.INTEGER,
            references:{
            model: 'Platos',
            key: 'id',
            },
        },
        cantidad: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
    }, 
    {
        sequelize,
        modelName: 'PedidoPlato',
        tableName: "pedidos_platos",
        timestamps: false,
    }
);
