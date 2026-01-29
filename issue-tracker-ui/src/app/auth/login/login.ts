import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
   email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        console.log('Login Response:', res);
        localStorage.setItem('user', JSON.stringify(res));

        if (res.role_name === 'Admin') {
          this.router.navigate(['/admin']);
        } 
        else if (res.role_name === 'Developer') {
          this.router.navigate(['/developer']);
        } 
        else {
          alert('Unknown role ❌');
        }
      },
      error: () => {
        this.message = 'Invalid email or password ❌';
      }
    });
  }
}
