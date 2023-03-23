console.log("Hello from script!");
const inputSearch = document.querySelector('.search-form__input');
const placeholderSearch = inputSearch.dataset.value;
inputSearch.placeholder = placeholderSearch;
inputSearch.addEventListener('focus', function (e) {
  e.placeholder = '';
});

window.onload = function () {
  document.addEventListener('click', documentActions); //Actions (делегирование события click)

  function documentActions(e) {
    const targetElement = e.target;

    if (window.innerWidth > 768 && mobileCheck()) {
      if (targetElement.classList.contains('menu__arrow')) {
        targetElement.closest('.menu__item').classList.toggle('_hover');
      }

      if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
        _removeClasses(document.querySelectorAll('.menu__item._hover'), '_hover');
      }
    }
  }
};
//# sourceMappingURL=script.js.map
