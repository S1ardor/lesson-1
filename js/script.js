const docFrag = document.createDocumentFragment();
const elText = document.querySelector(".js-text");
const elTemplate = document.querySelector(".js-template").content;
const elForm = document.querySelector(".js-form");
const elInput = document.querySelector(".js-searchInput");
function renderList(films, node) {
  node.innerHTML = "";
  films.forEach((film) => {
    const copyNodeFilms = elTemplate.cloneNode(true);
    copyNodeFilms.querySelector(".js-filmImg").src = film.poster;
    copyNodeFilms.querySelector(".js-filmName").textContent = film.title.slice(
      0,
      18
    );
    copyNodeFilms.querySelector(".js-filmType").textContent = film.genres
      .join(" ")
      .slice(0, 30);
    // release_date yil ga o'girish.
    const unimaginable = film.release_date;
    const date = new Date(unimaginable * 1000);
    const year = date.getFullYear();
    copyNodeFilms.querySelector(".js-filmTime").textContent = year;

    docFrag.appendChild(copyNodeFilms);
  });
  node.appendChild(docFrag);
}

renderList(films, elText);
const handleSub = (evt) => {
  evt.preventDefault();
  const value = elInput.value;
  let filter = [];
  if (value.length) {
    filter = films.filter(
      (item) =>
        item.title.toLowerCase().includes(value) ||
        item.title.toUpperCase().includes(value)
    );
    console.log(filter);
  } else {
    filter = films;
  }
  renderList(filter, elText);
};
elForm.addEventListener("input", handleSub);
