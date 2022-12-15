<?php
try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        /*
$cadena_conexion = 'mysql:dbname=beatstore;host=strongfilms.ddns.net';
$usuario = 'mandi';
$clave = 'g2tn6Qg';*/

        $cadena_conexion = 'mysql:dbname=beatstore;host=127.0.0.1';
        $usuario = 'root';
        $clave = '';
        $bd = new PDO($cadena_conexion, $usuario, $clave, array(PDO::ATTR_PERSISTENT => true));

        $title = htmlspecialchars(trim(strip_tags($_POST["title"])), ENT_QUOTES, "ISO-8859-1");
        $scale = htmlspecialchars(trim(strip_tags($_POST["scale"])), ENT_QUOTES, "ISO-8859-1");
        $price = htmlspecialchars(trim(strip_tags($_POST["price"])), ENT_QUOTES, "ISO-8859-1");
        $bpm = htmlspecialchars(trim(strip_tags($_POST["bpm"])), ENT_QUOTES, "ISO-8859-1");

        //Creamos la carpeta dentro de music en funcion del titulo que se ha asignado
        $estructura = '../music/' . $title;

        if (!mkdir($estructura, 0777, true)) {
            die('Fallo al crear las carpetas...');
        }

        //Subida de la carátula del beat

        $photo_name = $_FILES['photo']['name'];
        $photo_type = $_FILES['photo']['type'];
        $photo_size = $_FILES['photo']['size'];
        $directorio = '../images/';

        $subir_archivo = $directorio . basename($_FILES['photo']['name']);
        $image_path = 'images/' . basename($_FILES['photo']['name']);
        //compruebo si las características del archivo son las que deseo y muevo la foto a la carpeta deseada
        if (!((strpos($photo_type, "png") || strpos($photo_type, "jpeg") || strpos($photo_type, "jpg")) && ($photo_size < 100000))) {
            echo "La extensión o el tamaño de los archivos no es correcta. <br><br><table><tr><td><li>Se permiten archivos .gif o .jpg<br><li>se permiten archivos de 100 Kb máximo.</td></tr></table>";
        } else {
            if (move_uploaded_file($_FILES['photo']['tmp_name'],  $subir_archivo)) {
                echo "La imagen ha sido cargada correctamente.";
            } else {
                echo "Ocurrió algún error al subir el fichero. No pudo guardarse.";
            }
        }

        //Subida del archivo mp3
        $mp3_name = $_FILES['mp3']['name'];
        $mp3_type = $_FILES['mp3']['type'];
        $mp3_size = $_FILES['mp3']['size'];
        $subir_archivo = '../music/' . $title . '/'. basename($_FILES['mp3']['name']);
        $audio_path = '/music/' . $title . '/';
        //compruebo si las características del archivo son las que deseo y muevo la foto a la carpeta deseada
        if (!($mp3_size < 100000000)) {
            echo "El archivo de audio es demasiado grande";
        } else {
            if (move_uploaded_file($_FILES['mp3']['tmp_name'],  $subir_archivo)) {
                echo "</br>El archivo de audio ha sido cargado correctamente.";
            } else {
                echo "Ocurrió algún error al subir el fichero. No pudo guardarse.";
            }
        }

        //Subida del archivo wav
        $wav_name = $_FILES['wav']['name'];
        $wav_type = $_FILES['wav']['type'];
        $wav_size = $_FILES['wav']['size'];
        $subir_archivo = '../music/' . $title . '/'. basename($_FILES['wav']['name']);
        //compruebo si las características del archivo son las que deseo y muevo la foto a la carpeta deseada
        if (!$wav_size > 0) {
            echo "Por favor selecciona un archivo de audio .wav";
        } else {
            if (move_uploaded_file($_FILES['wav']['tmp_name'],  $subir_archivo)) {
                echo "</br>El archivo .wav ha sido cargado correctamente.";
            } else {
                echo "Ocurrió algún error al subir el fichero. No pudo guardarse.";
            }
        }

        //Subida del archivo zip
        $zip_name = $_FILES['zip']['name'];
        $zip_type = $_FILES['zip']['type'];
        $zip_size = $_FILES['zip']['size'];
        $subir_archivo = '../music/' . $title . '/'. basename($_FILES['zip']['name']);
        //compruebo si las características del archivo son las que deseo y muevo la foto a la carpeta deseada
        if (!$zip_size > 0) {
            echo "Por favor selecciona un archivo de audio zip";
        } else {
            if (move_uploaded_file($_FILES['zip']['tmp_name'],  $subir_archivo)) {
                echo "</br>El archivo .zip ha sido cargado correctamente.";
            } else {
                echo "Ocurrió algún error al subir el fichero. No pudo guardarse.";
            }
        }

        //Inserccion de datos en la bd

        $ins = "insert into beats(name, scale, price, bpm, imagepath, audiopath) VALUES ('$title', '$scale', '$price', '$bpm', '$image_path', '$audio_path' )";
		$resul = $bd->query($ins);

		if ($resul) {
			echo true;
		} else {
			echo false;
		}
    }
} catch (PDOException $ex) {
    //echo $ex->getMessage();
}
