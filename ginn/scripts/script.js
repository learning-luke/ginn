var valueMap = [      0,       1,       2,       3,       4,       5,       6,
             7,       8,       9,      10,      11,      12,      13,
            14,      15,      16,      17,      18,      19,      20,
            21,      22,      23,      24,      25,      26,      27,
            28,      29,      30,      31,      32,      33,      34,
            35,      36,      37,      38,      39,      40,      41,
            42,      43,      44,      45,      46,      47,      48,
            49,      50,      52,      54,      56,      58,      60,
            62,      64,      66,      68,      70,      72,      74,
            76,      78,      80,      82,      84,      86,      88,
            90,      92,      94,      96,      98,     100,     105,
           107,     109,     111,     113,     115,     117,     119,
           121,     123,     125,     127,     129,     131,     133,
           135,     137,     139,     141,     143,     145,     147,
           149,     151,     153,     155,     157,     159,     161,
           163,     165,     167,     169,     171,     173,     175,
           177,     179,     181,     183,     185,     187,     189,
           191,     193,     195,     197,     199,     200,     205,
           210,     215,     220,     225,     230,     235,     240,
           245,     250,     255,     260,     265,     270,     275,
           280,     285,     290,     295,     300,     310,     320,
           330,     340,     350,     360,     370,     380,     390,
           400,     410,     420,     430,     440,     450,     460,
           470,     480,     490,     500,     520,     540,     560,
           580,     600,     620,     640,     660,     680,     700,
           720,     740,     760,     780,     800,     820,     840,
           860,     880,     900,     920,     940,     960,     980,
          1000,    1050,    1100,    1150,    1200,    1250,    1300,
          1350,    1400,    1450,    1500,    1550,    1600,    1650,
          1700,    1750,    1800,    1850,    1900,    1950,    2000,
          2100,    2200,    2300,    2400,    2500,    2600,    2700,
          2800,    2900,    3000,    3100,    3200,    3300,    3400,
          3500,    3600,    3700,    3800,    3900,    4000,    4500,
          5000,    5500,    6000,    6500,    7000,    7500,    8000,
          8500,    9000,    9500,   10000,   15000,   20000,   25000,
         30000,   35000,   40000,   45000,   50000,   55000,   60000,
         65000,   70000,   75000,   80000,   85000,   90000,   95000,
        100000,  105000,  110000,  115000,  120000,  125000,  130000,
        135000,  140000,  145000,  150000,  155000,  160000,  165000,
        170000,  175000,  180000,  185000,  190000,  195000,  200000,
        205000,  210000,  215000,  220000,  225000,  230000,  235000,
        240000,  245000,  250000,  255000,  260000,  265000,  270000,
        275000,  280000,  285000,  290000,  295000,  300000,  305000,
        310000,  315000,  320000,  325000,  330000,  335000,  340000,
        345000,  350000,  355000,  360000,  365000,  370000,  375000,
        380000,  385000,  390000,  395000,  400000,  405000,  410000,
        415000,  420000,  425000,  430000,  435000,  440000,  445000,
        450000,  455000,  460000,  465000,  470000,  475000,  480000,
        485000,  490000,  495000,  500000,  505000,  510000,  515000,
        520000,  525000,  530000,  535000,  540000,  545000,  550000,
        555000,  560000,  565000,  570000,  575000,  580000,  585000,
        590000,  595000,  600000,  605000,  610000,  615000,  620000,
        625000,  630000,  635000,  640000,  650000,  660000,  670000,
        680000,  690000,  700000,  710000,  720000,  730000,  740000,
        750000,  760000,  770000,  780000,  790000,  800000,  810000,
        820000,  830000,  840000,  850000,  860000,  870000,  880000,
        890000,  900000,  910000,  920000,  930000,  940000,  950000,
        960000,  970000,  980000,  990000, 1000000, 1010000, 1020000,
       1030000, 1040000, 1050000, 1060000, 1070000, 1080000, 1090000,
       1100000, 1110000, 1120000, 1130000, 1140000, 1150000, 1160000,
       1170000, 1180000, 1190000, 1200000, 1210000, 1220000, 1230000,
       1240000, 1250000, 1260000, 1270000]
