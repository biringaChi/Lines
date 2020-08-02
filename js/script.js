// Color theme
const checkbox = document.getElementById("checkbox");

checkbox.addEventListener("change", () => {
  // Change the theme
  document.body.classList.toggle("dark");
});

// Preloader
let preloader = document.querySelector(".preloader");
let fadeEffect;
window.addEventListener("load", () =>
  setInterval(function () {
    if (!preloader.style.opacity) {
      preloader.style.opacity = 1;
    }
    if (preloader.style.opacity > 0) {
      preloader.style.opacity -= 0.1;
    } else {
      clearInterval(fadeEffect);
    }
  }, 100)
);

const logo = document.querySelectorAll("#logo path");
for (let i = 0; i < logo.length; i++) {
  console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
}

// Intersection Observer
const fades = document.querySelectorAll(".fade");
const displayOptions = {
  root: null,
  rootMargin: "-100px"
};

const displayOnScroll = new IntersectionObserver(function(entries, displayOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("display");
        displayOnScroll.unobserve(entry.target);
      }
    });
  },
  displayOptions);

fades.forEach(f => {
  displayOnScroll.observe(f);
});

// Navigation bar
let link_nav = document.getElementById("navbarMenu");
if (link_nav) {
  let nav_items = link_nav.getElementsByTagName("li");
  let i;
  for (i = 0; i < nav_items.length; i++) {
    nav_items[i].addEventListener("click", function () {
      if (!this.classList.contains("active")) {
        clearActive(nav_items);
        this.classList.toggle("active");
      }
    });
  }
}
function clearActive(classlist) {
  if (classlist) {
    for (i = 0; i < classlist.length; i++) {
      classlist[i].classList.remove("active");
    }
  }
}

// Tyewrite
let TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  let i = this.loopNum % this.toRotate.length;
  let fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  let that = this;
  let delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  let elements = document.getElementsByClassName("typewrite");
  for (let i = 0; i < elements.length; i++) {
    let toRotate = elements[i].getAttribute("data-type");
    let period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }

  let css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};
