<?php

if(!isset($_POST['name'], $_POST['idea'])) {
    http_response_code(400);
    exit();
}

$to = 'selbeezy@gmail.com';
$subject = 'Ide fra hyttesiden';
$from = 'no-reply@kristoferselbekk.com';

$headers = "From: no-reply@kristoferselbekk.com\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";


$message = '<!doctype html>'.
            '<html>'.
            '<head>'.
            '<style>'.
                'h2 { font-family: sans-serif; }'.
                '.container { max-width: 640px; margin: 10px auto; }'.
            '</style>'.
            '</head>'.
            '<body>'.
                '<div class="container">'.
                    '<h2>Ny idé til hytteturen fra ' . strip_tags($_POST['name']) . '</h2>'.
                    '<p>' . strip_tags($_POST['idea']) .'</p>' .
                    '<p>Husk å oppdatér websiden med idéen om den er bra!</p>'.
                '</div>'.
            '</body>'.
            '</html>';

if(mail($to, $subject, $message, $headers)) {
    http_response_code(200);
    exit();
}
else {
    http_response_code(500);
    exit();
}

?>
