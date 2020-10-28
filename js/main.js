var validateCaptcha = true;
var captcha = null;

var revapi;
jQuery(document).ready(function () {
  revapi = jQuery('.tp-banner').revolution(
    {
      delay: 9000,
      startwidth: 1170,
      startheight: 500,
      hideThumbs: 10,
      fullWidth: "off",
      fullScreen: "on",
      fullScreenOffsetContainer: ""
    });
});

$('.owl-carousel').owlCarousel({
  loop: true,
  margin: 10,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      nav: true,
    },
    600: {
      items: 1,
      nav: true
    },
    1200: {
      items: 1,
      nav: true,
      loop: false
    }
  }
});

//Function captcha Google
var onloadCallback = function () {
  captcha = grecaptcha.render('html_element_captcha', {
    'sitekey': '6LfEXLAZAAAAAD6LFAIJuw4kIlYawGeJKM5nLh07',
    'callback': function (response) {
      //$('#btn_submit').removeAttr('disabled');
      validateCaptcha = true;
    },
    'theme': 'white'
  });
};

//Validate information
function sendData(idform, type) {
  if (validatorForm(idform)) {
    debugger;
    if (type == 1) { //Formulario contáctenos
       if (validateCaptcha) {
        let objForm = document.getElementById(idform);
        let ArrayData = "";
        for (let i = 0; i < objForm.length; i++) {
          if (objForm[i].type == "text" || objForm[i].type == "email" || objForm[i].type == "number" || objForm[i].type == "select-one") {
            ArrayData += '"' + objForm[i].id + '":' + '"' + objForm[i].value + '",';
          }
          else if (objForm[i].id == "message") {
            ArrayData += '"' + objForm[i].id + '":' + '"' + objForm[i].value + '",';
          }
        }
        ArrayData = ArrayData.substr(0, ArrayData.length - 1); 
        sendMail(ArrayData, idform, 1);
       }
      else {
        toastr.warning("Comprueba que no eres un robot", "Verifica el captcha", {
          "closeButton": true,
          "progressBar": true,
          "showDuration": "1000",
          "hideDuration": "1000",
          "timeOut": "5000",
        });
      }
    }
  }
}

function sendMail(json, idForm, type) {  
  try {
    dataSetMail = "";
    var xhttp = new XMLHttpRequest();
    if (type == 1) {
      dataSetMail = '{"POST":"SEND_MAIL",' + json + '}';
    }
    xhttp.open("POST", "php/mail/notification.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log(xhttp.responseText);
        debugger;
        if (xhttp.responseText != 0) {
          if (type == 1) {
            toastr.success("Pronto nos comunicaremos contigo", "Gracias por escribirnos", {
              "closeButton": true,
              "progressBar": true,
              "showDuration": "1000",
              "hideDuration": "1000",
              "timeOut": "5000",
            });
          }
          cleanForm(idForm, type);
          $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        } else {
          toastr.error("Hubo un error, por favor intenta nuevamente", "Error al enviar la solicitud", {
            "closeButton": true,
            "progressBar": true,
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": "5000",
          });
        }
      }
    };
    xhttp.send(dataSetMail);
  } catch (error) {
    console.error(error);
    toastr.error("Se presentó un error, intenta nuevamente", "Error en el registro", {
      "closeButton": true,
      "progressBar": true,
      "showDuration": "1000",
      "hideDuration": "1000",
      "timeOut": "5000",
    });
  }
}

//Validate form
function validatorForm(idForm) {
  let objForm = document.getElementById(idForm);

  ///For input ///
  for (let i = 0; i < objForm.length; i++) {
    if (objForm[i].required == true) {
      if (objForm[i].type == "email") {
        if (objForm[i].value == "" || objForm[i].value.length == 0) {
          return false;
        }
      }
      if (objForm[i].type == "password") {
        if (objForm[i].value == "" || objForm[i].value.length == 0) {
          return false;
        }
      }
      if (objForm[i].type == "text") {
        if (objForm[i].value == "" || objForm[i].value.length == 0) {
          return false;
        }
      }
      if (objForm[i].type == "number") {
        if (objForm[i].value == "" || objForm[i].value.length == 0) {
          return false;
        }
      }

    }
  }
  return true;
}

function cleanForm(idForm, type) {
  objForm = document.getElementById(idForm);
  for (let i = 0; i < objForm.length; i++) {
    if (objForm[i].type == 'checkbox') {
      objForm[i].checked = false;
    }
    else {
      objForm[i].value = "";
    }
  }
  if (type == 1) {
    grecaptcha.reset();
  }
}

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    window.scrollTo(0,1000);
  });