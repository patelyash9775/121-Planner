"use strict";

var allDropdown = document.querySelectorAll('#sidebarmm .side-dropdown');
var sidebar = document.querySelector('#sidebarmm');
console.log("sidebar", sidebar);
allDropdown.forEach(function (item) {
  var a = item.parentElement.querySelector('a:first-child');
  a.addEventListener('click', function (e) {
    e.preventDefault();

    if (!this.classList.contains('active')) {
      allDropdown.forEach(function (i) {
        var aLink = i.parentElement.querySelector('a:first-child');
        aLink.classList.remove('active');
        i.classList.remove('show');
      });
    }

    this.classList.toggle('active');
    item.classList.toggle('show');
  });
}); // SIDEBAR COLLAPSE

var toggleSidebar = document.querySelector('nav .toggle-sidebar');
var allSideDivider = document.querySelectorAll('#sidebarmm .divider');
toggleSidebar.addEventListener('click', function () {
  sidebar.classList.toggle('hide');

  if (sidebar.classList.contains('hide')) {
    allSideDivider.forEach(function (item) {
      item.textContent = '-';
    });
    allDropdown.forEach(function (item) {
      var a = item.parentElement.querySelector('a:first-child');
      a.classList.remove('active');
      item.classList.remove('show');
    });
  } else {
    allSideDivider.forEach(function (item) {
      item.textContent = item.dataset.text;
    });
  }
});
sidebar.addEventListener('mouseleave', function () {
  if (this.classList.contains('hide')) {
    allDropdown.forEach(function (item) {
      var a = item.parentElement.querySelector('a:first-child');
      a.classList.remove('active');
      item.classList.remove('show');
    });
    allSideDivider.forEach(function (item) {
      item.textContent = '-';
    });
  }
});
sidebar.addEventListener('mouseenter', function () {
  if (this.classList.contains('hide')) {
    allDropdown.forEach(function (item) {
      var a = item.parentElement.querySelector('a:first-child');
      a.classList.remove('active');
      item.classList.remove('show');
    });
    allSideDivider.forEach(function (item) {
      item.textContent = item.dataset.text;
    });
  }
}); // PROFILE DROPDOWN

var profile = document.querySelector('nav .profile');
var imgProfile = profile.querySelector('img');
var dropdownProfile = profile.querySelector('.profile-link');
imgProfile.addEventListener('click', function () {
  dropdownProfile.classList.toggle('show');
}); // MENU

var allMenu = document.querySelectorAll('main .content-data .head .menu');
allMenu.forEach(function (item) {
  var icon = item.querySelector('.icon');
  var menuLink = item.querySelector('.menu-link');
  icon.addEventListener('click', function () {
    menuLink.classList.toggle('show');
  });
});
window.addEventListener('click', function (e) {
  if (e.target !== imgProfile) {
    if (e.target !== dropdownProfile) {
      if (dropdownProfile.classList.contains('show')) {
        dropdownProfile.classList.remove('show');
      }
    }
  }

  allMenu.forEach(function (item) {
    var icon = item.querySelector('.icon');
    var menuLink = item.querySelector('.menu-link');

    if (e.target !== icon) {
      if (e.target !== menuLink) {
        if (menuLink.classList.contains('show')) {
          menuLink.classList.remove('show');
        }
      }
    }
  });
});