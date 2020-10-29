import { Employee } from '../models/employee.model';

export class ResolvedEmployeeList{
    constructor(public employee : Employee[], public error : any = null){}
}