const express= require('express')
const bodyParser = require('body-parser')
const app = express()
const https =require('https')
const { response } = require('express')
app.use(express.static('public'))//here it is used for all the static files in the project.(images,css files)
app.use(bodyParser.urlencoded({extended:true}))



app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/signup.html")
})

app.post('/',(req,res)=>{

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email= req.body.email;

    // console.log(firstName ,lastName ,email);
    const data ={
         members:[
            {
                email_address:email,
                status: 'subscribed',
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
         ]
    }
    const jsonData = JSON.stringify(data)

    const url = 'https://us17.api.mailchimp.com/3.0/lists/7fb4dd04f9'
    
    const options ={
        method :"POST",
        auth:"vikram:d001c67986f6f6b7cf761ae42c57c6f6-us17"
    }
   const request= https.request(url,options,(response)=>{

if(response.statusCode===200){
    res.sendFile(__dirname + "/success.html");
}  
else{
    res.sendFile(__dirname + "/failure.html");
}
    response.on('data',(data)=>{
    console.log(JSON.parse(data));
})
    })

    // request.write(jsonData)
    request.end()

})

app.post('/failure',(req,res)=>{
    res.redirect('/')
})
app.listen(process.env.PORT || 3000,(req,res)=>{
    console.log('Server Running in Port 3000');
})
//API KEY
//d001c67986f6f6b7cf761ae42c57c6f6-us17

//List ID
//7fb4dd04f9