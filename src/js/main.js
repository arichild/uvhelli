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

$.validator.messages.required = 'Пожалуйста, введите данные';

if (document.getElementById('phone')) {
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

const newsSliderEl = document.querySelector('.splide.newsSlider')
const achievementsEl = document.querySelector('.splide.achievementsSlider')
const galleryEl = document.querySelector('.splide.gallerySlider')

if(newsSliderEl !== null) {
  const newsSlider = new Splide('.splide.newsSlider', {
    perPage: 3,
    pagination: false,
    gap: 30
  })

  newsSlider.mount()
}

if(achievementsEl !== null) {
  const achievementsSlider = new Splide('.splide.achievementsSlider', {
    perPage: 4,
    pagination: false,
    gap: 27
  })

  achievementsSlider.mount()
}

if(galleryEl !== null) {
  const achievementsSlider = new Splide('.splide.gallerySlider', {
    perPage: 3,
    pagination: true,
    gap: 30
  })

  achievementsSlider.mount()
}

if(document.getElementById('map')) {
  ymaps.ready(init);

  function init(){
    var myMap = new ymaps.Map("map", {
        center: [53.917877, 27.471479],
        zoom: 16,
        controls: [],
    });

    myMap.behaviors.disable('scrollZoom');
  }
}

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

AOS.init({
  delay: 180,
  duration: 1200,
});


const anchors = document.querySelectorAll('.development-head-target a')

function blockTo(className) {
  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      let arr = e.target.classList;
      let id = Array.from(arr).filter(word => word == className)

      if (id.length) {
        document.getElementById(id[0]).scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    })
  }
}

if (anchors.length) {
  blockTo("1")
  blockTo("2")
  blockTo("3")
  blockTo("4")
  blockTo("5")
}

const developmentGallery = document.querySelectorAll('#development')

if(developmentGallery.length) {
  developmentGallery.forEach(item => {
    item.addEventListener('click', function() {
      const data = JSON.parse(item.dataset.development)

      lightGallery(item, {
          dynamic: true,
          download: false,
          counter: false,
          hideBarsDelay: 0,
          controls: true,

          dynamicEl: data
      })
    });
  })
}

const exhibitionGallery = document.querySelector('#exhibitionGallery')

if(exhibitionGallery) {
  if(exhibitionGallery) {
    lightGallery(exhibitionGallery, {
      selector: '.exhibition-photo',
      download: false,
      counter: false,
      hideBarsDelay: 0,
      controls: true,
    });
  }
}

Fancybox.bind('[data-fancybox="video"]', {
  trapFocus: true,
  Thumbs: false
});

const inputFile = document.querySelector('.ui-doc-file input[type=file]')

if(inputFile) {
  $('.ui-doc-file input[type=file]').on('change', function(){
    let file = this.files[0];
    $(this).next().html(file.name);
  });
}