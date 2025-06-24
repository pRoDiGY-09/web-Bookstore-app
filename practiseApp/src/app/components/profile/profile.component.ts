import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: any;

  constructor(private acc:AccountService, private router:Router){}

  ngOnInit(){
    this.getUserData()
  }

  getUserData(){
    this.acc.getProfile().subscribe({
      next:(res:any)=>{
        this.user=res.user
        console.log(res.user)
      }
    })
  }

  backToHome(){
    this.router.navigate(['/'])
  }
}
