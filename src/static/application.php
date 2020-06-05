<?

    $name  =  $_POST['name'];   
	$email =  $_POST['email'];
    $messager = $_POST['message'];
    // $admin_email = 'sergeykhistovoy@gmail.com';
    $admin_email = 'mr.andrey@bigmir.net';
	
	$subject = 'Нова заявка';
	$headers= "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=utf-8; boundary='first'\r\n";
    $message .= "<h1>Нова заявка</h1>";
    $message .= "<p>Ім'я: ".$name."</p>";
	$message .= '<p>Електрона пошта: '.$email;
    $message.= '<p>Повідомлення: '.$messager.'</p>';
	if (mail($admin_email, $subject, $message, $headers)) {
        echo '11';
    } else {
        echo 'fail';
        echo $message;
    }


?>