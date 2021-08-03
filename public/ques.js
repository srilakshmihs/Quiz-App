var qNo = 0
var q1;
var q2;
function setInput() {
  var displayName = document.getElementById('nameDisplay')
  var q1PlaceText = document.getElementById('q1placetext');
  var q1PlaceOption = document.getElementById('q1placeoption');
  var q2PlaceText = document.getElementById('q2placetext');
  var q2PlaceOption = document.getElementById('q2placeoption');
  fetch("/getName", {
    method: "GET"
  })
  .then((response) => {
      return response.json();
  })
  .then((data) => {
      console.log(data.name);
      displayName.innerHTML = "Login  : "+data.name
  });
  fetch("/getQues", {
    method: "GET"
  })
  .then((response) => {
      return response.json();
  })
  .then((data) => {
      console.log(data);
      q1 = data.One
      q2 = data.Two
      console.log(">>>>>");
      console.log(q1);
      console.log(">>>>>");
      console.log(q2);
      q1PlaceText.innerHTML = q1.qText;
      if (q1.qType === 'MCQ4'){
        q1PlaceOption.innerHTML =`
          <input type="radio">${q1.qA}<br>
          <input type="radio">${q1.qB}<br>
          <input type="radio">${q1.qC}<br>
          <input type="radio">${q1.qD}<br>
        `
        
      }
      else if (q1.qType === 'MCQ2'){
        q1PlaceOption.innerHTML =`
                    <input type="radio">${q1.qA}<br>
                    <input type="radio">${q1.qB}<br>
                  `
      }
      else if (q1.qType === 'MCQ3'){
        q1PlaceOption.innerHTML =`
                    <input type="radio">${q1.qA}<br>
                    <input type="radio">${q1.qB}<br>
                    <input type="radio">${q1.qC}<br>
                  `
      }
      else{
        q1PlaceOption.innerHTML = `<form><input type = "text"><form>`
      }

      q2PlaceText.innerHTML = q2.qText;
      if (q2.qType === 'MCQ4'){
        q1PlaceOption.innerHTML =`
          <input type="radio">${q2.qA}<br>
          <input type="radio">${q2.qB}<br>
          <input type="radio">${q2.qC}<br>
          <input type="radio">${q2.qD}<br>
        `
        
      }
      else if (q2.qType === 'MCQ2'){
        q1PlaceOption.innerHTML =`
                    <input type="radio">${q2.qA}<br>
                    <input type="radio">${q2.qB}<br>
                  `
      }
      else if (q2.qType === 'MCQ3'){
        q1PlaceOption.innerHTML =`
                    <input type="radio">${q2.qA}<br>
                    <input type="radio">${q2.qB}<br>
                    <input type="radio">${q2.qC}<br>
                  `
      }
      else{
        q2PlaceOption.innerHTML = `<form><input type = "text"><form>`
      }
      
  });

  // console.log(">>>>>");
  // console.log(q1);
  // console.log(">>>>>");
  // console.log(q2);
}
  