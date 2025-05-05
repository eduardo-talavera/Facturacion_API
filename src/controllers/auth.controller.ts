import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Usuario } from '../models/Usuario';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    res.status(401).json({ error: 'Credenciales inválidas' });
    return
  }

  const match = await bcrypt.compare(password, usuario.password);
  if (!match) {
    res.status(401).json({ error: 'Credenciales inválidas' });
    return;
  }

  const token = jwt.sign(
    { id: usuario._id, rol: usuario.rol }, 
    process.env.JWT_SECRET!, 
    { expiresIn: '1d' }
  );

  res.json({ token });
};


export const register = async (req: Request, res: Response) => {
  const { email, password, rol } = req.body;

  try {
    const existe = await Usuario.findOne({ email });
    if (existe) {
        res.status(400).json({ error: 'El usuario ya existe' });
        return;
    }

    const nuevoUsuario = new Usuario({ email, password, rol });
    await nuevoUsuario.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

  
