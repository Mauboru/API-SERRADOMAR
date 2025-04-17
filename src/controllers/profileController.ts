import { Request, Response } from 'express';
import { User } from 'models/User';

export const getUsersPending = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            where: { status: 'pending', deletedAt: null },
            attributes: ['id', 'name', 'email', 'cpf', 'status'],
        });

        return res.status(200).json({ users });

    } catch (error) {
        console.error('Erro ao buscar usuários pendentes:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};