import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
// import { BsDatepickerModule } from 'node_modules/ngx-bootstrap/datepicker/ngx-bootstrap-datepicker';



import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
import { EmployeeService } from './employees/employee.service';
import { DisplayEmployeeComponent } from './employees/display-employee.component';
import { CreateEmployeeCanDeactivateGaurdService } from './employees/create-employee-can-deactivate-gaurd.service';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { EmployeeDetailsGaurdService } from './employees/employee-details-gaurd.service';
import { AccordianComponent } from './shared/accordian.component';
import { HttpClientModule } from  '@angular/common/http';

const appRoutes : Routes = [
  
  {
    path: 'list', 
    component: ListEmployeesComponent,
    resolve: {employeeList : EmployeeListResolverService}
  },
  {
    path: 'create', 
    component: CreateEmployeeComponent,
    canDeactivate: [CreateEmployeeCanDeactivateGaurdService]
  },
  {
    path: 'employees/:id', 
    component: EmployeeDetailsComponent,
    canActivate : [EmployeeDetailsGaurdService]
  },
  {
    path: 'create/:id', 
    component: CreateEmployeeComponent,
    canDeactivate: [CreateEmployeeCanDeactivateGaurdService]
  },

  {path: '', redirectTo: '/list', pathMatch: 'full'},
  { path: 'notfound', component: PageNotFoundComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    PageNotFoundComponent,
    AccordianComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    // BsDatepickerModule.forRoot(),
    // BsDatepickerModule.forRoot(;)

    BrowserAnimationsModule,
  
    
  ],
  providers: [EmployeeService, CreateEmployeeCanDeactivateGaurdService,EmployeeListResolverService
  ,EmployeeDetailsGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
