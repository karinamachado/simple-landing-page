// servico responsavel pela criacao do agendamento.
import { startOfHour } from 'date-fns';
import {getCustomRepository} from 'typeorm'

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository'; 

// Recebimento das informacoes
// Tratativa de errros e excecoes
// Acesso ao repositorio

//recebimento das informacoes. DTO
interface Request {
    provider_id: string;
    date: Date;
    
}

//Dependency Inversion (solid)- sempre que o service, tiver
//uma dependencia, no caso é o repository ao inves de instarciarmos uma classe
//dentro do service, nós vamos receber esse appoitment repository como paramentro da nossa classe.
// isso vai facilitar, independente de quantos services, o app tiver, todos os outros
// services, vão utilizar o mesmo appointment.


//recebendo as dependencias
class CreateAppointmentService{
    public async execute({date, provider_id}: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);

 const findAppointmentInSameDate = await appointmentsRepository.findByDate(
    appointmentDate,
 );

 if(findAppointmentInSameDate){
     throw Error ('This appointment is already booked');
     
 }
 
 const appointment = appointmentsRepository.create({
     provider_id,
     date: appointmentDate,
 });
        await appointmentsRepository.save(appointment);
        return appointment;
    }
}

export default CreateAppointmentService;
