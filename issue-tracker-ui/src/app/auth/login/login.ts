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
      if (!res.user.is_active) {
        alert("User is not active!");
        return;
      }
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      if (res.user.role === 'Admin') {
        this.router.navigate(['/admin']);
      } else if (res.user.role === 'Developer') {
        this.router.navigate(['/developer']);
      }
    },
    error: (err) => {
      if (err.status === 401 && err.error) {
        alert(err.error); 
      } else {
        alert("Login failed ❌");
      }
    }
  });
}
}
