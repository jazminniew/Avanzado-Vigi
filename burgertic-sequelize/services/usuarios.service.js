import { Usuario } from "../models/usuarios.model.js"; 

const getUsuarioByEmail = async (mail) => {
    const usuario = await Usuario.findAll({
        where: {
            email: mail
        }
    }); 
    return usuario[0]
}
/*const getUsuarioByEmail = async (email) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT * FROM usuarios WHERE email = $1",
            [email]
        );
        if (rows.length < 1) return null;

        await client.end();
        return rows[0];
    } catch (error) {
        await client.end();
        throw error;
    }
}; */

const getUsuarioById = async (ID) => {
    const usuario = await Usuario.findOne({
        where: {
            id: ID,
        },
    }); 
    return usuario;
}
  
       /* const client = new Client(config);
    await client.connect();
    try {
        const { rows } = await client.query(
            "SELECT * FROM usuarios WHERE id = $1",
            [id]
        );
        if (rows.length < 1) return null;

        await client.end();
        return rows[0];
    } catch (error) {
        await client.end();
        throw error;
    }
};*/

const createUsuario = async (usuario) => {
        Usuario.create({
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            password: usuario.password,
            admin: false,  
            });
};

/*
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "INSERT INTO usuarios (nombre, apellido, email, password, admin) VALUES ($1, $2, $3, $4, false)",
            [usuario.nombre, usuario.apellido, usuario.email, usuario.password]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};
*/

export default { getUsuarioByEmail, getUsuarioById, createUsuario };
