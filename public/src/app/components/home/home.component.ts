import { Component, OnInit } from '@angular/core';
import canvas from '../../../assets/scripts/canvas.js';
import typingEffect from '../../../assets/scripts/typingEffect.js';
import parallax from '../../../assets/scripts/parallax.js';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    canvas();
    typingEffect();
    parallax();
  }

}
