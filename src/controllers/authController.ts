import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { generateToken } from 'services/authService';
import { User } from 'models/User';

export const login = async (req: Request, res: Response) => {
    try {
        const { cpf_or_email, password } = req.body;

        const user = await User.findOne({ 
        where: { 
            [Op.or]: [{ cpf: cpf_or_email }, { email: cpf_or_email }],
            deletedAt: null
        }
        });

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas ou usuário desativado.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const token = generateToken({ id: user.id, email: user.email });

        return res.status(200).json({
            message: 'Login bem-sucedido.',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
        
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const logout = async (req: Request, res: Response) => {};

export const refreshToken = async (req: Request, res: Response) => {};

export const registerUser   = async (req: Request, res: Response) => {
    try {
      const { name, email, cpf, password } = req.body;
  
      const existing_cpf = await User.findOne({ where: { cpf } });
      if (existing_cpf) return res.status(400).json({ message: 'Este CPF já está registrado.' });
  
      const existing_email = await User.findOne({ where: { email } });
      if (existing_email) return res.status(400).json({ message: 'Este e-mail já está registrado.' });
  
      const password_hash = await bcrypt.hash(password, 10);
  
      await User.create({
        name,
        email,
        password: password_hash,
        cpf,
      });
  
      return res.status(201).json({ message: 'Usuário criado com sucesso.' });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {};

export const resetPassword = async (req: Request, res: Response) => {};