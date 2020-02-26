import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';

/**
 * Launch screen component.
 * @todo Need to place the list of available backgrounds and sprites in a config .
 */
@Component({
  selector: 'launch-menu-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class LaunchScreenComponent implements OnInit {

  /**
   * Button type 1 sound effect.
   */
  private sfxButton1 = new Audio('assets/sfx/button-click-1.wav');

  /**
   * Button type 2 sound effect.
   */
  private sfxButton2 = new Audio('assets/sfx/button-click-2.wav');

  /**
   * String to keep track of which panel is active.
   */
  private activePanel: string = '';

  /**
   * Object to store the active note being showed to the user, null when inactive.
   */
  private activeNote: any = null;

  /**
   * Object to store the active read-me paragraphs being showed to the user and a format function.
   */
  private activeReadMe: any = {
    paragraphs: null,

    formattedParagraphs() {
      return this.paragraphs ? this.paragraphs.map(p => { return p.trim().replace(/(\t{2,99}|\s{2,99})/g, ' ') }) : null;
    }
  };

  /**
   * Stores the active timeout, allowing us to clear it prematurely.
   */
  private activeTimer: any = null;

  /**
   * The account service constructor.
   * @param {AccountServer} accountService - The account service used for account creation.
   */
  constructor(
    private accountService: AccountService
  ) { }
  
  /**
   * Initialisation function used for loading a random background/hero image.
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
   * This function shows the specified panel.
   * @param {string} id - The ID of the panel to be shown.
   */
  showPanel(id: string) : void {

    // If were showing the create account panel show a read-me
    if (id === 'create-account') {
      this.showReadMe([
        `It is very important that you enter your correct real name, location and email address when
        creating an account. Our system will ask you to enter your real name and email address in
        case you have forgotten your password.`,
        
        `A lot of players who forgot their password, and signed up using fake details, have been 
        unsuccessful in gaining access to their account. So please do not make the same mistake; 
        use real details to sign up for an account.`,
  
        `Your information will only be used for recovering lost passwords. Your privacy is important
        to us.`
      ]);
    }

    // Set the active panel ID
    this.activePanel = id;
  }

  /**
   * Load a randomly chosen background image.
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
   * Load a randomly chosen hero sprite image.
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
   * This function clears the create account form.
   */
  clearCreateAccountForm() : void {
    
    // Get the create account panel
    const createAccountPanel: HTMLElement = document.querySelector('.create-account-panel');

    // Get the create account form fields
    const accountName: HTMLInputElement = createAccountPanel.querySelector('.input-account-name');
    const password: HTMLInputElement = createAccountPanel.querySelector('.input-password');
    const passwordAgain: HTMLInputElement = createAccountPanel.querySelector('.input-type-password-again');
    const realName: HTMLInputElement = createAccountPanel.querySelector('.input-real-name');
    const countyOrLocation: HTMLInputElement = createAccountPanel.querySelector('.input-county-or-location');
    const email: HTMLInputElement = createAccountPanel.querySelector('.input-email');

    // Clear the values
    accountName.value = password.value = passwordAgain.value = realName.value = countyOrLocation.value = email.value = '';
  }

  /**
   * This function hides the active panel.
   */
  hideActivePanel() : void {

    // If we were on the create account panel clear the form and show a read-me
    if (this.activePanel === 'create-account') {
      this.clearCreateAccountForm();
    }

    // If we're authenticated log us out
    if (this.accountService.isAuthed()) {
      this.logoutAccount();
    }
    
    this.activePanel = '';
  }

  /**
   * This function shows the user a note.
   * @param {string} title - Text to be displayed as the note title.
   * @param {string} message - Text to be displayed as the note message.
   * @param {number} timer - OPTIONAL: The number of milliseconds the note and timer will be displayed for.
   * @param {Function} callback - OPTIONAL: The callback function that runs once the timer has ended.
   */
  showNote(title: string, message: string, timer?: number, callback?: Function) : void {
    this.activeNote = { title, message, timer };

    // We have a timer
    if (timer) {

      // Wait 50ms first to make sure the elements are rendered
      setTimeout(() => {

        // Initiate the progress bar
        const bar: HTMLElement = document.querySelector('.note-panel .timer .bar');

        bar.style.transitionDuration = `${timer}ms`;
        bar.style.width = '100%';

        // Set the active timer, it's callback and duration
        this.activeTimer = setTimeout(() => {

          // Clear the note
          this.clearNote();
          
          // Fire the callback function
          callback();
        }, timer);
      }, 50);
    }
  }

  /**
   * This function resets the timer bar.
   */
  resetTimerBar() : void {
    const bar: HTMLElement = document.querySelector('.note-panel .timer .bar');

    bar.style.transitionDuration = null;
    bar.style.width = '0%';
  }

  /**
   * This function clears the active note.
   */
  clearNote() : void {

    // Clear the timer if we have one
    if (this.activeNote.timer) {
      clearTimeout(this.activeTimer);
      this.resetTimerBar();
    }

    this.activeNote = null;
  }

  /**
   * This function shows the user a read-me.
   * @param {array} paragraphs - An array of paragraphs (strings) to load into the read-me.
   */
  showReadMe(paragraphs: string[]) : void {
    this.activeReadMe.paragraphs = paragraphs;
  }

  /**
   * This function clears the active read-me.
   */
  clearReadMe() : void {
    this.activeReadMe.paragraphs = null;

    // Get the message text element
    const messageText: HTMLElement = document.querySelector('.read-me-panel .message-text');
    
    // Reset the scrolling
    messageText.scrollTop = 0;
  }

  /**
   * Lets the user know the server cannot be found.
   */
  showNoServer() : void {
    this.showNote(
      "Could not find server", 
      "The game server could not be found, please try again at a later time."
    );    
  }

  /**
   * Checks the create account form details.
   */
  createAccount() {

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

    // Stop here: Wrong input
    if (wrongInput) {
      this.showNote(
        "Wrong input", 
        "Some of the fields are still empty. Fill in all the fields and try again."
      );

      // Stop here
      return;
    }

    // Stop here: Wrong email
    if (accountInfo.email.indexOf('@') < 0 || accountInfo.email.indexOf('@') > accountInfo.email.lastIndexOf('.')) {
      this.showNote(
        "Wrong input", 
        "Enter a valid email address."
      );

      // Clear the email
      email.value = '';

      // Stop here
      return;
    }

    // Stop here: Wrong password length
    if (accountInfo.password.length < 6) {
      this.showNote(
        "Wrong password", 
        "For your own safety use a longer password (try 6 or more characters)."
      );

      // Clear the passwords
      password.value = passwordAgain.value = '';

      // Stop here
      return;
    }

    // Stop here: Wrong password match
    if (accountInfo.password !== accountInfo.passwordAgain) {
      this.showNote(
        "Wrong password", 
        "The two passwords you provided are not the same, please try again."
      );

      // Clear the passwords
      password.value = passwordAgain.value = '';

      // Stop here
      return;
    }  
    
    // Define the error callback function
    const errorCallback = () => {
  
      // Let the user know the account name already exists
      this.showNote(
        "Already exists",
        "The account name or email you provided already exists in our database, use another."
      );
    };

    // Send the account info to the server via the account service for checking
    this.accountService.check(accountInfo, errorCallback).subscribe(() => {

      // Let them know it's been accepted and create the timer
      this.showNote(
        "Account accepted",
        "Please wait a moment for creation.",
        10000, () => {

          // Send the account info to the server via the account service for creation
          this.accountService.create(accountInfo, errorCallback).subscribe(() => {
            
            // Close the create account panel
            this.hideActivePanel();

            // Show them the welcome message
            this.showNote(
              "Welcome",
              "Use your new account name and password to login to the game."
            );
          });
        }
      );
    });
  }

  /**
   * Checks the login account form details.
   */
  loginAccount() {

    // Get the login account panel
    const playGamePanel: HTMLElement = document.querySelector('.play-game-panel');

    // Get the login account form fields
    const accountName: HTMLInputElement = playGamePanel.querySelector('.input-account-name');
    const password: HTMLInputElement = playGamePanel.querySelector('.input-password');

    // Get the information for account creation provided by the user
    const loginInfo = {
      'accountName': accountName.value,
      'password': password.value
    };

    // Check to make sure we haven't got wrong input
    const wrongInput = (
      ! loginInfo.accountName || 
      ! loginInfo.password
    ) ? true : false;

    // Stop here: Wrong input
    if (wrongInput) {
      this.showNote(
        "Wrong input", 
        "Some of the fields are still empty. Fill in all the fields and try again."
      );

      // Stop here
      return;
    }
    
    // Define the error callback function
    const errorCallback = () => {
  
      // Let the user know the account name already exists
      this.showNote(
        "Login refused",
        "The account or password you provided could not be found in our database."
      );
    };

    // Send the account info to the server via the account service for checking
    this.accountService.login(loginInfo, errorCallback).subscribe((res: any) => {

      window['a'] = this.accountService;

      // Store the access token
      this.accountService.setToken(res.access_token);

      // Let them know it's been accepted and create the timer
      this.showNote(
        "Login success",
        "Loading account data.",
        2000, () => {

          // Show the character slots panel
          this.showPanel('character-slots');
        }
      );
    });
  }

  /**
   * Logs the user out of their account.
   */
  logoutAccount() : void {
    this.accountService.logout();
  }

  /**
   * Shows the user who created the game.
   */
  showCredits() : void {
    this.showNote(
      "Game Credits", 
      "Original Version: Vult-r, Arvid, Teror, Laine, Sakura, DwD, Chaos. Rewritten Version: Hyp6xia, MrCook."
    );
  }

  /**
   * Loads button sound effects adding event listeners.
   */
  loadButtonSFX() : void {
    
    // Wait 50ms first to make sure the elements are rendered
    setTimeout(() => {

      // Load clicking sounds for buttons without button 1 SFX loaded
      document.querySelectorAll('launch-menu-screen .btn-1, launch-menu-screen .btn-2, launch-menu-screen .back-corner')
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
