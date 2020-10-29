import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '../../../node_modules/@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Observable, of } from '../../../node_modules/rxjs';
import { Injectable } from '../../../node_modules/@angular/core';
import { catchError } from '../../../node_modules/rxjs/operators';


@Injectable()
export class EmployeeListResolverService implements Resolve<Employee[] | string>{

    constructor(private _employeeService: EmployeeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[] | string> {
        return this._employeeService.getEmployees()
            .pipe(
                catchError((err : any) => of(err))
            );
    }
}