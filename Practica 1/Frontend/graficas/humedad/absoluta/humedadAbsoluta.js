function setup() {
    createCanvas(1000, 400);
            // Create a new plot and set its position on the screen
        points = [];

        axios.get('http://localhost:4010/api/humedad', {responseType: 'json'}).then(function(res) {

            if(res.status==200) {

                console.log(res.data);
                let d;
                let readableDateTime ;
                
                for (i = 0; i < res.data.length; i++) {
                    d = new Date(res.data[i].fecha_creacion);
                    readableDateTime = 10000000000*d.getFullYear() + 100000000*(d.getMonth()+1)+ 1000000*d.getDate()+ 10000*d.getHours()+ 100*d.getMinutes()+ d.getSeconds();
                    points[i] = new GPoint(readableDateTime, res.data[i].humedad_absoluta);

                }
                plot = new GPlot(this);
                plot.setPos(0, 0);
                plot.setOuterDim(width, height);
            
                // Add the points
                plot.setPoints(points);
            
                // Set the plot title and the axis labels
                plot.setTitleText("Grafica de Humedad Absoluta en g/m^3");
                plot.getXAxis().setAxisLabelText("Fecha y hora");
                plot.getYAxis().setAxisLabelText("Humedad Absoluta (g/m^3)");
            
                // Draw it!
                plot.defaultDraw();
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
  //  background(220);
  }
