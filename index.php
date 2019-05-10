<?php
require_once("bootstrap.php");

$productsJson = file_get_contents("products.json");
$productsJson = str_replace(array('brief', 'price', 'imageName'),
	array('"brief"', '"price"', '"imageName"'), $productsJson);
$products = json_decode($productsJson);

try {
	echo $twig->render("index.html", array("products" => $products));
} catch(Exception $e) {
	echo $e;
}
?>