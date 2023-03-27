//Placeholders

const searchInputs = document.querySelectorAll('input');
const searchPlaceholders = [];

for(let iter = 0; iter < searchInputs.length; iter++) {
    searchPlaceholders[iter] = searchInputs[iter].dataset.value;
    searchInputs[iter].placeholder = searchPlaceholders[iter];
    searchInputs[iter].addEventListener('focus', function(e) {
        e.placeholder = '';
    })
}

//Spollers
const spollersArray = document.querySelectorAll('[data-spollers]');
let testValue;
if(spollersArray.length > 0 ) {
    const spollersRegular = Array.from(spollersArray).filter(function(item, index, self) {
        return !item.dataset.spollers.split(',')[0];
    });
    if(spollersRegular.length > 0) {
        initSpollers(spollersRegular);
    }
    const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
        return item.dataset.spollers.split(',')[0];
    });

    if(spollersMedia.length > 0) {
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

        let mediaQueries = breakpointsArray.map(function(item) {
            return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
        });
        mediaQueries = mediaQueries.filter(function(item, index, self) {
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
            });

            // matchMedia.addListener(function () {
            //     initSpollers(spollersArray, matchMedia);
            // })
            matchMedia.addEventListener('change', function () {
                initSpollers(spollersArray, matchMedia);
            })
            initSpollers(spollersArray, matchMedia);
        });
    }

    function initSpollers(spollersArray, matchMedia = false) {
        spollersArray.forEach(spollersBlock => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if(matchMedia.matches || !matchMedia) {
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
        if(spollerTitles.length > 0) {
            spollerTitles.forEach(spollerTitle => {
                if(hideSpollerBody) {
                    spollerTitle.removeAttribute('tabindex');
                    if(!spollerTitle.classList.contains('_active')) {
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
        if(el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
            const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
            const spollersBlock = spollerTitle.closest('[data-spollers]');
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
            if(!spollersBlock.querySelectorAll('._slide').length) {
                if(oneSpoller ?? !spollerTitle.classList.contains('_active')) {
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
        if(spollerActiveTitle) {
            spollerActiveTitle.classList.remove('_active');
            _slideUp(spollerActiveTitle.nextElementSibling, 500);
        }
    }
}

//SlideToggle
let _slideUp = (target, duration = 500) => {
    if(!target.classList.contains('_slide')) {
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
}

let _slideDown = (target, duration = 500) => {
    if(!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        if(target.hidden) {
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
        }, duration)
    }
}

let _slideToggle = (target, duration = 500) => {
    if(target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
}

///Burger Menu
const burgerBtn = document.querySelector('.icon-menu');
if(burgerBtn) {
    const menuBody = document.querySelector('.menu__body');
    burgerBtn.addEventListener('click', function(e) {
        document.body.classList.toggle('_lock');
        burgerBtn.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    })
}

///////////////////////////////////
window.onload = function() {
    document.addEventListener('click', documentActions);

    //Actions (делегирование события click)
    function documentActions(e) {
        const targetElement = e.target;
        if(window.innerWidth > 768 && mobileCheck()) {
            if(targetElement.classList.contains('menu__arrow')) {
                targetElement.closest('.menu__item').classList.toggle('_hover');
            }

            if(!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
                _removeClasses(document.querySelectorAll('.menu__item._hover'), '_hover');
            }
        }


        if(targetElement.classList.contains('search-form__icon')) {
            document.querySelector('.search-form').classList.toggle('_active');
        } else if(!targetElement.closest('.search-form') && document.querySelector('.search-form._active') != null) {
            document.querySelector('.search-form._active').classList.remove('_active');
        }

        if(targetElement.classList.contains('products__more')) {
            getProducts(targetElement);
            e.preventDefault();
        }

        // if(targetElement.classList.contains('icon-menu')) {
        //     targetElement.classList.contains('icon-menu').classList.toggle('_active');
        // }
    } 
    // Header
    const headerElement = document.querySelector('.header');

    const callback = function (entries, observer) {
        if(entries[0].isIntersecting) {
            headerElement.classList.remove('_scroll');
        } else {
            headerElement.classList.add('_scroll');
        }
    }

    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe(headerElement);

    //Load More Products
    // async function getProducts(button) {
    //     if(!button.classList.contains('_hold')) {
    //         button.classList.add('_hold');
    //         const file = '../json/products.json';
    //         let response = await fetch(file, {
    //             method: "GET"
    //         });
    //         if(response.ok) {
    //             let result = await response.json();
    //             loadProducts(result);
    //             button.classList.remove('_hold');
    //             button.remove();
    //         } else {
    //             alert('Ошибка');
    //         }
    //     }
    // }

    // function loadProducts(data) {
    //     const productsItems = document.querySelector('.products__items');

    //     data.products.forEach(item => {
    //         const productId = item.id;
    //         const productUrl = item.url;
    //         const productImage = item.image;
    //         const productTitle = item.title;
    //         const productText = item.text;
    //         const productPrice = item.price;
    //         const productOldPrice = item.priceOld;
    //         const productShareUrl = item.shareUrl;
    //         const productLikeUrl = item.likeUrl;
    //         const productLabels = item.labels;

    //         let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
    //         let productTemplateEnd = `</article>`;

    //         let productTemplateLabels = ``;
    //         if(productLabels) {
    //             let productTemplateLabelsStart = `<div class="item-product__labels">`;
    //             let productTemplateLabelsEnd = `</div>`;
    //             let productTemplateLabelsContent = ``;

    //             productLabels.forEach(labelItem => {
    //                 productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
    //             })

    //             productTemplateLabels += productTemplateLabelsStart;
    //             productTemplateLabels += productTemplateLabelsContent;
    //             productTemplateLabels += productTemplateLabelsEnd;
    //         }

    //         let productTemplateImage = `<a href="${productUrl}" class="item-product__image _ibg">
    //         <img src="img/products/${productImage}" alt="${productTitle}">
    //     </a>`;

    //         let productTemplateBodyStart = `<div class="item-product__body">`;
    //         let productTemplateBodyEnd = `</div>`;

    //         let productTemplateContent = `<div class="item-product__content">
    //         <h5 class="item-product__title">${productTitle}</h5>
    //         <div class="item-product__text">${productText}</div>
    //     </div>`;

    //         let tmp = `<article data-pid="1" class="products__item item-product">
    //         <div class="item-product__labels">
    //             <div class="item-product__label item-product__label_sale">-30%</div>
    //             <!-- <div class="item-product__label item-product__label_new">New</div> -->
    //         </div>
    //         <a href="" class="item-product__image _ibg">
    //             <img src="img/products/1.jpg" alt="Syltherine">
    //         </a>
    //         <div class="item-product__body">
    //             <div class="item-product__content">
    //                 <h5 class="item-product__title">Syltherine</h5>
    //                 <div class="item-product__text">Stylish cafe chair</div>
    //             </div>
    //             <div class="item-product__prices">
    //                 <div class="item-product__price">Rp 2.500.000</div>
    //                 <div class="item-product__price item-product__price_old">Rp 3.500.000</div>
    //             </div>
    //             <div class="item-product__actions actions-product">
    //                 <div class="actions-product__body">
    //                     <a href="" class="actions-product__button btn btn_white">Add to cart</a>
    //                     <a href="" class="actions-product__link btn icon-share">Share</a>
    //                     <a href="" class="actions-product__link btn icon-favorite">Like</a>
    //                 </div>
    //             </div>
    //         </div>
    //     </article>`;
    //     });
    // }
}

