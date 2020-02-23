import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';

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
   * Button type 2 sound effect
   */
  private sfxButton2 = new Audio('assets/sfx/button-click-2.wav');

  /**
   * String to keep track of which panel is active
   */
  private activePanel: string = '';

  /**
   * Object to store the active note being showed to the user, null when inactive
   */
  private activeNote: any = null;

  /**
   * Constructor
   */
  constructor(
    private accountService: AccountService
  ) { }
  
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

    // Load the background image
    this.loadBackgroundImage();

    // Load the hero image
    this.loadHeroImage();
  }

  /**
   * This function shows the specified panel
   */
  showPanel(id: string) : void {
    this.activePanel = id;
  }

  /**
   * Load a randomly chosen background image
   */
  loadBackgroundImage() {

    // Get a random background number from 1-7
    const bg = Math.floor(Math.random() * Math.ceil(7)) + 1;

    // Get the launch menu screen element
    let lms = document.querySelector('launch-menu-screen');

    // Load up the random background
    lms['style']['backgroundImage'] = `url("assets/ui/launch/backgrounds/${bg}.bmp")`;
  }
  
  /**
   * Load a randomly chosen hero sprite image
   */
  loadHeroImage() : void {

    // Get the hero element
    let hero = document.querySelector('launch-menu-screen .hero');

    // If we have a hero sprite image already loaded get the file name number
    const currentHero = hero['style']['backgroundImage'] ? (
      parseInt(hero['style']['backgroundImage'].match(/(\d+)/g)[0])
    ) : null;
    
    // Get a random hero sprite number from 1-12
    const sprite = Math.floor(Math.random() * Math.ceil(12)) + 1;

    // Got the same hero as the current one so run again
    if (sprite === currentHero) {
      this.loadHeroImage(); return;
    }

    // Load up the random sprite
    hero['style']['backgroundImage'] = `url("assets/ui/launch/backgrounds/heros/${sprite}.png")`;
  }

  /**
   * This function hides the active panel
   */
  hideActivePanel() : void {
    this.activePanel = '';
  }

  /**
   * This function shows the user a note
   */
  showNote(title: string, message: string) : void {
    this.activeNote = { title, message };    
  }

  /**
   * This function clears the active note
   */
  clearNote() : void {
    this.activeNote = null;
  }

  /**
   * Lets the user know the server cannot be found
   */
  showNoServer() : void {
    this.showNote(
      "Could not find server", 
      "The game server could not be found, please try again at a later time."
    );    
  }

  /**
   * Checks the create account form details
   */
  createAccount() : void {

    // Get the create account panel
    const createAccountPanel: HTMLElement = document.querySelector('.create-account-panel');

    // Get the create account form fields
    const accountName: HTMLInputElement = createAccountPanel.querySelector('.input-account-name');
    const password: HTMLInputElement = createAccountPanel.querySelector('.input-password');
    const passwordAgain: HTMLInputElement = createAccountPanel.querySelector('.input-type-password-again');
    const realName: HTMLInputElement = createAccountPanel.querySelector('.input-real-name');
    const countyOrLocation: HTMLInputElement = createAccountPanel.querySelector('.input-county-or-location');
    const email: HTMLInputElement = createAccountPanel.querySelector('.input-email');

    // Get the information for account creation provided by the user
    const accountInfo = {
      'accountName': accountName.value,
      'password': password.value,
      'passwordAgain': passwordAgain.value,
      'realName': realName.value,
      'countyOrLocation': countyOrLocation.value,
      'email': email.value
    };

    // Check to make sure we haven't got wrong input
    const wrongInput = (
      ! accountInfo.accountName || 
      ! accountInfo.password || 
      ! accountInfo.passwordAgain || 
      ! accountInfo.realName || 
      ! accountInfo.countyOrLocation ||
      ! accountInfo.email
    ) ? true : false;

    // Stop here: We have wrong input
    if (wrongInput) {
      this.showNote(
        "Wrong input", 
        "Some of the fields are still empty. Fill in all the fields and try again."
      );

      // Stop here
      return;
    }

    // We have correct input so send the account info to the server via the account service
    this.accountService.create(accountInfo);
  }

  /**
   * Shows the user who created the game
   */
  showCredits() : void {
    this.showNote(
      "Game Credits", 
      "Original Version: Vult-r, Arvid, Teror, Laine, Sakura, DwD, Chaos. Rewritten Version: Hyp6xia, MrCook."
    );
  }

  /**
   * Loads button sound effects adding event listeners
   */
  loadButtonSFX() : void {
    
    // Wait 50ms first to make sure the elements are rendered
    setTimeout(() => {

      // Load clicking sounds for buttons without button 1 SFX loaded
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

      // Load clicking sounds for buttons without button 2 SFX loaded
      document.querySelectorAll('launch-menu-screen .btn-3')
        .forEach((btn: any) => {

          // This button has no SFX loadbtnd
          if (! btn.loadedSFX) {

            // Add the event listener
            btn.addEventListener('click', () => {

              // Play the SFX
              this.sfxButton2.play();
            });
            
            // Mark it as having loaded
            btn.loadedSFX = true;
          }
        });
    }, 50);
  }
}