var mapLength = 430;
var timeoutVar;
var incrementValue = 1/mapLength;
var timeoutValue = 20;
var playing = false;
var base_fn = 'data';

var images = [];
function preload() {
    for (var i = 0; i < valueMap.length; i++) {
 		  iteration = valueMap[i];
        images[i] = new Image();
        images[i].src = `${base_fn}/p_${iteration}.png`;
        
    }
}

preload();



var xDict = new Object();
var yDict = new Object();

var selectedLayers = new Object();
selectedLayers[0] = [];
selectedLayers[1] = [];
selectedLayers[2] = [];

var plotData = new Object();  
canvas = document.getElementById('ginImage');
ginDiv = document.getElementById('ginDiv');
selectAllDiv = document.getElementById('selectAllDiv');
unselectAllDiv = document.getElementById('unselectAllDiv');

networkOutputDiv = document.getElementById('networkOutput');
targetDataDiv = document.getElementById('targetData');
var showNetworkOutput = true;

selectLayer1Div = document.getElementById('selectLayer1');
selectLayer2Div = document.getElementById('selectLayer2');
selectLayer3Div = document.getElementById('selectLayer3');

unselectLayer1Div = document.getElementById('unselectLayer1');
unselectLayer2Div = document.getElementById('unselectLayer2');
unselectLayer3Div = document.getElementById('unselectLayer3');

leftButtonIds = document.querySelectorAll("[id*='unit']");

var context = canvas.getContext("2d");
var img = new Image();

img.onload = function () {
    var size = findImgSize()
    canvas.width = size;
    canvas.height = size;
    
    
    drawImg()
    
}
load(0);

networkOutputDiv.onclick=function(){
    if (showNetworkOutput == false) {
        showNetworkOutput = true;
        value = iterationSlider.getValue()[0]
        networkOutputDiv.style.backgroundColor = "#4db3ff";
        targetDataDiv.style.backgroundColor = "#dfdfdf";
        load(value)
        drawImg();
    }
}

targetDataDiv.onclick=function(){
    if (showNetworkOutput == true) {
        showNetworkOutput = false;
        value = iterationSlider.getValue()[0]
        targetDataDiv.style.backgroundColor = "#4db3ff";
        networkOutputDiv.style.backgroundColor = "#dfdfdf";
        load(value)
        drawImg();
    }
}

networkOutputDiv.onmouseover=function(){ 
    
    if (showNetworkOutput === true){
        networkOutputDiv.style.backgroundColor = "#4db3ff";
    } else {
        networkOutputDiv.style.backgroundColor = "#cdcdcd";
    }

}

networkOutputDiv.onmouseout=function(){ 
    if (showNetworkOutput === true){
        networkOutputDiv.style.backgroundColor = "#75d8ff";
    } else {
        networkOutputDiv.style.backgroundColor = "#dfdfdf";
    }
    

}

targetDataDiv.onmouseover=function(){ 
    
    if (showNetworkOutput === false){
        targetDataDiv.style.backgroundColor = "#4db3ff";
    } else {
        targetDataDiv.style.backgroundColor = "#cdcdcd";
    }

}

targetDataDiv.onmouseout=function(){ 
    if (showNetworkOutput === false){
        targetDataDiv.style.backgroundColor = "#75d8ff";
    } else {
        targetDataDiv.style.backgroundColor = "#dfdfdf";
    }

}



selectAllDiv.onclick=function(){ 
    
    for (var ui = 0; ui < 16; ui++) {
    
        if (selectedLayers[0].indexOf(ui)<0){
            selectedLayers[0].push(ui);
        }
        if (selectedLayers[1].indexOf(ui)<0){
            selectedLayers[1].push(ui);
        }
        if (selectedLayers[2].indexOf(ui)<0){
            selectedLayers[2].push(ui);
        }
    }
    
    for (i in leftButtonIds){
        
        if (typeof leftButtonIds[i].id !== 'undefined'){
            
            if (leftButtonIds[i].id.includes('layer0')){
                leftButtonIds[i].style.backgroundColor = mediumBlue; 
            } else if (leftButtonIds[i].id.includes('layer1')){
                leftButtonIds[i].style.backgroundColor = mediumRed; 
            } else if (leftButtonIds[i].id.includes('layer2')){
                leftButtonIds[i].style.backgroundColor = mediumGreen; 
            } 
        }
    }
    
    drawImg();
}

