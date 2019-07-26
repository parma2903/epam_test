'use strict';
var multiItemSlider = (function () {
    return function (selector, config) {
        var
            mainElement = document.querySelector(selector),
            sliderWrapper = mainElement.querySelector('.slider__days'),
            sliderItems = mainElement.querySelectorAll('.slider__item'),
            sliderControls = mainElement.querySelectorAll('.slider__control'),
            sliderControlLeft = mainElement.querySelector('.slider__control--left'),
            sliderControlRight = mainElement.querySelector('.slider__control--right'),
            wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width),
            itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width),  
            positionLeftItem = 0,
            transform = 0,
            step = itemWidth / wrapperWidth * 100,
            items = [];
        sliderItems.forEach(function (item, index) {
            items.push({
                item: item,
                position: index,
                transform: 0
            });
        });

        var position = {
            getMin: 0,
            getMax: items.length - 1,
        }

        var transformItem = function (direction) {
            if (direction === 'right') {
                if ((positionLeftItem + wrapperWidth / itemWidth - 1) >= position.getMax) {
                    return;
                }
                if (!sliderControlLeft.classList.contains('slider__control--show')) {
                    sliderControlLeft.classList.add('slider__control--show');
                }
                if (sliderControlRight.classList.contains('slider__control--show') && (positionLeftItem + wrapperWidth / itemWidth) >= position.getMax) {
                    sliderControlRight.classList.remove('slider__control--show');
                }
                positionLeftItem++;
                transform -= step;
            }
            if (direction === 'left') {
                if (positionLeftItem <= position.getMin) {
                    return;
                }
                if (!sliderControlRight.classList.contains('slider__control--show')) {
                    sliderControlRight.classList.add('slider__control--show');
                }
                if (sliderControlLeft.classList.contains('slider__control--show') && positionLeftItem - 1 <= position.getMin) {
                    sliderControlLeft.classList.remove('slider__control--show');
                }
                positionLeftItem--;
                transform += step;
            }
            sliderWrapper.style.transform = 'translateX(' + transform + '%)';
        }

        var controlClick = function (e) {
            var direction = this.classList.contains('slider__control--right') ? 'right' : 'left';
            e.preventDefault();
            transformItem(direction);
        };

        var setUpListeners = function () {
            sliderControls.forEach(function (item) {
                item.addEventListener('click', controlClick);
            });
        }

        setUpListeners();

        return {
            right: function () {
                transformItem('right');
            },
            left: function () {
                transformItem('left');
            }
        }
    }
}());

var slider = multiItemSlider('.slider')