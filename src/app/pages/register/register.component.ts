import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  
  ) {
    
  }
  
  ngOnInit(): void {this.registerForm = this.fb.group({
      
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.minLength(5)]]
    
  })}
  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }
  submitDetails() {
    if(this.registerForm.valid){
    this.authService.register(this.registerForm.value).subscribe(
      data => {console.log('Create product successfully!', data);
      alert("đăng kí thành công")
      this.router.navigate(['/login'])
      }
    )
  }else{
    alert("Vui lòng nhập đủ điều kiện");
  }
}
}