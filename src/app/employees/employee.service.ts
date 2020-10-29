import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from '../../../node_modules/rxjs';
import { of } from 'rxjs';
import { delay } from "rxjs/operators";
import { catchError, retry } from "rxjs/operators";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { throwError } from "rxjs";

@Injectable()
export class EmployeeService{

    baseUrl = "http://localhost:3000/employees";

    constructor(private httpClient : HttpClient){}

    private listEmployees : Employee[] = [
        {
            id: 1,
            name: "Usman",
            gender: "Male",
            contactPreference: "Email",
            email: "usman@gmail.com",
            dateOfBirth: new Date('3/2/1996'),
            department: "3",
            isActive: true,
            photoPath: "assets/images/dm-img_1.png",
           
          },
          {
            id: 2,
            name: "Adnan",
            gender: "Male",
            contactPreference: "Email",
            email: "adnan@gmail.com",
            dateOfBirth: new Date('10/31/1999'),
            department: "1",
            isActive: false,
            photoPath: "assets/images/dm_img_2.png",
           
          },
          {
            id: 3,
            name: "Ayesha",
            gender: "Female",
            contactPreference: "Phone",
            phoneNumber: "03115344701",
            dateOfBirth: new Date('9/5/1997'),
            department: "2",
            isActive: true,
            photoPath: "assets/images/dm_img_3.png",
           
          }
        ]


    getEmployees() : Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(this.baseUrl)
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
        // return of(this.listEmployees).pipe(delay(500));

    }
    private handleError(errorResponse : HttpErrorResponse){
        if(errorResponse.error instanceof ErrorEvent){
            console.error('Client Side Error '+ errorResponse.error.message);
        }
        else{
            console.error('Server Side Error '+ errorResponse);
        }
        return throwError('Problem with the service');
    }
    getEmployee(id: number) : Observable<Employee> {
        return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`).
            pipe(catchError(this.handleError));
        
        // return this.listEmployees.find(e => e.id === id);
    }

    addEmployee(employee : Employee) : Observable<Employee>{
        // if(employee.id === null){

            return this.httpClient.post<Employee>(this.baseUrl,employee,{
                headers: new HttpHeaders({
                    'Content-Type' : 'application/json'
                })
            })
            .pipe(catchError(this.handleError));
            
            // this.listEmployees.push(employee);

            // const maxId = this.listEmployees.reduce(function(e1, e2){
            //     return (e1.id > e2.id) ? e1 : e2;
            // }).id;
            // employee.id = maxId + 1;
        // }
        // else{
        //     const foundIndex = this.listEmployees.findIndex(e => e.id === employee.id);
        //     this.listEmployees[foundIndex] = employee;
        // }
    }
    udpateEmployee(employee : Employee) : Observable<void>{
        return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`,employee,{
            headers: new HttpHeaders({
                'Content-Type' : 'application/json'
            })
        });
    }
    deleteEmployee(id : number) : Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`).
            pipe(catchError(this.handleError));



        // const i = this.listEmployees.findIndex(e => e.id === id);
        // if(i !== -1){
        //     this.listEmployees.splice(i,1);
        // }
    }
}