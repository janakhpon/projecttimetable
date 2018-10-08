var express = require('express');
var app=express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Details = require('./models/details');
var router = express.Router();
var port = process.env.PORT || 3000




mongoose.connect('mongodb://haha:hahawtf1998@ds125693.mlab.com:25693/projecttimetable');
.then(() =>  console.log('connection to projecttimetable is succesful'))
.catch((err) => console.error(err));





app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());







app.get('/', (req,res)=>{
	Data.find({},(err,data)=>{
		if(err){
			console.log(err)
		}else{
			res.render('main',{data:data})
		}
	})
})


app.post('/post', (req,res)=>{

	if(!req.body){
		res.json({success : false})
	} else {

		var datas = new Data ({

			Name: req.body.Name,
			Role: req.body.Role,
			Done: req.body.Done,
			Arrival: req.body.Arrival,
			Leave: req.body.Leave,
			vDate : req.body.Date 

		})

		datas.save((err, neel)=>{
			if(err){
				console.log(err)
			}else{
				Data.find({},(err,data)=>{
					if(err){
						console.log(err)
					}else{
						res.render('main',{data:data})
					}
				})
			}
		})


	}
})




app.post('/delete',function(req,res){

	Data.findByIdAndRemove(req.body.prodId,function(err, data) {

		console.log(data);

	})
	res.redirect('/');
});



app.listen(port);
console.log(`server running on -> http://127.0.0.1:${port}`)






