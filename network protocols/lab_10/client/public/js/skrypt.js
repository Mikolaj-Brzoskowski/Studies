window.addEventListener("load", function (event) { 
 const es = new EventSource("http://localhost:7000/events/datetime");
 
 es.addEventListener("message", function(event) {
  const newElement = document.createElement("p");
  const eventList = document.getElementById("ad");

  newElement.innerHTML = event.data;
  eventList.replaceChild(newElement, eventList.childNodes[0]);
 });
 
});
