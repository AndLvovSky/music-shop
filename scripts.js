var sliderIndex = -1;
var productPageIndex = 0;
var formHeight = 507;

$(document).ready(function() {
	onSliderChange();
	//document.getElementsByClassName("slider-image")[0].style.display = "block";
	$("#feedbackText").click(openFeedback);
	$("#closeFeedbackButton").click(closeFeedback);
	$("#feedback").click(closeFeedback);
	$("#feedbackForm").click(function(ev) {
		ev.stopPropagation();
	});
	onProductsPageChange();
	$("#productsPageUl").click(onProductsPageChange);
	$(".no-input-alert").keyup(onRequiredInputChange);
	$("#feedbackForm").submit(onSubmit);
	$(window).resize(onWindowResize);
});

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
	$("#feedback").addClass("unfade-feedback").css("display", "block");
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
	$("#feedbackForm input").each(function() {
		if ($(this).hasClass("no-input-alert")) {
			ev.preventDefault();
		}
	});
}

function closeFeedback() {
	$("#feedback").hide();
	$("feedbackForm").css("display", "table");
	return false;
}

function onProductsPageChange(ev) {
	if (ev != undefined && ev.target.tagName == "LI") {
		var li = ev.target;
		productPageIndex = li.innerHTML - 1;
	}
	$(".products-page").hide();
	$(".products-page").eq(productPageIndex)
		.css("display", "grid");
	$("#productsPageUl > li").removeClass("selected-page")
		.eq(productPageIndex).addClass("selected-page");
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
