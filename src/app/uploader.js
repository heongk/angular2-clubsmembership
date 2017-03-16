// Anonymous "self-invoking" function
(function() {
    // Load the script
    var a = ["https://www.gstatic.com/firebasejs/3.7.1/firebase-app.js",
    "https://www.gstatic.com/firebasejs/3.7.1/firebase-auth.js",
    "https://www.gstatic.com/firebasejs/3.7.1/firebase-database.js",
    "https://www.gstatic.com/firebasejs/3.7.1/firebase-messaging.js",
    "https://www.gstatic.com/firebasejs/3.7.1/firebase.js"]
    var a = a.slice();
    for (var i = 0; i < 5; ++i)
    {

      console.log(i)
      script = document.createElement("SCRIPT");
      script.src = a[i]
      script.type = 'text/javascript';
      script.onload = function() {
          console.log(a[i].toString()+' ready')
      };
      document.getElementsByTagName("body")[0].appendChild(script);
    }
})();
  
var firebaseConfig = {
 apiKey: "AIzaSyBHbjed1U3qhrKHjvuANgEzf9TuWsQee9s",
    authDomain: "hhhd-27e4f.firebaseapp.com",
    databaseURL: "https://hhhd-27e4f.firebaseio.com",
    storageBucket: "hhhd-27e4f.appspot.com",
    messagingSenderId: "394432419968"
}

  window.firebase.initializeApp(firebaseConfig);
  window.firebase.auth().signInAnonymously()
  window.firebase.auth().onAuthStateChanged(function(auth){console.log(auth.uid+' auth')})

  var storage = firebase.storage();
  var pathReference = storage.ref('images/clavesin.jpg');
  pathReference.getDownloadURL()
  pathReference.getDownloadURL().then(function(url) { 
      document.getElementById('myimg').src = url
  })


   var Club = {
  $key: '',
  name: 'ANu onNOEu',
  description: 'oenut oneuth onetuh',
  imageurl: '',
}
  Club.$key = window.firebase.database().ref().child('clubs').push().key
  var storage = window.firebase.storage();
  var pathRef = storage.ref('images/'+Club.$key)
  pathRef.putString(document.getElementById('myimg').src,'data_url').then(function(url) { 
      pathRef.getDownloadURL().then(function(url){

      document.getElementById('myimg').src = url
      console.log('loaded')
      var updates = {}
      var data = {imageurl:url}
      updates['/clubs/'+Club.$key] = data
      window.firebase.database().ref().update(updates);
      })
  })

  firebaseApp.storage().ref('images/clavesin.jpg').getDownloadURL().then(function (url) {
            console.log(url);
            console.log(this.image);
            this.image = url;
            document.getElementById('myimg').src = url
            console.log(this.image);
        })

  var data = {name:Club.name,description:Club.description,imageurl:''}
  var updates = {}
  updates['/clubs/'+Club.$key] = data
  window.firebase.database().ref().update(updates);


  




</script>
