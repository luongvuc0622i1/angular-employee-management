import { TokenService } from '../service/token.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-profile-employee',
  templateUrl: './profile-employee.component.html',
  styleUrls: ['./profile-employee.component.css']
})
export class ProfileEmployeeComponent implements OnInit {
  // @ts-ignore
  employeeForm: FormGroup;

  constructor(private employeeService: EmployeeService,
              private tokenService: TokenService) {
    this.getEmployee();
  }

  ngOnInit() {
  }

  getEmployee() {
    console.log(parseInt(this.tokenService.getID()));
    return this.employeeService.findById(parseInt(this.tokenService.getID())).subscribe(employee => {
      this.employeeForm = new FormGroup({
        username: new FormControl(employee.username),
        password: new FormControl(employee.password),
        firstName: new FormControl(employee.firstName),
        lastName: new FormControl(employee.lastName),
        email: new FormControl(employee.email),
        phone: new FormControl(employee.phone),
        status: new FormControl(employee.status ? 'Active' : 'Inactive'),
      });
    });
  }
}
