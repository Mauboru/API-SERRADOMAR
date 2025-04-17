import { Request, Response } from 'express';
import { User } from '../models/User';
import { sendNewUserNotificationActive, sendNewUserNotificationInactive } from '../services/mailService';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            where: { deletedAt: null },
            attributes: ['id', 'name', 'email', 'cpf', 'status'],
        });

        return res.status(200).json({ users });

    } catch (error) {
        console.error('Erro ao buscar usuários pendentes:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const setUserActive = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        user.status = 'active';
        await user.save();
        await sendNewUserNotificationActive(user.email, user.name);

        return res.status(200).json({ message: 'Usuário ativado com sucesso.' });
    } catch (error) {
        console.error('Erro ao ativar usuário:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const setUserInactive = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        user.status = 'inactive';
        await user.save();
        await sendNewUserNotificationInactive(user.email, user.name);

        return res.status(200).json({ message: 'Usuário inativado com sucesso.' });
    } catch (error) {
        console.error('Erro ao inativar usuário:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
