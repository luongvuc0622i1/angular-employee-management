import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username: any;
  role: any;
  ngOnInit(): void {
    this.username = this.tokenService.getUsername();
    this.role = this.tokenService.getRole().slice(5);
  }

  constructor(private tokenService: TokenService, private router: Router) { }

  logout() {
    localStorage.removeItem('ID_KEY');
    localStorage.removeItem('Token_Key');
    localStorage.removeItem('Username_Key');
    localStorage.removeItem('Role_Key');
    this.router.navigate(['/account']);
  }
}