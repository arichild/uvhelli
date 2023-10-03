const slider = document.querySelector('.main-screen-range')
const letters = document.querySelectorAll('.main-screen-letter')
const backgroundBlock = document.querySelector('.main-screen-block')
const background = document.querySelector('.main-screen-bg')
const sliderTxt = document.querySelector('.main-screen-txt')

$(document).ready(function() {
  // animation for development.html
  AOS.init({
    delay: 180,
    duration: 1200,
  });

  // slider
  const newsSliderEl = document.querySelector('.splide.newsSlider')
  const achievementsEl = document.querySelector('.splide.achievementsSlider')
  const galleryEl = document.querySelector('.splide.gallerySlider')
  const experienceSlider = document.querySelector('.splide.experienceSlider')

  if(newsSliderEl !== null) {
    const slider = new Splide('.splide.newsSlider', {
      perPage: 3,
      pagination: false,
      gap: 30,

      breakpoints: {
        1024: { perPage: 2, gap: 30 },
        768 : { perPage: 1, gap: 0 },
      },
    })

    slider.mount()
  }

  if(achievementsEl !== null) {
    const slider = new Splide('.splide.achievementsSlider', {
      perPage: 4,
      pagination: false,
      gap: 27,

      breakpoints: {
        1024: { perPage: 3 },
        768 : { perPage: 2 },
        576: {perPage: 1}
      },
    })

    slider.mount()
  }

  if(galleryEl !== null) {
    const slider = new Splide('.splide.gallerySlider', {
      perPage: 3,
      pagination: true,
      gap: 30
    })

    slider.mount()
  }

  if(experienceSlider !== null) {
    const slider = new Splide('.splide.experienceSlider', {
      perPage: 3,
      gap: 30,
      pagination: false,

      breakpoints: {
        1024: { perPage: 2 },
        768 : { perPage: 1, gap: 0 },
      },
    })

    slider.mount()
  }

  // tabs
  const tabs = document.querySelector('.ui-tab') || document.querySelector('.ui-tab-icon');

  if(tabs) {
    const content = document.querySelectorAll('.ui-tabcontent');

    tabs.addEventListener('click', (e) => {
      const parent = e.target.closest('.ui-tab-block')
      const currTab = e.target.dataset.tab;
      const tab = e.target;
      const tabContent = content[currTab - 1]

      if (!currTab) {
        return;
      }

      tab.classList.toggle('active')
      tabContent.classList.toggle('active')
      parent.classList.toggle('active')
    })
  }

  // anchor
  const anchors = document.querySelectorAll('[data-anchor]')

  if(anchors.length) {
    for (let anchor of anchors) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()

        let id = e.target.dataset.anchor;

        if(id) {
          document.getElementById(id).scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }
      })
    }
  }

  // input file
  const inputFile = document.querySelector('.ui-doc-file input[type=file]')

  if(inputFile) {
    $('.ui-doc-file input[type=file]').on('change', function(){
      let file = this.files[0];
      $(this).next().html(file.name);
    });
  }

  // lang menu
  const langBtn = document.querySelector('.header-lang-select')
  const closeLangMenu = document.querySelector('.header-lang-default')
  const langMenu = document.querySelector('.header-lang-menu')

  langBtn.addEventListener(('click'), () => {
    langMenu.classList.add('active')
  })

  closeLangMenu.addEventListener(('click'), () => {
    langMenu.classList.remove('active')
  })

  // form styler select
  $(function() {
    $('select.custom-select').styler({
    });
  });

  // burger
  const burger = document.querySelector('.header-content-burger')

  if(burger) {
    burger.addEventListener('click', () => {
      const menuBurger = document.querySelector('.header-content-block')
      const header = document.querySelector('.header')

      burger.classList.toggle('active')
      menuBurger.classList.toggle('active')
      header.classList.toggle('active')
    })
  }

  // gallery
  const developmentGallery = document.querySelectorAll('[data-development]')

  if(developmentGallery.length) {
    developmentGallery.forEach(item => {
      item.addEventListener('click', function() {
        const data = JSON.parse(item.dataset.development)
        const elements = []

        data.forEach(item => {
          elements.push({src: item})
        });

        lightGallery(item, {
            dynamic: true,
            download: false,
            counter: false,
            hideBarsDelay: 0,
            controls: true,
            dynamicEl: elements
        })
      });
    })
  }

  const exhibitionGallery = document.querySelectorAll('.exhibition-photos')

  if(exhibitionGallery.length) {
    exhibitionGallery.forEach(element => {
      lightGallery(element, {
        selector: '[data-src]',
        download: false,
        counter: false,
        hideBarsDelay: 0,
        controls: true,
      });
    });
  }

  // video gallery
  Fancybox.bind('[data-fancybox="video"]', {
    trapFocus: true,
    Thumbs: false
  });

  // height for blocks for development.html
  document.addEventListener("DOMContentLoaded", setHeightDevelopment)
  window.addEventListener('resize', setHeightDevelopment);

  // range input
  if(slider) {
    slider.addEventListener('input', mainScreen)
  }
});

