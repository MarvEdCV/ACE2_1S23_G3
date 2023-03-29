var data, useData = []
function easeOutQuart(x){
return 1 - pow(1 - x, 4);
}
budgetValues = [];
function preload() {
	
}

var max;
function setup() {
  axios.get('http://localhost:4010/api/viento', {responseType: 'json'}).then(function(res) {
    
    if(res.status==200) {
      data = res.data;
      createCanvas(1500, 400);
      numberOfRows = data.length;
      numberOfColumns = data.length;
      var arr = [];
      for (var i = 0; i < numberOfRows; i++) {
          arr.push(data[i].velocidad);
      }
      max = Math.max(...arr);
  }
  //console.log(res);
}).catch(function(err) {
  console.log(err);
})
    button = createButton('Regresar');
    button.position(10, 5);
    button.mousePressed( ()=>{window.location = "http://localhost:8080"}); 
   
  }
  
  function draw() {
    
    var responsiveX = (width-40)/data.length;
    var responsiveY = (height-30)/max;
    background(220);
    fill(0);
  
    for (var i = 0; i < numberOfRows; i++) {

      //pull numbers
      budgetValues[i] = data[i].velocidad;
      //draw graph
      rect(i*responsiveX+40, height, 0.5, -budgetValues[i]*responsiveY)
    }
     //determine highest value
    maxValue=max;
    for (var k=0;k<10;k++){
      text(Math.round(-max/10*(k-10)),10,height/10*k);
    }
   
  }