unselectAllDiv.onclick=function(){ 
    selectedLayers[0] = [];
    selectedLayers[1] = [];
    selectedLayers[2] = [];
    
    for (i in leftButtonIds){
        
        if (typeof leftButtonIds[i].id !== 'undefined'){
            
            if (leftButtonIds[i].id.includes('layer0')){
                leftButtonIds[i].style.backgroundColor = lightBlue; 
            } else if (leftButtonIds[i].id.includes('layer1')){
                leftButtonIds[i].style.backgroundColor = lightRed; 
            } else if (leftButtonIds[i].id.includes('layer2')){
                leftButtonIds[i].style.backgroundColor = lightGreen; 
            } 
        }
    }
    
    drawImg();
    
}


selectLayer1Div.onclick=function(){ 
    for (var ui = 0; ui < 16; ui++) {
        if (selectedLayers[0].indexOf(ui)<0){
            selectedLayers[0].push(ui);
            var btn = document.getElementById(`layer0unit${ui}`);
            btn.style.backgroundColor = mediumBlue; 
            
        }
        
    }
    
       
    drawImg();
}

selectLayer2Div.onclick=function(){ 
    for (var ui = 0; ui < 16; ui++) {
        if (selectedLayers[1].indexOf(ui)<0){
            selectedLayers[1].push(ui);
            var btn = document.getElementById(`layer1unit${ui}`);
            btn.style.backgroundColor = mediumRed; 
        }
        
    }
    drawImg();
}

selectLayer3Div.onclick=function(){ 
    for (var ui = 0; ui < 16; ui++) {
        if (selectedLayers[2].indexOf(ui)<0){
            selectedLayers[2].push(ui);
            var btn = document.getElementById(`layer2unit${ui}`);
            btn.style.backgroundColor = mediumGreen; 
        }
        
    }
    drawImg();
}

unselectLayer1Div.onclick=function(){
    selectedLayers[0] = [];
    drawImg();
    
    for (var ui = 0; ui < 16; ui++) {
        var btn = document.getElementById(`layer0unit${ui}`);
        btn.style.backgroundColor = lightBlue; 
        
    }
}

unselectLayer2Div.onclick=function(){
    selectedLayers[1] = [];
    drawImg();
    for (var ui = 0; ui < 16; ui++) {
        var btn = document.getElementById(`layer1unit${ui}`);
        btn.style.backgroundColor = lightRed; 
        
    }
}

unselectLayer3Div.onclick=function(){
    selectedLayers[2] = [];
    drawImg();
    for (var ui = 0; ui < 16; ui++) {
        var btn = document.getElementById(`layer2unit${ui}`);
        btn.style.backgroundColor = lightGreen; 
        
    }
}

function drawUnit(xs, ys, colour, alpha, mult=1) {
    
    scaling = canvas.width/200;
    
    for (var i = 0; i < xs.length; i++) {
        xi = xs[i];
        yi = ys[i];
        var rgb = hexToRgb(colour);
        var r = rgb.r;
        var g = rgb.g;
        var b = rgb.b;
        context.fillStyle=`rgb(${r}, ${g}, ${b}, ${alpha})`;
        
        var thickness = mult*scaling;
        context.fillRect(yi*scaling - thickness/2, xi*scaling - thickness/2, thickness, thickness);
    }
}



