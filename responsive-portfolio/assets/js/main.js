'use strict';
/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
   navToggle = document.getElementById('nav-toggle'),
   navClose = document.getElementById('nav-close')

/* Show menu */
if (navToggle) {
   navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu')
   })
}

/* Hide menu */
if (navClose) {
   navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu')
   })
}

/*=============== REMOVE MOBILE MENU ===============*/
const navLink = document.querySelectorAll('.nav__link, .nav__contact')

const linkAction = () => {
   const navMenu = document.getElementById('nav-menu')
   // When we click on each nav__link, we remove the show-menu class
   navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== HOME TEXT CIRCULAR ===============*/
const homeText = document.getElementById('home-text'),
   letters = homeText.textContent.trim().split(''), // converts text into an array of character
   angleStep = 360 / letters.length // Angle for each character; length counts the number of characters
homeText.textContent = '' // clear the original content

// Iterates through each character
letters.forEach((char, i) => {
   const span = document.createElement('span') //create a <span> for each letter
   span.textContent = char // Inserts each character into the span
   span.style.transform = `rotate(${i * angleStep}deg)` // Rotates each letter based on its index to form the circle
   homeText.appendChild(span) // Appends the span to the main container
})
/*=============== HOME TYPED JS ===============*/
const typedHome = new Typed('#home-typed', {
   strings: ['Freelancer', 'Web Developer', 'SEO Specialist'], // Insert professions
   typeSpeed: 60,
   backSpeed: 30,
   backDelay: 2000,
   loop: true,
})

/*=============== CHANGE HEADER STYLES ===============*/
const scrollHeader = () => {
   const header = document.getElementById('header')
   // Add the .scroll-header class  if the bottom scroll of the viewport is generate than 50
   this.scrollY >= 50 ? header.classList.add('scroll-header')
      : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)


/*=============== SWIPER WORK ===============*/
const swiperWork = new Swiper('.work__swiper', {
   loop: true,
   spaceBetween: 24,
   slidesPerView: 'auto',
   grabCursor: true,
   speed: 600,

   pagination: {
      el: '.swiper-pagination',
      clickable: true,
   },
   autoplay: {
      delay: 3000,
      disableOnInteraction: false,
   }
}

)

/*=============== SERVICES ACCORDION ===============*/
const servicesCards = document.querySelectorAll('.services__card'),
   servicesButtons = document.querySelectorAll('.services__button')

// It iterates over each button found
servicesButtons.forEach(button => {
   button.addEventListener('click', () => {
      const currentCard = button.closest('.services__card'), // Get the class of the clicked button (.services__card) and |
         isOpen = currentCard.classList.contains('services-open') // check already had the dervices-open class (Returns true or False)

      // close all Other service data
      servicesCards.forEach(card => {
         card.classList.replace('services-open', 'services-close')
         // Replace the services-open class with services-close class
      })

      //  If the clicked card was closed, it opens it
      if (!isOpen) {
         currentCard.classList.replace('services-close', 'services-open')
      }
   })
})


/*=============== TESTIMONIALS OF DUPLICATE CARDS ===============*/
// Get all testimonial sliders
const tracks = document.querySelectorAll('.testimonials__content')

tracks.forEach(track => {
   // Get the child testionial sliders and create a copy of all cards
   const cards = [...track.children] // (... spread operato), converts the collection into an array

   // Get all the testimonial sliders
   for (const card of cards) {
      //Duplicate the card and append it at the end 
      track.appendChild(card.cloneNode(true))
   }
})


/*=============== PHONE INPUT ===============*/
const phoneInput = document.querySelector("#phone");
const phoneGroup = document.querySelector('.contact__group--phone');

const updatePhoneLabelState = () => {
   if (!phoneGroup || !phoneInput) return
   phoneGroup.classList.toggle('has-value', phoneInput.value.trim().length > 0)
}

if (phoneInput) {
   phoneInput.addEventListener('input', updatePhoneLabelState)
   phoneInput.addEventListener('blur', updatePhoneLabelState)
}

const iti = window.intlTelInput(phoneInput, {
   initialCountry: "in",
   preferredCountries: ["in", "us", "gb"],
   separateDialCode: true,
   containerClass: "contact__phone-container",

   loadUtils: () =>
      import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.12.2/build/js/utils.js"),
});

updatePhoneLabelState();

/*=============== CONTACT EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
   contactMessage = document.getElementById('contact-message')
// lock max touch
const submitBtn = document.getElementById("submit-btn");

let isSubmitting = false;

const sendEmail = async (e) => {
   e.preventDefault();

   if (isSubmitting) {
      return;
   }

   isSubmitting = true;

   submitBtn.disabled = true;

   submitBtn.innerHTML = `
      <span>Sending...</span>
      <i class="ri-loader-4-line"></i>
   `;

   await iti.promise;

// const sendEmail = async (e) => {
//    //Prevent the page from reloading
//    e.preventDefault()

//    // Wait until utils.js is loaded
//    await iti.promise;

   // Validate phone number
   if (!iti.isValidNumber()) {
      contactMessage.textContent = "Please enter a valid phone number.";
      phoneInput.focus();

      setTimeout(() => {
         contactMessage.textContent = "";
      }, 5000);

      return;
   }

   // // Get the full international number
   // const fullNumber = iti.getNumber();
   // const dialCode = iti.getSelectedCountryData().dialCode;

   // phoneInput.value =
   //    `+${dialCode} ${fullNumber.slice(dialCode.length + 1)}`;


   // Get the full international number
   const fullNumber = iti.getNumber();
   const dialCode = iti.getSelectedCountryData().dialCode;

   // Format phone number with a space after the country code
   const fullPhone =
      `+${dialCode} ${fullNumber.slice(dialCode.length + 1)}`;

   // Update the input so EmailJS receives the formatted number
   phoneInput.value = fullPhone;


   try {
      //servicesID - templateID - #form - publickey
      // await emailjs.sendForm('','','','')   
      // await emailjs.sendForm('service_kikxzud', 'template_fv3ood5', '#contact-form', 'VfqrXAk8TS_6AM28j')

      //       console.log("Name:", document.getElementById("name").value);
      // console.log("Email:", document.getElementById("email").value);
      // console.log("Phone:", iti.getNumber());
      // console.log("Message:", document.getElementById("message").value);

      // ===========================
      // ===============================
      // STEP 1 - Check duplicate
      // ===============================
      const formData = new FormData();

      formData.append("action", "check");
      formData.append("name", document.getElementById("name").value);
      formData.append("email", document.getElementById("email").value);
      formData.append("phone", fullPhone);
      formData.append("message", document.getElementById("message").value);

      const checkResponse = await fetch(
         "https://script.google.com/macros/s/AKfycbyaMosSyTjos3EtvmvB9Yd9kNuWP_uYLcjHM37vOPHpEhy9uW3GnPF7mHTCtYpCwvfM/exec",
         {
            method: "POST",
            body: formData
         }
      );

      const checkResult = await checkResponse.json();

      if (!checkResult.success) {
         contactMessage.textContent = checkResult.message;

         setTimeout(() => {
            contactMessage.textContent = "";
         }, 5000);

         return;
      }

      // ===============================
      // STEP 2 - Send Email
      // ===============================
      await emailjs.sendForm(
         'service_kikxzud',
         'template_fv3ood5',
         '#contact-form',
         'VfqrXAk8TS_6AM28j'
      );

      // ===============================
      // STEP 3 - Save Google Sheet
      // ===============================
      formData.set("action", "save");

      await fetch(
         "https://script.google.com/macros/s/AKfycbyaMosSyTjos3EtvmvB9Yd9kNuWP_uYLcjHM37vOPHpEhy9uW3GnPF7mHTCtYpCwvfM/exec",
         {
            method: "POST",
            body: formData
         }
      );



      // Show sent message
      contactMessage.textContent = 'Message sent successfully ✅'
      contactForm.reset()
   } catch (error) {
      // Show error message
      contactMessage.textContent = 'Unable to send message. Please try again later.'      //'Message not sent (service error) ❌'
   // } finally {
   //    // Remove message after five seconds
   //    setTimeout(() => contactMessage.textContent = '', 5000)
   // }
   } 
   
   finally {

   isSubmitting = false;

   submitBtn.disabled = false;

   submitBtn.innerHTML = `
      <span>Send Message</span>
      <i class="ri-send-plane-line"></i>
   `;

   setTimeout(() => {
      contactMessage.textContent = "";
   }, 5000);
}
}
contactForm.addEventListener('submit', sendEmail)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
   const scrollUp = document.getElementById('scroll-up')
   // Add the .scroll-header class if the bottom scroll of the viewport is greater than 350
   this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
      : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

//link the ID of each section (section id ="home") to each link (a href="#home")
//add activate the link with the class .activate-link
const scrollActive = () => {

   sections.forEach(section => {
      const id = section.id, // id for each section
         top = section.offsetTop - 50,  // Distance from the top edge
         height = section.offsetHeight, //Element height
         link = document.querySelector('.nav__menu a[href*=' + id + ']')  //id nav link
      if (!link) return

      link.classList.toggle('active-link', scrollY > top && scrollY <= top + height)

   })
}
window.addEventListener('scroll', scrollActive)

/*=============== CUSTOM CURSOR ===============*/
const cursor = document.querySelector('.cursor')
let mouseX = 0, mouseY = 0 // Store mouse position

const cursorMove = () => {
   cursor.style.left = `${mouseX}px`  // Horizontal position (X-axis)
   cursor.style.top = `${mouseY}px`   // Vertical position (Y-axis)
   cursor.style.transform = 'translate(-50%, -50%)'  // Centers the element at the pointer

   // Repeats the function with each movement
   requestAnimationFrame(cursorMove)
}


// Detects mouse movement and updates positions
document.addEventListener('mouseover', (e) => {
   mouseX = e.clientX // save position X
   mouseY = e.clientY // Save position Y
})

cursorMove()

//  Hide custom cursor on links 
const a = document.querySelectorAll('a')

a.forEach(item => {
   // Mouse enters the link and hides the cursor
   item.addEventListener('mouseover', () => {
      cursor.classList.add('hide-cursor')
   })
   // Mouse exists the link and share the cursor
   item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hide-cursor')
   })
})

