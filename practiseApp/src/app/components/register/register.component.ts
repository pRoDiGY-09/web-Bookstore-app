import { Component } from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { User } from '../../models/user';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  public user:User[]=[];
  RegisterForm:FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router:Router,
    private account:AccountService
  ) {
    this.RegisterForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
 get name() {
    return this.RegisterForm.get('name');
  }

  get email() {
    return this.RegisterForm.get('email');
  }

  get password() {
    return this.RegisterForm.get('password');
  }


  onSubmit(){
   if (this.RegisterForm.invalid){
    this.RegisterForm.markAllAsTouched();
    return
   }
   const { name, email, password } = this.RegisterForm.value;
   const newUser: User = {
    name,
    email,
    password
  };
  this.account.RegisterUser(newUser).subscribe({
    next:(res)=>{
      console.log("user registered!",res)
    },
    error:(err)=>{
      console.log("not registerd",err)
    }
  })
    this.router.navigate(['/login'])
  }
}
