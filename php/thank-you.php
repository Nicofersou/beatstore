<!DOCTYPE html>
<html lang="es-ES" prefix="og: http://ogp.me/ns#">
<meta charset="UTF-8">
<title>Strongfilms store</title>
<link rel="stylesheet" type="text/css" href="../css/styles.css" media="all" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

</head>

<body class="center-body">

    <?php
    try {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $type = $_POST['type'];
            $name = $_POST['name'];
            $id = $_POST['id'];
            session_start();
            $last_count = 0;

            /*
$cadena_conexion = 'mysql:dbname=beatstore;host=strongfilms.ddns.net';
$usuario = 'mandi';
$clave = 'g2tn6Qg';*/

$cadena_conexion = 'mysql:dbname=beatstore;host=127.0.0.1';
$usuario = 'root';
$clave = '';

            $bd = new PDO($cadena_conexion, $usuario, $clave, array(PDO::ATTR_PERSISTENT => true));

            try {
                if (isset($_SESSION['user'])) {
                    $user = $_SESSION['user'];
                    $insert = "INSERT INTO `usersbeats` (`id`, `usuario`, `beat`, `licencia`, `fecha`) VALUES (NULL, '$user', '$id', '$type', current_timestamp());";
                    $bd->query($insert);
                }
            } catch (PDOException $ex) {
            }

            $consulta = "SELECT * FROM beats WHERE id='" . $id . "'";
            $datos = $bd->query($consulta);

            switch ($type) {

                case "normal":
                    $path = "../music/" . $name . "/" . $name . ".mp3";
                    $extension = ".mp3";
                    $parameter = "normal_leases";
                    break;

                case "premium":
                    $path = "../music/" . $name . "/" . $name . ".wav";
                    $extension = ".wav";
                    $parameter = "premium_leases";
                    break;

                case "exclusive":
                    $path = "../music/" . $name . "/" . $name . ".zip";
                    $extension = ".zip";
                    $parameter = "exclusive_leases";
                    break;
            }

            foreach ($datos as $value) {

                $last = $value[$parameter];
                $last = $last + 1;
                $insert = "UPDATE beats SET $parameter='" . $last . "' WHERE id='" . $id . "'";
                $bd->query($insert);
            }
        }
    } catch (PDOException $ex) {
        //write_log($ex->getMessage());
    }
    ?>

    <h1 id="generating" class="link">Generating download link...</h1>
    <a id="thanks-download" file="<?php echo $path ?>" class="link" download="<?php echo $name . $extension ?>">Download beat</a>
    <h3 class="email-me">If you encounter any problem, email strongfilmsbeatstore@gmail.com</h3>
    <a id="return-main" class="link return" href="../index.php">Return to main page</a>

</body>
<script src="../js/get-file-blob.js"></script>