for (i in leftButtonIds){
    
    leftButtonIds[i].onmouseover=function(){ 
        if (this.id.includes('layer0')){
            this.style.backgroundColor = darkBlue; 
            //var xLayerDict = xDict[0];
            //var yLayerDict = yDict[0];
            var ui = this.id.split('unit');
            ui = parseInt(ui[ui.length-1]);
            
            
            //var xToDraw = xLayerDict[ui];
            //var yToDraw = yLayerDict[ui];
            
            var xToDraw = plotData[0][ui]['x'];
            var yToDraw = plotData[0][ui]['y'];
            
            drawUnit(xToDraw, yToDraw, darkBlue, 0.5, mult=2.5)
        } else if (this.id.includes('layer1')) {
            this.style.backgroundColor = darkRed; 
            //var xLayerDict = xDict[1];
            //var yLayerDict = yDict[1];
            var ui = this.id.split('unit');
            ui = parseInt(ui[ui.length-1]);
                
            
            var xToDraw = plotData[1][ui]['x'];
            var yToDraw = plotData[1][ui]['y'];
            
            drawUnit(xToDraw, yToDraw, darkRed, 0.5, mult=2.5)
        } else if (this.id.includes('layer2')) {
            
            this.style.backgroundColor = darkGreen; 
            //var xLayerDict = xDict[2];
            //var yLayerDict = yDict[2];
            var ui = this.id.split('unit');
            ui = parseInt(ui[ui.length-1]);
            
            
            var xToDraw = plotData[2][ui]['x'];
            var yToDraw = plotData[2][ui]['y'];
            
            drawUnit(xToDraw, yToDraw, darkGreen, 0.5, mult=2.5)
            
        } 
    }
    leftButtonIds[i].onmouseout=function(){ 
        
        if (this.id.includes('layer0')){
            var ui = this.id.split('unit');
            ui = parseInt(ui[ui.length-1]);
            if (selectedLayers[0].indexOf(ui)<0){
                this.style.backgroundColor = lightBlue; 
            } else {
                this.style.backgroundColor = mediumBlue; 
            }
            drawImg()
        } else if (this.id.includes('layer1')) {
            var ui = this.id.split('unit');
            ui = parseInt(ui[ui.length-1]);
            if (selectedLayers[1].indexOf(ui)<0){
                this.style.backgroundColor = lightRed;
            } else {
                this.style.backgroundColor = mediumRed; 
            }
            drawImg()
        } else if (this.id.includes('layer2')) {
            var ui = this.id.split('unit');
            ui = parseInt(ui[ui.length-1]);
            if (selectedLayers[2].indexOf(ui)<0){
                this.style.backgroundColor = lightGreen;
            } else {
                this.style.backgroundColor = mediumGreen; 
            }
            drawImg()
        } 
        
    }
    
    
    leftButtonIds[i].onclick=function(){ 
        
        if (this.id.includes('layer0')){
        
            var ui = this.id.split('unit');
            ui = parseInt(ui[ui.length-1]);
            if (selectedLayers[0].indexOf(ui)>-1){
                selectedLayers[0].splice(selectedLayers[0].indexOf(ui), 1);
            } else {
                selectedLayers[0].push(ui);
            }
            
            drawImg();
            
        } else if (this.id.includes('layer1')) {
            var ui = this.id.split('unit');
            ui = parseInt(ui[ui.length-1]);
            if (selectedLayers[1].indexOf(ui)>-1){
                selectedLayers[1].splice(selectedLayers[1].indexOf(ui), 1);
            } else {
                selectedLayers[1].push(ui);
            }
            drawImg();
            
        } else if (this.id.includes('layer2')) {
            var ui = this.id.split('unit');
            ui = parseInt(ui[ui.length-1]);
            if (selectedLayers[2].indexOf(ui)>-1){
                selectedLayers[2].splice(selectedLayers[2].indexOf(ui), 1);
            } else {
                selectedLayers[2].push(ui);
            }
            drawImg();
            
        } 
        
    }
}

selectButtonIds = document.querySelectorAll("[id*='select']")

for (i in selectButtonIds){
    selectButtonIds[i].onmouseover=function(){ 
            this.style.backgroundColor = "#cdcdcd"; 
    }
    
    selectButtonIds[i].onmouseout=function(){ 
            this.style.backgroundColor = "#dfdfdf"; 
    }
            
        
}
	



