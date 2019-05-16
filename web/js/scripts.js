var sliderIndex = -1;
var productPageIndex = 0;

$(document).ready(function() {
	onSliderChange();
	onProductsPageChange();
	$("#productsPageUl").click(onProductsPageChange);
	$(".no-input-alert").keyup(onRequiredInputChange);
	$("#feedbackForm").submit(onSubmit);
});

function onSliderChange() {
	if (sliderIndex == -1) {
		sliderIndex = 0;
		$(".slider-image").css("display", "none");
		$(".slider-image").eq(0)
			.css("display", "block")
			.animate({opacity: 1}, 2000, () => {
				//onSliderChange();
			});
		return;
	}
	var previous = $(".slider-image").eq(sliderIndex);
	sliderIndex = (sliderIndex + 1) % $(".slider-image").length;
	var target = $(".slider-image").eq(sliderIndex); 
	setTimeout(() => { 
		previous.animate({opacity: 0}, 500, () => {
			previous.css("display", "none");
			target.css("display", "block")
				.animate({opacity: 1}, 2000, () => {
				onSliderChange();
			});
		});
	}, 1500);
}

function onRequiredInputChange(ev) {
	var input = $(ev.target);
	var valueSize = input.val().trim().length;
	if (valueSize != 0 && input.hasClass("no-input-alert")) {
		input.removeClass("no-input-alert");
	} else if (valueSize == 0 && !input.hasClass("no-input-alert")) {
		input.addClass("no-input-alert");
	}
}

function onSubmit(ev) {
	$("#feedbackForm input").each(function() {
		if ($(this).hasClass("no-input-alert")) {
			ev.preventDefault();
		}
	});
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