$.validator.messages.required = 'Пожалуйста, введите данные';

jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^([а-яё ]+|[a-z ]+)$/i.test(value);
}, "Поле может состоять из букв и пробелов, без цифр");

jQuery.validator.addMethod("phone", function (value, element) {
  if (value.startsWith('+375')) {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12}(\s*)?$/i.test(value);
  } else if (value.startsWith('+7')) {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/i.test(value);
  } else {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/i.test(value);
  }
}, "Введите полный номер");

$('select.custom-select').on('change', function() {
  setTimeout(function() {
    $('select.custom-select').trigger('refresh');
  }, 1)
});

if(document.getElementById('phone')) {
  let phone = document.getElementById('phone')

  let phoneMask = IMask(phone, {
    mask: [
      {
        mask: '+{375} (00) 000 00 00',
        startsWith: '375',
        overwrite: true,
        lazy: false,
        placeholderChar: '_',
      },
      {
        mask: '+{7} (000) 000 00 00',
        startsWith: '7',
        overwrite: true,
        lazy: false,
        placeholderChar: '_',
      },
      {
        mask: '+0000000000000',
        startsWith: '',
        country: 'unknown'
      }
    ],

    dispatch: function (appended, dynamicMasked) {
      var number = (dynamicMasked.value + appended).replace(/\D/g, '');

      return dynamicMasked.compiledMasks.find(function (m) {
        return number.indexOf(m.startsWith) === 0;
      });
    }
  })
}

function showPopup(path) {
  $.magnificPopup.open({
    items: { src: path },
    type: 'ajax',
    overflowY: 'scroll',
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in',
    ajax: {
      tError: 'Ошибка. <a href="%url%">Контент</a> не может быть загружен',
    },
    callbacks: {
      open: function () {
        setTimeout(function () {
          $('.mfp-wrap').addClass('not_delay');
          $('.white-popup').addClass('not_delay');
        }, 700);
      }
    }
  });
}

function setHeightDevelopment() {
  const blockParent = document.querySelectorAll('.development-block')

  if(blockParent.length) {
    blockParent.forEach(item => {
      const blockInfo = item.querySelector('.development-block-info')

      const parentHeight = item.offsetHeight
      const blockInfoBottomHeight = item.querySelector('.development-block-bottom').offsetHeight
      const title = item.querySelector('.development-block-title')
      const titleHeight = item.querySelector('.development-block-title').offsetHeight
      const imgBlock = item.querySelector('.development-block-img')
      const imgBlockHeight = imgBlock.offsetHeight

      const paddingTop = +window.getComputedStyle(item).paddingTop.split('px')[0]
      const paddingBottom = +window.getComputedStyle(item).paddingBottom.split('px')[0]

      const marginBottom = +window.getComputedStyle(blockInfo).marginBottom.split('px')[0]
      const marginTop = +window.getComputedStyle(blockInfo).marginTop.split('px')[0]

      const titleMarginBottom = +window.getComputedStyle(title).marginBottom.split('px')[0]

      const imgBlockMarginBottom = +window.getComputedStyle(imgBlock).marginBottom.split('px')[0]

      const sumPadding = paddingTop + paddingBottom
      const sumMargin = marginBottom + marginTop

      let sum = parentHeight - (titleMarginBottom + titleHeight + sumPadding + sumMargin + blockInfoBottomHeight)
      blockInfo.style.height = sum  + 'px'

      if(window.innerWidth <= 1024) {
        sum = sum - imgBlockHeight - imgBlockMarginBottom

        blockInfo.style.height = sum  + 'px'
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", mainScreen)

function mainScreen() {
  if(slider) {
    let sliderPos = slider.value / (100 / window.innerWidth);

    if(slider.value < 2) {
      background.style.opacity = 0;
      sliderTxt.style.opacity = 0;

      return
    } else if(slider.value > 99) {
      background.style.opacity = 1;
      sliderTxt.style.opacity = 1;
      backgroundBlock.style.width ='100%';

      return
    } else {
      sliderTxt.style.opacity = 1;
    }

    for (let i = 0; i < letters.length; i++) {
      let letterPos = letters[i].getBoundingClientRect().left;

      letters[i].style.opacity = letterPos <= sliderPos ? 1 : (slider.value / 100);
    }

    backgroundBlock.style.width = sliderPos + 'px';
    background.style.opacity = (slider.value / 100);
  }
}
