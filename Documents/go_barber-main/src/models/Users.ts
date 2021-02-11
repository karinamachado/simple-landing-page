
import {    
Entity,     
Column, 
PrimaryGeneratedColumn, 
CreateDateColumn, 
UpdateDateColumn,
} from 'typeorm';
// Entity faz a relacao dessas informacoes com a tabela do banco de dados.

@Entity('users')
class Users{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Users;