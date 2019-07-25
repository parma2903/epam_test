'use strict';
var multiItemSlider = (function () {
    return function (selector, config) {
        var
            _mainElement = document.querySelector(selector),
            _sliderWrapper = _mainElement.querySelector('.slider__days'),
            _sliderItems = _mainElement.querySelectorAll('.slider__item'),
            _sliderControls = _mainElement.querySelectorAll('.slider__control'),
            _sliderControlLeft = _mainElement.querySelector('.slider__control--left'),
            _sliderControlRight = _mainElement.querySelector('.slider__control--right'),
            _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width),
            _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width),  
            _positionLeftItem = 0,
            _transform = 0,
            _step = _itemWidth / _wrapperWidth * 100,
            _items = [];
        _sliderItems.forEach(function (item, index) {
            _items.push({
                item: item,
                position: index,
                transform: 0
            });
        });

        var position = {
            getMin: 0,
            getMax: _items.length - 1,
        }

        var _transformItem = function (direction) {
            if (direction === 'right') {
                if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) >= position.getMax) {
                    return;
                }
                if (!_sliderControlLeft.classList.contains('slider__control--show')) {
                    _sliderControlLeft.classList.add('slider__control--show');
                }
                if (_sliderControlRight.classList.contains('slider__control--show') && (_positionLeftItem + _wrapperWidth / _itemWidth) >= position.getMax) {
                    _sliderControlRight.classList.remove('slider__control--show');
                }
                _positionLeftItem++;
                _transform -= _step;
            }
            if (direction === 'left') {
                if (_positionLeftItem <= position.getMin) {
                    return;
                }
                if (!_sliderControlRight.classList.contains('slider__control--show')) {
                    _sliderControlRight.classList.add('slider__control--show');
                }
                if (_sliderControlLeft.classList.contains('slider__control--show') && _positionLeftItem - 1 <= position.getMin) {
                    _sliderControlLeft.classList.remove('slider__control--show');
                }
                _positionLeftItem--;
                _transform += _step;
            }
            _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
        }

        var _controlClick = function (e) {
            var direction = this.classList.contains('slider__control--right') ? 'right' : 'left';
            e.preventDefault();
            _transformItem(direction);
        };

        var _setUpListeners = function () {
            _sliderControls.forEach(function (item) {
                item.addEventListener('click', _controlClick);
            });
        }

        _setUpListeners();

        return {
            right: function () {
                _transformItem('right');
            },
            left: function () {
                _transformItem('left');
            }
        }
    }
}());

var slider = multiItemSlider('.slider')