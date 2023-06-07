// Array of objects representing our employees properties
let employees = [
  {
    id: 1,
    name: "Asiphe Ndimlana",
    img: "https://i.postimg.cc/9QcM7TV9/C12-Asiphe-Ndimlana-1.jpg",
    job: "Founder",
  },
  {
    id: 2,
    name: "Inam Nkabi",
    img: "https://i.postimg.cc/1X4Pxf4Y/C12-C1-Inam-Nkabi-3.jpg",
    job: "CEO",
  },
  {
    id: 3,
    name: "Mufuniwa Mbedzi",
    img: "https://i.postimg.cc/qvqdcYdr/C12-Mufuniwa-Mbedzi-2.jpg",
    job: "Front End Developer",
  },
  {
    id: 4,
    name: "Ethan Oliver",
    img: "https://i.postimg.cc/Y92m2MWg/C12-Ethan-Oliver-1.jpg",
    job: "Front End Developer",
  },
  {
    id: 5,
    name: "Laeeq Majal",
    img: "https://i.postimg.cc/CL3r663k/20220503-112206-1.jpg",
    job: "Front End Developer",
  },
  {
    id: 6,
    name: "Lisa Mbuwa",
    img: "https://i.postimg.cc/tCymQCpk/C12-C1-Lisa-Mbuwa-1.jpg",
    job: "Back End Developer",
  },
  {
    id: 7,
    name: "Liyabona Mxhalisa",
    img: "https://i.postimg.cc/QCxVDbvq/C12-Liyabona-Mxhalis-4.jpg",
    job: "Back End Developer",
  },
  {
    id: 8,
    name: "Samkelo Mpokela",
    img: "https://i.postimg.cc/ryg6yYg5/C12-Samkelo-Mpokela-Class1-4.jpg",
    job: "Full Stack Developer",
  },
  {
    id: 9,
    name: "Zubair Matthee",
    img: "https://i.postimg.cc/J7bM5np5/C12-Zubair-Matthee.jpg",
    job: "Full Stack Developer",
  },
];

// Select the HTML element with the class "row" and store it in the variable dispEmployees
let dispEmployees = document.querySelector(".us");

// Go through each item in the employees array one by one
employees.forEach((data) => {
  dispEmployees.innerHTML += `
          <div class= "card col-4">
          <h3>${data.name}</h3>
          <p>${data.job}</p>
          <div class= "card-body ">
          <img src="${data.img}" class="img-fluid mx-5">
          </div>
          </div>
          </div>`;
});
