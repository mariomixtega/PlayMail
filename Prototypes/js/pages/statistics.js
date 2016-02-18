//JS para la vista parcial de statistics


var Options = {
		SelectoreMailChart:'',
		SelectoreTimeChart:'',
		SelectorData:'',
		ToggleGraph:''
	};

//Definicion de nueva chart con un titulo del lado derecho
Chart.types.Line.extend({
    name: "LineAlt",
    draw: function () {
        Chart.types.Line.prototype.draw.apply(this, arguments);

        var ctx = this.chart.ctx;
        ctx.save();
        // text alignment and color
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillStyle = this.options.scaleFontColor;
        // position
        var x = this.scale.xScalePaddingLeft * 0.4;
        var y = this.chart.height / 2;
        // change origin
        ctx.translate(x, y)
        // rotate text
        ctx.rotate(-90 * Math.PI / 180);
        ctx.fillText(this.options.yLabel, 0, 0);
        ctx.restore();
    }
});

//Definicion de los eventos de la pagina
var setEvents = function(){
	$(document).ready(function(){

		//Cambio de graficas
		$('li',Options.ToggleGraph).on('click',function(){
			$('li',Options.ToggleGraph).removeClass('active');
			$(this).addClass('active');

			var selected = $('li.active',Options.ToggleGraph).attr('data-id-graph');

			$('.chart-selected').fadeOut(300,function(){
				$('.chart-selected').removeClass('chart-selected');
				$('.chart-item:has("#'+selected+'")').fadeIn(300,function(){
					$('.chart-item:has("#'+selected+'")').addClass('chart-selected');
					if(typeof page != 'undefined'){
						page.UpdateAll();
					}
				});	
			});
			
		});



		//Cambio de campañas
		$('.camp-item').on('click',function(){
			var id = $(this).attr('data-id');

			if(typeof page != 'undefined'){
				page.GetCamp(id,function(camp){
					page.Camp = camp;
					page.UpdateAll();
				});
			}
		});

		//Togglea la segunda grafica
		$('li:last',Options.ToggleGraph).click();
	});
}


