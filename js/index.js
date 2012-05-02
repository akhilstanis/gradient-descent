$(function () {
  var chart;
  $(document).ready(function() {
    chart = new Highcharts.Chart({
      chart: {
        renderTo: 'container',
        type: 'scatter',
        zoomType: 'xy'
      },
      title: {
        text: 'Price of house v/s Size'
      },
      subtitle: {
        text: 'ml-class.org'
      },
      xAxis: {
        title: {
            enabled: true,
            text: 'Size of house (square feet)'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
      },
      yAxis: {
        title: {
            text: 'Price ($k)'
        }
      },
      tooltip: {
        formatter: function() {
                return ''+
                this.x +' square feet, $ '+ this.y +'k';
        }
      },
      plotOptions: {
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            }
        }
      },
      series: [{
        name: 'House Price',
        color: 'rgba(223, 83, 83, .5)',
        data: [[2104,460], [1416,232], [1534,315], [852,178]]
      }]
    });


   line = {
      type: 'line',
      name: 'Regression Line',
      data: [[0, (7.175+1.155*0)], [2000, (7.175+1.155*2000)]],
      marker: {
        enabled: false
      },
      states: {
        hover: {
          lineWidth: 0
        }
      },
      enableMouseTracking: false
    }

  var gradientDescedent = {

    input: [[2104,460], [1416,232], [1534,315], [852,178]],

    featureScaledInputs: function() {
      mean = (2104 + 1416 + 1534 + 852)/4;
      range = 2104 - 852;
      tempInput = []
      for(i=0;i<this.m();i++) {
        tempInput.push([(this.input[i][0]-mean)/range, this.input[i][1]]);
      }
      this.input = tempInput;
    },

    m: function() { return this.input.length; },

    hypothesis: function(theta0, theta1, x) {
      return theta0 + theta1*x;
    },

    costFunction: function(theta0, theta1) {
      var sumation = 0;
      for(i=0;i<this.m();i++) {
        sumation += Math.pow(this.hypothesis(theta0, theta1, this.input[i][0]),2)
      }
      return sumation/(2*this.m());
    },

    dTheta0CostFunction: function(theta0, theta1) {
      var sumation = 0;
      for(i=0;i<this.m();i++) {
        sumation += this.hypothesis(theta0, theta1, this.input[i][0]);
      }
      return sumation/this.m();
    },

    dTheta1CostFunction: function(theta0, theta1) {
      var sumation = 0;
      for(i=0;i<this.m();i++) {
        sumation += this.hypothesis(theta0, theta1, this.input[i][0]) * this.input[i][0];
      }
      return sumation/this.m();
    },

    gd: function(alpha) {
      this.featureScaledInputs();
      theta0=0.5;
      theta1=.25;
      for(var i=0;i<20;i++) {
        tempTheta0 = theta0 - alpha*this.dTheta0CostFunction(theta0, theta1);
        tempTheta1 = theta1 - alpha*this.dTheta1CostFunction(theta0, theta1);
        theta0 = tempTheta0;
        theta1 = tempTheta1;
        this.draw(theta0, theta1);
      }
    },

    draw: function(theta0, theta1) {
      line.data = [[852, (theta0 + theta1*852)], [2104, (theta0 + theta1*2104)]];
      chart.addSeries(line);
    }

  };

 gradientDescedent.gd(0.2);


      // legend: {
      //   layout: 'vertical',
      //   align: 'left',
      //   verticalAlign: 'top',
      //   x: 100,
      //   y: 70,
      //   floating: true,
      //   backgroundColor: '#FFFFFF',
      //   borderWidth: 1
      // },
//DOM ready
  });
});


