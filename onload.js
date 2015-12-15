/**************************************************/

$(function() {
    $("#conf1v").focus();
});

/**************************************************/

$( "#field1" ).submit(function( event ) {
  chrome.tabs.create({
      url:localStorage['config1']+"/"+document.getElementById('conf1v').value
    }
  );
  event.preventDefault();
});
$( "#field2" ).submit(function( event ) {
  chrome.tabs.create({
      url:localStorage['config2']+"/"+document.getElementById('conf2v').value
    }
  );
  event.preventDefault();
});
$( "#field3" ).submit(function( event ) {
  chrome.tabs.create({
      url:localStorage['config3']+"/"+document.getElementById('conf3v').value
    }
  );
  event.preventDefault();
});

/**************************************************/

$( "#config1" ).submit(function( event ) {
  console.log(document.getElementById('conf1').value);
  localStorage['config1'] = document.getElementById('conf1').value;
  event.preventDefault();
});
$( "#config2" ).submit(function( event ) {
  console.log(document.getElementById('conf1').value);
  localStorage['config2'] = document.getElementById('conf2').value;
  event.preventDefault();
});
$( "#config3" ).submit(function( event ) {
  console.log(document.getElementById('conf1').value);
  localStorage['config3'] = document.getElementById('conf3').value;
  event.preventDefault();
});

/**************************************************/

if(localStorage['config1']){
  document.getElementById('conf1v').placeholder = localStorage['config1'];
  document.getElementById('conf1').value = localStorage['config1'];
}
if(localStorage['config2']){
  document.getElementById('conf2v').placeholder = localStorage['config2'];
  document.getElementById('conf2').value = localStorage['config2'];
}
if(localStorage['config3']){
  document.getElementById('conf3v').placeholder = localStorage['config3'];
  document.getElementById('conf3').value = localStorage['config3'];
}

/**************************************************/
