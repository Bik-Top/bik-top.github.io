"use strict";
window.onload = function () {
  var activSid = document.querySelectorAll('.side li');
  var activNav = document.querySelectorAll('.nav>li');
  if (location.hash === '') {
    location.hash = '#offer';
    addClass(activSid[0]);
  }
  else if (location.hash) {
    for (var i = 0; i < activSid.length; i += 1) {
      var he1 = activSid[i].children[0].href.slice(activSid[i].children[0].href.match('#').index + 1);
      var he2 = location.hash.slice(1).replace(' ', '');
      if (he1 == he2) {
        removeClass(activSid);
        addClass(activSid[i]);
      }
    }
  }
  else {
    addClass(activSid[0]);
  }

  function removeClass(tab) {
    if (Object.prototype.toString.call(tab) === '[object NodeList]') {
      for (var i = 0; i < tab.length; i += 1) {
        tab[i].className = '';
      }
    } else {
      tab.className = '';
    }
  }

  function addClass(tab) {
    if (Object.prototype.toString.call(tab) === '[object NodeList]') {
      for (var i = 0; i < tab.length; i += 1) {
        tab[i].className = 'activ';
      }
    } else {
      tab.className = 'activ';
    }
  }

  function eventLisent(tab) {
    for (var i = 0; i < tab.length; i += 1) {
      tab[i].addEventListener(
        'click',
        function () {
          removeClass(this.parentNode.querySelectorAll('li'));
          addClass(this);
          this.children[0].click();
        },
        false)
    }
  }

  eventLisent(activSid);
  eventLisent(activNav);
};


