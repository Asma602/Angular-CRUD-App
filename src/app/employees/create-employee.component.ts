import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { BsDatepickerConfig } from '../../../node_modules/ngx-bootstrap/datepicker';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  @ViewChild('employeeForm', {static : false}) public createEmployeeForm : NgForm;
  panelTitle : string;
  // gender = "male";
  previewPhoto = false;
  // datepickerConfig : Partial<BsDatepickerConfig>;
  employee : Employee ={
    id: null,
    name: null,
    gender: null,
    email: null,
    phoneNumber: null,
    contactPreference: null,
    dateOfBirth: null,
    department: "select",
    isActive: null,
    photoPath: null,
   
  }

  departments: Department[]=[
    {id:1, name:'Help Desk'},
    {id:2, name:'IT'},
    {id:3, name:'HR'},
    {id:4, name:'Paroll'},
    {id:5, name:'Admin'},
  ];

  constructor(private _employeeService : EmployeeService, private _router : Router,
              private _route : ActivatedRoute) {
    // this.datepickerConfig = Object.assign({},
    //   {containerClass : 'theme-dark-blue',
    //   showWeekNumbers:false,
    //   minDate :new Date(2018,0,1),
    //   maxDate: new Date(2018, 11, 31),
    //   dateInputFormat:'DD/MM/YYYY'
    // });

   }
   
  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap =>  {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  
  }
  getEmployee(id: number){
    if(id == 0){
     this.employee ={
      id: null,
      name: null,
      gender: null,
      email: null,
      phoneNumber: null,
      contactPreference: null,
      dateOfBirth: null,
      department: "select",
      isActive: null,
      photoPath: null,
     } ;
     this.panelTitle = "Create Employee";
    }
    else{
     this.panelTitle = "Edit Employee";

      this._employeeService.getEmployee(id).subscribe(
        (employee) => this.employee = employee,
        (err : any) => console.log(err)
      ); 
    }
  }

   togglePhotoPreview(){
     this.previewPhoto = !this.previewPhoto;
   }
   saveEmployee(){
     if(this.employee.id == null){
      this._employeeService.addEmployee(this.employee).subscribe(
        (data : Employee) => {
          console.log(data);
          this.createEmployeeForm.reset();
          this._router.navigate(['list']);
        },
        (error : any) => console.log(error)
      );
     }
     else{
      this._employeeService.udpateEmployee(this.employee).subscribe(
        () => {
          this.createEmployeeForm.reset();
          this._router.navigate(['list']);
        },
        (error : any) => console.log(error)
      );
     }
    
   
  }
  // saveEmployee(){
  //   // JS objects and references
  //   const copiedEmployee : Employee = Object.assign({},this.employee);
  //   this._employeeService.save(copiedEmployee);
  //   this.createEmployeeForm.reset();
  //   this._router.navigate(['list']);
  // }

}
