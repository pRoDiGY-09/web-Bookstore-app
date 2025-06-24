import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  // imports:[RouterOutlet],
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'practiseApp';


  constructor(public acc:AccountService,private router:Router){}

  logoutClicked(){
    this.acc.logout();
    this.router.navigate(['/login'])
  }
}
