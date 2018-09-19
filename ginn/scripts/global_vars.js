function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

lightBlue = "#00b6ff";
mediumBlue = "#00a2ff";
darkBlue = "#0078ff";

lightRed = "#ff623f";
mediumRed = "#ff4b32";
darkRed = "#ff1f00";

lightGreen = "#c3ff17";
mediumGreen = "#a8ff0f";
darkGreen = "#63ee03";





