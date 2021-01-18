// const { try } = require("bluebird");

var counter=0;
async function mcqajax() {
    let userComment = document.querySelector("#question").value;
    let op1 = document.querySelector("#option1").value;
    let op2 = document.querySelector("#option2").value;
    let op3 = document.querySelector("#option3").value;
    let op4 = document.querySelector("#option4").value; // we are not using innerHTML wy bcz this is a form element
    
    document.querySelector("#numinc");
    counter=counter+1;
    console.log("inside mcqajax",counter);
    document.querySelector("#type").innerHTML = "(MCQ)";
    let res = await ajax(userComment,op1,op2,op3,op4,counter);
    if(res.status){
                //  we are not goint to use createElement
            const newElement = document
            .querySelector("#referenceCommentId")
            .cloneNode(true);

          newElement.removeAttribute("id"); //good practice to keep unique id.
          newElement.style.visibility = "visible";
          newElement.children[0].children[0].children[0].children[2].innerHTML = userComment;
       
          newElement.children[0].children[0].children[0].children[4].children[0].children[0].children[0].children[1].innerHTML = op1;
          newElement.children[0].children[0].children[0].children[4].children[0].children[1].children[0].children[1].innerHTML = op2;
          newElement.children[0].children[0].children[0].children[4].children[1].children[0].children[0].children[1].innerHTML = op3;
          newElement.children[0].children[0].children[0].children[4].children[1].children[1].children[0].children[1].innerHTML = op4;
          newElement.children[0].children[0].children[0].children[0].children[0].children[0].children[0].innerHTML = counter;
            let correct_serial = document.getElementById('correct_option').value  
            console.log(correct_serial);
          if(correct_serial=="1"){
            newElement.children[0].children[0].children[0].children[4].children[0].children[0].children[0].children[0].children[0].style.color="green";
            
          }
          else if(correct_serial=="2"){
            newElement.children[0].children[0].children[0].children[4].children[0].children[1].children[0].children[0].children[0].style.color="green";
          }
          else if(correct_serial=="3"){
            newElement.children[0].children[0].children[0].children[4].children[1].children[0].children[0].children[0].children[0].style.color ="green";
          }
          else{
            newElement.children[0].children[0].children[0].children[4].children[1].children[1].children[0].children[0].children[0].style.color="green";
          }
          // comment box elment
          const commentBox = document.querySelector("#commentBox");
          // now we want to add the element at the top.
          commentBox.appendChild(newElement);
          //commentBox.insertBefore(newElement, commentBox.firstChild);
          // clean the input box
          document.querySelector("#question").value = "";
          document.querySelector("#option1").value = "";
          document.querySelector("#option2").value = "";
          document.querySelector("#option3").value = "";
          document.querySelector("#option4").value = "";
          await unticker();
          alert("data inserted");
    }
    else{
        await unticker();
        alert("data not  inserted");
    }
}

async function pollajax() {
  let userComment = document.querySelector("#questionp").value;
  let op1 = document.querySelector("#option1p").value;
  let op2 = document.querySelector("#option2p").value;
  let op3 = document.querySelector("#option3p").value;
  let op4 = document.querySelector("#option4p").value; // we are not using innerHTML wy bcz this is a form element
  document.querySelector("#numinc");
  counter=counter+1;
  document.querySelector("#type").innerHTML = "(Poll)";
  let resp = await ajax_poll(userComment,op1,op2,op3,op4,counter);
  if(resp.status){
      //  we are not goint to use createElement
        const newElement = document
        .querySelector("#referenceCommentId")
        .cloneNode(true);

      newElement.removeAttribute("id"); //good practice to keep unique id.
      newElement.style.visibility = "visible";
      newElement.children[0].children[0].children[0].children[2].innerHTML = userComment;
      newElement.children[0].children[0].children[0].children[4].children[0].children[0].children[0].children[1].innerHTML = op1;
      newElement.children[0].children[0].children[0].children[4].children[0].children[1].children[0].children[1].innerHTML = op2;
      newElement.children[0].children[0].children[0].children[4].children[1].children[0].children[0].children[1].innerHTML = op3;
      newElement.children[0].children[0].children[0].children[4].children[1].children[1].children[0].children[1].innerHTML = op4;
      newElement.children[0].children[0].children[0].children[0].children[0].children[0].children[0].innerHTML = counter;
      // comment box elment
      const commentBox = document.querySelector("#commentBox");

      // now we want to add the element at the top.
      commentBox.appendChild(newElement);
      //commentBox.insertBefore(newElement, commentBox.firstChild);

      // clean the input box

      document.querySelector("#questionp").value = "";
      document.querySelector("#option1p").value = "";
      document.querySelector("#option2p").value = "";
      document.querySelector("#option3p").value = "";
      document.querySelector("#option4p").value = "";
      alert("data inserted"); 
      await unticker();      
  }
  else{
    await unticker();
      alert("data not inserted"); 
  }
}

