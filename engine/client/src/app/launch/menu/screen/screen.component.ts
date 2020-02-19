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
   * Button type 1 sound effect
   */
  private sfxButton1 = new Audio('assets/sfx/button-click-1.wav');

  /**
   * String to keep track of which panel is active
   */
  private activePanel: string = '';

  /**
   * Constructor
   */
  constructor() { }
  
  /**
   * Initialisation function used for loading a random background/hero image
   */
  ngOnInit() : void {

    // Load the launch screen music
    const music = new Audio('assets/mfx/launch-menu-screen.mp3');

    // Set it to loop
    music.loop = true;

    // Set the volume to 75%
    music.volume = 0.75;

    // If the music isn't playing we need to play it (need to wait for user interaction first) 
    document.querySelector('launch-menu-screen').addEventListener('mousemove', e => {
      
      // No music is playing and we have an interaction
      if (music.paused) {

        // Play the music
        music.play();
      }
    });

    // Load the button sound effects
    this.loadButtonSFX();

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

  /**
   * This function shows the specified panel
   */
  showPanel(id: string) : void {
    this.activePanel = id;    
    this.loadButtonSFX();
  }

  /**
   * This function hides the active panel
   */
  hideActivePanel() : void {
    this.activePanel = '';
  }

  /**
   * Loads button sound effects adding event listeners
   */
  loadButtonSFX() : void {
    
    // Wait 50ms first to make sure the elements are rendered
    setTimeout(() => {

      // Load clicking sounds for buttons without SFX loaded
      document.querySelectorAll('launch-menu-screen .btn-1, launch-menu-screen .btn-2')
        .forEach((btn: any) => {

          // This button has no SFX loadbtnd
          if (! btn.loadedSFX) {

            // Add the event listener
            btn.addEventListener('click', () => {

              // Play the SFX
              this.sfxButton1.play();
            });
            
            // Mark it as having loaded
            btn.loadedSFX = true;
          }
        });
    }, 50);
  }
}
