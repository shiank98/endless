import { Component, OnInit } from '@angular/core';

/**
 * Launch screen component
 * @todo Need to place the list of available backgrounds and sprites in a config 
 */
@Component({
  selector: 'launch-menu-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class LaunchScreenComponent implements OnInit {

  /**
   * Constructor
   */
  constructor() { }
  
  /**
   * Initialisation function used for loading a random background/hero image
   */
  ngOnInit() : void {

    // Get a random background number from 1-7
    const bg = Math.floor(Math.random() * Math.ceil(7)) + 1;

    // Get the launch menu screen element
    let lms = document.querySelector('launch-menu-screen');

    // Load up the random background
    lms['style']['backgroundImage'] = `url("assets/ui/launch/backgrounds/${bg}.bmp")`;

    // Get a random hero sprite number from 1-12
    const sprite = Math.floor(Math.random() * Math.ceil(12)) + 1;

    // Get the hero element
    let hero = document.querySelector('launch-menu-screen .hero');

    // Load up the random sprite
    hero['style']['backgroundImage'] = `url("assets/ui/launch/backgrounds/heros/${sprite}.png")`;
  }
}
