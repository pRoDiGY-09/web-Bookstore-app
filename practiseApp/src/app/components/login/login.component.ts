import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 LoginForm:FormGroup
  token:any;
  user:any;
 constructor(
  private fb:FormBuilder,
  private account:AccountService,
  private router:Router
  ){
  this.LoginForm=this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
 }

 get email() {
    return this.LoginForm.get('email');
  }

  get password() {
    return this.LoginForm.get('password');
  }

  onLogin(){
    if (this.LoginForm.invalid){
    this.LoginForm.markAllAsTouched();
    return
   }

   const {email,password}=this.LoginForm.value;
   const user={
    email,
    password
   }
   this.account.LoginUser(user).subscribe({
    next:(res:any)=>{
      console.log("logged in",res)
      this.account.StoreData(res.token,res.user)
      this.router.navigate(['/profile']);
    },
    error:(err)=>{
      console.log("error",err)
    }
   })
  }

 
}
