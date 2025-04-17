import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { generateToken } from '../services/authService';
import { validateCpf } from '../services/cpfService';
import { sendNewUserNotification } from '../services/mailService';

export const login = async (req: Request, res: Response) => {
    try {
        const { cpf_or_email, password } = req.body;

        const user = await User.findOne({
            where: {
                [Op.or]: [{ cpf: cpf_or_email }, { email: cpf_or_email }],
                deletedAt: null
            }
        });

        if (!user) return res.status(401).json({ message: 'Credenciais inválidas ou usuário desativado.' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Credenciais inválidas.' });

        if (user.status === 'pending') return res.status(401).json({ message: 'Seu pedido de acesso esta em avaliação!.' });
        if (user.status === 'inactive') return res.status(401).json({ message: 'Seu pedido de acesso foi recusado!.' });

        const token = generateToken({ id: user.id, email: user.email });

        return res.status(200).json({
            message: 'Login bem-sucedido.',
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const proxyDashboard = async (req: Request, res: Response) => {
    try {
        // Pegando o token da query string
        const token = req.query.token as string;
        if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

        // Verificando o token
        jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Token inválido ou expirado.' });
            }

            // Se o token for válido, continue com a lógica
            console.log('Token decodificado:', decoded);
            // Aqui você pode continuar com a lógica de redirecionamento ou outros passos
        });
    } catch (err) {
        console.error('Erro ao fazer proxy do dashboard:', err);
        res.status(500).send('Erro ao carregar o dashboard');
    }
};

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, cpf, password } = req.body;

        const existing_email = await User.findOne({ where: { email } });
        if (existing_email) {
            return res.status(400).json({
                errors: {
                    email: 'Este e-mail já está registrado.',
                },
            });
        }

        const cpfValido = await validateCpf(cpf);
        if (!cpfValido) {
            return res.status(400).json({
                errors: { cpf: 'CPF inválido ou não encontrado na Receita Federal.' },
            });
        }

        const existing_cpf = await User.findOne({ where: { cpf } });
        if (existing_cpf) {
            return res.status(400).json({
                errors: { cpf: 'Este CPF já está registrado.' },
            });
        }

        const password_hash = await bcrypt.hash(password, 10);
        const name_uppercase = name.toUpperCase();

        await User.create({
            name: name_uppercase,
            email,
            password: password_hash,
            cpf,
        });

        const managers = await User.findAll({ where: { role: 'manager' } });
        for (const manager of managers) {
            await sendNewUserNotification(manager.email, name, email);
        }

        return res.status(201).json({ message: 'Usuário criado com sucesso.' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const resetPassword = async (req: Request, res: Response) => { };