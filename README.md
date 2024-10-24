Apis 

Register

POST  http://localhost:3000/api/auth/register 

{
    "name": "Bharath",
    "email": "bharath636214@gmail.com",
    "password": "Bharath@123"
}



Vefiry OTP 

POST http://localhost:3000/api/auth/verify-otp

{
    "email": "bharath636214@gmail.com",
    "otp": "491458" 
}




Login

POST http://localhost:3000/api/auth/login

{
    "email": "bharath636214@gmail.com",
    "password": "Bharath@123"
}






Contact Crud apis by id

POST http://localhost:3000/api/contacts/create

{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, Springfield, USA",
    "timezone": "UTC"
}



GET http://localhost:3000/api/contacts/contact-crud-by-id?id=1

PUT http://localhost:3000/api/contacts/contact-crud-by-id?id=1

{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, Springfield, USA",
    "timezone": "UTC"
}



DELETE http://localhost:3000/api/contacts/contact-crud-by-id?id=1



Upload 

POST  http://localhost:3000/api/upload

excel data format

name	     email	            phone	        address	        timezone

John Doe	john@example.com	123-456-7890	123 Main St	    UTC-5
Jane Smith	jane@example.com	987-654-3210	456 Park Ave	UTC-5


to start the server -- run below commands

npm install 
npm run dev