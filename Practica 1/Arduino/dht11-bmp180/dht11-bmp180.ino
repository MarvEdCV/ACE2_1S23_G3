
// Incluimos librería
#include <DHT.h>
#include <Adafruit_BMP085.h>
#define DHTPIN 2
#define DHTTYPE DHT11

Adafruit_BMP085 bmp;
DHT dht(DHTPIN, DHTTYPE);

//Viento
int pin = A0;
int pinN = 22;
int pinE = 24;
int pinS = 26;
int pinO = 28;
float grados = 0;

void setup() {
  // Inicializamos comunicación serie
  Serial.begin(9600);

  pinMode(pin, INPUT);
 
  // Comenzar DHT y BMP
  dht.begin();
  if (!bmp.begin()) {
    Serial.println("Could not find a valid BMP085 sensor, check wiring!");
    while (1) {}
  }
 
}
 
void loop() { 
  float temperatura =  dht.readTemperature();
  float humedad_relativa =  dht.readHumidity();
  float presion = bmp.readPressure();

  if (isnan(temperatura) || isnan(humedad_relativa)) {
    Serial.println("Error obteniendo los datos del sensor DHT11");
    return;
  }

  //Viento
  float voltaje = analogRead(pin);
  float velocity = voltaje * 0.190;

  float punto_rocio = pow(humedad_relativa / 100, 0.125) * (112 + 0.9 * temperatura) + (0.1 * temperatura) - 112;
  float humedad_absoluta = (humedad_relativa/100) * 6.112 * exp((17.67 * temperatura)/(temperatura + 243.5)) * 2.1674 / (273.15 + temperatura);

  Serial.println("humedad,"+String(humedad_relativa)+","+String(punto_rocio)+","+String(humedad_absoluta));
  Serial.println("temperatura,"+String(temperatura));
  Serial.println("presion_barometrica,"+String(presion*0.75));

  //Viento
  Serial.println("viento,"+String(velocity)+","+String(grados));
  
  //delay(5000);

  int contador = 0;
  while(contador < 1000){
    if(digitalRead(pinN)==0) {
      grados = 0;
    } else if(digitalRead(pinE)==0) {
      grados = 90;
    } else if(digitalRead(pinS)==0) {
      grados = 180;
    } else if(digitalRead(pinO)==0) {
      grados = 270;
    }
    contador++;
    delay(5);
  }
 
}