/*=============== SCROLLREVEAL ANIMATION ===============*/

const sr = ScrollReveal({
   origin: 'bottom',
   distance: '60px',
   duration: 1200,
   delay: 300,
   easing: 'cubic-bezier(0.34, 1.56, 0.64,1)',
   // reset : true, //animations repeat
})

sr.reveal(`.home__subtitle`)
sr.reveal(`.home__title`, { delay: 600 })
sr.reveal(`.home__description`, { delay: 900 })
sr.reveal(`.home__box-1`, { delay: 1200, rotate: { z: -20 } })
sr.reveal(`.home__box-2`, { delay: 1300, rotate: { z: -30 } })
sr.reveal(`.home__box-3`, { delay: 1400, rotate: { z: -40 } })
sr.reveal(`.home__img`, { delay: 1700, distance: '-60px' })
sr.reveal(`.home__circle`, { delay: 200, distance: '-100px' })

sr.reveal(`.about__title`)
sr.reveal(`.about__description`, { delay: 600 })
sr.reveal(`.about__button`, { delay: 900 })

sr.reveal(`.work__swiper`)

sr.reveal(`.services__card:nth-child(odd)`, { interval: 200, origin: 'left', distance: '100px' })
sr.reveal(`.services__card:nth-child(even)`, { interval: 200, origin: 'right', distance: '100px' })

sr.reveal(`.skills__description`)
sr.reveal(`.skills__card`, { delay: 600, interval: 200 })
sr.reveal(`.skills__profession`, { delay: 900 })
sr.reveal(`.skills__list`, { delay: 1200, interval: 200 })

sr.reveal(`.testimonials__container`)

sr.reveal(`.contact__form`)
sr.reveal(`.contact__link`, { delay: 600, interval: 200 })

sr.reveal(`.footer__container`)