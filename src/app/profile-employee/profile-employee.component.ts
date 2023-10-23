import { TokenService } from '../service/token.service';
import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../service/employee.service';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'app-profile-employee',
  templateUrl: './profile-employee.component.html',
  styleUrls: ['./profile-employee.component.css']
})
export class ProfileEmployeeComponent implements OnInit {
  // @ts-ignore
  employeeForm: FormGroup;
  id: number;

  constructor(private employeeService: EmployeeService,
              private tokenService: TokenService,
              public dialogRef: MatDialogRef<EditEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = this.data.id;
    this.getEmployee();
  }

  ngOnInit() {
  }

  getEmployee() {
    return this.employeeService.findById(parseInt(this.tokenService.getID())).subscribe(employee => {
      this.employeeForm = new FormGroup({
        username: new FormControl(employee.username),
        password: new FormControl(employee.password),
        firstName: new FormControl(employee.firstName),
        lastName: new FormControl(employee.lastName),
        email: new FormControl(employee.email),
        phone: new FormControl(employee.phone),
        status: new FormControl(employee.status),
      });
    });
  }
}
