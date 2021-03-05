import { getRepository } from 'typeorm';
import User from "../models/User";
import path from 'path';
import uploadConfig from '../config/upload';
import fs from 'fs';

interface Request{
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService{
    public async execute({user_id, avatarFilename}:Request):Promise<User> 
    {
        const usersRepository = getRepository(User);
        // conectando ao model User.

        const user = await usersRepository.findOne(user_id);
        //Para atualizar, precisamos buscar pelo ID do usuário:
        //método findOne para encontrar o ID.

        if(!user){
            throw new Error('Only  authenticated users can change avatar.');
        }

        if(user.avatar){
            //Deleta usuário anterior
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

            // checar se o arquivo existe e o status.
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            // Se existir, deleta o arquivo.
            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        // salvar os updates do usuário.
        user.avatar = avatarFilename;
        await usersRepository.save(user);

        return user;

    }

   
}

export default UpdateUserAvatarService;