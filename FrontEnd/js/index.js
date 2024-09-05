const portfolioGallery = document.querySelector(".portfolio-gallery");

async function getWorks() {
  const url = "http://localhost:5678/api/works";
  const response = await fetch(url);
  const works = await response.json();
  return works;
}

async function getWorksByFilter(filter) {
  portfolioGallery.innerHTML = " ";
  const url = "http://localhost:5678/api/works";
  try {
    const response = await fetch(url);
    const json = await response.json();

    if (filter) {
      const filtered = json.filter((data) => data.categoryId === filter);
      for (let i = 0; i < filtered.length; i++) {
        setFigure(filtered[i]);
      }
    }
    else {
      for (let i = 0; i < json.length; i++) {
        setFigure(json[i]);
      }
    }
  }
  catch (error) {
    console.error(error.message);
  }
}
getWorksByFilter();



function setFigure(data) {
  const figure = document.createElement("figure");
  figure.innerHTML = `<img src=${data.imageUrl} alt=${data.title}>
                          <figcaption>${data.title}</figcaption>`;

  portfolioGallery.append(figure);
}


async function getCategories() {
  const url = "http://localhost:5678/api/categories";
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);

    for (let i = 0; i < json.length; i++) {
      setFilter(json[i]);
    }
  }
  catch (error) {
    console.error(error.message);
  }
}
getCategories()


function setFilter(data) {
  const div = document.createElement("div");
  div.addEventListener("click", () => getWorksByFilter(data.id));
  div.innerHTML = `${data.name}`;
  document.querySelector(".div-parents").append(div);
}

document.querySelector(".tous").addEventListener("click", () => getWorksByFilter());


