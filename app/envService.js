(function () {
  'use strict';

  angular
      .module('recruitApp', ['environment'])
      .config(config);
      //config.$inject = ['environment'];
      
    function config(envServiceProvider){
        envServiceProvider.config({
            domains: {
                devlopment:['localhost:8000'],
                production:[''],
                test:['']
            },
            vars: {
                devlopment:{
                    domain: 'http://localhost:5000/',
                    loginApiUrl : 'http://localhost:5000/api/login',
                    userRegisterApiUrl : 'http://localhost:5000/api/register',
                    recruiterRegisterApiUrl : 'http://localhost:5000/api/register/recruiter',
                    userProfileApiUrl : 'http://localhost:5000/api/getUserDetails'
                },
                production:{
                    domain: 'http://recruit-apiservices.herokuapp.com',
                    loginApiUrl : 'http://recruit-apiservices.herokuapp.com/api/login',
                    userRegisterApiUrl : 'http://recruit-apiservices.herokuapp.com/api/register',
                    recruiterRegisterApiUrl : 'http://recruit-apiservices.herokuapp.com/api/register/recruiter',
                    userProfileApiUrl : 'http://recruit-apiservices.herokuapp.com/api/getUserDetails'
                }
            }
        });
        envServiceProvider.check();
    }

}) ();