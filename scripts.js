var sliderIndex = -1;
var productPageIndex = 0;
var formHeight = 507;
var productsInPage = 6;

var products = [
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
];

function init() {
	generateProductPages();
	onSliderChange();
	//document.getElementsByClassName("slider-image")[0].style.display = "block";
	var showFeedbackButton = document.getElementById("feedbackText");
	showFeedbackButton.onclick = openFeedback;
	var closeFeedbackButton = document.getElementById("closeFeedbackButton");
	closeFeedbackButton.onclick = closeFeedback;
	var feedback = document.getElementById("feedback");
	feedback.onclick = closeFeedback;
	var feedbackForm = document.getElementById("feedbackForm");
	feedbackForm.onclick = (ev) => {
		ev.stopPropagation();
	};
	onProductsPageChange();
	var productsPageUl = document.getElementById("productsPageUl");
	productsPageUl.onclick = onProductsPageChange;
	var requiredInputs = document.getElementsByClassName("no-input-alert");
	for (var requiredInput of requiredInputs) {
		requiredInput.onkeyup = onRequiredInputChange;
	}
	var feedbackForm = document.getElementById("feedbackForm");
	feedbackForm.onsubmit = onSubmit;
	window.addEventListener('resize', onWindowResize);
}

function onSliderChange() {
	var sliderImages = document.getElementsByClassName("slider-image");
	if (sliderIndex == -1) {
		var target = sliderImages[0];
		target.style.display = "block";
		target.classList.add("unfade-image");
		setTimeout(function() {
			target.classList.remove("unfade-image");
			sliderIndex = 0;
			onSliderChange();
		}, 2000);
		return;
	}
	for (var sliderImage of sliderImages) {
		sliderImage.style.display = "none";
	}
	var previous = sliderImages[sliderIndex];
	sliderIndex = (sliderIndex + 1) % sliderImages.length;
	var target = sliderImages[sliderIndex]; 
	previous.classList.add("fade-image");
	previous.style.display = "block";
	setTimeout(function() {
		previous.style.display = "none";
		previous.classList.remove("fade-image");
		target.classList.add("unfade-image");
		target.style.display = "block";
	}, 2000);
	setTimeout(function() {
		target.classList.remove("unfade-image");
		onSliderChange();
	}, 4000);
}

function openFeedback() {
	var feedback = document.getElementById("feedback");
	feedback.classList.add("unfade-feedback");
	feedback.style.display = "block";
	onWindowResize();
}

function onRequiredInputChange(ev) {
	var input = ev.target;
	var valueSize = input.value.trim().length;
	if (valueSize != 0 && input.classList.contains("no-input-alert")) {
		input.classList.remove("no-input-alert");
	} else if (valueSize == 0 && !input.classList.contains("no-input-alert")) {
		input.classList.add("no-input-alert");
	}
}

function onSubmit(ev) {
	var feedbackForm = document.getElementById("feedbackForm");
	var inputs = feedbackForm.querySelectorAll("input");
	for (var input of inputs) {
		if (input.classList.contains("no-input-alert")) {
			ev.preventDefault();
		}
	}
}

function closeFeedback() {
	var feedback = document.getElementById("feedback");
	feedback.style.display = "none";
	var feedbackForm = document.getElementById("feedbackForm");
	feedbackForm.style.display = "table";
	return false;
}

function onProductsPageChange(ev) {
	if (ev != undefined && ev.target.tagName == "LI") {
		var li = ev.target;
		productPageIndex = li.innerHTML - 1;
	}
	var productPages = document.getElementsByClassName("products-page");
	for (var productPage of productPages) {
		productPage.style.display = "none";
	}
	var currentPage = productPages[productPageIndex];
	currentPage.style.display = "grid";
	var productPageLis = document.querySelectorAll("#productsPageUl > li");
	for (var productPageLi of productPageLis) {
		productPageLi.classList.remove("selected-page");
	}
	productPageLis[productPageIndex].classList.add("selected-page");
}

function onWindowResize() {
	var feedbackForm = document.getElementById("feedbackForm");
	var windowHeight = window.innerHeight;
	if (windowHeight < formHeight) {
		if (feedbackForm.style.display == "table") {
			feedbackForm.style.display = "none";
			setTimeout(() => {feedbackForm.style.display = "inline-block"}, 50);
		}
	} else {
		feedbackForm.style.display = "table";
	}
}

function createProduct(brief, price, imageName) {
	var productDiv = document.createElement("div");
	productDiv.classList.add("product-div");
	var productImageDiv = document.createElement("div");
	productImageDiv.classList.add("product-image-div");
	var productImageInnerDiv = document.createElement("div");
	productImageInnerDiv.classList.add("product-image-inner-div");
	var productImage = document.createElement("img");
	productImage.classList.add("product-image");
	productImage.setAttribute("src", "images/products/" + imageName);
	productImageInnerDiv.appendChild(productImage);
	productImageDiv.appendChild(productImageInnerDiv);
	productDiv.appendChild(productImageDiv);
	var productBrief = document.createElement("div");
	productBrief.classList.add("product-brief");
	productBrief.innerHTML = brief;
	productDiv.appendChild(productBrief);
	var productPrice = document.createElement("div");
	productPrice.classList.add("product-price");
	productPrice.innerHTML = price + " грн";
	productDiv.appendChild(productPrice);
	var basketDiv = document.createElement("div");
	basketDiv.classList.add("basket-div");
	var basketImage = document.createElement("img");
	basketImage.classList.add("basket-image");
	basketImage.setAttribute("src", "images/basket.png");
	basketDiv.appendChild(basketImage);
	productDiv.appendChild(basketDiv);
	return productDiv;
}

function generateProductPages() {
	var productsDiv = document.getElementById("productsDiv");
	var pagesNumber = products.length / productsInPage +
		(products.length % productsInPage ? 1 : 0);
	for (var i = 0; i < pagesNumber; i++) {
		var page = document.createElement("div");
		page.classList.add("products-page");
		var productsNumber = Math.min(
			productsInPage, products.length - i * productsInPage);
		for (var j = 0; j < productsNumber; j++) {
			var product = products[i * productsInPage + j];
			page.appendChild(createProduct(
				product.brief, product.price, product.imageName));
		}
		productsDiv.appendChild(page);
	}
	generatePageSelector(pagesNumber);
}

function generatePageSelector(pagesNumber) {
	var productsDiv = document.getElementById("productsDiv");
	var pageSelector = document.createElement("div");
	pageSelector.id = "productsPageSelector";
	var pageUl = document.createElement("ul");
	pageUl.id = "productsPageUl";
	for (var i = 1; i <= pagesNumber; i++) {
		var li = document.createElement("li");
		li.classList.add("products-page-li");
		li.innerHTML = i;
		pageUl.appendChild(li);
	}
	pageSelector.appendChild(pageUl);
	productsDiv.appendChild(pageSelector);
}
