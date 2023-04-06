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
			list.children().eq(0).css('transform', `rotate(${-(rotate * i)}deg)`);

			pos.x = list.children().eq(0)[0].getBoundingClientRect().left - parentXPos;
			pos.y = list.children().eq(0)[0].getBoundingClientRect().top - parentYPos + 25;

			list.css('width', '110px');
			list.css('height', '100px');
			list.css('top', `${pos.y}px`);
			list.css('left', `${pos.x}px`);
	}
}

$(function () {
	const greenDot = $('.green-dot-wrapper');

	$('#green-dot-button').on('click', (event) => {
		const $this = $(event.currentTarget);

		if (greenDot.css('display') === 'none') {
			greenDot.show();
			$this.hide();
		}
	})

	$('#green-dot-close-button').on('click', (event) => {
		const $this = $(event.currentTarget);

		if (greenDot.css('display') !== 'none') {
			greenDot.hide();
			$('#green-dot-button').show();
		}
	})
	setListPosition();
})
