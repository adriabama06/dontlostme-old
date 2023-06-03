const colors = {
    Reset: "\x1b[0m",
    Bright:"\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",

    Black: "\x1b[30m",
    Red: "\x1b[31m",
    Green: "\x1b[32m",
    Yellow: "\x1b[33m",
    Blue: "\x1b[34m",
    Magenta: "\x1b[35m",
    Cyan: "\x1b[36m",
    White: "\x1b[37m",

    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m",
};

module.exports = {
    reset: (text = '') => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.Reset + text;
        } else {
            i = colors.Reset;
        };
        return i;
    },
    bright: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.Bright + text;
        } else {
            i = colors.Bright;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },
    dim: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.Dim + text;
        } else {
            i = colors.Dim;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },
    underscore: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.Underscore + text;
        } else {
            i = colors.Underscore;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },
    blink: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.Blink + text;
        } else {
            i = colors.Blink;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },
    reverse: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.Reverse + text;
        } else {
            i = colors.Reverse;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },
    hidden: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.Hidden + text;
        } else {
            i = colors.Hidden;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },

    // COLORS

    black: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.Black + text;
        } else {
            i = colors.Black;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },
    red: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.Red + text;
        } else {
            i = colors.Red;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },
    green: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.Green + text;
        } else {
            i = colors.Green;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },
    yellow: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.Yellow + text;
        } else {
            i = colors.Yellow;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },
    blue: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.Blue + text;
        } else {
            i = colors.Blue;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },
    magenta: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.Magenta + text;
        } else {
            i = colors.Magenta;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },
    cyan: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.Cyan + text;
        } else {
            i = colors.Cyan;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },
    white: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.White + text;
        } else {
            i = colors.White;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },

    // BACKGROUNDS

    BgBlack: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.BgBlack + text;
        } else {
            i = colors.BgBlack;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },
    BgRed: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.BgRed + text;
        } else {
            i = colors.BgRed;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },
    BgGreen: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.BgGreen + text;
        } else {
            i = colors.BgGreen;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },
    BgYellow: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.BgYellow + text;
        } else {
            i = colors.BgYellow;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },
    BgBlue: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.BgBlue + text;
        } else {
            i = colors.BgBlue;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },
    BgMagenta: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.BgMagenta + text;
        } else {
            i = colors.BgMagenta;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },
    BgCyan: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.BgCyan + text;
        } else {
            i = colors.BgCyan;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },
    BgWhite: (text = '', reset = true) => {
        var i = '';
        if(typeof text == 'string' && text != '') {
            i = colors.BgWhite + text;
        } else {
            i = colors.BgWhite;
        };
        if(reset == true) {
            i = i + colors.Reset;
        };
        return i;
    },
};