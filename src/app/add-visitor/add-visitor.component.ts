import {Component, OnInit} from '@angular/core';
import { MatDialogRef} from '@angular/material';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {TudipApiService} from '../service/tudip-api.service';
import {WidgetUtilService} from "../service/widget-util.service";

@Component({
  selector: 'app-add-visitor',
  templateUrl: './add-visitor.component.html',
  styleUrls: ['./add-visitor.component.scss']
})
export class AddVisitorComponent implements OnInit {

  visitorAdded = true;

  addVisitorData =  {
    name: '',
    email: '',
    phone_no: '',
    in_time: '',
    out_time: ''
  };

  constructor(public dialogRef: MatDialogRef<DashboardComponent>, private tudipApiSerivce: TudipApiService
  , private widgetUtil: WidgetUtilService) {

  }

  ngOnInit() {
  }

  addVisitor() {
    this.visitorAdded = false;
    if (this.addVisitorData.in_time) {
      this.addVisitorData.in_time = Date.parse(this.addVisitorData.in_time.toString()).toString();
    } else {
      this.addVisitorData.in_time = null;
    }
    if (this.addVisitorData.out_time) {
      this.addVisitorData.out_time = Date.parse(this.addVisitorData.out_time.toString()).toString();
    } else {
      this.addVisitorData.out_time = null;
    }
    console.log("8888", this.addVisitorData);
    this.tudipApiSerivce.addVisitor(this.addVisitorData).subscribe((result) => {
      this.dialogRef.close(this.addVisitorData);
      this.visitorAdded = true;
    }, (error) => {
      this.visitorAdded = false;
      this.widgetUtil.openSnackBar(error.error.message, 'Ok');
    });
  }

}