async function fillajax() {
  let userComment = document.querySelector("#questionf").value;
  let op1 = document.querySelector("#option1f").value;
  let op2 = document.querySelector("#option2f").value;
  let op3 = document.querySelector("#option3f").value;
  let op4 = document.querySelector("#option4f").value; // we are not using innerHTML wy bcz this is a form element
  document.querySelector("#numinc");
  counter=counter+1;
  document.querySelector("#type").innerHTML = "(fill in blanks)";
  let resp = await ajax_fill(userComment,op1,op2,op3,op4,counter);
  if(res.status){
        //  we are not goint to use createElement
        const newElement = document
          .querySelector("#referenceCommentId")
          .cloneNode(true);
      newElement.removeAttribute("id"); //good practice to keep unique id.
      newElement.style.visibility = "visible";
      newElement.children[0].children[0].children[0].children[2].innerHTML = userComment;
      newElement.children[0].children[0].children[0].children[4].children[0].children[0].children[0].children[1].innerHTML = op1;
      newElement.children[0].children[0].children[0].children[4].children[0].children[1].children[0].children[1].innerHTML = op2;
      newElement.children[0].children[0].children[0].children[4].children[1].children[0].children[0].children[1].innerHTML = op3;
      newElement.children[0].children[0].children[0].children[4].children[1].children[1].children[0].children[1].innerHTML = op4;
      newElement.children[0].children[0].children[0].children[0].children[0].children[0].children[0].innerHTML = counter;
      //green all answers are correct
      newElement.children[0].children[0].children[0].children[4].children[0].children[0].children[0].children[0].children[0].style.color="green";
      newElement.children[0].children[0].children[0].children[4].children[0].children[1].children[0].children[0].children[0].style.color="green";
      newElement.children[0].children[0].children[0].children[4].children[1].children[0].children[0].children[0].children[0].style.color ="green";
      newElement.children[0].children[0].children[0].children[4].children[1].children[1].children[0].children[0].children[0].style.color="green";
      
      // comment box elment
        const commentBox = document.querySelector("#commentBox");
        // now we want to add the element at the top.
        commentBox.appendChild(newElement);
        //commentBox.insertBefore(newElement, commentBox.firstChild);
        // clean the input box
        document.querySelector("#questionf").value = "";
        document.querySelector("#option1f").value = "";
        document.querySelector("#option2f").value = "";
        document.querySelector("#option3f").value = "";
        document.querySelector("#option4f").value = "";
        alert("data insert");
        await unticker();
  }else{
    await unticker();
        alert("data not inserted");
  }
}
/* all ajax calls are here
1.ajax()=mcq
2.ajax_fill()=fill
3.ajax_poll()=poll
*/
async function  ajax (question,option1,option2,option3,option4,counter){
  console.log("inside ajax",counter);             
  let timer=document.getElementById('timer').value
  let max_points=document.getElementById('maxpoint').value
  let correct_serial = document.getElementById('correct_option').value
  let difficulty=document.getElementById('difficulty').value;
  let options=[
      {"statement":option1, "serial_no":1},
      {"statement":option2, "serial_no":2},
      {"statement":option3, "serial_no":3},
      {"statement":option4, "serial_no":4}
  ]
  
  let data={
      "question_statement":question,
      "question_type":"MCQ",
      "serial_no":counter,
      "difficulty":difficulty,
      "question_timer":timer,
      "max_points":max_points,
      "options":options,
      "correct_serial":correct_serial,

  }
  try{
    const resp = await fetch('/api/v1/addQuestion', {
      method : "POST" ,
              headers : {	   
                  "Content-Type": "Application/Json",
                  "Access-Control-Allow-Origin": "*",
              },
          body : JSON.stringify(data)     
          }); 
    return resp;    
  }catch(err){
    console.log(err);
  }
}

async function  ajax_fill (question,option1,option2,option3,option4,counter){
  let timer=document.getElementById('timer_fill').value
  let max_points=document.getElementById('maxpoint_fill').value
  let correct_serial = 0;
  let difficulty=document.getElementById('difficulty_fill').value;
  let options=[
      {"statement":option1, "serial_no":1},
      {"statement":option2, "serial_no":2},
      {"statement":option3, "serial_no":3},
      {"statement":option4, "serial_no":4}
  ]
  
  let data={
      "question_statement":question,
      "question_type":"Fillup",
      "serial_no":counter,
      "difficulty":difficulty,
      "question_timer":timer,
      "max_points":max_points,
      "options":options,
      "correct_serial":correct_serial,

  }
  try{
    const resp = await fetch('/api/v1/addQuestion', {
      method : "POST" ,
      headers : {	   
          "Content-Type": "Application/Json",
          "Access-Control-Allow-Origin": "*",
      },
      body : JSON.stringify(data)

     });
    return resp;
  }catch(err){
    console.log(err);
  }
      untick();
}

async function  ajax_poll (question,option1,option2,option3,option4,counter){
 
  let timer=document.getElementById('timer_poll').value
  let max_points=document.getElementById('maxpoint_poll').value
  let correct_serial = document.getElementById('correct_option_poll').value   
  let difficulty="Easy";
  let options=[
      {"statement":option1, "serial_no":1},
      {"statement":option2, "serial_no":2},
      {"statement":option3, "serial_no":3},
      {"statement":option4, "serial_no":4},
  ]
  
  let data={
      "question_statement":question,
      "question_type":"Polling",
      "serial_no":counter,
      "difficulty":difficulty,
      "question_timer":timer,
      "max_points":max_points,
      "options":options,
      "correct_serial":correct_serial,
  }
  try {
    const resp = await fetch('/api/v1/addQuestion', {
      method : "POST" ,
      headers : {	   
          "Content-Type": "Application/Json",
          "Access-Control-Allow-Origin": "*",
      },
      body : JSON.stringify(data)  
  }); 
  return resp
  } catch (error) {
    console.log(error);
  } 
}

async function untick(){                   
  var array = document.getElementById("clicking").querySelectorAll(".fas fa-check-circle") 
  for(let i = 0 ;i < array.length ;i++){
      array[i].style.backgroundColor ="gray";
      console.log(i);
  }
  document.getElementById("correct_option").setAttribute("value",0);
}
  


