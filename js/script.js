// анимация при скроле
function onEntry(entry) {
	entry.forEach(change => {
 	  if (change.isIntersecting) {
		change.target.classList.add('active');
 	  }
	});
}

let options = {
	threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.anim');

for (let elm of elements) {
	observer.observe(elm);
}


// активное меню
window.addEventListener('scroll', () => {
	let scrollDistance = window.scrollY;

	if (window.innerWidth > 768) {
		document.querySelectorAll('.section').forEach((el, i) => {
			if (el.offsetTop - document.querySelector('.header').clientHeight <= scrollDistance) {
				document.querySelectorAll('.header a').forEach((el) => {
					if (el.classList.contains('exe')) {
						el.classList.remove('exe');
					}
				});

				document.querySelectorAll('.header li')[i].querySelector('a').classList.add('exe');
			}
		});
	}
});


// меню меняет цвет при скролле и пропадает белая линия
window.onscroll = function(e) {
	if (window.scrollY == 0) {
	   document.getElementById("navbar").style.backgroundColor = "";
		document.querySelector(".header__line").style.display = 'block';  
	}
	else    
	{
	   document.getElementById("navbar").style.backgroundColor = "#222222";
		document.querySelector(".header__line").style.display = 'none'; 
	}
};


// меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
const headerLine = document.querySelector('.header__line');
const pip = document.querySelector('.pip');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_act');
		menuBody.classList.toggle('_act');
		headerLine.classList.toggle('_act');
		pip.classList.toggle('_act');
	});
}


// прокрутка при клике
const menuLinks = document.querySelectorAll('.span[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight + 10;

			if(iconMenu.classList.contains('_act')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_act');
				menuBody.classList.remove('_act');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}


// плавная прокрутка (якорь)
document.querySelectorAll('a[href^="#"').forEach(link => {

	link.addEventListener('click', function(e) {
		e.preventDefault();

		let href = this.getAttribute('href').substring(1);

		const scrollTarget = document.getElementById(href);

	   const topOffset = 105; // если не нужен отступ сверху 
		const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - topOffset;

	   window.scrollBy({
		   top: offsetPosition,
		   behavior: 'smooth'
	   });
	});
});


// что-то задать можно... чтобы отображалось на ПК или телефоне
const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Window: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Window()
		);
	}
};

if (isMobile.any()) {
	document.body.classList.add('_touch');
} else {
	document.body.classList.add('_pc');
}


// отправка формы на почту
"use strict"

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);

		if (error === 0) {
			form.classList.add('_sending');
			/*
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
			*/
		} else {
			alert('Заполните обязательные поля');
		}
	}


	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_email')){
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			}else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	// функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
});