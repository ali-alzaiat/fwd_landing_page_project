/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const navbar = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");
const drop = document.querySelector(".drop");
const up = document.querySelector("#up");
const mainHero = document.querySelector(".main__hero");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

const newAnchor = (id,data) => `<a href="#${id}" class="menu__link" id="${id}_link">${data}</a>`;

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNavbar = () => {
	const fragment = document.createDocumentFragment();

	sections.forEach((e,i)=>{						//Loop over all the sections and add a link for each section to the navigation bar.
		let navbarLink = document.createElement("li");
		navbarLink.innerHTML = newAnchor(`${e.id}`,`${e.dataset.nav}`);
		fragment.appendChild(navbarLink);
	});

	navbar.appendChild(fragment);
};

// Add class 'active' to section when near top of viewport
const onScreen = (e) => {						//If the section is near the top of the viewport add "your-active-class" to its classList.
	navbar.style.display = "block";
	setTimeout(() => {
		const position = e.getBoundingClientRect();
		
		if(position.top >= -200 && position.top < window.innerHeight/2){
			e.classList.add("your-active-class");
			document.querySelector(`#${e.id}`+"_link").style.backgroundColor = "#333";
			document.querySelector(`#${e.id}`+"_link").style.color = "#fff";
		}
		else {
			e.classList.remove("your-active-class");
			document.querySelector(`#${e.id}`+"_link").style.backgroundColor = "#fff";
			document.querySelector(`#${e.id}`+"_link").style.color = "#000";
		}
	},300);
};

// Scroll to anchor ID using scrollTO event
const scrollToSection = (sectionId) => {
	document.querySelector(sectionId).scrollIntoView({behavior: "smooth"});
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

drop.addEventListener("click",(e)=>{			//when the trigram for Heaven symbol is clicked display/hide all elements in navbar except the first one.
	navbar.classList.toggle("responsive");
	e.preventDefault();
});

// Build menu 
buildNavbar();

// Scroll to section on link click
navbar.addEventListener("click",(e)=>{			//A function to make a smooth scrolling brhavior when the anchor is clicked
	e.preventDefault();
	if(e.target.hash != "" && e.target.hash != null){
		scrollToSection(`${e.target.hash}`);
	}
	
});

// Set sections as active
window.addEventListener("scroll",() => {
	sections.forEach((e) => {
		onScreen(e);
	});
});

// Display scroll to the top button when the user scrolls below the fold of the page.
window.addEventListener("scroll",() => {
	if(document.body.scrollTop > 50){
		up.style.display = "block";
	}
	else{
		up.style.display = "none";
	}
});

// Scroll to the top of the page when scroll to the top button is clicked.
up.addEventListener("click",() => {
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
});