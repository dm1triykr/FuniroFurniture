//Placeholders
const searchInputs = document.querySelectorAll('input');
const searchPlaceholders = [];

for (let iter = 0; iter < searchInputs.length; iter++) {
  searchPlaceholders[iter] = searchInputs[iter].dataset.value;
  searchInputs[iter].placeholder = searchPlaceholders[iter];
  searchInputs[iter].addEventListener('focus', function (e) {
    e.placeholder = '';
  });
} //Spollers


const spollersArray = document.querySelectorAll('[data-spollers]');
let testValue;

if (spollersArray.length > 0) {
  const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
    return !item.dataset.spollers.split(',')[0];
  });

  if (spollersRegular.length > 0) {
    initSpollers(spollersRegular);
  }

  const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
    return item.dataset.spollers.split(',')[0];
  });

  if (spollersMedia.length > 0) {
    const breakpointsArray = [];
    spollersMedia.forEach(item => {
      const params = item.dataset.spollers;
      const breakpoint = {};
      const paramsArray = params.split(',');
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });
    let mediaQueries = breakpointsArray.map(function (item) {
      return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
    });
    mediaQueries = mediaQueries.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    });
    mediaQueries.forEach(breakpoint => {
      const paramsArray = breakpoint.split(',');
      const mediaBreakpoint = paramsArray[1];
      const mediaType = paramsArray[2];
      const matchMedia = window.matchMedia(paramsArray[0]);
      const spollersArray = breakpointsArray.filter(function (item) {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
      }); // matchMedia.addListener(function () {
      //     initSpollers(spollersArray, matchMedia);
      // })

      matchMedia.addEventListener('change', function () {
        initSpollers(spollersArray, matchMedia);
      });
      initSpollers(spollersArray, matchMedia);
    });
  }

  function initSpollers(spollersArray, matchMedia = false) {
    spollersArray.forEach(spollersBlock => {
      spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;

      if (matchMedia.matches || !matchMedia) {
        spollersBlock.classList.add('_init');
        initSpollersBody(spollersBlock);
        spollersBlock.addEventListener('click', setSpollerAction);
      } else {
        spollersBlock.classList.remove('_init');
        initSpollersBody(spollersBlock, false);
        spollersBlock.removeEventListener('click', setSpollerAction);
      }
    });
  }

  function initSpollersBody(spollersBlock, hideSpollerBody = true) {
    const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');

    if (spollerTitles.length > 0) {
      spollerTitles.forEach(spollerTitle => {
        if (hideSpollerBody) {
          spollerTitle.removeAttribute('tabindex');

          if (!spollerTitle.classList.contains('_active')) {
            spollerTitle.nextElementSibling.hidden = true;
          }
        } else {
          spollerTitle.setAttribute('tabindex', '-1');
          spollerTitle.nextElementSibling.hidden = false;
        }
      });
    }
  }

  function setSpollerAction(e) {
    const el = e.target;

    if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
      const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
      const spollersBlock = spollerTitle.closest('[data-spollers]');
      const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;

      if (!spollersBlock.querySelectorAll('._slide').length) {
        if (oneSpoller ?? !spollerTitle.classList.contains('_active')) {
          hideSpollerBody(spollersBlock);
        }

        spollerTitle.classList.toggle('_active');

        _slideToggle(spollerTitle.nextElementSibling, 500);
      }

      e.preventDefault();
    }
  }

  function hideSpollerBody(spollersBlock) {
    const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');

    if (spollerActiveTitle) {
      spollerActiveTitle.classList.remove('_active');

      _slideUp(spollerActiveTitle.nextElementSibling, 500);
    }
  }
} //SlideToggle


let _slideUp = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
};

let _slideDown = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');

    if (target.hidden) {
      target.hidden = false;
    }

    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
};

let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
}; ///Burger Menu


const burgerBtn = document.querySelector('.icon-menu');

if (burgerBtn) {
  const menuBody = document.querySelector('.menu__body');
  burgerBtn.addEventListener('click', function (e) {
    document.body.classList.toggle('_lock');
    burgerBtn.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  });
} ///////////////////////////////////


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

    if (targetElement.classList.contains('search-form__icon')) {
      document.querySelector('.search-form').classList.toggle('_active');
    } else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active') != null) {
      document.querySelector('.search-form._active').classList.remove('_active');
    } // if(targetElement.classList.contains('icon-menu')) {
    //     targetElement.classList.contains('icon-menu').classList.toggle('_active');
    // }

  } // Header


  const headerElement = document.querySelector('.header');

  const callback = function (entries, observer) {
    if (entries[0].isIntersecting) {
      headerElement.classList.remove('_scroll');
    } else {
      headerElement.classList.add('_scroll');
    }
  };

  const headerObserver = new IntersectionObserver(callback);
  headerObserver.observe(headerElement);
};

console.log("Hello from forms!");
console.log("Hello from regular!");
console.log("Hello from functions!");

window.mobileCheck = function () {
  let check = false;

  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  return check;
};

function _removeClasses(someCollection, classToRemove) {
  for (let element of someCollection) {
    element.classList.remove(classToRemove);
  }
}

console.log('Hello from sliders!');
let sliders = document.querySelectorAll('._swiper');

