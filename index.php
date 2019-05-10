<?php
require_once("bootstrap.php");

$productsJson = '[
	{ brief: "Акустична гітара Cort-100", price: 5500, imageName: "guitar_acoustic_Cort-100.jpg" },
	{ brief: "Електрогітара Fender-MP-22", price: 12100, imageName: "guitar_electric_Fender-MP-22.jpg" },
	{ brief: "Електрогітара MPG-300WR", price: 9900, imageName: "guitar_electric_MPG-300WR.jpg" },
	{ brief: "Бас-гітара Squier Affinity", price: 11050, imageName: "guitar_bass_Squier Affinity.jpg" },
	{ brief: "Електрогітара TE-2-CR", price: 7500, imageName: "guitar_electric_TE-2-CR.jpg" },
	{ brief: "Класична гітара Epiphone Pro-1", price: 6900, imageName: "guitar_classic_Epiphone Pro-1.jpg" },
	{ brief: "Електрогітара Fender Squier Bullet Stratocaster HSS", price: 5010, imageName: "guitar_default.png" },
	{ brief: "Класична гітара Yamaha C40B", price: 4050, imageName: "guitar_default.png" },
	{ brief: "Електрогітара Ibanez RG350DXZ", price: 12800, imageName: "guitar_default.png" },
	{ brief: "Бас-гітара Cort Action Plus Black", price: 5600, imageName: "guitar_default.png" },
	{ brief: "Бас-гітара Parksons PJB-15", price: 8000, imageName: "guitar_default.png" },
	{ brief: "Електрогітара Jackson JS-22", price: 7500, imageName: "guitar_default.png" },
	{ brief: "Електрогітара Epiphone Les Paul SL", price: 4800, imageName: "guitar_default.png" },
	{ brief: "Акустична гітара Maxtone CGC3910C", price: 3100, imageName: "guitar_default.png" }
]';
$productsJson = str_replace(array('brief', 'price', 'imageName'),
	array('"brief"', '"price"', '"imageName"'), $productsJson);
$products = json_decode($productsJson);

try {
	echo $twig->render("index.html", array("products" => $products));
} catch(Exception $e) {
	echo $e;
}
?>