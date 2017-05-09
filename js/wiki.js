'use strict';

var random = document.getElementById("randomBtn");
var search = document.getElementById("searchBtn");

//autocomplete the searchbox feature
//http://w3lessons.info/2015/03/01/autocomplete-search-using-wikipedia-api-and-jquery-ui/
$("#searchContent").autocomplete({
   
    source: function(request, response) {
        
        $.ajax({
            
            url: "https://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                
                "action" : "opensearch",
                "format" : "json",
                "search" : request.term
            },
            success: function(data) {
                
                response(data[1]);
                
            },
            
            
        });
    }
    
});

$("#searchContent").on("autocompleteselect", function(event, ui){
   
    searchWiki(); 
    
});

//Generate a random Wiki page
random.onclick = function(){
    
    window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank"); 
    
}; 

//Generate wikipedia list on click of the search button
search.onclick = function(){searchWiki()};
    
//perform the earch when pressing the enter key
document.getElementById("searchContent").addEventListener("keypress", function(evt){
    
    if (evt.keyCode == 13) {
        
        //since this is an input box, form automatically tries to submit when pressing "enter"
        evt.preventDefault(); //prevents the from from submitting so it will run the searchWiki function
        searchWiki();
    }    
}); 

//function to search and display the wiki results using vanilla js
function searchWiki(){
    
    var searchContent = document.getElementById("searchContent").value;    
    
    //log the input value to double check code works
    //console.log(searchContent);
    
    var xhttp= new XMLHttpRequest();
   
    var limit = 8; 
        
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchContent + "&limit=" + limit + "&format=json&origin=*"; //add origin=* to remove header origin error
    
    //console.log(url);
    
    xhttp.open("GET", url, true); 
    
    xhttp.send(); 
    
    xhttp.addEventListener("load", transferComplete); 
    
    function transferComplete(evt) {
        
        var results = JSON.parse(xhttp.responseText);
        var resultsHTML = "";
        
        //logging the results to look at the object easier
        //console.log(JSON.parse(xhttp.responseText)); 
        
        //if the results object returns 0 items, then there're no matches. therefore show an error message.         
        if (results[1].length == 0) {
            
            resultsHTML += "<div class='result-item'><p>Sorry. No item found. Please enter another search.</p></div>";
            document.getElementsByClassName("results-container")[0].innerHTML = resultsHTML;
        }
        
        for (var i = 0; i < results[1].length; i++) {
            
                //added transition using Animate.css for results to fade up
                resultsHTML += "<div class='result-item animated fadeInUp'><a href='" + results[3][i] + "' target='_blank'><h3>" + results[1][i] + "</h3><p>" + results[2][i] + "</p></a></div>";  
            
                document.getElementsByClassName("results-container")[0].innerHTML = resultsHTML;
                                                
             
        }
        
        
    }   
    
}; 


