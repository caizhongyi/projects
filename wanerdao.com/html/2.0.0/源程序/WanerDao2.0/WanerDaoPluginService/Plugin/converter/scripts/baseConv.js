var endNumber = true
var mem = 0
var carry = 10
var hexnum = "0123456789abcdef"
var angle = "d"
var stack = ""
var level = "0"
var layer = 0
//数字键
function kkdown() {
	kkc = window.event.keyCode;
	window.event.returnValue = false;
	if(kkc == 27) {clearall();
	} else if(kkc == 8) {backspace();
	} else if(kkc == 13) {result();
	} else if(kkc == 48 || kkc == 96) {inputkey('0');
	} else if(kkc == 49 || kkc == 97) {inputkey('1');
	} else if(kkc == 50 || kkc == 98) {inputkey('2');
	} else if(kkc == 51 || kkc == 99) {inputkey('3');
	} else if(kkc == 52 || kkc == 100) {inputkey('4');
	} else if(kkc == 53 || kkc == 101) {inputkey('5');
	} else if(kkc == 54 || kkc == 102) {inputkey('6');
	} else if(kkc == 55 || kkc == 103) {inputkey('7');
	} else if(kkc == 56 || kkc == 104) {inputkey('8');
	} else if(kkc == 57 || kkc == 105) {inputkey('9');
	} else if(kkc == 190 || kkc == 110) {inputkey('.');
	} else if(kkc == 65) {inputkey('a');
	} else if(kkc == 66) {inputkey('b');
	} else if(kkc == 67) {inputkey('c');
	} else if(kkc == 68) {inputkey('d');
	} else if(kkc == 69) {inputkey('e');
	} else if(kkc == 72) {
		var box = eval("document.conv.hypf");
		box.checked = !box.checked;
		inputshift();
	} else if(kkc == 73) {
		var box = eval("document.conv.shiftf");
		box.checked = !box.checked;
		;inputshift();
	} else if(kkc == 187 || kkc == 107) {operation('+', 5);
	} else if(kkc == 189 || kkc == 109) {operation('-', 5);
	} else if(kkc == 80 || kkc == 106) {operation('*', 6);
	} else if(kkc == 191 || kkc == 111) {operation('/', 6);
	} else if(kkc == 81) {
		var box = eval("document.conv.carry");
		box[0].checked = true;
		inputChangCarry(16);
	} else if(kkc == 87) {
		var box = eval("document.conv.carry");
		box[1].checked = true;
		inputChangCarry(10);
	} else if(kkc == 82) {
		var box = eval("document.conv.carry");
		box[2].checked = true;
		inputChangCarry(8);
	} else if(kkc == 84) {
		var box = eval("document.conv.carry");
		box[3].checked = true;
		inputChangCarry(2);
	}
}

function inputkey(key) {
	var index = key.charCodeAt(0);
	if((carry == 2 && (index == 48 || index == 49)) || (carry == 8 && index >= 48 && index <= 55) || (carry == 10 && (index >= 48 && index <= 57 || index == 46)) || (carry == 16 && ((index >= 48 && index <= 57) || (index >= 97 && index <= 102))))
		if(endNumber) {
			endNumber = false
			document.conv.display.value = key
		} else if(document.conv.display.value == null || document.conv.display.value == "0")
			document.conv.display.value = key
		else
			document.conv.display.value += key
}

function changeSign() {
	if(document.conv.display.value != "0")
		if(document.conv.display.value.substr(0, 1) == "-")
			document.conv.display.value = document.conv.display.value.substr(1)
		else
			document.conv.display.value = "-" + document.conv.display.value
}

//函数键

function inputfunction(fun, shiftfun) {
	endNumber = true
	if(document.conv.shiftf.checked)
		document.conv.display.value = decto(funconv(shiftfun, (todec(document.conv.display.value, carry))), carry)
	else
		document.conv.display.value = decto(funconv(fun, (todec(document.conv.display.value, carry))), carry)
	document.conv.shiftf.checked = false
	document.conv.hypf.checked = false
	inputshift()
}

function inputtrig(trig, arctrig, hyp, archyp) {
	if(document.conv.hypf.checked)
		inputfunction(hyp, archyp)
	else
		inputfunction(trig, arctrig)
}

