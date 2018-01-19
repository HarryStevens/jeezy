// math
import average from "./math/average"
import correlationMatrix from "./math/correlationMatrix"
import extent from "./math/extent"
import max from "./math/max"
import median from "./math/median"
import min from "./math/min"
import sum from "./math/sum"

// queries
import isArray from "./queries/isArray"

// transformations
import columnsToValues from "./transformations/columnsToValues"
import flatten from "./transformations/flatten"
import merge from "./transformations/merge"
import pivot from "./transformations/pivot"
import pluck from "./transformations/pluck"
import propertyToNumber from "./transformations/propertyToNumber"
import removeItem from "./transformations/removeItem"
import removeProperty from "./transformations/removeProperty"
import renameProperty from "./transformations/renameProperty"
import shuffle from "./transformations/shuffle"
import sortBy from "./transformations/sortBy"
import sortNumbers from "./transformations/sortNumbers"
import unique from "./transformations/unique"
import uniqueBy from "./transformations/uniqueBy"

// other
import deepCopy from "./other/deepCopy"
import random from "./other/random"
import shallowCopy from "./other/shallowCopy"

export default {
	average: average,
	columnsToValues: columnsToValues,
	correlationMatrix: correlationMatrix,
	deepCopy: deepCopy,
	extent: extent,
	flatten: flatten,
	is: isArray,
	max: max,
	median: median,
	merge: merge,
	min: min,
	pivot: pivot,
	pluck: pluck,
	propertyToNumber: propertyToNumber,
	removeItem: removeItem,
	removeProperty: removeProperty,
	renameProperty: renameProperty,
	random: random,
	shallowCopy: shallowCopy,
	shuffle: shuffle,
	sortBy: sortBy,
	sortNumbers: sortNumbers,
	sum: sum,
	unique: unique,
	uniqueBy: uniqueBy
}