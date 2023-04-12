'use strict';

$(function () {
	const showPannel = (index) => {
		const pannels = $('.pannels').children();

		for (let i = 0; i < pannels.length; i++) {
			const pannel = $(pannels[i]);

			if (i === index) {
				if (!pannel.hasClass('show-pannel')) {
					pannel.addClass('addClass');
				}
			}
			else if (pannel.hasClass('show-pannel')) {
				pannel.removeClass('show-pannel');
			}
		}
	}

	const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	const rotateList = () => {
		const isMobileDevice = isMobile();
		const listsWrapper = $('#green-dot-lists');
		const lists = listsWrapper.children();

		let offsetRadius = 0;
		let targetRadius = 0;
		let previousRadius = 0;

		const touchStart = (event) => {
			offsetRadius = getRadius(event);
			previousRadius = offsetRadius;

			if (isMobileDevice) {
				listsWrapper.on('touchmove', touchMove);
				listsWrapper.on('touchend', touchEnd);
			} else {
				listsWrapper.on('mousemove', touchMove);
				listsWrapper.on('mouseup', touchEnd);
			}
		}
	
		if (isMobileDevice) {
			listsWrapper.on('touchstart', touchStart);
		} else {
			listsWrapper.on('mousedown', touchStart);
		}

		const touchMove = (event) => {
			const newRadius = getRadius(event);

			targetRadius += (newRadius - previousRadius);

			previousRadius = newRadius;
			const rotate = targetRadius / Math.PI * 180;

			listsWrapper.css('transform', `rotate(${rotate}deg)`);

			for (let i = 0; i < lists.length; i++) {
				$(lists[i]).css('transform', `rotate(${-rotate}deg)`);
			}
		}

		const touchEnd = () => {
			let rotate = targetRadius / Math.PI * 180;

			rotate = rotate % 45 > 45 / 2 ? rotate + (45 - rotate % 45) : rotate - (rotate % 45);

			listsWrapper.css('transform', `rotate(${rotate}deg)`);

			for (let i = 0; i < lists.length; i++) {
				$(lists[i]).css('transform', `rotate(${-rotate}deg)`);
			}

			if (isMobileDevice) {
				listsWrapper.off('touchmove');
				listsWrapper.off('touchend');
			} else {
				listsWrapper.off('mousemove');
				listsWrapper.off('mouseup');
			}
		}

		const getRadius = (event) => {
			const pos = mousePos(event, listsWrapper[0]);
			const x = pos.x - listsWrapper[0].clientWidth * 0.5;
			const y = pos.y - listsWrapper[0].clientHeight * 0.5;

			return Math.atan2(y, x);
		}

		const mousePos = (event, currentElement) => {
			let totalOffsetX = 0;
			let totalOffsetY = 0;
			let x = 0;
			let y = 0;

			for (; currentElement !== null; currentElement = currentElement.offsetParent) {
				totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
				totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
			}

			if (isMobileDevice) {
					x = event.changedTouches[0].pageX - totalOffsetX;
					y = event.changedTouches[0].pageY - totalOffsetY;
			} else {
					x = event.pageX - totalOffsetX;
					y = event.pageY - totalOffsetY;
			}

			return {
					x,
					y
			};
		}
	}

	showPannel(0);

	$('#green-dot-button').on('click', () => {
		$('.layer').fadeIn(250).show();
		$('#green-dot-button').hide();

		rotateList();
	})
	$('#green-dot-close-button').on('click', () => {
		$('.layer').fadeOut(250);
		$('#green-dot-button').show();
	})
})

