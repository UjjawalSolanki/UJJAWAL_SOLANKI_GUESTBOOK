import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {TudipApiService} from '../service/tudip-api.service';

@Component({
  selector: 'app-delete-visitor-dialog',
  templateUrl: './delete-visitor-dialog.component.html',
  styleUrls: ['./delete-visitor-dialog.component.scss']
})
export class DeleteVisitorDialogComponent implements OnInit {

  deleted = true;

  constructor(public dialogRef: MatDialogRef<DashboardComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  , private tudipApiSerivce: TudipApiService) {
    console.log(this.data);
  }

  ngOnInit() {
  }

  deleteVisitor() {
    this.deleted = false;
    this.tudipApiSerivce.removeVisitor(this.data.id).subscribe((result) => {
      this.dialogRef.close(this.data);
      this.deleted = true;
    }, (error) => {
      this.dialogRef.close(false);
      console.log(error.error.message);
    });
  }

}
