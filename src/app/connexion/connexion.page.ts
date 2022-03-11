import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {}

  get email() {
    return this.credentials.get('email');
  }

  get motdepasse() {
    return this.credentials.get('motdepasse');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motdepasse: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async sinscrire() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.sinscrire(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/home', { replaceUrl: true});
    } else {
      this.showAlert('Échec de linscription', 'Veuillez réssayer !');
    }
  }

  async connexion() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.connexion(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/home', { replaceUrl: true});
    } else {
      this.showAlert('Échec de la connexion', 'Veuillez réssayer !');
    }
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}