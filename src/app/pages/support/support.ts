import {
  Component,
  ViewEncapsulation,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";
import { NgForm } from "@angular/forms";

import {
  AlertController,
  ToastController,
  GestureController
} from "@ionic/angular";

@Component({
  selector: "page-support",
  templateUrl: "support.html",
  styleUrls: ["./support.scss"]
})
export class SupportPage implements AfterViewInit {
  submitted = false;
  supportMessage: string;
  @ViewChild("logo", { read: ElementRef, static: true }) logo: ElementRef;

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public gestureCtrl: GestureController,
    public renderer: Renderer2
  ) {}

  async ngAfterViewInit() {
    let gesture = await this.gestureCtrl.create({
      el: this.logo.nativeElement,
      gestureName: "tinder-swipe",
      gesturePriority: 100,
      threshold: 5,
      passive: false,
      onStart: () => {
        console.log("starting");
        this.renderer.setStyle(this.logo.nativeElement, "transition", "none");
      },
      onMove: ev => {
        console.log(ev);
        this.renderer.setStyle(
          this.logo.nativeElement,
          "transform",
          `translateX(${ev.deltaX}px)`
        );
      },
      onEnd: ev => {
        console.log("ending");
        console.log(ev);

        this.renderer.setStyle(
          this.logo.nativeElement,
          "transition",
          "0.4s ease-out"
        );
        if (ev.deltaX > 125) {
          this.renderer.setStyle(
            this.logo.nativeElement,
            "transform",
            `translateX(400px)`
          );
        } else if (ev.deltaX < -125) {
          this.renderer.setStyle(
            this.logo.nativeElement,
            "transform",
            `translateX(-400px)`
          );
        } else {
          this.renderer.setStyle(
            this.logo.nativeElement,
            "transform",
            `translateX(0px)`
          );
        }
      }
    });
    gesture.enable(true);
  }

  async ionViewDidEnter() {
    const toast = await this.toastCtrl.create({
      message: "This does not actually send a support request.",
      duration: 3000
    });
    await toast.present();
  }

  async submit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.supportMessage = "";
      this.submitted = false;

      const toast = await this.toastCtrl.create({
        message: "Your support request has been sent.",
        duration: 3000
      });
      await toast.present();
    }
  }

  // If the user enters text in the support question and then navigates
  // without submitting first, ask if they meant to leave the page
  // async ionViewCanLeave(): Promise<boolean> {
  //   // If the support message is empty we should just navigate
  //   if (!this.supportMessage || this.supportMessage.trim().length === 0) {
  //     return true;
  //   }

  //   return new Promise((resolve: any, reject: any) => {
  //     const alert = await this.alertCtrl.create({
  //       title: 'Leave this page?',
  //       message: 'Are you sure you want to leave this page? Your support message will not be submitted.',
  //       buttons: [
  //         { text: 'Stay', handler: reject },
  //         { text: 'Leave', role: 'cancel', handler: resolve }
  //       ]
  //     });

  //     await alert.present();
  //   });
  // }
}
