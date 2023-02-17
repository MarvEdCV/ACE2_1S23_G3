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
  
  setInterval(getTemperatureFromDB,3000);
  
}

function draw() {
  background(220);
  drawGrid();
  termometro();
  humedadRelativa();
  humedadAbsoluta();
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




