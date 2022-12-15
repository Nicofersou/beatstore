<!DOCTYPE html>
<html lang="es-ES" prefix="og: http://ogp.me/ns#">
<meta charset="UTF-8">
<title>Strongfilms store</title>
<link rel="stylesheet" type="text/css" href="../css/styles.css" media="all" />
<meta name="viewport" content="width=1024">

</head>

<body class="details-body fade-in">


	<?php
	/*
	$cadena_conexion = 'mysql:dbname=beatstore;host=strongfilms.ddns.net';
	$usuario = 'mandi';
	$clave = 'g2tn6Qg';*/
	//Esta sería la pagina de detalle de los beats, se genera mediante php el esqueleto html a partir de los datos 
	//de la base de datos
	$cadena_conexion = 'mysql:dbname=beatstore;host=127.0.0.1';
	$usuario = 'root';
	$clave = '';
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		$cancion = $_POST['id'];
		try {

			//Datos de la base de datos
			//Instacia de la clase PDO para crear una conexion con la bd echo $_POST['id'];
			$bd = new PDO($cadena_conexion, $usuario, $clave, array(PDO::ATTR_PERSISTENT => true));
			$consulta = "SELECT * FROM beats WHERE id='" . $cancion . "'";
			$datos = $bd->query($consulta);

			foreach ($datos as $value) {

				$plays = $value["plays"];
				$plays = $plays + 1;
				$insert = "UPDATE beats SET plays='" . $plays . "' WHERE id='" . $cancion . "'";
				$bd->query($insert);

	?>
				<header class="header-wrapper" id="myHeader">

					<div class="logo-wrapper">
						<a href="../index.php">
							<img src="../images/logo4.png" alt="Logo de mi sitio web">
						</a>
					</div>
					<nav id="menu">
						<ul class="nav">
							<?php
							session_start();
							if (isset($_SESSION['user'])) {
							?>

								<li>
									<a class="header-button" href="profile.html"><?php echo $_SESSION['user'] ?></a>
									<ul class="submenu">
										<li><a class="header-button" href="shopping-cart.php">Historial</a></li>
										<li><a class="header-button" href="uploadbeat.html">Subir beats</a></li>
									</ul>
								</li>


								<li><a class="header-button" href="php/logout.php">Log out</a></li>
							<?php
							} else {
							?>
								<li><a class="header-button" href="register.html">Sign up</a></li>
								<li><a class="header-button" href="login.html">Log in</a></li>
							<?php
							}
							?>
						</ul>
					</nav>

				</header>
				<div class="details-container">

					<div class="first column">
						<div class="img-container">
							<img class="thumbnail" src="<?php echo "../" . $value["imagepath"]; ?>" />
						</div>
						<h1 class="beat-attributes">
							<?php echo $value["name"]; ?>
						</h1>
						<h1 class="beat-attributes">
							<?php echo $value["bpm"]; ?> bpm
						</h1>
						<h1 class="beat-attributes">
							<?php echo $value["scale"]; ?>
						</h1>
					</div>

					<div class="second column">
						<div class="details-controls">
							<div class="audio-wrapper">
								<div class="details-player-wrapper">
									<button class="details-player-button">
										<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" id="pause-icon" version="1.1" viewBox="0 0 1200 1200" fill="#FFFFFF">
											<path id="path15778" d="M 600,0 C 268.62914,0 0,268.62914 0,600 c 0,331.37086 268.62914,600 600,600 331.37086,0 600,-268.62914 600,-600 C 1200,268.62914 931.37086,0 600,0 z m -269.16515,289.38 181.71397,0 0,621.24 -181.71397,0 0,-621.24 z m 356.61633,0 181.71399,0 0,621.24 -181.71399,0 0,-621.24 z" />
										</svg>
									</button>
								</div>
								<input type="range" class="details-timeline" max="100" value="0">
								<div class="slider-wrapper">
									<input class="details-volume-scroll" type="range" />
								</div>
								<audio src="<?php echo "../" . $value["audiopath"] . $value["name"] . ".mp3"; ?>"></audio>
							</div>
						</div>
						<div class="purchase-options">
							<div class="normal lease">
								<h1>Normal lease</h1>
								<div class="beat-specs">
									<h2>.mp3 beat</h2>
									<h2><?php echo 1 * $value["price"]; ?> €</h2>
								</div>
							</div>
							<div class="premium lease">
								<h1>Premium lease</h1>
								<div class="beat-specs">
									<h2>.wav beat</h2>
									<h2><?php echo 2 * $value["price"]; ?> €</h2>
								</div>
							</div>
							<div class="exclusive lease">
								<h1>Exclusive lease</h1>
								<div class="beat-specs">
									<h2>.wav beat</h2>
									<h2>Track stems</h2>
									<h2><?php echo 4 * $value["price"]; ?> €</h2>
								</div>
							</div>
						</div>

						<h1 class="hidden-price"></h1>

						<div class="payment">
							<div id="smart-button-container">
								<div style="text-align: center;">
									<div id="paypal-button-container"></div>
								</div>
							</div>

							<form class="purchased-beat" name="purchased-beat" action="thank-you.php" method="POST">
								<input class="type-input" type="hidden" name="type" value="" />
								<input class="beat-name" type="hidden" name="name" value="<?php echo $value["name"]; ?>" />
								<input class="beat-id" type="hidden" name="id" value="<?php echo $value["id"]; ?>" />
							</form>

							<script src="https://www.paypal.com/sdk/js?client-id=AdfZCHdnwBJV_bIwuqOZhUZL1DfmhLsGrCH0LS12tpykkc1-_AcRr_Udxj4tCbOUpQHIi4L0YcRKyMR7&enable-funding=venmo&currency=EUR" data-sdk-integration-source="button-factory"></script>
							<script>
								function initPayPalButton() {
									paypal.Buttons({
										style: {
											shape: 'pill',
											color: 'gold',
											layout: 'horizontal',
											label: 'paypal',

										},

										createOrder: function(data, actions) {
											let price = parseInt("<?php echo $value["price"]; ?>");
											const buttons = document.querySelectorAll('.lease');
											for (let i = 0; i < buttons.length; i++) {
												if (buttons[i].style.borderColor == "rgb(255, 182, 6)") {
													switch (i) {
														case 1:
															price = price * 2;
															break;

														case 2:
															price = price * 4;
															break;
													}
												}
											}

											return actions.order.create({
												purchase_units: [{
													"amount": {
														"currency_code": "EUR",
														"value": price
													}
												}]
											});

										},

										onApprove: function(data, actions) {
											return actions.order.capture().then(function(orderData) {
												//window.location.href = "../php/thank-you.php";
												type = "normal";
												const buttons = document.querySelectorAll('.lease');
												for (let i = 0; i < buttons.length; i++) {
													if (buttons[i].style.borderColor == "rgb(255, 182, 6)") {
														switch (i) {
															case 1:
																type = "premium";
																break;

															case 2:
																type = "exclusive";
																break;
														}
													}
												}

												const input = document.querySelector('.type-input');
												input.value = type;
												const form = document.querySelector('.purchased-beat');
												form.submit();
											});
										},

										onError: function(err) {
											console.log(err);
										}
									}).render('#paypal-button-container');
								}
								initPayPalButton();
							</script>
						</div>
					</div>

				</div>

				<script src="../js/purchase-handler.js"></script>
	<?php
			}
		} catch (PDOException $ex) {
			//write_log($ex->getMessage());
		}
	}

	?>

</body>

<script src="../js/details-audioplayer.js"></script>