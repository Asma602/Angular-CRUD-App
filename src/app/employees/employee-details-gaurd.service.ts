import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '../../../node_modules/@angular/router';
import { EmployeeService } from './employee.service';
import { Observable, of } from '../../../node_modules/rxjs';
import { map, catchError } from '../../../node_modules/rxjs/operators';

export class EmployeeDetailsGaurdService implements CanActivate{

    constructor(private _employeeService: EmployeeService, private _router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        return this._employeeService.getEmployee(+route.paramMap.get('id'))
        .pipe(
            map(employee => {
                const employeeExists = !!employee;
                if(employeeExists){
                    return true;
                }
                else{
                    this._router.navigate(['notfound']);
                    return false;
                }
            }),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
            
        )
        
        
    }
}