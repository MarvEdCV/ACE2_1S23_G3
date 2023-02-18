let posX = 100;

//let rawTemperatureData = [40, 33, 20, 15, 0 ,10, 34, 3, 7, 9, 10, -10, -5, -8, -30];
//let rawHrData          = [88, 100, 20, 80,27, 75, 45, 55, 90, 81, 11, 14, 77, 77, 50];
//let rawHaData          = [0.50, 1, 0.50, 0.67,0.50, 0.50, 0.50, 0.50, 0.11, 0.11, 0.50, 0.50, 0.50, 0.50, 0.76];

var colorBasedOnTemperature;

var CYAN;
var ORANGE;

function setup() {

  createCanvas(1035, 800);
  

  colorBasedOnTemperature = color(0,255,255); // Cyan
  CYAN   = color(0,255,255);
  ORANGE = color(255,153,51);
  
  background(220);
  drawGrid();
  termometro();
  humedadRelativa();
  humedadAbsoluta();
  velocidad();
  direccion();
  presionBarometrica();

  setInterval(reloadEverything,3000);
  
}

function draw() {
  
}

function reloadEverything(){
  getTemperatureFromDB();
  background(220);
  drawGrid();
  termometro();
  humedadRelativa();
  humedadAbsoluta();
  velocidad();
  direccion();
  presionBarometrica();
}

function drawGrid(){

  strokeWeight(5);
  stroke(0);
  noFill();
  rect(0,0, width, height);
  // lineas verticales
  fill(0,0,0);
  rect(width/3, 0, 1, height); 
  rect(width/3 + width/3, 0, 1, height);
  // linea horizontal
  rect(0, height/2, width, 1);
}

var GLOBAL_TEMPERATURA_ABSOLUTA = 0.0;
function humedadAbsoluta(){

  let altura = 260, ancho = 200;
  let XPos = (2*width/3+(width/3-ancho)/2), YPos = 48;
  
  strokeWeight(3);
  stroke(0,0,0);
  fill(204,229,255);
  // rectangulo que simula el aire
  rect(XPos, YPos, ancho, altura);
  // volumen por cada m*3 (simula el agua)
  noStroke();
  fill(0,0,255);
  let porcentaje = (GLOBAL_TEMPERATURA_ABSOLUTA)*altura;
  let proporcion = altura - porcentaje;
  rect(XPos+1, YPos + proporcion, ancho -2, porcentaje);
  // texto
  textSize(20)
  noStroke();
  fill(0);
  text(GLOBAL_TEMPERATURA_ABSOLUTA + " g/m3", XPos + ancho/3, (YPos + altura+30));

  text("HUMEDAD ABSOLUTA", 2*width/3 +70, 25);
  // BUTTON
  button = createButton('Ver grafica');
  button.position( (XPos + ancho/4), (YPos + altura +40));
  button.mousePressed( ()=>{window.location = "./graficas/humedad/absoluta/humedadAbsoluta.html"});
}


var GLOBAL_TEMPERATURA_RELATIVA = 0;
function humedadRelativa(){
  
  const diametroMinimo = 150;
  let circuloExterno = {XPos: (width/3 +width/6) , YPos: 200, diametroCirculo: Math.abs(GlobalTemperature) + diametroMinimo};

  strokeWeight(3);
  stroke(0,0,0);
  fill(255, 204, 0);
  circle(circuloExterno.XPos, circuloExterno.YPos, circuloExterno.diametroCirculo);

  // circulo Interno que representara a la humedad relativa
  noStroke();
  fill(102,178,255);
  circle(circuloExterno.XPos, circuloExterno.YPos, (circuloExterno.diametroCirculo * (GLOBAL_TEMPERATURA_RELATIVA/100)));

  textSize(20)
  noStroke();
  fill(0);
  text(GLOBAL_TEMPERATURA_RELATIVA+ " %", circuloExterno.XPos - 20, circuloExterno.YPos + 125);

  text("HUMEDAD RELATIVA", width/3 +70, 25);
  // BUTTON
  button = createButton('Ver grafica');
  button.position(circuloExterno.XPos -40, circuloExterno.YPos + 145);
  button.mousePressed( ()=>{window.location = "./graficas/humedad/relativa/humedadRelativa.html"});
}

