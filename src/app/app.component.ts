import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor (private router: Router) {
    /*this.router.events.subscribe((val) => {
      console.log(typeof localStorage.getItem('token'));
      if (localStorage.getItem('token') == null) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/login']);
      }
    });*/
  }
}
