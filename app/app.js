(function(){

var $  = document.getElementById.bind(document);
var $$ = document.querySelectorAll.bind(document);

var App = function($el){
  this.$el = $el;
  this.load();
  this.loadColors();

  this.$el.addEventListener(
    'submit', this.submit.bind(this)
  );

  if (this.dob) {
    this.renderAgeLoop();
  } else {
    this.renderChoose();
  }
  
  this.initSettings();
};

App.fn = App.prototype;

App.fn.load = function(){
  var value;

  if (value = localStorage.dob)
    this.dob = new Date(parseInt(value));
};

App.fn.save = function(){
  if (this.dob)
    localStorage.dob = this.dob.getTime();
};

App.fn.resetBirthday = function(){
  // Clear the running age counter interval
  if (this.interval) {
    clearInterval(this.interval);
    this.interval = null;
  }
  
  localStorage.removeItem('dob');
  this.dob = null;
  this.renderChoose();
};

App.fn.loadColors = function(){
  var colors = JSON.parse(localStorage.getItem('motivationColors')) || {
    bgColor: '#ffffff',
    textColor: '#494949'
  };
  
  this.applyColors(colors);
};

App.fn.saveColors = function(colors){
  localStorage.setItem('motivationColors', JSON.stringify(colors));
};

App.fn.applyColors = function(colors){
  document.documentElement.style.setProperty('--bg-color', colors.bgColor);
  document.documentElement.style.setProperty('--text-color', colors.textColor);
  document.documentElement.style.setProperty('--label-color', colors.textColor);
  document.documentElement.style.setProperty('--accent-color', colors.textColor);
};



App.fn.submit = function(e){
  e.preventDefault();

  var input = this.$$('input')[0];
  if ( !input.valueAsDate ) return;

  this.dob = input.valueAsDate;
  this.save();
  this.renderAgeLoop();
};

App.fn.renderChoose = function(){
  this.html(this.view('dob')());
};

App.fn.renderAgeLoop = function(){
  this.interval = setInterval(this.renderAge.bind(this), 100);
};

App.fn.renderAge = function(){
  var now       = new Date
  var duration  = now - this.dob;
  var years     = duration / 31556900000;

  var majorMinor = years.toFixed(9).toString().split('.');

  requestAnimationFrame(function(){
    this.html(this.view('age')({
      year:         majorMinor[0],
      milliseconds: majorMinor[1]
    }));
  }.bind(this));
};

App.fn.$$ = function(sel){
  return this.$el.querySelectorAll(sel);
};

App.fn.html = function(html){
  this.$el.innerHTML = html;
};

App.fn.view = function(name){
  if (name === 'dob') {
    return function() {
      return `
        <form>
          <h1 id="dob" class="age-label">When were you born?</h1>
          <footer>
            <input type="date" name="dob" id="dob">
            <button type="submit">Motivate</button>
          </footer>
        </form>
      `;
    };
  } else if (name === 'age') {
    return function(data) {
      return `
        <h1 class="age-label">AGE</h1>
        <h2 class="count">${data.year}<sup>.${data.milliseconds}</sup></h2>
      `;
    };
  }
};

App.fn.initSettings = function(){
  var self = this;
  var settingsToggle = document.getElementById('settingsToggle');
  var settingsPanel = document.getElementById('settingsPanel');
  var colorInputs = ['bgColor', 'textColor'];
  
  // Toggle settings panel
  settingsToggle.addEventListener('click', function(){
    settingsPanel.classList.toggle('show');
  });
  
  // Close settings when clicking outside
  document.addEventListener('click', function(e){
    if (!settingsPanel.contains(e.target) && !settingsToggle.contains(e.target)) {
      settingsPanel.classList.remove('show');
    }
  });
  
  // Color picker changes
  colorInputs.forEach(function(inputId){
    var input = document.getElementById(inputId);
    var colors = JSON.parse(localStorage.getItem('motivationColors')) || {
      bgColor: '#ffffff',
      textColor: '#494949'
    };
    
    input.addEventListener('change', function(){
      colors[inputId] = this.value;
      self.applyColors(colors);
      self.saveColors(colors);
    });
  });
  
  // Reset birthday button
  var resetButton = document.getElementById('resetBirthday');
  resetButton.addEventListener('click', function(){
    self.resetBirthday();
    settingsPanel.classList.remove('show');
  });
  
  // Set initial color picker values
  var currentColors = JSON.parse(localStorage.getItem('motivationColors')) || {
    bgColor: '#ffffff',
    textColor: '#494949'
  };
  colorInputs.forEach(function(inputId){
    var input = document.getElementById(inputId);
    input.value = currentColors[inputId];
  });
};

window.app = new App($('app'))

})();
