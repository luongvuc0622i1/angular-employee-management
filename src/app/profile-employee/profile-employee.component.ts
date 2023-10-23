import { Component } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-profile-employee',
  templateUrl: './profile-employee.component.html',
  styleUrls: ['./profile-employee.component.css']
})
export class ProfileEmployeeComponent {
  // @ts-ignore
  employee: Employee;

  constructor(private employeeService: EmployeeService, private tokenService: TokenService) {
  }

  ngOnInit() {
    this.getById();
  }

  getById() {
    this.employeeService.findById(parseInt(this.tokenService.getID())).subscribe(employee => {
      this.employee = employee;
      console.log(employee)
    });
  }
}