window.onresize = function () {
    var size = findImgSize()
    canvas.width = size;
    canvas.height = size;
   
    drawImg()
}



function findImgSize() {
    size = ginDiv.clientWidth;
    if (ginDiv.clientHeight < size) {
        size = ginDiv.clientHeight;
    }
    return size;
    
}

function drawImg() {
    context.imageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = "source-over";
    context.lineWidth = 4;
    context.strokeStyle="#75d8ff";
    context.strokeRect(0, 0, canvas.width, canvas.height);//for white background
    
    
    for (var i = 0; i < selectedLayers[0].length; i++) {
        
        var index = selectedLayers[0][i]
        
        var xToDraw = plotData[0][index]['x'];
        var yToDraw = plotData[0][index]['y'];
        drawUnit(xToDraw, yToDraw, mediumBlue, 1)
    }
    
    for (var i = 0; i < selectedLayers[1].length; i++) {
        var index = selectedLayers[1][i]
        
        var xToDraw = plotData[1][index]['x'];
        var yToDraw = plotData[1][index]['y'];
        drawUnit(xToDraw, yToDraw, mediumRed, 1)
    }
    
    for (var i = 0; i < selectedLayers[2].length; i++) {
        var index = selectedLayers[2][i]
        
        var xToDraw = plotData[2][index]['x'];
        var yToDraw = plotData[2][index]['y'];
        drawUnit(xToDraw, yToDraw, mediumGreen, 1)
    }
    
    
    
    
    
}


function load(value) {

    value = Math.round(value * mapLength)
    value = valueMap[value]
    
    lossChart.data.datasets[0].data = [{x: value, y:trainingStats["losses"][trainingStats["iterations"].indexOf(value)]}];
    lossChart.update();
    
    if (value <= 100){
        iteration = value
        plotData = dataFileFirst[iteration]
    } else {
        iteration = value
    
        if (iteration in dataFileLast) {
            plotData = dataFileLast[iteration]
        }
    }
    if (showNetworkOutput !== false) {
        img.src = `${base_fn}/p_${iteration}.png`;
    } else {
        img.src = "images/gin.png";
    }
}
var iterationSlider = new Dragdealer('just-a-slider', {
    snap: true,
    steps: mapLength-1,
    animationCallback: function(value, y) {
        
        load(value);
	    //
	    
        
    },
    dragStartCallback: function(x, y) {
        if (playing == true) {clearTimeout(timeoutVar); playing = false;}
    }
});


function playNextSlider() {
    value = iterationSlider.getValue()[0] + incrementValue;
    if (playing === true && value <= 1) {
    
        iterationSlider.setValue(value, 0, snap=true);
        timoutVar = setTimeout(function(){playNextSlider(value + incrementValue)},timeoutValue);
        
    } else if (playing === true && value > 1) {playing = false; clearTimeout(timeoutVar);}

}

window.onkeydown = function(e){
    if(e.keyCode == 32){
        e.preventDefault();
        if (playing === true) { playing = false; }
        else {playing = true; }
        
        if (playing == true) {
            currentValue = iterationSlider.getValue()[0];
            playNextSlider();
        } else {
            clearTimeout(timeoutVar);
        }
        
        
    }
    
    if(e.keyCode == 173){
        if (timeoutValue < 2000) {
            if (timeoutValue < 10) {
                timeoutValue += 1;
            } else {
                timeoutValue += 10;
            }
        }
    
    }
    
    if(e.keyCode == 61){
        if (timeoutValue > 10) {timeoutValue -= 10;}
        else if (timeoutValue > 1) {timeoutValue -= 1; }
    
    }
    
    if (e.keyCode == 39) {
        currentValue = iterationSlider.getValue()[0];
        if (currentValue < mapLength){
            iterationSlider.setValue(currentValue+1/mapLength, 0, snap=true);
        }
    }
    
    if (e.keyCode == 37) {
        currentValue = iterationSlider.getValue()[0];
        if (currentValue > 0){
            iterationSlider.setValue(currentValue-1/mapLength, 0, snap=true);
        }
    }
}



