var startPos ; 
var watchid ; 

//Start Tracking Position 
function startTracking()
{
  if(navigator.geolocation)
  {
            
        document.getElementById('startBtn').style.display = 'none' ; 
        document.getElementById('stopBtn').style.display = 'inline' ; 
       //Get position 
       
            
       
        watchId = navigator.geolocation.watchPosition(showPositionUpdate,showError);
      
       //Watch Position 
  //navigator.geolocation.getCurrentPosition(showPosition , showError);   
           

            }
    else 
    {
           alert("Geolocation is not supported in browser") ; 

    }

  



}

//show Position 
function showPosition(position)
{
  startPos = position ;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude ; 
    document.getElementById('startLon').innerHTML = startPos.coords.longitude ; 
    lat = startPos.coords.latitude ; 
   long= startPos.coords.longitude ; 
 $.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&sensor=true", function(address){

  $(".location").html("Your Location : "+address.results[0].formatted_address);

 /*var img = new Image();
            img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + long + "&zoom=16&size=600x300&markers=red|"+lat+","+long+"&sensor=false";
            
            $(".area").append(img);
*/
});

}


//Update Position 
function showPositionUpdate(position)
{
      
 
        console.log("amit");
       document.getElementById('currentLat').innerHTML = position.coords.latitude ; 
       document.getElementById('currentLon').innerHTML =  position.coords.longitude ; 
       document.getElementById('distance').innerHTML = 
       calculateDistance(startPos.coords.latitude,startPos.coords.longitude, 
      position.coords.latitude , position.coords.longitude ) ; 
 
       }
 

//Error Handler
 function showError(error) {
    switch(error)
    {
      case error.PERMISSION_DENIED : 
      alert('user denied the request for Geolocation ') ; 
        break ; 

        case error.POSITION_UNAVAILABLE :  
        
          alert('location not available ') ; 
            break ;     
   
        case error.TIMEOUT :  
        
          alert('The request Time out ') ; 
            break ; 
        
        case error.UNKNOWN_ERROR :  
        
          alert('location not available ') ; 
            break ; 

    }
    }

//Calculate Distance 


function calculateDistance(lat1 , lon1 , lat2 , lon2 ) 
{
  var R = 6371; // metres
 var dLat = (lat2-lat1).toRad();
var dLon = (lon2-lon1).toRad();

var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

var d = R * c;
return d ; 

}

Number.prototype.toRad = function()
{
  return this*Math.PI / 180 ; 
}

//Stop Tracking 

function stopTracking()
{
  navigator.geolocation.clearWatch(watchId) ; 
  alert('Tracking Has Stopping ') ; 
   document.getElementById('stopBtn').style.display = 'none' ; 
    document.getElementById('startBtn').style.display = 'inline' ; 
       
}