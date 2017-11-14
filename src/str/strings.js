// cases
import toCamelCase from "./cases/toCamelCase"
import toSentenceCase from "./cases/toSentenceCase"
import toSlugCase from "./cases/toSlugCase"
import toSnakeCase from "./cases/toSnakeCase"
import toStartCase from "./cases/toStartCase"
import toTitleCase from "./cases/toTitleCase"

// numbers
import numberCommas from "./numbers/numberCommas"
import numberDecimals from "./numbers/numberDecimals"
import numberLakhs from "./numbers/numberLakhs"
import numberPrepend from "./numbers/numberPrepend"

// queries
import count from "./queries/count"
import endsWith from "./queries/endsWith"
import firstLetter from "./queries/firstLetter"
import hasDigit from "./queries/hasDigit"
import includes from "./queries/includes"
import isAllCaps from "./queries/isAllCaps"
import isAllDigits from "./queries/isAllDigits"
import isAllLower from "./queries/isAllLower"
import startsWith from "./queries/startsWith"

// transformations
import keepAll from "./transformations/keepAll"
import keepEnd from "./transformations/keepEnd"
import keepOne from "./transformations/keepOne"
import keepStart from "./transformations/keepStart"
import removeAll from "./transformations/removeAll"
import removeDigits from "./transformations/removeDigits"
import removeFirst from "./transformations/removeFirst"
import removeLast from "./transformations/removeLast"
import removeSymbols from "./transformations/removeSymbols"
import removeTags from "./transformations/removeTags"
import replaceAll from "./transformations/replaceAll"
import replaceAt from "./transformations/replaceAt"
import replaceFirst from "./transformations/replaceFirst"
import replaceLast from "./transformations/replaceLast"
import reverseCharacters from "./transformations/reverseCharacters"
import reverseWords from "./transformations/reverseWords"
import shuffleCharacters from "./transformations/shuffleCharacters"
import shuffleCharactersInWords from "./transformations/shuffleCharactersInWords"
import shuffleWords from "./transformations/shuffleWords"

// other
import randomString from "./other/randomString"

export default {
	count: count,
	endsWith: endsWith,
	firstLetter: firstLetter,
	hasDigit: hasDigit,
	includes: includes,
	isAllCaps: isAllCaps,
	isAllDigits: isAllDigits,
	isAllLower: isAllLower,
	keepAll: keepAll,
	keepEnd: keepEnd,
	keepOne: keepOne,
	keepStart: keepStart,
	numberCommas: numberCommas,
	numberDecimals: numberDecimals,
	numberLakhs: numberLakhs,
	numberPrepend: numberPrepend,
	randomString: randomString,
	removeAll: removeAll,
	removeDigits: removeDigits,
	removeFirst: removeFirst,
	removeLast: removeLast,
	removeSymbols: removeSymbols,
	removeTags: removeTags,
	replaceAll: replaceAll,
	replaceAt: replaceAt,
	replaceFirst: replaceFirst,
	replaceLast: replaceLast,
	reverseCharacters: reverseCharacters,
	reverseWords: reverseWords,
	shuffleCharacters: shuffleCharacters,
	shuffleCharactersInWords: shuffleCharactersInWords,
	shuffleWords: shuffleWords,
	startsWith: startsWith,
	toCamelCase: toCamelCase,
	toSentenceCase: toSentenceCase,
	toSlugCase: toSlugCase,
	toSnakeCase: toSnakeCase,
	toStartCase: toStartCase,
	toTitleCase: toTitleCase
}