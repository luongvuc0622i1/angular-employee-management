import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LoginForm} from "../model/LoginForm";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {TokenService} from "../service/token.service";
import {SignUpForm} from "../model/SignUpForm";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, AfterViewInit {
  loginForm: LoginForm | undefined;
  form: any = {};
  statusLogin: string = '';
  statusRegister: string = '';
  signUpForm: SignUpForm | undefined;

  ngOnInit(): void {
  }

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) { }

  ngAfterViewInit() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    // @ts-ignore
    signUpButton.addEventListener('click', () => {
      // @ts-ignore
      container.classList.add("right-panel-active");
    });

    // @ts-ignore
    signInButton.addEventListener('click', () => {
      // @ts-ignore
      container.classList.remove("right-panel-active");
    });

    // Show password click eye
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#id_password');

    // @ts-ignore
    togglePassword.addEventListener('click', function (e) {
      // toggle the type attribute
      // @ts-ignore
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      // @ts-ignore
      password.setAttribute('type', type);
      // toggle the eye slash icon
      // @ts-ignore
      this.classList.toggle('fa-eye-slash');
    });

    // Show password click eye2
    const togglePassword2 = document.querySelector('#togglePassword2');
    const password2 = document.querySelector('#id_password2');

    // @ts-ignore
    togglePassword2.addEventListener('click', function (e) {
      // toggle the type attribute
      // @ts-ignore
      const type2 = password2.getAttribute('type') === 'password' ? 'text' : 'password';
      // @ts-ignore
      password2.setAttribute('type', type2);
      // toggle the eye slash icon
      // @ts-ignore
      this.classList.toggle('fa-eye-slash');
    });

    // Show password click eye1
    const togglePassword1 = document.querySelector('#togglePassword1');
    const password1 = document.querySelector('#id_password1');

    // @ts-ignore
    togglePassword1.addEventListener('click', function (e) {
      // toggle the type attribute
      // @ts-ignore
      const type1 = password1.getAttribute('type') === 'password' ? 'text' : 'password';
      // @ts-ignore
      password1.setAttribute('type', type1);
      // toggle the eye slash icon
      // @ts-ignore
      this.classList.toggle('fa-eye-slash');
    });
  }

  login() {
    this.loginForm = new LoginForm(
      this.form.username,
      this.form.password
    );
    this.authService.login(this.form).subscribe(data => {
        console.log('Login data --- >', data);
        if (data.token != undefined) {
          this.tokenService.setID(data.id);
          this.tokenService.setToken(data.token);
          this.tokenService.setUsername(data.username);
          this.tokenService.setRoleSet(data.roleSet);

          this.statusLogin = 'Login Success!';
          this.router.navigate(['/home']);
          // if (data.roleSet[0].name == 'MANAGER') {
          //   this.router.navigate(['/manager/profile']);
          // } else if (data.roleSet[0].name == 'USER') {
          //   this.router.navigate(['/user/home']);
          // } else if (data.roleSet[0].name == 'ADMIN') {
          //   this.router.navigate(['/admin/profile']);
          // }
        }
        // @ts-ignore
        if (data.message === 'lock') {
          this.statusLogin = 'Your account has been disabled, please contact admin!';
          return;
        }

      },
      we => {
        console.log('we of login ---> ', we);
        if (we.status == 400) {
          console.log('Login Failed!');
          this.statusLogin = 'Login Failed! Please check your account or password!';
        }
        else {
          this.statusLogin = 'Error!!!!!!';
        }
      })
  }

  register() {
    this.signUpForm = new SignUpForm(
      this.form.username,
      this.form.email,
      this.form.newPassword,
      // @ts-ignore
      this.form.status
    );

    if (this.form.newPassword !== this.form.confirmPassword) {
      this.statusRegister = 'Confirm password not match! Please try again!';
      return;
    } else {
      this.authService.signUp(this.signUpForm).subscribe(data => {
          console.log('data ---> ', data);
          if (data != null) {
            this.statusRegister = 'Register Success!';
            return;
          }
        }, we => {
          console.log('we ---> ', we);
          console.log('message --->', we.error.message);
          if (we.error.message === 'nouser') {
            this.statusRegister = 'Username is existed! Please try again!';
            return;
          } else if (we.error.message === 'noemail') {
            this.statusRegister = 'Email is existed! Please try again!';
            return;
          } else {
            this.statusRegister = 'Mail invalid! Please try again!';
          }
        }
      )
    }
  }
}
