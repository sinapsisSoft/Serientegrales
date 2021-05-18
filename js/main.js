var validateCaptcha = false;
var captcha = null;

var revapi;
jQuery(document).ready(function() {

    if (identifierPage) {
        revapi = jQuery('.tp-banner').revolution({
            delay: 9000,
            startwidth: 1170,
            startheight: 500,
            hideThumbs: 10,
            fullWidth: "off",
            fullScreen: "on",
            fullScreenOffsetContainer: ""
        });
    } else {
        onloadView();
    }
});

function onloadView() {
    var contHtml = '<div id="content-400"><div class="moon"></div><div class="moon__crater moon__crater1"></div><div class="moon__crater moon__crater2"></div><div class="moon__crater moon__crater3"></div><div class="star star1"></div><div class="star star2"></div><div class="star star3"></div><div class="star star4"></div><div class="star star5"></div><div class="error"><div class="error__title">400</div><div class="error__subtitle" style="margin-top:60px">Algo ha ido mal con la petición</div><div class="error__description">Sitio web temporalmente fuera de servicio</div><!--<button class="error__button error__button--active">LOGIN</button><button class="error__button">CONTACT</button>--></div><div class="astronaut"><div class="astronaut__backpack"></div><div class="astronaut__body"></div><div class="astronaut__body__chest"></div><div class="astronaut__arm-left1"></div><div class="astronaut__arm-left2"></div><div class="astronaut__arm-right1"></div><div class="astronaut__arm-right2"></div><div class="astronaut__arm-thumb-left"></div><div class="astronaut__arm-thumb-right"></div><div class="astronaut__leg-left"></div><div class="astronaut__leg-right"></div><div class="astronaut__foot-left"></div><div class="astronaut__foot-right"></div><div class="astronaut__wrist-left"></div><div class="astronaut__wrist-right"></div><div class="astronaut__cord"><canvas id="cord" height="500px" width="500px"></canvas></div><div class="astronaut__head"><canvas id="visor" width="60px" height="60px"></canvas><div class="astronaut__head-visor-flare1"></div><div class="astronaut__head-visor-flare2"></div></div></div></div>';
    //window.location.href = "home.html";
    document.querySelector("body").innerHTML = contHtml;
    setTimeout(function() {
        drawVisor();
        animate();
    }, 100)

}
var cordCanvas;
var ctx;

function drawVisor() {
    var canvas = document.getElementById('visor');
    ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(5, 45);
    ctx.bezierCurveTo(15, 64, 45, 64, 55, 45);

    ctx.lineTo(55, 20);
    ctx.bezierCurveTo(55, 15, 50, 10, 45, 10);

    ctx.lineTo(15, 10);

    ctx.bezierCurveTo(15, 10, 5, 10, 5, 20);
    ctx.lineTo(5, 45);

    ctx.fillStyle = '#2f3640';
    ctx.strokeStyle = '#f5f6fa';
    ctx.fill();
    ctx.stroke();
}



let y1 = 160;
let y2 = 100;
let y3 = 100;

let y1Forward = true;
let y2Forward = false;
let y3Forward = true;

function animate() {
    cordCanvas = document.getElementById('cord');
    ctx = cordCanvas.getContext('2d');
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    ctx.beginPath();
    ctx.moveTo(130, 170);
    ctx.bezierCurveTo(250, y1, 345, y2, 400, y3);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 8;
    ctx.stroke();


    if (y1 === 100) {
        y1Forward = true;
    }

    if (y1 === 300) {
        y1Forward = false;
    }

    if (y2 === 100) {
        y2Forward = true;
    }

    if (y2 === 310) {
        y2Forward = false;
    }

    if (y3 === 100) {
        y3Forward = true;
    }

    if (y3 === 317) {
        y3Forward = false;
    }

    y1Forward ? y1 += 1 : y1 -= 1;
    y2Forward ? y2 += 1 : y2 -= 1;
    y3Forward ? y3 += 1 : y3 -= 1;
}


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
var onloadCallback = function() {
    if (identifierPage) {
        captcha = grecaptcha.render('html_element_captcha', {
            'sitekey': '6LeEOtwZAAAAAARJtCUXy9Q0tR4OvFvamDPTlLfS',
            'callback': function(response) {
                //$('#btn_submit').removeAttr('disabled');
                validateCaptcha = true;
            },
            'theme': 'white'
        });
    }
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
                    } else if (objForm[i].id == "message") {
                        ArrayData += '"' + objForm[i].id + '":' + '"' + objForm[i].value + '",';
                    }
                }
                ArrayData = ArrayData.substr(0, ArrayData.length - 1);
                sendMail(ArrayData, idform, 1);
            } else {
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
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                console.log(xhttp.responseText);
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
                    $('html, body').scrollTop(0);
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
        } else {
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

// $('.back-to-top').click(function() {
//   window.scrollTo(0,1000);
// });