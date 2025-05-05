import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UsuarioSchema = new mongoose.Schema({
  email: { 
        type: String,
        unique: true,
        required: true, 
    },
  password:  {
        type: String,
        required: true,
        trim: true
    },
    rol: { 
        type: String, 
        enum: ['admin', 'lector'], 
        default: 'lector' 
    }
});

// Hash antes de guardar
UsuarioSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password!, salt); 
    this.password = hash; // Asignar el hash a la propiedad password         

    next();
});

export const Usuario = mongoose.model('Usuario', UsuarioSchema);
