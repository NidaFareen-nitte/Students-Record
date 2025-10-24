 //connecting html connect the javascript to read the data
const sform = document.getElementById('studentrecord');
const slist = document.getElementById('studentlist');
const ediv = document.getElementById('error');

//creating java script array to store student objects
const studentarray = [];

//creating submit: click event and lisner to start data reading
sform.addEventListener('submit' ,function(event){
    event.preventDefault(); //to avoid refresh and reload of form and initiate

    //read data from html form text field and store it in JS variable
    const sid = document.getElementById('stid').value;
    const sname = document.getElementById('stname').value;
    const sage = document.getElementById('stage').value;

    try{
        addStudent(sid,sname,sage); //function call to add student details
        displayStudent(); //function call to display student details
        ediv.textContent ='';
    }
    catch(error) {
        ediv.textContent=error.message;
    }

    sform.reset();//to reset the form to initiate state
});// end of the main function

//fun 1: to add student defination
function addStudent(sid,sname,sage){
    //to check all text fields are entered
    if(!sid || !sname || !sage){
        throw new Error("All fields are required");
    }
    //to check entered age is number and +ve number
    if(isNaN(sage)|| sage <= 0){
        throw new Error("Age must be positive number");
    }
    //to check duplicate ids and .some is used to check all the values in array that matches the given ids
    const studentexists = studentarray.some(studentobject => studentobject.sid===sid);
    if(studentexists){
        throw new Error("Student already exists");
    }
    const studentobject={sid, sname, sage:parseInt (sage,10)}
    studentarray.push(studentobject);//adds the new student objects(new value) to array
}//end of add student function

//function 2: display student details in list 
function displayStudent() {
    slist.innerHTML='';
    //each loop is used to iterate through all the values in the array
    studentarray.forEach(studentobject => {
        const li = document.createElement('li');
        li.textContent = `ID : ${studentobject.sid}, Name : ${studentobject.sname} , Age : ${studentobject.sage}`;
        slist.appendChild(li);//add new studend record to existing student record
        });
}