if (sliders) {
  for (let index = 0; index < sliders.length; index++) {
    let slider = sliders[index];

    if (!slider.classList.contains('swiper-bild')) {
      let slider_items = slider.children;

      if (slider_items) {
        for (let index = 0; index < slider_items.length; index++) {
          let el = slider_items[index];
          el.classList.add('swiper-slide');
        }
      }

      let slider_content = slider.innerHTML;
      let slider_wrapper = document.createElement('div');
      slider_wrapper.classList.add('swiper-wrapper');
      slider_wrapper.innerHTML = slider_content;
      slider.innerHTML = '';
      slider.appendChild(slider_wrapper);
      slider.classList.add('swiper-bild');

      if (slider.classList.contains('_swiper_scroll')) {
        let sliderScroll = document.createElement('div');
        sliderScroll.classList.add('swiper-scrollbar');
        slider.appendChild(sliderScroll);
      }
    }

    if (slider.classList.contains('_gallery')) {//slider.data('LightGallery).destroy(true);
    }
  }

  sliders_bild_callback();
}

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');

if (sliderScrollItems.length > 0) {
  for (let index = 0; index < sliderScrollItems.length; index++) {
    const sliderScrollItem = sliderScrollItems[index];
    const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
    const sliderScroll = new Swiper(sliderScrollItem, {
      observer: true,
      observeParents: true,
      direction: 'vertical',
      slidesPerView: 'auto',
      freeMode: true,
      scrollbar: {
        el: sliderScrollBar,
        draggable: true,
        snapOnRelease: false
      },
      mousewheel: {
        releaseOnEdges: true
      }
    });
    sliderScroll.scrollbar.updateSize();
  }
}

function sliders_bild_callback(params) {}

if (document.querySelector('.slider-main__body')) {
  new Swiper('.slider-main__body', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 32,
    watchOverFlow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides: 5,
    preloadImages: false,
    parallax: true,
    //Dotts
    pagination: {
      el: '.controls-slider-main__dotts',
      clickable: true
    },
    //Arrows
    navigation: {
      nextEl: '.slider-main .slider-arrow_next',
      prevEl: '.slider-main .slider-arrow_prev'
    }
  });
} // Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle


"use strict";

function DynamicAdapt(type) {
  this.type = type;
}

DynamicAdapt.prototype.init = function () {
  const _this = this; // массив объектов


  this.оbjects = [];
  this.daClassname = "_dynamic_adapt_"; // массив DOM-элементов

  this.nodes = document.querySelectorAll("[data-da]"); // наполнение оbjects объктами

  for (let i = 0; i < this.nodes.length; i++) {
    const node = this.nodes[i];
    const data = node.dataset.da.trim();
    const dataArray = data.split(",");
    const оbject = {};
    оbject.element = node;
    оbject.parent = node.parentNode;
    оbject.destination = document.querySelector(dataArray[0].trim());
    оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
    оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
    оbject.index = this.indexInParent(оbject.parent, оbject.element);
    this.оbjects.push(оbject);
  }

  this.arraySort(this.оbjects); // массив уникальных медиа-запросов

  this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
    return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
  }, this);
  this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
    return Array.prototype.indexOf.call(self, item) === index;
  }); // навешивание слушателя на медиа-запрос
  // и вызов обработчика при первом запуске

  for (let i = 0; i < this.mediaQueries.length; i++) {
    const media = this.mediaQueries[i];
    const mediaSplit = String.prototype.split.call(media, ',');
    const matchMedia = window.matchMedia(mediaSplit[0]);
    const mediaBreakpoint = mediaSplit[1]; // массив объектов с подходящим брейкпоинтом

    const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
      return item.breakpoint === mediaBreakpoint;
    });
    matchMedia.addListener(function () {
      _this.mediaHandler(matchMedia, оbjectsFilter);
    });
    this.mediaHandler(matchMedia, оbjectsFilter);
  }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
  if (matchMedia.matches) {
    for (let i = 0; i < оbjects.length; i++) {
      const оbject = оbjects[i];
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.moveTo(оbject.place, оbject.element, оbject.destination);
    }
  } else {
    //for (let i = 0; i < оbjects.length; i++) {
    for (let i = оbjects.length - 1; i >= 0; i--) {
      const оbject = оbjects[i];

      if (оbject.element.classList.contains(this.daClassname)) {
        this.moveBack(оbject.parent, оbject.element, оbject.index);
      }
    }
  }
}; // Функция перемещения


DynamicAdapt.prototype.moveTo = function (place, element, destination) {
  element.classList.add(this.daClassname);

  if (place === 'last' || place >= destination.children.length) {
    destination.insertAdjacentElement('beforeend', element);
    return;
  }

  if (place === 'first') {
    destination.insertAdjacentElement('afterbegin', element);
    return;
  }

  destination.children[place].insertAdjacentElement('beforebegin', element);
}; // Функция возврата


DynamicAdapt.prototype.moveBack = function (parent, element, index) {
  element.classList.remove(this.daClassname);

  if (parent.children[index] !== undefined) {
    parent.children[index].insertAdjacentElement('beforebegin', element);
  } else {
    parent.insertAdjacentElement('beforeend', element);
  }
}; // Функция получения индекса внутри родителя


DynamicAdapt.prototype.indexInParent = function (parent, element) {
  const array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
}; // Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max


DynamicAdapt.prototype.arraySort = function (arr) {
  if (this.type === "min") {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }

        if (a.place === "first" || b.place === "last") {
          return -1;
        }

        if (a.place === "last" || b.place === "first") {
          return 1;
        }

        return a.place - b.place;
      }

      return a.breakpoint - b.breakpoint;
    });
  } else {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }

        if (a.place === "first" || b.place === "last") {
          return 1;
        }

        if (a.place === "last" || b.place === "first") {
          return -1;
        }

        return b.place - a.place;
      }

      return b.breakpoint - a.breakpoint;
    });
    return;
  }
};

const da = new DynamicAdapt("max");
da.init();
//# sourceMappingURL=app.js.map
