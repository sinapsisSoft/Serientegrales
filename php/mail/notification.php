<?php
header("Content-type: application/json; charset=utf-8");
class Notification {

  private $from;
  private $title;
  private $message;
  private $headboard;
  private $obJBo;
  private $to;
  private $cc;
  private $name;
  private $email;
  private $phone;
  private $subject;

  public function __construct()
  {
    $this->from = "administrativo@serintegralessi.com";
  }

  public function __sendEmail($name, $email, $phone, $subject, $message){
    $this->name=$name;
    $this->email=$email;
    $this->phone=$phone;
    $this->subject=$subject;
    $this->message=$message;    
  }
  public function __sendSubscribe($email){
    $this->email=$email;   
  }
  #Description: Function send mail 
  public function sendMail($type)
  {
    if($type == 1){
      $this->to= $this->email;
      $this ->title = 'Saludos de Serintegrales';
      $banner = 'https://www.sinapsistechnologies.com.co/assets/img/mail/serv_cl_1.png';
      $footer = 'https://www.sinapsistechnologies.com.co/assets/img/mail/logo_white.png';
      $headerColor = '#027e88';
      $footerColor = '#39312f';
      $messageBody = '<div class="wrapper">
      <div class="webkit">
        <table class="outer">
          <tbody>
          <tr>
          <td class="full-width-image banner">
          <img src="' . $banner . '"alt="">
          </td>
          </tr>
            <tr>
              <td class="one-column">
                <table width="100%">
                  <tr>
                    <td class="inner contents">
                      <br>
                      <p class="textBanner">Hola, '.$this->name.'</p>
                      <br>
                      <p class="h1">Saludo Cordial,</p>
                      <br>
                      <p>Recibimos tu mensaje a través de nuestra página web y estamos interesados en escuchar
                        las necesidades que tienes en temas de <strong>'.$this->subject.'.</strong></p>
                      <br>
                      <p>En nuestro ADN está acompañar y orientar el desarrollo
                        de propuestas eficientes que implementen soluciones ajustadas a los recursos,
                        procesos y habilidades de nuestros aliados.</p>
                      <br>
                      <p>Pronto nos pondremos en contacto para que juntos formemos un equipo
                        dispuesto a alcanzar las metas de tu compañía.
                      </p>
                      <br>
                      <p>Atentamente,</p>
                      <br>
                      <p>Equipo de comunicaciones</p>
                      <p><strong>Sinapsis Technologies</strong></p>
                      <p><i>Conectando mundos</i></p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="right-sidebar" dir="rtl" style="background: '.$footerColor.';">                
                <table class="column right" dir="ltr">
                  <tbody>
                    <tr>
                      <td class="inner contents textFooter">
                        No respondas a este correo, es un mensaje generado automáticamente por el sistema.
                        Si necesitas ayuda, por favor ingresa a <br> <a href="https://www.sinapsistechnologies.com.co"
                          target="_blank">Sinapsis Technologies</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="column left" dir="ltr">
                  <tbody>
                    <tr>
                      <td class="inner contents">
                        <img id="img_left" src="'.$footer.'"
                          width="90" alt="">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </body>
    </html>';
    }
    else if($type == 2){
      $this->to ="administrativo@serintegralessi.com";
      $this ->title = 'Registro de solicitud web';
      $banner = 'https://www.serintegralessi.com/images/mail/banner1.png';
      $footer = 'https://www.sinapsistechnologies.com.co/assets/img/mail/logo_white.png';
      $headerColor = '#027e88';
      $footerColor = '#39312f';
      $messageBody = '<div class="wrapper">
      <div class="webkit">
        <table class="outer">
          <tbody>
          <tr>
          <td class="full-width-image banner">
          <img src="' . $banner . '"alt="">
          </td>
          </tr>
              <td class="one-column">
                <table width="100%">
                  <tr>
                    <td class="inner contents">
                      <br>
                      <p class="textBanner">Hola, Serintegrales</p>
                      <br>
                      <p class="h1">Saludo Cordial,</p>
                      <br>
                      <p>Has recibido una solicitud desde la web:</p>
                      <p><strong>Nombre: </strong>'.$this->name.'</p>
                      <p><strong>Correo: </strong>'.$this->email.'</p>
                      <p><strong>Teléfono: </strong>'.$this->phone.'</p> 
                      <p><strong>Asunto: </strong>'.$this->subject.'</p>
                      <p><strong>Mensaje: </strong>'.$this->message.'</p>
                      <br>
                      <p>Atentamente,</p>
                      <br>
                      <p>Equipo de comunicaciones</p>
                      <p><strong>Sinapsis Technologies</strong></p>
                      <p><i>Conectando mundos</i></p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="right-sidebar" dir="rtl" style="background: '.$footerColor.';">                
                <table class="column right" dir="ltr">
                  <tbody>
                    <tr>
                      <td class="inner contents textFooter">
                        No respondas a este correo, es un mensaje generado automáticamente por el sistema.
                        Si necesitas ayuda, por favor ingresa a <br> <a href="https://www.sinapsistechnologies.com.co"
                          target="_blank">Sinapsis Technologies</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="column left" dir="ltr">
                  <tbody>
                    <tr>
                      <td class="inner contents">
                        <img id="img_left" src="'.$footer.'"
                          width="90" alt="">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </body>
    </html>';
    }
    $headboard  = 'MIME-Version: 1.0' . "\r\n";
    $headboard .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
    $from = 'administrativo@serintegralessi.com';
    $headboard .= 'From:Web Serintegrales <'.$from.'>'."\r\n";
    $message = '<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Send Main</title>
    <style>
    body {
    margin: 0 !important;
    padding: 0;
    background-color: #ffffff;
    }

    table {
    border-spacing: 0;
    font-family: sans-serif;
    color: #333333;
    }

    td {
    padding: 0;
    }

    img {
    border: 0;
    width: 100%;
    }

    div[style*="margin: 16px 0"] {
    margin: 0 !important;
    }

    .wrapper {
    width: 100%;
    table-layout: fixed;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    }

    .webkit {
    max-width: 600px;
    margin: 0 auto;
    }

    .outer {
    Margin: 0 auto;
    width: 100%;
    max-width: 600px;
    }

    .inner {
    padding: 10px;
    }

    .contents {
    width: 100%;
    }

    p {
    Margin: 0;
    }

    a {
    color: #ee6a56;
    text-decoration: underline;
    }

    .h1 {
    font-size: 21px;
    font-weight: bold;
    Margin-bottom: 18px;
    }

    .h2 {
    font-size: 18px;
    font-weight: bold;
    Margin-bottom: 12px;
    }    

    .full-width-image {
    background-size: cover;
    height: auto;
    width: 100%;
    vertical-align: bottom;
    position: relative;
    display: inline-block;
    text-align: center;    
    }

    .full-width-image img {
      width: 100%;
      max-width: 600px;
      height: auto;  
      }

    /* One column layout */
    .one-column .contents {
    text-align: left;
    }

    .one-column p {
    font-size: 14px;
    Margin-bottom: 10px;
    }

    /*Two column layout*/
    .two-column {
    text-align: center;
    font-size: 0;
    }

    .two-column .column {
    width: 100%;
    max-width: 300px;
    display: inline-block;
    vertical-align: top;
    }

    .two-column .contents {
    font-size: 14px;
    text-align: left;
    }

    .two-column img {
    width: 100%;
    max-width: 280px;
    height: auto;
    }

    .two-column .text {
    padding-top: 10px;
    }

    /*Three column layout*/
    .three-column {
    text-align: center;
    font-size: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    }

    .three-column .column {
    width: 100%;
    max-width: 200px;
    display: inline-block;
    vertical-align: top;
    }

    .three-column img {
    width: 100%;
    max-width: 180px;
    height: auto;
    }

    .three-column .contents {
    font-size: 14px;
    text-align: center;
    }

    .three-column .text {
    padding-top: 10px;
    }

    /* Left sidebar layout */
    .left-sidebar {
    font-size: 0;
    }

    .left-sidebar .column {
    width: 100%;
    display: inline-block;
    vertical-align: middle;
    }

    .left-sidebar .left {
    max-width: 100px;
    }

    .left-sidebar .right {
    max-width: 500px;
    }

    .left-sidebar .img {
    width: 100%;
    max-width: 80px;
    height: auto;
    }

    .left-sidebar .contents {
    font-size: 14px;
    text-align: center;
    }

    .left-sidebar a {
    color: #85ab70;
    }

    /* Right sidebar layout */
    .right-sidebar {
    text-align: center;
    font-size: 0;
    }

    .right-sidebar .column {
    width: 100%;
    display: inline-block;
    vertical-align: middle;
    }

    .right-sidebar .left {
    max-width: 25%;
    }

    .right-sidebar .right {
    max-width: 70%;
    }

    .right-sidebar .img {
    width: 100%;
    max-width: 80px;
    height: auto;
    }

    .right-sidebar .contents {
    font-size: 14px;
    }

    .right-sidebar a {
    color: #0e7644;
    }

    .button {
    text-align: center;
    font-size: 18px;
    font-family: sans-serif;
    font-weight: bold;
    padding: 0 30px 0 30px;
    }

    .button a {
    color: #e51d1d;
    text-decoration: none;
    }

    .textBanner {
    font-size: 20px !important;
    font-weight: 600;
    color: #168d8d;
    top: 50px;
    }

    .textFooter {
    text-align: right;
    font-size: 10px;
    font-weight: 600;
    color: #ffff!important;
    }


    /*Media Queries*/
    @media screen and (max-width: 400px) {

    .two-column .column,
    .three-column .column {
    max-width: 100% !important;
    }

    .two-column img {
    max-width: 100% !important;
    }

    .three-column img {
    max-width: 50% !important;
    }
    }

    @media (max-width: 600px) {
      .full-width-image {
      height: 160px;
      width: 100%;
      }

    .right-sidebar .contents {
      font-size: 10px;
      width: 100%;
      }
    }

    @media (max-width: 331px) {
    .full-width-image {
    height: 108px;
    width: 100%;
    }

    #img_right {
    width: 60px !important;
    }

    #img_left {
    width: 80px !important;
    }
    }

    @media screen and (min-width: 401px) and (max-width: 620px) {
    .three-column .column {
    max-width: 33% !important;
    }

    .two-column .column {
    max-width: 50% !important;
    }
    }
    </style>
    </head>'.$messageBody;
    if (mail($this->to, $this->title, $message, $headboard)) {
      return 1;
    };
    return 0;
  }
}
$getData = file_get_contents('php://input');
$data = json_decode($getData);
/**********CREATE ************/
if (isset($data->POST)) {
    $mail=new Notification();
    if ($data->POST == "SEND_MAIL") {
      $mail->__sendEmail($data->name, $data->email, $data->phone, $data->subject, $data->message);
      echo $mail->sendMail(2);
    }      
  }
  
  //$mail=new Notification();
  //$mail->__sendEmail('Laura Grisales', 'lauramggarcia@hotmail.com', '3123718171', 'Desarrollo a la medida', 'Prueba directa PHP');
  // $mail->__sendSubscribe('lauramggarcia@hotmail.com');
  // echo $mail->sendMail(3);
  // echo $mail->sendMail(2);
?>
