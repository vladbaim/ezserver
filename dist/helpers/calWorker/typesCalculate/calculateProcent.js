"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getDishParams = require("../helpers/getDishParams");

var _getDishParams2 = _interopRequireDefault(_getDishParams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculateProcent(day, calTarget) {
	var onBorder = false;
	var calNeeded = calTarget;
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = day.meals[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var meal = _step.value;

			var NeedForMeal = calNeeded * (meal.target / 100);
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = meal.meal[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var dishs = _step2.value;
					var _iteratorNormalCompletion3 = true;
					var _didIteratorError3 = false;
					var _iteratorError3 = undefined;

					try {
						for (var _iterator3 = dishs.dishs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
							var dish = _step3.value;

							if (dish.dish.type.unit === "%" && !dish.ended) {
								var NeedForDish = NeedForMeal * (dish.target / 100);
								var dishParams = (0, _getDishParams2.default)(dish.dish.productslist);

								dish.gram = NeedForDish / dishParams.cal * dishParams.gramms;

								if (dish.gram < parseFloat(dish.dish.type.min)) {
									dish.gram = parseFloat(dish.dish.type.min);
									dish.ended = true;
								}

								if (dish.gram > parseFloat(dish.dish.type.max)) {
									dish.gram = parseFloat(dish.dish.type.max);
									dish.ended = true;
								}

								for (var key in dishParams) {
									dish[key] = dishParams[key] * (dish.gram / 100);
								}

								calTarget = calTarget - dish.cal;

								if (dish.ended) onBorder = true;
							}
						}
					} catch (err) {
						_didIteratorError3 = true;
						_iteratorError3 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion3 && _iterator3.return) {
								_iterator3.return();
							}
						} finally {
							if (_didIteratorError3) {
								throw _iteratorError3;
							}
						}
					}
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return { cal: calTarget, border: onBorder };
}

exports.default = calculateProcent;