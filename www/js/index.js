/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);
document.getElementById("btnCameraOpen").addEventListener("click",onCameraOpen);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    
}

function onCameraOpen(){
    

        var delayInMilliseconds = 2000; //2 seconds

        cordova.plugins.CordovaMqTTPlugin.connect({
            url:"tcp://test.mosquitto.org", //a public broker used for testing purposes only. Try using a self hosted broker for production.
            port:"1883"
        });
        


    // setTimeout(function() {
    //     cordova.plugins.CordovaMqTTPlugin.publish({
    //         topic:"MQTT",
    //         payload:"Hello from the cordova app!"
    //     });
    // }, delayInMilliseconds)

    navigator.camera.getPicture(onSuccess,onFail, { quality: 50, 
        destinationType: Camera.DestinationType.FILE_URI});
                     


    function onSuccess(imageURI){
        var image = document.getElementById('myImage');
        image.src = imageURI;
        cordova.plugins.CordovaMqTTPlugin.publish({
            topic:"MQTT",
            payload:"Er werd een foto genomen"
        });
       
    }

    function onFail(message){
        alert('Failed because: ' + message);
        cordova.plugins.CordovaMqTTPlugin.publish({
            topic:"MQTT",
            payload:"Er werd geen foto genomen"
        });
    }    
}










