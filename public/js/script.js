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

fetch('../API/hackathons/all')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('hackathons-container');

    data.forEach(hackathon => {
      const div = document.createElement('div');
      const img = document.createElement('img');
      const boxcontent = document.createElement('div');
      const h2 = document.createElement('h2');
      const p = document.createElement('p');
      const span = document.createElement('span');

      img.src = hackathon.img;
      h2.innerText = hackathon.title;
      p.innerText = hackathon.description;
      span.innerText = hackathon.date;

      boxcontent.appendChild(h2);
      boxcontent.appendChild(p);
      boxcontent.appendChild(span);

      div.appendChild(img);
      div.appendChild(boxcontent);

      container.appendChild(div);
    });
  });

