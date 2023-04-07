'use strict';

let isSetListPosition = false;

$(function () {
	const setListPosition = () => {
		const lists = $('#green-dot-lists').children();
		const length = lists.length;
		const rotate = Math.floor(360 / length);
		const parentXPos = $('#green-dot-lists')[0].getBoundingClientRect().left;
		const parentYPos = $('#green-dot-lists')[0].getBoundingClientRect().top;

		for (let i = 0; i < length; i++) {
			const pos = {};
			const list = $(lists[i]);

			list.css('transform', `rotate(+${rotate * i}deg) translate(0, -50%)`);
			list.children().css('transform', `rotate(${-(rotate * i)}deg)`);

			pos.x = list.children()[0].getBoundingClientRect().left - parentXPos;
			pos.y = list.children()[0].getBoundingClientRect().top - parentYPos + 25;

			list.css('width', '110px');
			list.css('height', '100px');
			list.css('top', `${pos.y}px`);
			list.css('left', `${pos.x}px`);
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
				listsWrapper.on('touchEnd', touchEnd);
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
			const rotate = targetRadius / Math.PI * 180;
			previousRadius = newRadius;
			listsWrapper.css('transform', `rotate(${rotate}deg)`);

			for (let i = 0; i < lists.length; i++) {
				$(lists[i]).css('transform', `rotate(${-rotate}deg)`);
			}
		}

		const touchEnd = () => {
			console.log('end');
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

	$('#green-dot-button').on('click', () => {
		$('.green-dot-wrapper').fadeIn(250).show();
		$('#green-dot-button').hide();
		if (!isSetListPosition) {
			setListPosition();
			isSetListPosition = true;
		}
		rotateList();
	})
	$('#green-dot-close-button').on('click', () => {
		$('.green-dot-wrapper').fadeOut(250);
		$('#green-dot-button').show();
	})
})

