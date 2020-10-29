import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { ResolvedEmployeeList } from './resolved-employeelist.model';

@Component({
  
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees: Employee [];
  filteredEmployees : Employee[];
  error : string;
  // dataFromChild: Employee;
  // employeeToDisplay : Employee;
  // private arrayIndex = 1;
  private _searchTerm : string;
  get searchTerm() : string {
    return this._searchTerm;
  }
  set searchTerm(value : string){
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }
  constructor(private _router : Router, private _route : ActivatedRoute) { 
    const resolvedData : Employee[] | string = this.employees = this._route.snapshot.data['employeeList'];
    
    if(Array.isArray(resolvedData)){
      this.employees = resolvedData;
    }
    else{
      this.error = resolvedData;
    }
    
    if(this._route.snapshot.queryParamMap.has('searchTerm')){
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    }
    else{
      this.filteredEmployees = this.employees;
    }
  }


  filterEmployees(seachString : string){
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(seachString.toLowerCase()) !== -1);
  }

  changeEmployeeName(){
    this.employees[2].name = "Uzma";
    this.filteredEmployees = this.filterEmployees(this.searchTerm);
  }


  ngOnInit() {
    // this.employees = this._employeeService.getEmployees();
    // this._employeeService.getEmployees().subscribe(empList =>{
    //   this.employees = empList;

    //   if(this._route.snapshot.queryParamMap.has('searchTerm')){
    //     this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    //   }
    //   else{
    //     this.filteredEmployees = this.employees;
    //   }

    // });
    
    // console.log(this._route.snapshot.queryParamMap.keys);
    // this.employeeToDisplay = this.employees[0];
  }

  onClick(employeeId : number) {
    this._router.navigate(['/employees',employeeId],
    {
      queryParams : {'searchTerm' : this.searchTerm, 'testValue':'TestValue'}
    });
  }
  onDeleteNotification(id : number){
    const i = this.filteredEmployees.findIndex(e => e.id === id);
        if(i !== -1){
            this.filteredEmployees.splice(i,1);
        }
  }

  // handleNotify(eventData : Employee){
  //   this.dataFromChild = eventData;
  // }



  // nextEmployee() : void{
  //   if(this.arrayIndex<=2){
  //     this.employeeToDisplay = this.employees[this.arrayIndex];
  //     this.arrayIndex++;
  //   }
  //   else{
  //     this.employeeToDisplay = this.employees[0];
  //     this.arrayIndex = 1;
  //   }
  // }

}
