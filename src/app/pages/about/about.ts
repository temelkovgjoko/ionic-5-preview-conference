import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { PopoverController } from "@ionic/angular";

import { PopoverPage } from "../about-popover/about-popover";
import { AnimationController } from "@ionic/angular";
@Component({
  selector: "page-about",
  templateUrl: "about.html",
  styleUrls: ["./about.scss"]
})
export class AboutPage implements AfterViewInit {
  @ViewChild("title", { read: ElementRef, static: true }) title: ElementRef;
  conferenceDate = "2047-05-17";

  constructor(
    public popoverCtrl: PopoverController,
    private animationCtrl: AnimationController
  ) {}

  ngAfterViewInit() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.title.nativeElement)
      .duration(1400)
      .iterations(Infinity)
      .fromTo("transform", "translateX(0px)", "translateX(100px)")
      .fromTo("opacity", 1, 0.2);

    animation.play();
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event
    });
    await popover.present();
  }
}
