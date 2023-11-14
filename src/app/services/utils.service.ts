import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  AlertOptions,
  LoadingController,
  LoadingOptions,
  ModalController,
  ModalOptions,
  ToastController,
  ToastOptions
} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }


  // ROUTER
  routerLink(url: string) {
    return this.router.navigateByUrl(url)
  }

  // LOADING
  async presentLoading(options?: LoadingOptions) {
    const loading = await this.loadingController.create(options);
    await loading.present();
  }

  async dismissLoading() {
    return await this.loadingController.dismiss()
  }

  // LOCAL STORAGE
  setElementInLocalStorage(key: string, element: any) {
    return localStorage.setItem(key, JSON.stringify(element))
  }

  getElementFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key))
  }

  deleteElementFromLocalStorage(key: string) {
    localStorage.removeItem(key)
  }

  async presentToast(options: ToastOptions) {
    const toast = await this.toastController.create(options);
    toast.present();
  }

  // ALERTA
  async presentAlert(options: AlertOptions) {
    const alert = await this.alertController.create(options);

    await alert.present();
  }

  // MODAL
  async presentModal(options: ModalOptions) {
    const modal = await this.modalController.create(options);

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      return data;
    }
  }

  dismissModal(data?: any) {
    this.modalController.dismiss(data);
  }
}
