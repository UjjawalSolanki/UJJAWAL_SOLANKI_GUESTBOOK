import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {TudipApiService} from '../service/tudip-api.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WidgetUtilService} from "../service/widget-util.service";

@Component({
  selector: 'app-update-visitor',
  templateUrl: './update-visitor.component.html',
  styleUrls: ['./update-visitor.component.scss']
})
export class UpdateVisitorComponent implements OnInit {

  updated = true;

  updateVisitorForm: FormGroup;
  visitorName: FormControl;
  visitorEmail: FormControl;
  visitorPhone: FormControl;
  visitorInTime: FormControl;
  visitorOutTime: FormControl;

  constructor(public dialogRef: MatDialogRef<DashboardComponent>, @Inject(MAT_DIALOG_DATA) public data: any
    , private tudipApiSerivce: TudipApiService, private widgetUtil : WidgetUtilService) {}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.visitorName = new FormControl(this.data.name, [
      Validators.required
    ]);
    this.visitorEmail = new FormControl(this.data.email, [Validators.pattern('[^ @]*@[^ @]*')]);
    this.visitorPhone = new FormControl(this.data.phone_no);
    if (this.data.in_time) {
      this.visitorInTime = new FormControl(new Date(parseInt(this.data.in_time)), [
        Validators.required
      ]);
    } else {
      this.visitorInTime = new FormControl('',[
        Validators.required
      ]);
    }
    if (this.data.out_time) {
      this.visitorOutTime = new FormControl(new Date(parseInt(this.data.out_time)));
    } else {
      this.visitorOutTime = new FormControl('');
    }
  }

  createForm() {
    this.updateVisitorForm = new FormGroup({
      visitorName: this.visitorName,
      visitorEmail: this.visitorEmail,
      visitorPhone: this.visitorPhone,
      visitorInTime: this.visitorInTime,
      visitorOutTime: this.visitorOutTime,
    });
  }

  updateVisitor() {
    const visitorObj = {
      'name' : this.updateVisitorForm.value.visitorName,
      'email' : this.updateVisitorForm.value.visitorEmail,
      'phone_no' : this.updateVisitorForm.value.visitorPhone,
      'in_time' : this.updateVisitorForm.value.visitorInTime,
      'out_time' : this.updateVisitorForm.value.visitorOutTime,
      'id' : this.data.id,
      'user_id' : this.data.user_id,
    };
    visitorObj.in_time = visitorObj.in_time ? Date.parse(visitorObj.in_time.toString()).toString() : '0';
    visitorObj.out_time = visitorObj.out_time ? Date.parse(visitorObj.out_time.toString()).toString() : '0';
    this.updated = false;
    this.tudipApiSerivce.updateVisitor(visitorObj).subscribe((result) => {
      this.dialogRef.close(this.data);
      this.updated = true;
    }, (error) => {
      this.widgetUtil.openSnackBar(error.error.message, 'Ok');
    });
  }

}
