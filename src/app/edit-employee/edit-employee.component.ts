import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  // @ts-ignore
  employeeForm: FormGroup;
  id: number;

  constructor(private employeeService: EmployeeService,
              public dialogRef: MatDialogRef<EditEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = this.data.id;
    this.getEmployee();
  }

  ngOnInit() {
  }

  getEmployee() {
    return this.employeeService.findById(this.id).subscribe(employee => {
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

  update() {
    const category = this.employeeForm.value;
    this.employeeService.update(this.id, category).subscribe(() => {
      alert('Cập nhật thành công');
    }, e => {
      console.log(e);
    });
  }
}
