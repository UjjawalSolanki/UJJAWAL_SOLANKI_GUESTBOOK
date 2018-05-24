import { Component, OnInit } from '@angular/core';
import {TudipApiService} from '../service/tudip-api.service';
import {DeleteVisitorDialogComponent} from '../delete-visitor-dialog/delete-visitor-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UpdateVisitorComponent} from '../update-visitor/update-visitor.component';
import {WidgetUtilService} from '../service/widget-util.service';
import {AddVisitorComponent} from '../add-visitor/add-visitor.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  visitorListAvailable = false;
  visitorsList: Array<any> = [];

  constructor(private tudipApi: TudipApiService, private dialog: MatDialog, public widget: WidgetUtilService
  , private router: Router, private widgetUtil : WidgetUtilService) { }

  ngOnInit() {
    this.getVisitorList();
  }

  getVisitorList() {
    this.tudipApi.getVisitors().subscribe((result: any) => {
      console.log(result);
      this.visitorsList = result;
      this.visitorListAvailable = true;
    }, (error) => {
      this.visitorListAvailable = true;
      this.widget.openSnackBar(error.error.message, 'Ok');
    });
  }

  openDeleteDialog(visitor) {
    const dialogRef = this.dialog.open(DeleteVisitorDialogComponent, {
      data : visitor
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.visitorsList = [];
        this.visitorListAvailable = false;
        this.getVisitorList();
        this.widget.openSnackBar(`${result.name} removed successfully!`, 'Ok');
      }
    });
  }


  updateVisitorDialog(visitor) {
    const dialogRef = this.dialog.open(UpdateVisitorComponent, {
      data : visitor
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.visitorsList = [];
        this.visitorListAvailable = false;
        this.getVisitorList();
        this.widget.openSnackBar(`${result.name} updated successfully!`, 'Ok');
      }
    });
  }

  addVisitor() {
    const dialogRef = this.dialog.open(AddVisitorComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.visitorsList = [];
        this.visitorListAvailable = false;
        this.getVisitorList();
        this.widget.openSnackBar(`${result.name} added successfully!`, 'Ok');
      }
    });
  }

  openProfile(id) {
    this.router.navigate(['/visitorprofile/', id]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.widgetUtil.openSnackBar('Logged out successfully!', 'Ok');
  }

}
