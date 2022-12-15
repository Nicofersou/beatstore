<!DOCTYPE html>
<html lang="es-ES" prefix="og: http://ogp.me/ns#">
<meta charset="UTF-8">
<title>Strongfilms store</title>
<link rel="icon" type="image/jpg" href="images/logo.png">
<link rel="stylesheet" type="text/css" href="css/styles.css" media="all" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<script src="js/loadBeatsData.js"></script>
</head>

<body class="fade-in">

	<header class="header-wrapper" id="myHeader">

		<div class="logo-wrapper">
			<a href="index.php">
				<img src="images/logo4.png" alt="Logo de mi sitio web">
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

	<div id="contenido">
		<section>
			<div id="main_title">
				<h1> Strongfilms Beatstore</h1>
				<div class="wrap">
					<div class="search">
						<input type="text" class="searchTerm" placeholder="Buscar beats">
						<button type="submit" class="searchButton">
							<i class="fa fa-search"></i>
						</button>
					</div>
				</div>
			</div>
		</section>

		<main>
			<div class="info beats" id="beats">
			</div>
		</main>

		<?php include './php/add-visitor.php'; ?>

	</div>

	<footer class="footer-wrapper">
		<audio id="main-audio"></audio>
		<div class="slidecontainer">
			<input type="range" min="1" max="1000" value="1" class="slider">
		</div>
		<div class="player-info">
			<div class="player-beat-name">
				<h3>Beatname</h3>
			</div>
			<div class="main-controls">
				<button class="backwards-button">
					<svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="50" height="50" viewBox="0 0 24 24">
						<path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z" />
					</svg>
				</button>
				<button class="play-button">
					<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" id="pause-icon" version="1.1" height="50" width="50" viewBox="0 0 1200 1200" fill="#FFFFFF">
						<path id="path15778" d="M 600,0 C 268.62914,0 0,268.62914 0,600 c 0,331.37086 268.62914,600 600,600 331.37086,0 600,-268.62914 600,-600 C 1200,268.62914 931.37086,0 600,0 z m -269.16515,289.38 181.71397,0 0,621.24 -181.71397,0 0,-621.24 z m 356.61633,0 181.71399,0 0,621.24 -181.71399,0 0,-621.24 z" />
					</svg>
				</button>
				<button class="forward-button">
					<svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="50" height="50" viewBox="0 0 24 24">
						<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.568 18.005l-1.414-1.415 4.574-4.59-4.574-4.579 1.414-1.416 5.988 5.995-5.988 6.005z" />
					</svg>
				</button>
			</div>
			<div class="volume-wrapper">
				<div class="volume-controls">
					<svg style="color: white" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-speaker" viewBox="0 0 16 16">
						<path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z" fill="white"></path>
						<path d="M8 4.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM8 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-3.5 1.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" fill="white"></path>
					</svg>
					<input type="range" min="0" max="100" value="0" class="volume-slider">
				</div>
			</div>
		</div>
	</footer>

</body>
<script src="js/new-audioplayer.js"></script>