let GlobalTemperature = 0;
function termometro(){

  strokeWeight(3);
  let marco = {x:165, y:48, ancho:20, largo:200};

  // Marco del termometro
  stroke(0,0,0);
  noFill();
  rect(marco.x, marco.y, marco.ancho, marco.largo); //rect(100, 100, 20, termometroLength);
  // fin del termometro
  fill(colorBasedOnTemperature);
  ellipse( marco.x +10, marco.y + marco.largo + 29,60,60); //ellipse(110,129 + termometroLength,60,60);

  // simulacion del mercurio del termometro
  let mercuryData = getMercuryColorAndPosition(GlobalTemperature, (marco.y + marco.largo/2), marco.largo);
  colorBasedOnTemperature = mercuryData.color;
  stroke(colorBasedOnTemperature);
  strokeWeight(16);
  line(marco.x +10, (marco.y + marco.largo), marco.x +10, mercuryData.pos);

  textSize(20)
  noStroke();
  fill(0);
  text(GlobalTemperature + " *C", marco.x -5 , (marco.y + marco.largo + 85) );
  text("TEMPERATURA", 60, 25);
  // boton
  button = createButton('Ver grafica');
  button.position(marco.x -30 , (marco.y + marco.largo + 100) );
  button.mousePressed( ()=>{window.location = "./graficas/temperatura/temperatura.html"});
}

var GLOBAL_DIRECCION = 0;
function direccion(){
  
  const diametroMinimo = 150;
  let circuloExterno = {XPos: (width/3 +width/6) , YPos: 600, diametroCirculo: Math.abs(0) + diametroMinimo};

  strokeWeight(3);
  stroke(0,0,0);
  fill(185, 170, 166  );
  circle(circuloExterno.XPos, circuloExterno.YPos, circuloExterno.diametroCirculo);

  
  if(GLOBAL_DIRECCION==0){
     line(circuloExterno.XPos, circuloExterno.YPos, circuloExterno.XPos, 525);
     }else if (GLOBAL_DIRECCION==90){
               line(circuloExterno.XPos, circuloExterno.YPos, circuloExterno.YPos-10, 600);
     }else if (GLOBAL_DIRECCION==180){
               line(circuloExterno.XPos, circuloExterno.YPos, circuloExterno.XPos, 675);
               }
     else if (GLOBAL_DIRECCION==270){
               line(circuloExterno.XPos, circuloExterno.YPos, 445,circuloExterno.YPos );
     }

   ellipse(circuloExterno.XPos, circuloExterno.YPos,2, 2);
  
  text("N", circuloExterno.XPos - 5, circuloExterno.YPos-210 + 125);
  text("S", circuloExterno.XPos - 5, circuloExterno.YPos-30 + 125);
  text("E", circuloExterno.XPos + 80, circuloExterno.YPos-120 + 125);
  text("0", circuloExterno.XPos - 95, circuloExterno.YPos-120 + 125);
  
  

  textSize(20)
  noStroke();
  fill(0);
  text(GLOBAL_DIRECCION+ "°", circuloExterno.XPos - 10, circuloExterno.YPos + 125);

  text("DIRECCION", width/3 +110, 430);
  // BUTTON
  button = createButton('Ver grafica');
  button.position(circuloExterno.XPos -40, circuloExterno.YPos + 145);
  button.mousePressed( ()=>{window.location = "./graficas/direccion/direccionViento.html"});
}

