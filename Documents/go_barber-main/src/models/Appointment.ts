
import {
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne, 
    JoinColumn,} from 'typeorm';
// Entity faz a relacao dessas informacoes com a tabela do banco de dados.

import User from './Users'

/*
* Um para um (OneToOne)
* Um para Muitos (OneToMany)
* Muitos user para Muitos agendamentos (ManyToMany)
*/ 

@Entity('appointments')
class Appointment{
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    provider_id : string;

    //funcao que retorna, qual o model que deve utilizar
    // quando a variável provider for chamada.
    @ManyToOne(() => User)
    //qual a coluna que vai identificar o usuário do prestador de serviço.
    @JoinColumn({name: 'provider_id'})
    provider: User;

    @Column('timestamp with time zone')
    date : Date;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Appointment;