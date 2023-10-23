import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { Employee } from '../model/Employee';
import { EmployeeService } from '../service/employee.service';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.employeeService.getAll().subscribe(employees => {
      this.employees = employees;
    });
  }

  delete(id: number) {
    this.employeeService.delete(id).subscribe(() => {
      // window.location.reload();
    }, e => {
      console.log(e);
    });
  }

  openDialog(id: number): void {
    let dialogRef;
    
    if (id == -1) {
      dialogRef = this.dialog.open(CreateEmployeeComponent, {
        width: '800px', // Điều chỉnh kích thước modal theo ý muốn
        height: '500px',
      });
    } else {
      dialogRef = this.dialog.open(EditEmployeeComponent, {
        width: '800px', // Điều chỉnh kích thước modal theo ý muốn
        height: '500px',
        data: {
          id: id,
        },
      });
    }

    // Có thể thực hiện xử lý sau khi modal đã đóng ở đây
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
