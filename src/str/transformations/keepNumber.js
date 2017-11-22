// Keeps only digits and periods in a string. Useful for performing actions such as `+jz.str.keepNumber("254.62px") --> 254.62
export default function keepNumber(x){
	return x.replace(/[^\d.-]/g, "");
}