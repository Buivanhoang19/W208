import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { User } from '../../interfaces/User';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, RouterLinkActive, RouterModule]
})
export class LoginComponent implements OnInit {
  users: User[] = [];
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }
  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router,

  ) { }

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() { return this.loginForm.controls['password']; }


  loginUser(): void {

    if (this.loginForm.valid) {

      const loginData = this.loginForm.value;

      this.authservice.login(loginData).subscribe((data: any) => {
        if (data) {
          console.log("ABC", data);
          this.authservice.checkAdminAccess()
          this.router.navigate(['/admin']);
        } else {
          console.error('Invalid email or password');
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }


}