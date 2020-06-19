<?

    $name  =  $_POST['name'];   
	$telephone =  $_POST['telephone'];
    // $messager = $_POST['message'];
    $form_name = $_POST['form_name'];
    if (empty($form_name)) 
    {
        $form_name = 'undefined';
        echo 'fail';
        return;
    }    
    $admin_email = 'dron_2019@ukr.net';
    // $admin_email = 'viralitvinenko@gmail.com';
	switch ($form_name) {
        case 'undefined':
            $message = '';
            echo 'fail';
            break;
        case 'send-message':
            $message .= "<h1>Передзвоніть мені";
            $message .= "<p>Ім'я: ".$_POST['name']."</p>";
            $message .= "<p>Телефон: ".$_POST['tel']."</p>";
            $message .= "<p>e-mail: ".$_POST['email']."</p>";
            $message .= "<p>Повідомлення: ".$_POST['message']."</p>";
            break;
        case 'callback':
            $message  .= "<h1>Передзвоніть мені";
            $message .= "<p>Ім'я: ".$_POST['name']."</p>";
            $message .= "<p>Телефон: ".$_POST['tel']."</p>";
            $message .= "<p>e-mail: ".$_POST['email']."</p>";
            $message .= "<p>Повідомлення: ".$_POST['message']."</p>";
        break;
        case 'promotions':
            $message  .= "<h1>Акції";
            $message .= "<p>Телефон: ".$_POST['tel']."</p>";
            $message .= "<p>e-mail: ".$_POST['email']."</p>";
        break;
        default:
            # code...
            break;
    }
    
    $subject = 'Заявка з сайту: '.$_POST['metka'];
	$headers= "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=utf-8; boundary='first'\r\n";
	// if (mail($admin_email, $subject, $message, $headers)) {
    //     echo '11';
    // } else {
    //     echo 'fail';
    //     echo $message;
    // }
    $request["name"] = $_POST['name'];
    $request["tel"] = $_POST['tel'];
    
    $context = stream_context_create(array(
            'http' => array(
                    'method' => 'POST',
                    'header' => 'Content-Type: application/x-www-form-urlencoded',
                    'content' => http_build_query($request)
            )
        ));
    $inc_ad = 'https://o2.smarto.com.ua/riverside1/static/amo/script.php';	
    $res_amo = file_get_contents($inc_ad, false, $context);

    print_r($res_amo);
    echo 'ddd';
?>