var GLOBAL_PRESIONBAROMETRICA = 0;
function presionBarometrica(){

  let XPos = (2*width/3+(width/3-ancho)/2), YPos = 500;
  
  strokeWeight(3);
  stroke(0,0,0);
  fill(147, 198, 200 );
  // rectangulo que simula el aire
  triangle(XPos+100, YPos, XPos, YPos+200, XPos+200, YPos+200);

  // texto
  textSize(20)
  noStroke();
  fill(0);
  text(GLOBAL_PRESIONBAROMETRICA + " mmHg", XPos + ancho/3, (YPos+130 ));

  text("PRESION BAROMETRICA", 2*width/3 +60, 430);
  // BUTTON
  button = createButton('Ver grafica');
  button.position( (XPos + ancho/4), (YPos +245));
  button.mousePressed( ()=>{window.location = "./graficas/presion/presionBarometrica.html"});
}


let GLOBAL_VELOCIDAD = 0;
function velocidad(){

  strokeWeight(3);
  let marco = {x:45, y:570, ancho:200, largo:20};

  strokeWeight(3);
  stroke(0,0,0);
  fill(240, 85, 52 );
  // Marco 
  rect(marco.x, marco.y, marco.ancho, 25); 
  triangle(marco.x+marco.ancho, marco.y-30, marco.x+marco.ancho, marco.y+52, marco.x+marco.ancho+40, marco.y+12);

  textSize(20)
  noStroke();
  fill(0);
  text(GLOBAL_VELOCIDAD + " Km/h", marco.x +85 , (marco.y + marco.largo + 135) );
  text("VELOCIDAD", 100, 430);
  // boton
  button = createButton('Ver grafica');
  button.position(marco.x+80 , (marco.y + marco.largo + 155) );
  button.mousePressed( ()=>{window.location = "./graficas/velocidad/velocidadViento.html"});
}


function getMercuryColorAndPosition(valorTemperatura, yPosOfAbsoluteCero, termometroHeight){

  if (valorTemperatura>40)
    valorTemperatura = 40;
  
  let calcularPosicion = yPosOfAbsoluteCero - valorTemperatura*((termometroHeight/2)/40);;
  let mercuryColor;

  if(valorTemperatura > 0){  
    mercuryColor = ORANGE; // orange
  }else {
    mercuryColor = CYAN; // orange 
  }
  return {pos: calcularPosicion, color: mercuryColor};
}


let u  = -1;
function getTemperatureFromDB(){

  getUltimaTemperatura('http://localhost:4010/api/ultima-temperatura');
  getUltimaHumedad('http://localhost:4010/api/ultima-humedad');
  getUltimaDireccion('http://localhost:4010/api/ultimo-viento');
  getUltimaPresion('http://localhost:4010/api/ultima-presion-barometrica');

} 

function getUltimaTemperatura(url){

  axios.get(url, {responseType: 'json'}).then(function(res) {
      if(res.status==200) {
        console.log(res.data);
        GlobalTemperature = res.data[0].temperatura;
      }
      //console.log(res);
    }).catch(function(err) {
      console.log(err);
    })
}

function getUltimaHumedad(url){

  axios.get(url, {responseType: 'json'}).then(function(res) {
      if(res.status==200) {
        console.log(res.data);
        GLOBAL_TEMPERATURA_RELATIVA = res.data[0].humedad_relativa;
        GLOBAL_TEMPERATURA_ABSOLUTA = res.data[0].humedad_absoluta;
      }
      //console.log(res);
    }).catch(function(err) {
      console.log(err);
    })
}

function getUltimaDireccion(url){

  axios.get(url, {responseType: 'json'}).then(function(res) {
      if(res.status==200) {
        console.log(res.data);
        GLOBAL_DIRECCION = res.data[0].direccion;
        GLOBAL_VELOCIDAD = res.data[0].velocidad;
      }
      //console.log(res);
    }).catch(function(err) {
      console.log(err);
    })
}

function getUltimaPresion(url){

  axios.get(url, {responseType: 'json'}).then(function(res) {
      if(res.status==200) {
        console.log(res.data);
        GLOBAL_PRESIONBAROMETRICA = res.data[0].presion_barometrica;
      }
      //console.log(res);
    }).catch(function(err) {
      console.log(err);
    })
}





