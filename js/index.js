$(document).ready(function() {
	"use strict";
	
	$("#submit").click(function() {
		$.post("http://localhost:3000/links", {"title": $("#title").val(), "link": $("#link").val()}, function(data) {
			$("#title").val("");
			$("#link").val("");
		});		
	});

	$("#getLinks").click(function() {
		$.get("http://localhost:3000/links", function(data) {
			$("#allLinks").empty();
			for(var i = 0; i < data.length; i++){
				var text = '<li>Title: '+data[i].title;
				text +=' <a href="http://localhost:3000/click/'+data[i].title+'">'+data[i].link+'</a> Count: '+data[i].clicks;
				$("#allLinks").append(text);
			}
		});
	});
});