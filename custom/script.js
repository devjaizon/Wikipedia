$(document).ready(function($) {
	$("body").keypress( function(e){
    	if(e.keyCode===13){
    		trigger();
    	}
    });
	$('#submit').on('click', function() {
		trigger();
	});
	function trigger() {
		$('#container').html('');
		if(!$('#search').val() == "") {
			var srch = $('#search').val();
			$.ajax({
				url: "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ srch +"&format=json&callback=?",
				type: 'GET',
				contentType: "application/json; charset=utf-8",
		        async: false,
		        dataType: "json",
		        success: function (data, textStatus, jqXHR) {
		        	var term = data[1];
		        	var text = data[2];
		        	var link = data[3];
		        	for(var i = term.length - 1; i >= 0; i--){
		        		$('#container').prepend('<div class="output"><a href="' + link[i] + '" target="_blank"><h3>' + term[i] + '</h3></a><br><p class="info">' + text[i] + '...</p></div>');
		        		$('#search').val("");
		        	}

		        },
		        error: function (errorMessage) {
		        }
			})
		} else {
			alert("Please check your entry, it was not accepted!");
		}
	}
});