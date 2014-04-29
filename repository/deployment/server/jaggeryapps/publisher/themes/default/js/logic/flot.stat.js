$(function() {
	var url = window.location.pathname;

	var comps = url.split('/');
	var type = comps[comps.length - 2];
	var operation = comps[comps.length - 3];

	var dateRange = $('#date-range-field span').text();
	var from = dateRange.split('to')[0];
	var to = dateRange.split('to')[1];

	$.ajax({
		url : '/publisher/api/assets/' + operation + '/' + type + '/',
		type : 'POST',
		data : {
			'startDate' : from,
			'endDate' : to // <-- the $ sign in the parameter name seems unusual, I would avoid it
		},
		success : function(response) {

			var parsedResponse = JSON.parse(response);

			/* Bookmark stats graph */
			var data = [{
				data : parsedResponse.bookmarkStats,
				color : '#409628',
				label : 'Assets',
				clickable: true,
				lines : {
					show : true
				},
				points : {
					show : true
				}
			}];

			var options = {
				yaxis : {
					show : true,
					axisLabel: 'Downloads',
				    axisLabelUseCanvas: true,
				    axisLabelFontSizePixels: 12,
				    axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
				    axisLabelPadding: 5,
					tickDecimals : 0

				},
				xaxis : {
					//labelAngle : 45,
					axisLabel: 'Asset Name With Version',
        			axisLabelUseCanvas: true,
        			axisLabelFontSizePixels: 12,
        			axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
        			axisLabelPadding: 5,
					ticks : parsedResponse.bookmarkTicks
				},

				grid: {
                hoverable: true,
                borderWidth: 2,
                backgroundColor: { colors: ["#ffffff", "#EDF5FF"] }
            	}


			};


			$.plot($("#placeholder1"), data, options);
			var previousPoint = null, previousLabel = null;


            $("#placeholder1").bind("plothover", function (event, pos, item) {
                if (item) {

                    if ((previousLabel != item.series.label) || (previousPoint != item.dataIndex)) {

                        previousPoint = item.dataIndex;
                        previousLabel = item.series.label;
                        $("#tooltip").remove();
 
                        var x = item.datapoint[0];
                        var y = item.datapoint[1];
 
                        var color = item.series.color;
 
                        //console.log(item.series.xaxis.ticks[x].label);            
 						
                        showTooltip(item.pageX,item.pageY,color, item.series.xaxis.ticks[x].label + " : <strong>" + y + "</strong> Downloads");

                    }
                    
                } else {
                    $("#tooltip").remove();
                    previousPoint = null;
                }
            });

            

			

			
			/* Hot assets stats graph */
			var data2 = [{
				data : parsedResponse.hotAssetStats,
				color : '#FFC826',
				label : 'Assets',
				bars : {
						show : true,
						barWidth : 0.6,
						align : "center"
					}
			}];

			var options2 = {
				yaxis : {
					show : true,
					axisLabel: 'Downloads',
				    axisLabelUseCanvas: true,
				    axisLabelFontSizePixels: 12,
				    axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
				    axisLabelPadding: 5,
					tickDecimals : 0

				},
				xaxis : {
					//labelAngle : 45,
					axisLabel: 'Asset Name With Version',
        			axisLabelUseCanvas: true,
        			axisLabelFontSizePixels: 12,
        			axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
        			axisLabelPadding: 5,
					ticks : parsedResponse.hotAssetTicks
				},

				grid: {
                hoverable: true,
                borderWidth: 2,
                backgroundColor: { colors: ["#ffffff", "#EDF5FF"] }
            	}
				
			};

			$.plot($("#placeholder2"), data2, options2);
			var previousPoint = null, previousLabel = null;


            $("#placeholder2").bind("plothover", function (event, pos, item) {
                if (item) {

                    if ((previousLabel != item.series.label) || (previousPoint != item.dataIndex)) {

                        previousPoint = item.dataIndex;
                        previousLabel = item.series.label;
                        $("#tooltip").remove();
 
                        var x = item.datapoint[0];
                        var y = item.datapoint[1];
 
                        var color = item.series.color;
 
                        //console.log(item.series.xaxis.ticks[x].label);            
 						
                        showTooltip(item.pageX,item.pageY,color, item.series.xaxis.ticks[x].label + " : <strong>" + y + "</strong> Downloads");

                    }
                    
                } else {
                    $("#tooltip").remove();
                    previousPoint = null;
                }
            });

        function showTooltip(x, y, color, contents) {

            $("<div id=\"tooltip\">" + contents + "</div>").css({
                position: 'absolute',
                display: 'none',
                top: y - 40,
                left: x - 120,
                border: '2px solid ' + color,
                padding: '3px',
                'font-size': '9px',
                'border-radius': '5px',
                'background-color': '#fff',
                'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                opacity: 0.9
            }).appendTo("body").fadeIn(200);
        }
			
		},
		error : function(response) {
			alert('Error occured at statistics graph rendering');
		}
	});
});

var convertDate = function(date) {
	var month = date.getMonth() + 1;
	var day = date.getDate();
	return date.getFullYear() + '-' + (('' + month).length < 2 ? '0' : '') + month + '-' + (('' + day).length < 2 ? '0' : '') + day;
}
var onDateSelected = function(from, to) {
	var url = window.location.pathname;
	var comps = url.split('/');

	var type = comps[comps.length - 2];
	var operation = comps[comps.length - 3];
	$.ajax({
		url : '/publisher/api/assets/' + operation + '/' + type + '/',
		type : 'POST',
		data : {
			'startDate' : from,
			'endDate' : to,
			'isOnChoice' : true
		},
		success : function(response) {
			var parsedResponse = JSON.parse(response);
			
			
			/* Hot assets stats graph */
			var data2 = [{
				data : parsedResponse.hotAssetStats,
				color : '#FFC826',
				label : 'Assets',
				bars : {
						show : true,
						barWidth : 0.6,
						align : "center"
					}
			}];

			var options2 = {
				yaxis : {
					show : true,
					axisLabel: 'Downloads',
				    axisLabelUseCanvas: true,
				    axisLabelFontSizePixels: 12,
				    axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
				    axisLabelPadding: 5,
					tickDecimals : 0

				},
				xaxis : {
					//labelAngle : 45,
					axisLabel: 'Asset Name With Version',
        			axisLabelUseCanvas: true,
        			axisLabelFontSizePixels: 12,
        			axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
        			axisLabelPadding: 5,
					ticks : parsedResponse.hotAssetTicks
				},
				grid: {
                hoverable: true,
                borderWidth: 2,
                backgroundColor: { colors: ["#ffffff", "#EDF5FF"] }
            	}
				
			};

			$.plot($("#placeholder2"), data2, options2);

		},
		error : function(response) {
			alert('Error occured at statistics graph rendering');
		}
	});
}

