import React from 'react';
import { useLocation } from 'react-router-dom';

import './App.css';
import { ZoomMtg } from '@zoom/meetingsdk';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

function App() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams)
  var authEndpoint = 'https://us-central1-edress-morecreatives-net.cloudfunctions.net/getZoomSignature'
  var sdkKey = 'iZLiYUrLTAeli5i2Y4H1kg'
  var meetingNumber = '85729565236'
  var passWord = ''
  var role = "1"
  var userName = 'Student 4'
  var userEmail = 'mahmoud@gmail.com'
  var registrantToken = ''
  var zakToken = ''
  var leaveUrl = '/'

  function getSignature(e) {
    e.preventDefault();

    fetch(authEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role ,
      })
    }).then(res => res.json())
    .then(response => {
      console.log(response.signature)
      startMeeting(response.signature)
    }).catch(error => {
      console.error("error" . error)
    })
  }

  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      patchJsMedia: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: userName,
          userEmail: userEmail,
          tk: registrantToken,
          zak: zakToken,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>

        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;