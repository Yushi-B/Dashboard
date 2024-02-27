/**
* Template Name: NiceAdmin
* Updated: Jul 27 2023 with Bootstrap v5.3.1
* Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function(e) {
      select('body').classList.toggle('toggle-sidebar')
    })
  }

  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function(e) {
      select('.search-bar').classList.toggle('search-bar-show')
    })
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  /**
   * Initiate quill editors
   */
  if (select('.quill-editor-default')) {
    new Quill('.quill-editor-default', {
      theme: 'snow'
    });
  }

  if (select('.quill-editor-bubble')) {
    new Quill('.quill-editor-bubble', {
      theme: 'bubble'
    });
  }

  if (select('.quill-editor-full')) {
    new Quill(".quill-editor-full", {
      modules: {
        toolbar: [
          [{
            font: []
          }, {
            size: []
          }],
          ["bold", "italic", "underline", "strike"],
          [{
              color: []
            },
            {
              background: []
            }
          ],
          [{
              script: "super"
            },
            {
              script: "sub"
            }
          ],
          [{
              list: "ordered"
            },
            {
              list: "bullet"
            },
            {
              indent: "-1"
            },
            {
              indent: "+1"
            }
          ],
          ["direction", {
            align: []
          }],
          ["link", "image", "video"],
          ["clean"]
        ]
      },
      theme: "snow"
    });
  }

  /**
   * Initiate TinyMCE Editor
   */
  const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;

  tinymce.init({
    selector: 'textarea.tinymce-editor',
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
    editimage_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    toolbar_sticky: true,
    toolbar_sticky_offset: isSmallScreen ? 102 : 108,
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    link_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_class_list: [{
        title: 'None',
        value: ''
      },
      {
        title: 'Some class',
        value: 'class-name'
      }
    ],
    importcss_append: true,
    file_picker_callback: (callback, value, meta) => {
      /* Provide file and text for the link dialog */
      if (meta.filetype === 'file') {
        callback('https://www.google.com/logos/google.jpg', {
          text: 'My text'
        });
      }

      /* Provide image and alt text for the image dialog */
      if (meta.filetype === 'image') {
        callback('https://www.google.com/logos/google.jpg', {
          alt: 'My alt text'
        });
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === 'media') {
        callback('movie.mp4', {
          source2: 'alt.ogg',
          poster: 'https://www.google.com/logos/google.jpg'
        });
      }
    },
    templates: [{
        title: 'New Table',
        description: 'creates a new table',
        content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'
      },
      {
        title: 'Starting my story',
        description: 'A cure for writers block',
        content: 'Once upon a time...'
      },
      {
        title: 'New list with dates',
        description: 'New List with dates',
        content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>'
      }
    ],
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image table',
    skin: useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: useDarkMode ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
  });

  /**
   * Initiate Bootstrap validation check
   */
  var needsValidation = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(needsValidation)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

  /**
   * Initiate Datatables
   */
  const datatables = select('.datatable', true)
  datatables.forEach(datatable => {
    new simpleDatatables.DataTable(datatable);
  })

  /**
   * Autoresize echart charts
   */
  const mainContainer = select('#main');
  if (mainContainer) {
    setTimeout(() => {
      new ResizeObserver(function() {
        select('.echart', true).forEach(getEchart => {
          echarts.getInstanceByDom(getEchart).resize();
        })
      }).observe(mainContainer);
    }, 200);
  }

})();

document.getElementById('today').addEventListener('click', function () {
  // Update the content with today's data
  document.getElementById('visitors-count').textContent = '1059';
  document.getElementById('percentage-increase').textContent = '12%';
  document.getElementById('increase-label').textContent = 'Increase';
  document.getElementById('date').textContent = '| Today';
});

document.getElementById('this-month').addEventListener('click', function () {
  // Update the content with this month's data
  document.getElementById('visitors-count').textContent = '26475';
  document.getElementById('percentage-increase').textContent = '2%';
  document.getElementById('increase-label').textContent = 'Decrease';
  document.getElementById('date').textContent = '| Month';
  document.getElementById('percentage-increase').color = 'red';
});

document.getElementById('this-year').addEventListener('click', function () {
  // Update the content with this year's data
  document.getElementById('visitors-count').textContent = '31770';
  document.getElementById('percentage-increase').textContent = '17%';
  document.getElementById('increase-label').textContent = 'Increase';
  document.getElementById('date').textContent = '| Year';
});

document.getElementById('revenue-today').addEventListener('click', function () {
  // Update the content with today's data
  document.getElementById('new-sign-ups-count').textContent = '121';
  document.getElementById('percentage-increase-revenue').textContent = '2%';
  document.getElementById('increase-label-revenue').textContent = 'Increase';
});

document.getElementById('revenue-this-month').addEventListener('click', function () {
  // Update the content with this month's data
  
  document.getElementById('new-sign-ups-count').textContent = '2030';
  document.getElementById('percentage-increase-revenue').textContent = '3%';
  document.getElementById('increase-label-revenue').textContent = 'Increase';
});

document.getElementById('revenue-this-year').addEventListener('click', function () {
  // Update the content with this year's data
  document.getElementById('new-sign-ups-count').textContent = '14560';
  document.getElementById('percentage-increase-revenue').textContent = '14%';
  document.getElementById('increase-label-revenue').textContent = 'Increase';
});



// Function to generate a random number between min and max (inclusive)
function getRandomTemperature(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var gauge = Gauge(document.getElementById("gauge-demo"), {
  min: 0,
  max: 50,
  dialStartAngle: 180,
  dialEndAngle: 0,
  value: getRandomTemperature(17, 27), // Initialize with a random value
  viewBox: "0 0 100 57",
  color: function (value) {
    if (value < 20) {
      return "#5ee432";
    } else if (value < 25) {
      return "#FFD700";
    } else if (value < 35) {
      return "#ef4655";
    }
  }
});

// Update the gauge with a new random temperature value every 5 seconds
setInterval(function () {
  var newTemperature = getRandomTemperature(17, 27);
  gauge.setValueAnimated(newTemperature, 1); // Update the gauge with animation
}, 1500); // 5000 milliseconds (5 seconds)


// Function to generate a random packet loss percentage between min and max
function getRandomPacketLoss(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

// Function to update the packet loss percentage and its color
function updatePacketLoss() {
  var packetLossElement = document.getElementById("packet-loss");
  var newPacketLoss = getRandomPacketLoss(0.24, 0.91);
  packetLossElement.textContent = newPacketLoss + "%";

  // Set the text color based on the packet loss percentage value
  if (newPacketLoss < 0.5) {
    packetLossElement.style.color = "green";
  } else if (newPacketLoss < 0.8) {
    packetLossElement.style.color = "yellow";
  } else {
    packetLossElement.style.color = "red";
  }
}

// Update the packet loss percentage and its color every 1 second
setInterval(updatePacketLoss, 1000); // 1000 milliseconds (1 second)


// Replace this with your actual capacity value
const currentCapacity = 60; // Example: 60%
const maxCapacity = 100; // Example: 100

const capacityElement = document.querySelector('.capacity');

capacityElement.textContent = currentCapacity + '%'; // Set the capacity text










