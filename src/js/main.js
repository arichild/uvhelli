$(document).ready(function() {
  // animation for development.html
  AOS.init({
    delay: 180,
    duration: 1200,
  });

  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // We listen to the resize event
  window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  // slider
  const newsSliderEl = document.querySelector('.splide.newsSlider')
  const moreSliderEl = document.querySelector('.splide.moreSlider')
  const achievementsEl = document.querySelector('.splide.achievementsSlider')
  const galleryEl = document.querySelector('.splide.gallerySlider')
  const experienceSlider = document.querySelector('.splide.experienceSlider')
  const companyHistorySlider = document.querySelector('.splide.companyHistory')
  const companyProductionSlider = document.querySelector('.splide.companyProduction')
  const timelineSlider = document.querySelectorAll('.splide.timelineSlider')

  function heightAuto(element) {
    setTimeout(() => {
      const visibleEl = element.querySelectorAll('.is-visible')
      let heights = []

      visibleEl.forEach(el => {
        let height = el.offsetHeight

        heights.push(height)
      });

      const maxHeight = Math.max(...heights)
      const list = element.querySelector('.splide__list')

      list.style.height = maxHeight + 'px'
    }, 1);
  }

  if(newsSliderEl) {
    const slider = new Splide('.splide.newsSlider', {
      perPage: 3,
      pagination: false,
      gap: 30,

      breakpoints: {
        1024: { perPage: 2, gap: 30 },
        599 : { perPage: 1, gap: 0 },
      },
    })

    slider.on('mounted moved', () => {
      heightAuto(newsSliderEl)
    });
    slider.mount()
  }

  if(moreSliderEl) {
    const slider = new Splide('.splide.moreSlider', {
      perPage: 3,
      pagination: false,
      gap: 30,

      breakpoints: {
        1024: { perPage: 2, gap: 30 },
        599 : { perPage: 1, gap: 0 },
      },
    })

    let items = document.querySelectorAll('.splide__slide');
    let controls = document.querySelector('.splide__arrows');

    if(items.length <= 3) {
      controls.classList.add('hidden')
    }

    slider.on('mounted moved', () => {
      heightAuto(moreSliderEl)
    });
    slider.mount()
  }

  if(achievementsEl) {
    const slider = new Splide('.splide.achievementsSlider', {
      perPage: 4,
      pagination: false,
      gap: 27,

      breakpoints: {
        1024: { perPage: 3 },
        768 : { perPage: 2 },
        599: {perPage: 1}
      },
    })

    slider.mount()
  }

  if(galleryEl) {
    const slider = new Splide('.splide.gallerySlider', {
      perPage: 3,
      pagination: true,
      gap: 30,

      breakpoints: {
        1024: { perPage: 2, gap: 30 },
        599 : { perPage: 1, gap: 0 },
      },
    })

    if(window.innerWidth > 1024) {
      let items = galleryEl.querySelectorAll('.splide__slide');
      let controls = galleryEl.querySelector('.splide-controls');

      if(items.length <= 3) {
        controls.classList.add('hidden')
      }
    }

    slider.on('mounted moved', () => {
      heightAuto(galleryEl)
    });
    slider.mount()
  }

  if(experienceSlider) {
    const slider = new Splide('.splide.experienceSlider', {
      perPage: 3,
      gap: 30,
      pagination: false,

      breakpoints: {
        1024: { perPage: 2 },
        599 : { perPage: 1, gap: 0 },
      },
    })

    slider.on('mounted moved', () => {
      heightAuto(experienceSlider)
    });
    slider.mount()
  }

  if(companyHistorySlider) {
    const slider = new Splide('.splide.companyHistory', {
      perPage: 1,
      // padding: { right: 380 },
      gap: 60,
      pagination: false,

      breakpoints: {
        1024: { gap: 30 },
        599 : { perPage: 1, gap: 0 },
      },
    })

    slider.mount()
  }

  if(companyProductionSlider) {
    const slider = new Splide('.splide.companyProduction', {
      perPage: 3,
      gap: 30,
      pagination: false,

      breakpoints: {
        1024: { perPage: 2 },
        599 : { perPage: 1, gap: 0 },
      },
    })

    slider.mount()
  }

  if(timelineSlider) {
    timelineSlider.forEach(element => {
      if(window.innerWidth <= 1024) {
        const slider = new Splide(element, {
          perPage: 3,
          gap: 30,
          pagination: false,
          autoHeight: true,

          breakpoints: {
            1024: { perPage: 2 },
            599 : { perPage: 1, gap: 0 },
          },
        })



        slider.on('mounted moved', () => {
          heightAuto(element)
        });
        slider.mount()
      }
    });
  }

  // tabs
  const tabs = document.querySelector('.ui-tab') || document.querySelector('.ui-tab-icon');

  if(tabs) {
    tabs.addEventListener('click', (e) => {
      const parent = e.target.closest('.ui-tab-block')

      parent.classList.toggle('active')
    })
  }

  function scrollTo(element) {
    let offset = (element.getBoundingClientRect().top + window.pageYOffset) - document.querySelector('.header').clientHeight

    if(element.dataset.aos) {
      offset = offset - 100
    }

    window.scrollTo({
      behavior: 'smooth',
      top: offset
    })
  }

  // anchor
  const anchors = document.querySelectorAll('[data-anchor]')

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      let id = e.target.dataset.anchor;
      const block = document.getElementById(id)

      if(id && block) {
        e.preventDefault()
        closeBurger()

        scrollTo(block)
      }
    })
  }

  // contacts
  function anchorLink() {
    const hash = window.location.hash

    if(!hash) return

    const el = hash.substring(1)
    const block = document.getElementById(el)

    if(!block) return

    scrollTo(block)
  }

  $(window).on('load', function() {
    anchorLink()
  })

  // input file
  const inputFile = $('.input-file')

  if(inputFile) {
    inputFile.each(function() {
      $(this).on('change', function(){
        let file = this.files[0];
        $(this).next().html(file.name);
      });
    });
  }

  // lang menu
  const langBtn = document.querySelector('.header-lang-select')

  if(langBtn) {
    const closeLangMenu = document.querySelector('.header-lang-default')
    const langMenu = document.querySelector('.header-lang-menu')

    langBtn.addEventListener('click', () => {
      if(!langMenu) return

      langMenu.classList.add('active')
    })

    closeLangMenu.addEventListener('click', () => {
      if(!langMenu) return

      langMenu.classList.remove('active')
    })
  }

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
      const logo = document.querySelector('.header-content-img')
      const body = document.body

      burger.classList.toggle('active')
      menuBurger.classList.toggle('active')
      header.classList.toggle('active')
      logo.classList.toggle('active')
      body.classList.toggle('active')
    })
  }

  function closeBurger() {
    const menuBurger = document.querySelector('.header-content-block')
    const header = document.querySelector('.header')
    const logo = document.querySelector('.header-content-img')
    const body = document.body

    burger.classList.remove('active')
    menuBurger.classList.remove('active')
    header.classList.remove('active')
    logo.classList.remove('active')
    body.classList.remove('active')
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

  let header = document.querySelector(".header");

  if(header) {
    window.addEventListener('scroll', headerSticky)
  }

  // height for blocks for development.html
  setHeightDevelopment()
  window.addEventListener('resize', setHeightDevelopment);

  // range input
  const slider = document.querySelector('.main-screen-range')

  if(slider) {
    const letters = document.querySelectorAll('.main-screen-letter')
    const backgroundBlock = document.querySelector('.main-screen-block')
    const background = document.querySelector('.main-screen-bg')
    const sliderTxt = document.querySelector('.main-screen-txt')

    mainScreen()
    slider.addEventListener('input', mainScreen)

    function mainScreen() {
      let sliderPos = slider.value / (100 / window.innerWidth);

      if(window.innerWidth > 1024) {
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
  }

  // line height in company.html
  $(window).on('load', function() {
    lineHeight()
  })
  window.addEventListener('resize', lineHeight)
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

let phone = document.querySelectorAll('.phone-mask')

if(phone.length) {
  phone.forEach(element => {
    IMask(element, {
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
  });
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
  if(window.innerWidth > 1024) {
    const blockParent = document.querySelectorAll('.development-block')

    if(!blockParent.length) return

    blockParent.forEach(item => {
      const blockInfo = item.querySelector('.development-block-info')

      const blockInfoBottom = item.querySelector('.development-block-bottom')
      const blockInfoBottomHeight = blockInfoBottom.offsetHeight

      const parentHeight = item.offsetHeight
      const title = item.querySelector('.development-block-title')
      const titleHeight = item.querySelector('.development-block-title').offsetHeight
      const imgBlock = item.querySelector('.development-block-img')
      // const imgBlockHeight = imgBlock.offsetHeight

      const paddingTop = +window.getComputedStyle(item).paddingTop.split('px')[0]
      const paddingBottom = +window.getComputedStyle(item).paddingBottom.split('px')[0]

      const marginBottom = +window.getComputedStyle(blockInfo).marginBottom.split('px')[0]
      const marginTop = +window.getComputedStyle(blockInfo).marginTop.split('px')[0]

      const titleMarginBottom = +window.getComputedStyle(title).marginBottom.split('px')[0]

      const blockTxt = document.querySelector('.development-block-txt')
      const blockTxtBottom = +window.getComputedStyle(blockTxt).marginBottom.split('px')[0]

      // const imgBlockMarginBottom = +window.getComputedStyle(imgBlock).marginBottom.split('px')[0]

      const sumPadding = paddingTop + paddingBottom
      const sumMargin = marginBottom + marginTop

      let sum = parentHeight - (titleMarginBottom + titleHeight + sumPadding + sumMargin + blockInfoBottomHeight + blockTxtBottom)

      blockInfo.style.height = sum  + 'px'
    });
  }
}

// header sticky
function headerSticky() {
  let logo = header.querySelector('.header-content-img')
  let cardBreackpoint = document.querySelector(".card-breackpoint");

  if (cardBreackpoint) {
    let offset = cardBreackpoint.offsetTop - header.clientHeight;

    if (window.pageYOffset >= offset) {
      header.classList.add("sticky");
      logo.classList.add("visible");
    } else {
      header.classList.remove("sticky");
      logo.classList.remove("visible");
    }
  }
}

function lineHeight() {
  const block = document.querySelectorAll('.company-timeline-slider')

  block.forEach(element => {
    const offsetTopEl = element.getBoundingClientRect().top + window.pageYOffset
    const titles = element.querySelectorAll('.company-timeline-title')

    const offsetFirst = titles[0].getBoundingClientRect().bottom + window.pageYOffset
    const offsetLast = titles[titles.length - 1].getBoundingClientRect().bottom + window.pageYOffset

    const top = offsetFirst - offsetTopEl
    const height = offsetLast - offsetFirst

    const line = element.querySelector('.company-timeline-line')

    line.style.height = height + 'px'
    line.style.top = top + 'px'
  });
}