let Timer = {
	displayTime: null,
	additionalTime: 10,
	theFuture: null,
	countDownDate: null,
	i: null,
	now: null,
	distance: null,
	hours: null,
	minutes: null,
	seconds: null,
	Countdown: function() {
		Timer.theFuture = new Date();
		Timer.theFuture.setMinutes(Timer.theFuture.getMinutes() + Timer.additionalTime);
		Timer.theFuture.setSeconds(Timer.theFuture.getSeconds() + 1);
		// Set the date we're counting down to
		Timer.countDownDate = new Date(Timer.theFuture).getTime();

		// Update the count down every 1 second
		Timer.i = setInterval(function() {

			// Get today's date and time
			Timer.now = new Date().getTime();

			// Find the distance between now and the count down date
			Timer.distance = Timer.countDownDate - Timer.now;

			// Time calculations for hours, minutes and seconds
			Timer.hours = Math.floor((Timer.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			Timer.minutes = Math.floor((Timer.distance % (1000 * 60 * 60)) / (1000 * 60));
			Timer.seconds = Math.floor((Timer.distance % (1000 * 60)) / 1000);

			// Calculate and Display the timer value.
			Timer.displayTime = '';
			if (Timer.hours > 0) {
				Timer.displayTime += Timer.hours + "h " + Timer.minutes + "m";
			} else {
				// Less than 1 hour
				if (Timer.minutes > 0) {
					Timer.displayTime += Timer.minutes;
				}
				if (Timer.minutes < 10) {
					if (Timer.minutes > 0) {
						Timer.displayTime += ':';
					}
					if (Timer.seconds > 0) {
						if (Timer.seconds < 10) {
							Timer.displayTime += '0';
						}
						Timer.displayTime += Timer.seconds;
					} else {
						Timer.displayTime += '00';
					}
				} else {
					Timer.displayTime += 'm';
				}

			}
			// Background Color Rules
			if (Timer.hours === 0) {
				if (Timer.minutes < 2) {
					$('body').removeClass('background-blue').addClass('background-violet');
				} else if (Timer.minutes < 5) {
					$('body').addClass('background-blue');
				}
			}
			$('#time').html(Timer.displayTime);
			$('title').text('Timer - '+Timer.displayTime);
			// If the count down is finished, write some text
			if (Timer.distance < 0) {
				clearInterval(Timer.i);
				$('#time').html('END');
				$('title').text('Timer - END');
				$('body').removeClass('background-violet').addClass('background-red');
			}
		}, 1000);
	},
	/**
	 *
	 * @constructor
	 */
	Constructor: function() {
		$('#button-start').click(function() {
			$('body').removeClass('background-red').removeClass('background-blue');
			$('header').removeClass('mb-auto');
			Timer.Countdown();
		});
		$('#minutes').html(Timer.additionalTime);
		$('#timer-range').val(Timer.additionalTime);
		$(document).on("input",'#timer-range',function() {
			Timer.additionalTime = parseInt($(this).val());
			$('#minutes').html(Timer.additionalTime);
		});
	}
};

window.onload = Timer.Constructor;