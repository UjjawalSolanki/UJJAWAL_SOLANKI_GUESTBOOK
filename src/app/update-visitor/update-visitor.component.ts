import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {TudipApiService} from '../service/tudip-api.service';

@Component({
  selector: 'app-update-visitor',
  templateUrl: './update-visitor.component.html',
  styleUrls: ['./update-visitor.component.scss']
})
export class UpdateVisitorComponent implements OnInit {

  updated = true;

  constructor(public dialogRef: MatDialogRef<DashboardComponent>, @Inject(MAT_DIALOG_DATA) public data: any
    , private tudipApiSerivce: TudipApiService) {
    if (this.data.in_time) {
      this.data.in_time = new Date(parseInt(this.data.in_time));
    } else {
      this.data.in_time = null;
    }
    if (this.data.out_time) {
      this.data.out_time = new Date(parseInt(this.data.out_time));
    } else {
      this.data.out_time = null;
    }
    console.log("original", this.data);
  }

  ngOnInit() {
  }

  updateVisitor() {
      console.log("before", this.data);
      if (this.data.in_time) {
        this.data.in_time = Date.parse(this.data.in_time.toString()).toString();
      } else {
        this.data.in_time = null;
      }
      if (this.data.out_time) {
        this.data.out_time = Date.parse(this.data.out_time.toString()).toString();
      } else {
        this.data.out_time = null;
      }
      console.log("after", this.data);
      this.updated = false;
      this.tudipApiSerivce.updateVisitor(this.data).subscribe((result) => {
        this.dialogRef.close(this.data);
        this.updated = true;
      }, (error) => {
        this.dialogRef.close(false);
        console.log(error.error.message);
      });
  }

}