//运算符

function operation(join, newlevel) {
	endNumber = true
	var temp = stack.substr(stack.lastIndexOf("(") + 1) + document.conv.display.value
	while(newlevel != 0 && (newlevel <= (level.charAt(level.length - 1)))) {
		temp = parse(temp)
		level = level.slice(0, -1)
	}
	if(temp.match(/^(.*\d[\+\-\*\/\%\^\&\|x])?([+-]?[0-9a-f\.]+)$/))
		document.conv.display.value = RegExp.$2
	stack = stack.substr(0, stack.lastIndexOf("(") + 1) + temp + join
	document.conv.operator.value = " " + join + " "
	level = level + newlevel

}

//括号

function addbracket() {
	endNumber = true
	document.conv.display.value = 0
	stack = stack + "("
	document.conv.operator.value = "   "
	level = level + 0
	layer += 1
	document.conv.bracket.value = "(=" + layer
}

function disbracket() {
	endNumber = true
	var temp = stack.substr(stack.lastIndexOf("(") + 1) + document.conv.display.value
	while((level.charAt(level.length - 1)) > 0) {
		temp = parse(temp)
		level = level.slice(0, -1)
	}

	document.conv.display.value = temp
	stack = stack.substr(0, stack.lastIndexOf("("))
	document.conv.operator.value = "   "
	level = level.slice(0, -1)
	layer -= 1
	if(layer > 0)
		document.conv.bracket.value = "(=" + layer
	else
		document.conv.bracket.value = ""
}

//等号

function result() {
	endNumber = true
	while(layer > 0)disbracket()
	var temp = stack + document.conv.display.value
	while((level.charAt(level.length - 1)) > 0) {
		temp = parse(temp)
		level = level.slice(0, -1)

	}
	document.conv.display.value = temp
	document.conv.bracket.value = ""
	document.conv.operator.value = ""
	stack = ""
	level = "0"
}

//修改键

function backspace() {
	if(!endNumber) {
		if(document.conv.display.value.length > 1)
			document.conv.display.value = document.conv.display.value.substring(0, document.conv.display.value.length - 1)
		else
			document.conv.display.value = 0
	}
}

function clearall() {
	document.conv.display.value = 0
	endNumber = true
	stack = ""
	level = "0"
	layer = ""

	document.conv.operator.value = ""
	document.conv.bracket.value = ""
}

//转换键

function inputChangCarry(newcarry) {
	endNumber = true
	document.conv.display.value = (decto(todec(document.conv.display.value, carry), newcarry))
	carry = newcarry

	document.conv.sin.disabled = (carry != 10)
	document.conv.cos.disabled = (carry != 10)
	document.conv.tan.disabled = (carry != 10)
	document.conv.bt.disabled = (carry != 10)
	document.conv.pi.disabled = (carry != 10)
	document.conv.e.disabled = (carry != 10)
	document.conv.kp.disabled = (carry != 10)

	document.conv.k2.disabled = (carry <= 2)
	document.conv.k3.disabled = (carry <= 2)
	document.conv.k4.disabled = (carry <= 2)
	document.conv.k5.disabled = (carry <= 2)
	document.conv.k6.disabled = (carry <= 2)
	document.conv.k7.disabled = (carry <= 2)
	document.conv.k8.disabled = (carry <= 8)
	document.conv.k9.disabled = (carry <= 8)
	document.conv.ka.disabled = (carry <= 10)
	document.conv.kb.disabled = (carry <= 10)
	document.conv.kc.disabled = (carry <= 10)
	document.conv.kd.disabled = (carry <= 10)
	document.conv.ke.disabled = (carry <= 10)
	document.conv.kf.disabled = (carry <= 10)

}

function inputChangAngle(angletype) {
	endNumber = true
	angle = angletype
	if(angle == "d")
		document.conv.display.value = radiansToDegress(document.conv.display.value)
	else
		document.conv.display.value = degressToRadians(document.conv.display.value)
	endNumber = true
}

