import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { counters } from '../Entities/counters';

class counterController {

    // issues table ekata query ekak gahanna counter id eken group karala max isse_no eka pick karanna.
    
    // ex : counter_id 1 | 10
    //      counter_id 2 | 12
    //      counter_id 3 | 20


    // aduma max number eka thyena counter _id eka pick kara

    //return karanna counter_id eka
}

export default counterController;