var sliderIndex = -1;

function init() {
	//onSliderChange();
	document.getElementsByClassName("slider-image")[0].style.display = "block";
	var showFeedbackButton = document.getElementById("feedbackText");
	showFeedbackButton.onclick = () => {
		var feedback = document.getElementById("feedback");
		feedback.style.display = "block";
	};
	var closeFeedbackButton = document.getElementById("closeFeedbackButton");
	closeFeedbackButton.onclick = closeFeedback;
	var feedback = document.getElementById("feedback");
	feedback.onclick = closeFeedback;
	var feedbackForm = document.getElementById("feedbackForm");
	feedbackForm.onclick = (ev) => {
		ev.stopPropagation();
	};
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

function closeFeedback() {
	var feedback = document.getElementById("feedback");
	feedback.style.display = "none";
	return false;
}