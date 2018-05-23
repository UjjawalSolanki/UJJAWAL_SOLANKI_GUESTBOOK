import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TudipApiService} from '../service/tudip-api.service';

@Component({
  selector: 'app-visitor-profile',
  templateUrl: './visitor-profile.component.html',
  styleUrls: ['./visitor-profile.component.scss']
})
export class VisitorProfileComponent implements OnInit {

  visitorId: any = '';
  visitorProfile: Object = {};
  visitorProfileAvailable = true;

  constructor(private route: ActivatedRoute, private tudipApi: TudipApiService ) {
    this.route.params.subscribe((params: any) => {
      this.visitorId = params['id'];
      this.getVisitor();
    });
  }

  ngOnInit() {
  }

  getVisitor() {
    this.visitorProfileAvailable = false;
    this.tudipApi.getVisitor(this.visitorId).subscribe((result: any) => {
      this.visitorProfile = result.visitor;
      this.visitorProfileAvailable = true;
    }, (error) => {
      this.visitorProfileAvailable = true;
      console.log(error);
    });

  }

}
