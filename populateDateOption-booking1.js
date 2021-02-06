
let select = document.getElementById('selectyear');

  yearArr = ['2021', '2022', '2023'];
             
for (let i = 0; i < yearArr.length; i++) {
  let option = document.createElement('option');
  txt = document.createTextNode(yearArr[i]);
  option.appendChild(txt);
  option.setAttribute('value', yearArr[i]);
  select.insertBefore(option,select.lastChild);
}


let month = document.getElementById('selectmonth');

monthArr = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];

for (let i = 0; i < monthArr.length; i++) {
  let option = document.createElement('option');
  txt = document.createTextNode(monthArr[i]);
  option.appendChild(txt);
  option.setAttribute('value', monthArr[i]);
  month.insertBefore(option,month.lastChild);
}


let day = document.getElementById('selectday');

dayArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
  '25', '26', '27', '28', '29', '30', '31'];
         
  for (let i = 0; i < dayArr.length; i++) {
  let option = document.createElement('option');
  txt = document.createTextNode(dayArr[i]);
  option.appendChild(txt);
  option.setAttribute('value', dayArr[i]);
  day.insertBefore(option,day.lastChild);
}

    document.querySelector("#selectyear") 
		.addEventListener("change", function(evt){ 
      let choiceYear = evt.target.value;
       
    }) 
    
    document.querySelector("#selectmonth") 
		.addEventListener("change", function(evt){ 
      let choiceMonth = evt.target.value;
       
    }) 
    
    document.querySelector("#selectday") 
		.addEventListener("change", function(evt){ 
      let choiceDay = evt.target.value;  
		}) 