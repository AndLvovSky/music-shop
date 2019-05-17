var sliderIndex = -1;
var productPageIndex = 0;
var formHeight = 507;

function init() {
	onSliderChange();
	var showFeedbackButton = document.getElementById("feedbackText");
	showFeedbackButton.onclick = openFeedback;
	var showFeedbackButton = document.getElementById("feedbackTextCopy");
	showFeedbackButton.onclick = openFeedback;
	var closeFeedbackButton = document.getElementById("closeFeedbackButton");
	closeFeedbackButton.onclick = closeFeedback;
	var feedback = document.getElementById("feedback");
	feedback.onclick = closeFeedback;
	var feedbackForm = document.getElementById("feedbackForm");
	feedbackForm.onclick = (ev) => {
		ev.stopPropagation();
	};
	var requiredInputs = document.getElementsByClassName("no-input-alert");
	for (var requiredInput of requiredInputs) {
		requiredInput.onkeyup = onRequiredInputChange;
	}
	var feedbackForm = document.getElementById("feedbackForm");
	feedbackForm.onsubmit = onSubmit;
	window.addEventListener('resize', onWindowResize);
	setMenuListeners();
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

function setMenuListeners() {
	var menuItems = document.getElementsByClassName("menu-li-div");
	for (var menuItem of menuItems) {
		menuItem.addEventListener("click", function(ev) {
			this.firstChild.firstChild.click();
		});
	}
}