//Objeto de la pagina
var Statistics = function() {

	this.TimeChart = {};
	this.EmailChart = {};
	this.Camp = {};
	this.GeneralData = {};

	//Inicializador de la pagina
	this.Init = function(config){
		$.extend(Options, config);
	

		setEvents();

		var tthis = this;
		
		this.GetGeneral(function(generalData){
			tthis.GeneralData = generalData;

			var labels = [], dataSended = [], dataViewed = [];

			$.each(generalData.Campaigns, function(i,e){
				labels.push(e.Name);
				dataSended.push(e.Sended);
				dataViewed.push(e.Viewed);
			});

			var data = {
			    labels: labels,
			    datasets: [
			    {
			            label: "Enviados",
			            fillColor: "rgba(220,220,220,0.2)",
			            strokeColor: "rgba(4, 0, 0, 0.9)", 
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(30, 44, 245, 0.3)",
			            data: dataSended
			        },
			        {
			            label: "Leidos",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(4, 0, 0, 0.9)",
			            pointColor: "rgba(100,100,255,0.5)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: dataViewed
			        }
			        
			    ]
			};

			tthis.EmailChart = tthis.CreateChart("chart-emails",data);

			tthis.TimeChart = tthis.CreateTimeChart("chart-times",generalData.TimeData);
		});
	

		
	}


	this.CreateGeneralData = function(){
		if($.isEmptyObject(this.GeneralData))return;

		var generalData = this.GeneralData;

			var labels = [], dataSended = [], dataViewed = [];

			$.each(generalData.Campaigns, function(i,e){
				labels.push(e.Name);
				dataSended.push(e.Sended);
				dataViewed.push(e.Viewed);
			});

			var data = {
			    labels: labels,
			    datasets: [
			    {
			            label: "Enviados",
			            fillColor: "rgba(220,220,220,0.2)",
			            strokeColor: "rgba(4, 0, 0, 0.9)", 
			            pointColor: "rgba(151,187,205,1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(30, 44, 245, 0.3)",
			            data: dataSended
			        },
			        {
			            label: "Leidos",
			            fillColor: "rgba(151,187,205,0.2)",
			            strokeColor: "rgba(4, 0, 0, 0.9)",
			            pointColor: "rgba(100,100,255,0.5)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: "rgba(151,187,205,1)",
			            data: dataViewed
			        }
			        
			    ]
			};

			this.EmailChart = this.CreateChart("chart-emails",data);

			this.TimeChart = this.CreateTimeChart("chart-times",generalData.TimeData);

	}

	//Setea las graficas a este objeto
	this.SetChars = function(tchar, echar){
		this.TimeChart = tchar;
		this.EmailChart = echar;
	}

	//Funcion para crear graficas
	this.CreateChart = function(id,data){
		var ctxEmails = document.getElementById(id).getContext("2d");

		return new Chart(ctxEmails).LineAlt(data, {
		    bezierCurve: false,
		    scaleLabel: "          <%=value%>",
		    yLabel: "Numero de mails",
		    multiTooltipTemplate :"<%=datasetLabel%> : <%= value %> Emails"

		});
	}

	//Funcion que calcula concurrencias de tiempo
	/*
		dataPairs = {
			"vato@mail.com":"2016-02-01T22:06:17.115Z"
		}
	*/
	this.CalculateTime = function(_DataPairs){
		
	
		var orderedPairs = [];
		var labels = [];
		var dataForGraph = [];

		for(var i = 1; i <= 24; i++){
			if(i%5 == 0 || typeof _DataPairs[i.toString()] != 'undefined'){
				labels.push(Utils.convertToHour(i));
				dataForGraph.push(typeof _DataPairs[i.toString()] == 'undefined'? 0:_DataPairs[i.toString()]);
			}
		}

		var dataTimes = {
		    labels: labels,
		    datasets: [
		        {
		            label: "Mails leidos",
		            fillColor: "rgba(151,187,205,0.2)",
		            strokeColor: "rgba(4, 0, 0, 0.9)",
		            pointColor: "rgba(100,100,255,0.5)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(151,187,205,1)",
		            data: dataForGraph
		        }
		        
		    ]
		};

		return dataTimes;

	}

	
	//Limpia una grafia
	this.CleanChart = function(chartt){
		$.each(chartt.datasets, function(i,e){
			$.each(e.points,function(i,e){
				e.value = 0;
			});
		});

		chartt.update()
	}

	//Obtiene una campaña basada en su Id
	this.GetCamp = function(id,cb){
		/*
		var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": "http://localhost:8000/",
		  "method": "POST",
		  "headers": {
		    "content-type": "application/json",
		  }
		}

		$.ajax(settings).done(function (response) {
		  console.log(response);
		  cb(response);
		});
		*/	
		var dummy = [{
					  "CampName" : "Amor en febrero",
					  "EmailData":{
					    "Views":72,
					    "Sended":100
					  },
					  "TimeData":{
					      "1":3,
					      "14":20,
					      "20":10,
					      "21":23,
					      "22":16
					    },
					    "Details":{
					      "Sended":100,
					      "Viewed" : 72,
					      "Pending" :28 ,
					      "BestTimeds": ["9:00 PM"],
					      "Percent":72
					    }
					},
					{
					  "CampName" : "Enero de playas",
					  "EmailData":{
					    "Views":33,
					    "Sended":33
					  },
					  "TimeData":{
					      "3":3,
					      "10":10,
					      "24":3,
					      "15":10,
					      "11":10
					    },
					    "Details":{
					      "Sended":33,
					      "Viewed" : 33,
					      "Pending" :0 ,
					      "BestTimeds": ["10:00 AM","11:00 AM","3:00 PM"],
					      "Percent":100
					    }
					}];

		var id_entero = parseInt(id);
		cb(dummy[id_entero%2]);
	}

	//Obtiene estadisticas generales
	this.GetGeneral = function(cb){
		/*
		var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": "http://localhost:8000/",
		  "method": "POST",
		  "headers": {
		    "content-type": "application/json",
		  }
		}

		$.ajax(settings).done(function (response) {
		  console.log(response);
		  cb(response);
		});
		*/	

		cb({
			  "Campaigns":[
			      {
			        "Name":"Fin de año 2010",
			        "Sended":34,
			        "Viewed":20
			      },
			      {
			        "Name":"Lo dijeron los mayas",
			        "Sended":500,
			        "Viewed":230
			      },
			      {
			        "Name":"Amor en febrero",
			        "Sended":120,
			        "Viewed":118
			      },
			      {
			        "Name":"Drogas al 50%",
			        "Sended":1000,
			        "Viewed":670
			      }
			    ],
			    "TimeData":{
			      "3":155,
			      "10":344,
			      "24":981
			    }
			});
	}
	//Crea una grafica de tipo email
	this.CreateEmailChart = function(id,dataEmails,campName){
		var data = {
		    labels: [campName],
		    datasets: [
		        {
		            label: "Enviados",
		            fillColor: "rgba(220,220,220,0.5)",
		            strokeColor: "rgba(220,220,220,0.8)",
		            highlightFill: "rgba(220,220,220,0.75)",
		            highlightStroke: "rgba(220,220,220,1)",
		            data: [dataEmails.Sended]
		        },
		        {
		            label: "Leidos",
		            fillColor: "rgba(151,187,205,0.5)",
		            strokeColor: "rgba(151,187,205,0.8)",
		            highlightFill: "rgba(151,187,205,0.75)",
		            highlightStroke: "rgba(151,187,205,1)",
		            data: [dataEmails.Views]
		        }
		    ]
		};

		var canvas = document.getElementById(id);
		var ctxEmails = canvas.getContext("2d");

		return new Chart(ctxEmails).Bar(data, {
		    bezierCurve: false,
		    scaleLabel: "          <%=value%>",
		    yLabel: "Numero de mails",
		    multiTooltipTemplate :"<%=datasetLabel%> : <%= value %> Emails"

		});
	}

    //Crea una grafica de tipo tiempo
	this.CreateTimeChart = function(id,dataPairs,campName){
		var data = this.CalculateTime(dataPairs);

		return this.CreateChart(id,data);
	}

	//Reinicia el html de las graficas
	this.DeleteAllCharts =  function(){
		$('.chart-item').html('');

		var width = $('.graph-containers').width();
		var height = 400;

		$('.chart-item:first').html('<label for = "chart-emails">'
										+'<div class="title">Estadisticas generales</div><br />'
									    +'<canvas id="chart-emails" width="'+width+'" height="'+height+'" class="chart-back"></canvas>'
									+'</label>');

		$('.chart-item:last').html('<label for = "chart-times">'
										+'<div class="title">Estadisticas generales</div><br />'
									    +'<canvas id="chart-times" width="'+width+'" height="'+height+'" class="chart-back"></canvas>'
									+'</label>');

	}

	//Reinicia los htmls de todas las graficas
	this.UpdateAll = function(){
	
		 //return;

		this.DeleteAllCharts();

		if($.isEmptyObject(this.Camp)){
			this.CreateGeneralData();
			return;
		}

		this.TimeChart = this.CreateTimeChart(Options.SelectoreTimeChart.replace('.',''),this.Camp.TimeData,this.Camp.CampName);
		this.EmailChart = this.CreateEmailChart(Options.SelectoreMailChart.replace('.',''), this.Camp.EmailData,this.Camp.CampName);
		this.CalculateDetails(this.Camp.Details);

		$('.title').text(this.Camp.CampName);

	}

	//Calcula los detalles especificos de la campaña
	this.CalculateDetails = function(details){
		Utils.Render('.camp-details','#camp-detail-template',details);
	}

	//Renderiza una plantilla de handlebars
	this.Render = function(selector, templateId, context){
		var source   = $(templateId).html();
		var template = Handlebars.compile(source);
		var html    = template(context);
		$(selector).html(html);
	}
}


