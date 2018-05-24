import {Component, OnInit} from '@angular/core';
import { MatDialogRef} from '@angular/material';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {TudipApiService} from '../service/tudip-api.service';
import {WidgetUtilService} from '../service/widget-util.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-visitor',
  templateUrl: './add-visitor.component.html',
  styleUrls: ['./add-visitor.component.scss']
})
export class AddVisitorComponent implements OnInit {

  visitorAdded = true;

  addVisitorForm: FormGroup;
  visitorName: FormControl;
  visitorEmail: FormControl;
  visitorPhone: FormControl;
  visitorInTime: FormControl;
  visitorOutTime: FormControl;

  constructor(public dialogRef: MatDialogRef<DashboardComponent>, private tudipApiSerivce: TudipApiService
  , private widgetUtil: WidgetUtilService) {

  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.visitorName = new FormControl('', [
      Validators.required
    ]);
    this.visitorEmail = new FormControl('', [
      Validators.pattern('[^ @]*@[^ @]*')
    ]);
    this.visitorPhone = new FormControl('');
    this.visitorInTime = new FormControl('', [
      Validators.required
    ]);
    this.visitorOutTime = new FormControl('');
  }

  createForm() {
    this.addVisitorForm = new FormGroup({
      visitorName: this.visitorName,
      visitorEmail: this.visitorEmail,
      visitorPhone: this.visitorPhone,
      visitorInTime: this.visitorInTime,
      visitorOutTime: this.visitorOutTime,
    });
  }

  addVisitor() {
    const visitorObj = {
      'name' : this.addVisitorForm.value.visitorName,
      'email' : this.addVisitorForm.value.visitorEmail,
      'phone_no' : this.addVisitorForm.value.visitorPhone,
      'in_time' : this.addVisitorForm.value.visitorInTime,
      'out_time' : this.addVisitorForm.value.visitorOutTime
    };
    this.visitorAdded = false;
    if (visitorObj.in_time) {
      visitorObj.in_time = Date.parse(visitorObj.in_time.toString()).toString();
    }
    if (visitorObj.out_time) {
      visitorObj.out_time = Date.parse(visitorObj.out_time.toString()).toString();
    }
    this.tudipApiSerivce.addVisitor(visitorObj).subscribe((result) => {
      this.dialogRef.close(visitorObj);
      this.visitorAdded = true;
    }, (error) => {
      this.visitorAdded = false;
      this.widgetUtil.openSnackBar(error.error.message, 'Ok');
    });
  }

}
