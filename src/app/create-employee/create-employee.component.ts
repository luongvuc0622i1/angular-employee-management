import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    status: new FormControl(),
  });

  constructor(private employeeService: EmployeeService,
              private dialogRef: MatDialogRef<CreateEmployeeComponent>) {
  }

  ngOnInit() {
  }

  submit() {
    const employee = this.employeeForm.value;
    this.employeeService.create(employee).subscribe(() => {
      this.employeeService.reset();
      this.dialogRef.close();
      window.location.reload();
    }, e => {
      console.log(e);
    });
  }
}
