import { request, Router } from 'express';
import {getCustomRepository} from 'typeorm';
import {parseISO} from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

//Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta.
//Route: receive a requision, call another file, send a ask.

// SoC: Separation of Concerns (separação de preocupações).
// Cada parte de uma rota eles tem que ter uma única preocupação.

//parseISO - converte uma data no formato string, para um formare date do javascript.

const appointmentsrouter = Router();


appointmentsrouter.get('/', async(request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
  
    return response.json(appointments);
  });


appointmentsrouter.post('/', async(request,response) => {

try{

  const {provider_id, date} = request.body

  const parseDate = parseISO(date);

  const CreateAppointment = new CreateAppointmentService();
  
 
  const appointment = await CreateAppointment.execute({
    date: parseDate, 
    provider_id,
  });
  
 return response.json(appointment);

} catch(err){
  return response.status(400).json({error: err.message});
}

});

export default appointmentsrouter;