(function () {
    'use strict';
    angular
        .module('recruitApp')
        .controller('useFormController', useFormController);
        useFormController.$inject = ['$location', 'AuthenticationService', '$scope', '$state'];
    function useFormController($location, AuthenticationService, $scope, $state) 
    {
        $scope.data_={};
        $scope.model;
        $scope.myvar1 = "label";
        $scope.myvar2 = "voiceInput";
        $scope.showform=false;
        $scope.getForm = getFormUser;
        $scope.myspeech = myspeech;
        var element=0;
        function getFormUser() 
        {
            $scope.showform=true;
            AuthenticationService.RetreiveData($scope.fillUrl, function (response) {
                if (response.success){
                    $scope.responseData = response.data.message;
                    alert(JSON.stringify($scope.responseData));
                    $scope.data_ = $scope.responseData;
                    if($scope.responseData != undefined)
                    {
                        console.log($scope.responseData)
                        for(var i=0;i<$scope.data_.length;i++)
                    {
                        if($scope.data_[i].type == "select")
                        {
                            $scope.data_[i].option = $scope.data_[i].option.split(',');
                        }
                    }
                   // eventCreation();
                    console.log("finle");
                    console.log($scope.data_);
                    }
                } else {
                    $scope.errorMsg = response.data.message;
                    alert($scope.errorMsg);
                }
            });
        };

        // function eventCreation(){
        //     var form = document.querySelector('#userform');
        //     var elements = (form.childElementCount-1);
        //     for(var i=0;i<elements;i++)
        //     {
        //         var dummy='#voiceInput'+i;
        //         $(dummy).onclick(function(){
        //             myspeech(i)
        //         })
                
        //     }
        //    }

        function myspeech(indexed_element)
        {
            var voiceSelect = document.querySelector('select');
            var message = document.querySelector('#message');
            var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
            var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
            var grammar = "#JSGF V1.0;";
            var recognition = new SpeechRecognition();
            var speechRecognitionGrammarList = new SpeechGrammarList();
            var synthesis = window.speechSynthesis;
            var synth = window.speechSynthesis;
            var voices = [];
            var mic_access = false;
            var form = document.querySelector('#userform');
            var label;
            var input;
            speechRecognitionGrammarList.addFromString(grammar, 1);
            recognition.grammars = speechRecognitionGrammarList;
            recognition.lang = 'en-us';
            recognition.interimResults = false;
            // navigator.mediaDevices.getUserMedia({ audio: true })
            // .then(function(stream) {
            //     mic_access = true;
            //     console.log('You let me use your mic!')
            // })
            // .catch(function(err) {
            //     console.log('No mic for you!')
            // });
            recognition.onspeechend = function(){
                recognition.stop();
            }

            recognition.onerror = function(event){
                message.textContent = 'Error occurred in recognition: ' + event.error;
            }

            recognition.onresult = function(event){
                if(event.results==undefined){
                    console.log("Error getting the speech");
                }
                else{
                    console.log(event.results);
                    var last = event.results.length - 1;
                    var command = event.results[last][0].transcript;
                    if(command!=undefined && input!=undefined){
                        input.placeholder = command;
                        // label.hide();
                        // var id = $scope.myvar2+element;
                        // document.getElementById(id).value = command;
                        // input.value(command);
                        // var modeldata = "model"+element;
                        // $scope.modeldata = command;

                    }
                    console.log('Voice Input: ' + command + '.');
                    recognition.stop();
                }
            }
            // document.querySelector('#btnCommand').addEventListener('click', function(){
            //         //populateVoiceList();
            //         // if (speechSynthesis.onvoiceschanged !== undefined) {
            //         //     speechSynthesis.onvoiceschanged = populateVoiceList;
            //         // }
            //         //event.preventDefault();
                    StartAssistant(indexed_element);         
            // });
           



            function StartAssistant(indexed_element){
                voices = synthesis.getVoices();
                   var elements = (form.childElementCount-1);
                    // for(var element=0;element<elements;element++){
                        $scope.index=0;
                        label = document.querySelector('#'+$scope.myvar1+indexed_element);
                        input = document.querySelector('#'+$scope.myvar2+indexed_element);         
                        var utterThis = new SpeechSynthesisUtterance(label.innerHTML);
                        var selectedOption = voices[2].name;
                        for(var i = 0; i < voices.length ; i++) {
                            if(voices[i].name === selectedOption) {
                            utterThis.voice = voices[i];
                            }
                        }
                        utterThis.pitch = 1;
                        utterThis.rate = 1;
                        utterThis.volume =1;
                        synth.speak(utterThis);
                        // setTimeout(function(){
                            //do what you need here\
                            recognition.start();
                        // }, 2000);
                        utterThis.onpause = function(event) {
                        var char = event.utterance.text.charAt(event.charIndex);
                        console.log('Speech paused at character ' + event.charIndex + ' of "' +
                        event.utterance.text + '", which is "' + char + '".');
                        }
                    // }   
            }

            function populateVoiceList(){
                voices = synthesis.getVoices();
                for(var i = 0; i < voices.length ; i++) {
                    var option = document.createElement('option');
                    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
                    
                    if(voices[i].default) {
                    option.textContent += ' -- DEFAULT';
                    }

                    option.setAttribute('data-lang', voices[i].lang);
                    option.setAttribute('data-name', voices[i].name);
                    voiceSelect.appendChild(option);
                }
            }
        }
        // $scope.data_ = $scope.responseData;
        // if($scope.responseData != undefined)
        // {
        //     console.log($scope.responseData)
        //     for(var i=0;i<$scope.data_.message.length;i++)
        // {
        //     if($scope.data_.message[i].type == "select")
        //     {
        //         $scope.data_.message[i].option = $scope.data_.message[i].option.split(',');
        //     }
        // }
        // console.log("finle");
        // console.log($scope.data_);
        // }
        

        

        
        // http://apiservices-form.herokuapp.com/api/retrieve?id=1554531817414
        
    }
  
  })();