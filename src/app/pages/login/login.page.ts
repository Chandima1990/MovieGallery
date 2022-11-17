import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertController: AlertController

  ) { }
  ngOnInit() {
    console.log();

  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.email === null || this.password === null) {
      return;
    }

    await this.authService.login(this.email.value!, this.password.value!).then(() => {
      loading.dismiss();
      this.router.navigateByUrl('/tabs/popular');
    }).catch(async (error) => {
      loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Error',
        message: error.message,
        buttons: ['OK']
      });
      await alert.present();
    });
  }

  async register() {
    const loading = await this.loadingCtrl.create();

    if (this.email === null || this.password === null) {
      return;
    }

    const user = await this.authService.register(this.email.value!, this.password.value!);
    await loading.present();

    if (user) {
      await loading.dismiss();
      this.router.navigateByUrl('/tabs/popular');
      return;
    }

    await loading.dismiss();
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Something went wrong',
      buttons: ['OK']
    });
    await alert.present();
  }


  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