function inputshift() {
	/*if(document.conv.shiftf.checked) {
	 document.conv.bt.value = "deg "
	 document.conv.ln.value = "exp "
	 document.conv.log.value = "expd"

	 if(document.conv.hypf.checked) {
	 document.conv.sin.value = "ahs "
	 document.conv.cos.value = "ahc "
	 document.conv.tan.value = "aht "
	 } else {
	 document.conv.sin.value = "asin"
	 document.conv.cos.value = "acos"
	 document.conv.tan.value = "atan"
	 }

	 document.conv.sqr.value = "x^.5"
	 document.conv.cube.value = "x^.3"

	 document.conv.floor.value = "小数"
	 } else {
	 document.conv.bt.value = "d.ms"
	 document.conv.ln.value = " ln "
	 document.conv.log.value = "log "

	 if(document.conv.hypf.checked) {
	 document.conv.sin.value = "hsin"
	 document.conv.cos.value = "hcos"
	 document.conv.tan.value = "htan"
	 } else {
	 document.conv.sin.value = "sin "
	 document.conv.cos.value = "cos "
	 document.conv.tan.value = "tan "
	 }

	 document.conv.sqr.value = "x^2 "
	 document.conv.cube.value = "x^3 "

	 document.conv.floor.value = "取整"
	 }
	 */
}

//存储器部分

function clearmemory() {
	mem = 0
	document.conv.memory.value = "   "
}

function getmemory() {
	endNumber = true
	document.conv.display.value = decto(mem, carry)
}

function putmemory() {
	endNumber = true
	if(document.conv.display.value != 0) {
		mem = todec(document.conv.display.value, carry)
		document.conv.memory.value = " M "
	} else
		document.conv.memory.value = "   "
}

function addmemory() {
	endNumber = true
	mem = parseFloat(mem) + parseFloat(todec(document.conv.display.value, carry))
	if(mem == 0)
		document.conv.memory.value = "   "
	else
		document.conv.memory.value = " M "
}

function multimemory() {
	endNumber = true
	mem = parseFloat(mem) * parseFloat(todec(document.conv.display.value, carry))
	if(mem == 0)
		document.conv.memory.value = "   "
	else
		document.conv.memory.value = " M "
}

function submemory() {
	endNumber = true
	mem = parseFloat(mem) - parseFloat(todec(document.conv.display.value, carry))
	if(mem == 0)
		document.conv.memory.value = "   "
	else
		document.conv.memory.value = " M "
}

//十进制转换

function todec(num, oldcarry) {
	if(oldcarry == 10 || num == 0)
		return (num)
	var neg = (num.charAt(0) == "-")
	if(neg)
		num = num.substr(1)
	var newnum = 0
	for(var index = 1; index <= num.length; index++)
	newnum = newnum * oldcarry + hexnum.indexOf(num.charAt(index - 1))
	if(neg)
		newnum = -newnum
	return (newnum)
}

function decto(num, newcarry) {
	var neg = (num < 0)
	if(newcarry == 10 || num == 0)
		return (num)
	num = "" + Math.abs(num)
	var newnum = ""
	while(num != 0) {
		newnum = hexnum.charAt(num % newcarry) + newnum
		num = Math.floor(num / newcarry)
	}
	if(neg)
		newnum = "-" + newnum
	return (newnum)
}

//表达式解析

function parse(string) {
	if(string.match(/^(.*\d[\+\-\*\/\%\^\&\|x\<])?([+-]?[0-9a-f\.]+)([√\+\-\*\/\%\^\&\|x\<])([+-]?[0-9a-f\.]+)$/))
		return (RegExp.$1 + cypher(RegExp.$2, RegExp.$3, RegExp.$4))
	else
		return (string)
}

//数学运算和位运算

function cypher(left, join, right) {
	left = todec(left, carry)
	right = todec(right, carry)
	if(join == "+")
		return (decto(parseFloat(left) + parseFloat(right), carry))
	if(join == "-")
		return (decto(left - right, carry))
	if(join == "*")
		return (decto(left * right, carry))
	if(join == "/" && right != 0)
		return (decto(left / right, carry))
	if(join == "%")
		return (decto(left % right, carry))
	if(join == "&")
		return (decto(left & right, carry))
	if(join == "|")
		return (decto(left | right, carry))
	if(join == "^")
		return (decto(Math.pow(left, right), carry))
	if(join == "√")
		return (decto(Math.pow(left, 1 / right), carry))
	if(join == "x")
		return (decto(left ^ right, carry))
	if(join == "<")
		return (decto(left << right, carry))
	alert("除数不能为零")
	return (left)
}

