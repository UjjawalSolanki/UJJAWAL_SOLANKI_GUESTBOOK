import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {TudipApiService} from '../service/tudip-api.service';
import {WidgetUtilService} from '../service/widget-util.service';

@Component({
  selector: 'app-delete-visitor-dialog',
  templateUrl: './delete-visitor-dialog.component.html',
  styleUrls: ['./delete-visitor-dialog.component.scss']
})
export class DeleteVisitorDialogComponent implements OnInit {

  deleted = true;

  constructor(public dialogRef: MatDialogRef<DashboardComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  , private tudipApiSerivce: TudipApiService, public widget: WidgetUtilService ) {
  }

  ngOnInit() {
  }

  deleteVisitor() {
    this.deleted = false;
    this.tudipApiSerivce.removeVisitor(this.data.id).subscribe((result) => {
      this.dialogRef.close(this.data);
      this.deleted = true;
    }, (error) => {
      this.widget.openSnackBar(error.error.message, 'Ok');
    });
  }

}
