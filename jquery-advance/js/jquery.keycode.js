// JavaScript Document
(function ( $ ) {
    var keycode = [
        { name : 'backspace' , code : '8'},
        { name : 'tab' , code : '9'},
        { name : 'clear' , code : '12'},
        { name : 'enter' , code : '13'},
        { name : 'shift_l' , code : '16'},
        { name : 'control_l' , code : '17'},
        { name : 'alt_l' , code : '18'},
        { name : 'pause' , code : '19'},
        { name : 'caps_lock' , code : '27'},
        { name : 'escape' , code : '8'},
        { name : 'space' , code : '32'},
        { name : 'prior' , code : '33'},
        { name : 'next' , code : '34'},
        { name : 'left' , code : '37'},
        { name : 'up' , code : '38'},
        { name : 'right' , code : '39'},
        { name : 'down' , code : '40'},
        { name : 'select' , code : '41'},
        { name : 'print' , code : '42'},
        { name : 'execute' , code : '43'},
        { name : 'insert' , code : '45'},
        { name : 'delete' , code : '46'},
        { name : 'help' , code : '47'},
        { name : '0 equal braceright' , code : '48'}
    ];
    $.fn.keycode = function ( name , callback ) {
        var evt = 'keydown.' + name;
        $( this ).off( evt ).on( evt , function ( e ) {
            $( keycode ).each( function ( i , n ) {
                if ( $( n ).name == name.toLowerCase() && $( n ).code == e.keycode ) {
                    callback.call(this);
                }
            })
        } )
    }
})( jQuery )
/*
 1 exclam onesuperior 	49 	2 quotedbl twosuperior 	50
 3 section threesuperior 	51 	4 dollar 	52
 5 percent 	53 	6 ampersand 	54
 7 slash braceleft 	55 	8 parenleft bracketleft 	56
 9 parenright bracketright 	57 	a A 	65
 b B 	66 	c C 	67
 d D 	68 	e E EuroSign 	69
 f F 	70 	g G 	71
 h H 	72 	i I 	73
 j J 	74 	k K 	75
 l L 	76 	m M mu 	77
 n N 	78 	o O 	79
 p P 	80 	q Q at 	81
 r R 	82 	s S 	83
 t T 	84 	u U 	85
 v V 	86 	w W 	87
 x X 	88 	y Y 	89
 z Z 	90 	KP_0 	96
 KP_1 	97 	KP_2 	98
 KP_3 	99 	KP_4 	100
 KP_5 	101 	KP_6 	102
 KP_7 	103 	KP_8 	104
 KP_9 	105 	KP_Multiply 	106
 KP_Add 	107 	KP_Separator 	108
 KP_Subtract 	109 	KP_Decimal 	110
 KP_Divide 	111 	F1 	112
 F2 	113 	F3 	114
 F4 	115 	F5 	116
 F6 	117 	F8 	119
 F9 	120 	F10 	121
 F11 	122 	F12 	123
 F13 	124 	F14 	125
 F15 	126 	F16 	127
 F17 	128 	F18 	129
 F19 	130 	F20 	131
 F21 	132 	F22 	133
 F23 	134 	F24 	135
 Num_Lock 	136 	Scroll_Lock 	137
 Acute grave 	187 	Comma semicolon 	188
 Minus underscore 	189 	Period colon 	190
 Numbersign apostrophe 	192 	Plusminus hyphen macron 	210
 Copyright registered 	212 	Guillemotleft guillemotright 	213
 Masculine ordfeminine 	214 	ae AE 	215
 Cent yen 	216 	Questiondown exclamdown 	217
 Onequarter onehalf threequarters 	218 	Less greater bar 	219
 Plus asterisk asciitilde 	221 	Multiply division 	227
 acircumflex Acircumflex 	228 	ecircumflex Ecircumflex 	229
 icircumflex Icircumflex 	230 	ocircumflex Ocircumflex 	231
 ucircumflex Ucircumflex 	232 	ntilde Ntilde 	233
 yacute Yacute 	234 	oslash Ooblique 	235
 aring Aring 	236 	ccedilla Ccedilla 	237
 thorn THORN 	238 	eth ETH 	239
 diaeresis cedilla currency 	240 	agrave Agrave atilde Atilde 	241
 egrave Egrave 	242 	igrave Igrave 	243
 ograve Ograve otilde Otilde 	244 	ugrave Ugrave 	245
 adiaeresis Adiaeresis 	246 	ediaeresis Ediaeresis 	247
 idiaeresis Idiaeresis 	248 	odiaeresis Odiaeresis 	249
 udiaeresis Udiaeresis 	250 	ssharp question backslash 	251
 asciicircum degree 	252 	3 sterling 	253
 Mode_switch 	254
 A 	0X65 	B 	0X66
 C 	0X67 	D 	0X68
 E 	0X69 	F 	0X70
 J 	0X71 	H 	0X72
 I 	0X73 	J 	0X74
 K 	0X75 	L 	0X76
 M 	0X77 	N 	0X78
 O 	0X79 	P 	0X80
 Q 	0X81 	R 	0X82
 S 	0X83 	T 	0X84
 U 	0X85 	V 	0X86
 W 	0X87 	X 	0X88
 Y 	0X89 	Z 	0X90
 0 	0X48 	1 	0X49
 2 	0X50 	3 	0X51
 4 	0X52 	5 	0X53
 6 	0X54 	7 	0X55
 8 	0X56 	9 	0X57
 ESC 	0X1B 	CTRL 	0X11
 SHIFT 	0X10 	ENTER 	0XD*/