require('dotenv').config()

const cors = require('cors')
const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')


const server = express()

const whitelist = [
	'localhost:3000',
	'localhost:8080',
	process.env.HEROKU_URL
]

const corsOptions = {
	origin: function (origin, callback) {
		console.log("** Origin of request " + origin.headers.host)
		if (whitelist.indexOf(origin.headers.host) !== -1 || !origin) {
			console.log("Origin acceptable")
			callback(null, true)
		} else {
			console.log("Origin rejected")
			callback(new Error('Not allowed by CORS - ' + origin.headers.host))
		}
	}
}

server.use(express.json())
server.use(cors(corsOptions.origin))
server.use(serveStatic(__dirname + '/client/build'))
server.use(morgan('dev'))

//mongoose.connect goes here
// mongoose.connect(
//   'mongodb://localhost:27017/rock-the-vote',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   },
//   () => console.log('Connected to the DB')
// )

mongoose.connect(process.env.MONGODB_URI, 
	{   useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false 
	}
)

server.get("/hello", (req, res) => {
	res.send({ message: "Hello World!" })
})

//server.use routes go here
server.use('/auth', require('./routes/authRouter.js'))
server.use('/api', expressJwt({secret: process.env.SECRET, algorithms: ['sha1', 'RS256', 'HS256']}))
server.use('/api/issue', require('./routes/issueRouter.js'))
server.use('/api/comment', require('./routes/commentRouter.js'))


server.use((err, req, res, next) => {
	if (err) {
		console.error(err)
		if (err.name === 'UnauthorizedError') {
			res.status(err.status)
		}
		return res.send({
			message: err.message
		})
	}
})

if (process.env.NODE_ENV === 'production') {
	server.use(express.static(path.join(__dirname, 'client/build')))
	server.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
	});
}

server.listen(
	process.env.PORT || 4000,
	() => console.log(`Server listening on port ${process.env.PORT || 4000}`)
)