//函数计算

function funconv(fun, num) {
	with(Math) {
		if(fun == "rand")
			return (function(minNum, maxNum, Num) {
				if(minNum > maxNum || Num < 0) {
					return 0;
				} else if(Num == 0 || Num == null) {
					return minNum + (maxNum - minNum) * Math.random();
				} else if(Num > 0) {
					return (minNum + (maxNum - minNum) * Math.random()).toFixed(Num);
				}
			})(0,1,3);
		if(fun == "pi")
			return (PI)
		if(fun == "e")
			return (E)
		if(fun == "abs")
			return (abs(num))
		if(fun == "ceil")
			return (ceil(num))
		if(fun == "round")
			return (round(num))
		if(fun == "floor")
			return (floor(num))
		if(fun == "deci")
			return (num - floor(num))
		if(fun == "ln" && num > 0)
			return (log(num))
		if(fun == "exp")
			return (exp(num))
		if(fun == "log" && num > 0)
			return (log(num) * LOG10E)
		if(fun == "expdec")
			return (pow(10, num))
		if(fun == "cube")
			return (num * num * num)
		if(fun == "cubt")
			return (pow(num, 1 / 3))
		if(fun == "sqr")
			return (num * num)
		if(fun == "sqrt" && num >= 0)
			return (sqrt(num))
		if(fun == "!")
			return (factorial(num))
		if(fun == "recip" && num != 0)
			return (1 / num)
		if(fun == "dms")
			return (dms(num))
		if(fun == "deg")
			return (deg(num))
		if(fun == "~")
			return (~num)
		if(angle == "d") {
			if(fun == "sin")
				return (sin(degressToRadians(num)))
			if(fun == "cos")
				return (cos(degressToRadians(num)))
			if(fun == "tan")
				return (tan(degressToRadians(num)))
			if(fun == "arcsin" && abs(num) <= 1)
				return (radiansToDegress(asin(num)))
			if(fun == "arccos" && abs(num) <= 1)
				return (radiansToDegress(acos(num)))
			if(fun == "arctan")
				return (radiansToDegress(atan(num)))
		} else {
			if(fun == "sin")
				return (sin(num))
			if(fun == "cos")
				return (cos(num))
			if(fun == "tan")
				return (tan(num))
			if(fun == "arcsin" && abs(num) <= 1)
				return (asin(num))
			if(fun == "arccos" && abs(num) <= 1)
				return (acos(num))
			if(fun == "arctan")
				return (atan(num))
		}

		if(fun == "hypsin")
			return ((exp(num) - exp(0 - num)) * 0.5)
		if(fun == "hypcos")
			return ((exp(num) + exp(-num)) * 0.5)
		if(fun == "hyptan")
			return ((exp(num) - exp(-num)) / (exp(num) + exp(-num)))
		if(fun == "ahypsin" | fun == "hypcos" | fun == "hyptan") {
			alert("对不起,公式还没有查到!")
			return (num)
		}

		alert("超出函数定义范围")
		return (num)
	}
}

function factorial(n) {
	n = Math.abs(parseInt(n))
	var fac = 1
	for(; n > 0; n -= 1)
	fac *= n
	return (fac)
}

function dms(n) {
	var neg = (n < 0)
	with(Math) {
		n = abs(n)
		var d = floor(n)
		var m = floor(60 * (n - d))
		var s = (n - d) * 60 - m
	}
	var dms = d + m / 100 + s * 0.006
	if(neg)
		dms = -dms
	return (dms)
}

function deg(n) {
	var neg = (n < 0)
	with(Math) {
		n = abs(n)
		var d = floor(n)
		var m = floor((n - d) * 100)
		var s = (n - d) * 100 - m
	}
	var deg = d + m / 60 + s / 36
	if(neg)
		deg = -deg
	return (deg)
}

function degressToRadians(degress) {
	return (degress * Math.PI / 180)
}

function radiansToDegress(radians) {
	return (radians * 180 / Math.PI)
}