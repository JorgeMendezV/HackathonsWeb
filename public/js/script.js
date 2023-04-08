// Logica para nav menu principal

const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener('click', (event) => {
    const visibility = primaryNav.getAttribute('data-visible');

    //console.log(visibility);
    
    if(visibility === "false"){
        primaryNav.setAttribute('data-visible', true)
        navToggle.setAttribute('aria-expanded', true)
    } else {
        primaryNav.setAttribute('data-visible', false)
        navToggle.setAttribute('aria-expanded', false)
    }

    // si el menu esta minimizado el color sera blanco y negro cuando se enfoque
    const navLinks = primaryNav.querySelectorAll('a');
    navLinks.forEach(link =>{
        if(navToggle.getAttribute('aria-expanded') === "true"){
            link.style.color = 'white';
        } else {
            link.style.color = 'black';
        }
    });
});

