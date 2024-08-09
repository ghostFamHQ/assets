(function(window) {
  function DarkMode(config) {
    config = config || {};
    
    // Set default local storage name
    this.localStorageKey = config.localStorageKey || "tailkit-templates-dark-mode";

    // Set default icons
    this.iconOn = config.iconOn || '<svg class="hi-mini hi-moon inline-block w-5 h-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clip-rule="evenodd"/></svg>';
    this.iconOff = config.iconOff || '<svg class="hi-mini hi-sun inline-block w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z"/></svg>';
    this.iconSystemOn = config.iconSystemOn || '<svg class="hi-mini hi-moon inline-block w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clip-rule="evenodd"/></svg>';
    this.iconSystemOff = config.iconSystemOff || '<svg class="hi-mini hi-sun inline-block w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z"/></svg>';

    // Get dark mode preference
    this.darkModePreference = this.getDarkModePreference();

    // Configuration
    this.uiFeedback = config.uiFeedback !== false;
    this.uiButtonActions = config.uiButtonActions !== false;
    this.uiOnLoad = config.uiOnLoad !== false;

    // Init
    if (config.init !== false) {
      this.init({
        uiFeedback: this.uiFeedback,
        uiButtonActions: this.uiButtonActions,
        uiOnLoad: this.uiOnLoad,
      });
    }
  }

  DarkMode.prototype.init = function(config) {
    var self = this;
    
    // Set dark mode preference
    this.setDarkMode(this.darkModePreference, false);

    // If dark mode preference is changed on system, update it accordingly if dark mode is set to "system"
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addListener(function() {
        if (self.darkModePreference === "system") {
          self.setDarkMode("system", false);

          if (self.uiFeedback) {
            self.updateFeedback();
          }
        }
      });

    // Init UI functionality for feedback on page load
    if (config.uiFeedback && config.uiOnLoad) {
      this.onLoad(function() {
        self.updateFeedback();
      });
    }

    // Init UI functionality for button actions on page load
    if (config.uiButtonActions && config.uiOnLoad) {
      this.onLoad(function() {
        self.initButtonActions();
      });
    }
  };

  DarkMode.prototype.getDarkModePreference = function() {
    return localStorage.getItem(this.localStorageKey) || "system";
  };

  DarkMode.prototype.saveDarkModePreference = function(preference) {
    localStorage.setItem(this.localStorageKey, preference);
  };

  DarkMode.prototype.setDarkMode = function(preference, save) {
    save = save !== false;
    
    if (preference === "on") {
      document.documentElement.classList.add("dark");
    } else if (preference === "off") {
      document.documentElement.classList.remove("dark");
    } else if (preference === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    // Save current preference
    if (save && ["on", "off", "system"].indexOf(preference) !== -1) {
      this.darkModePreference = preference;
      this.saveDarkModePreference(preference);

      if (this.uiFeedback) {
        this.updateFeedback();
      }
    }
  };

  DarkMode.prototype.updateFeedback = function() {
    var feedback = document.getElementById("darkModeFeedback");
    var feedbackIcon = document.getElementById("darkModeFeedbackIcon");

    if (feedback) {
      feedback.innerText = this.darkModePreference;
    }

    if (feedbackIcon) {
      if (this.darkModePreference === "on") {
        feedbackIcon.innerHTML = this.iconOn;
      } else if (this.darkModePreference === "off") {
        feedbackIcon.innerHTML = this.iconOff;
      } else {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          feedbackIcon.innerHTML = this.iconSystemOn;
        } else {
          feedbackIcon.innerHTML = this.iconSystemOff;
        }
      }
    }
  };

  DarkMode.prototype.initButtonActions = function() {
    var self = this;
    var buttons = document.querySelectorAll('[data-toggle="dark-mode"]');

    if (buttons) {
      buttons.forEach(function(el) {
        el.addEventListener("click", function() {
          var preference = el.dataset.preference;

          if (["on", "off", "system"].indexOf(preference) !== -1) {
            self.setDarkMode(preference);
          }
        });
      });
    }
  };

  DarkMode.prototype.onLoad = function(fn) {
    if (document.readyState != "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  };

  // Expose DarkMode to the global object
  window.DarkMode = DarkMode;
})(window);

// Usage
var darkMode = new DarkMode();
