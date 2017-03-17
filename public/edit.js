function edit_load(algo_id){ 
  firebase.auth().onAuthStateChanged( function(user) {
    if(user){
      document.body.innerHTML =
          '<nav class="nav_bar">' +
            '<button id="home_link" class="link_button link_active" type="button">My Algos</button>' +
            '<button id="search_link" class="link_button" type="button">Search</button>' +
            '<button id="about_link" class="link_button" type="button">About</button>' +

            '<div class="logo_hover">' +
              '<img alt="AlgoDex Logo" class="top_logo" src="images/logo.png">' +

              '<div class="logo_dropdown">' +
                '<button id="home_btn" type="button">Home</button>' +
                '<button id="signout_btn" type="button">Signout</button>' +
              '</div>' +
            '</div>' +
          '</nav>' +

      '<hr />' +

      '<form>' +
        '<fieldset>' +
          '<legend>Algorithm Information</legend>' +
          '<p>' +
            '<label>Algorithm Name </label>' +
            '<input type="text" id="algo_name" placeholder="Hi, my name is..." />' +
          '</p>' +
          '<p>' +
            '<label>Algorithm Type </label>' +
            '<input type="text" id="algo_type" placeholder="Search, AI, etc..." />' +
          '</p>' +
          '<p>' +
            '<label>Algorithm Runtime </label>' +
            '<input type="text" id="algo_rt" placeholder="O(1)" />' +
          '</p>' +
          '<p>' +
            '<label>Algorithm Space Complexity </label>' +
            '<input type="text" id="algo_space" placeholder="O(n)" />' +
          '</p>' +
          '<p>' +
            '<label>Image (optional) </label>' +
            '<input type="file" id="algo_img" name="image" accept="image/*" />' +
          '</p>' +
        '</fieldset>' +
      '</form>' +

        '<h3>Algorithm Overview / Code</h3>' +
        '<p>' +
          '<textarea id="code" rows="25" cols="120" placeholder="Add code here..."></textarea>' +
        '</p>' +

        '<h3>Notes</h3>' +
        '<p>' +
          '<textarea id="notes" rows="5" cols="120" placeholder="Add notes here..."></textarea>' +
        '</p>' +

      '<button id="submit_changes" type="button">Submit Changes / Add</button>';

      if (algo_id == null) document.title.innerHTML = 'AlgoDex - Add Algorithm';
      else document.title.innerHTML = 'AlgoDex - Edit Algorithm';

      var algoName  = document.getElementById("algo_name");
      var algoType  = document.getElementById("algo_type");
      var algoRt    = document.getElementById("algo_rt");
      var algoSpace = document.getElementById("algo_space");
      var code      = document.getElementById("code");
      var notes     = document.getElementById("notes");
      var submitBtn = document.getElementById("submit_changes");
      var myNum = algo_id;

      document.getElementById("home_link")  .addEventListener("click", e => { home_load();   });
      document.getElementById("search_link").addEventListener("click", e => { search_load(); });
      document.getElementById("about_link") .addEventListener("click", e => { about_load();  });
      document.getElementById("home_btn")   .addEventListener("click", e => { home_load();   });

      document.getElementById("signout_btn").addEventListener( "click", e => {
        firebase.auth().signOut().then( function() {
            window.alert( "Signed Out" );
            window.open( "./index.html", "_self" );
          }, function( error ) {
            window.alert( "Sign Out Error" + error );
          } );
      });

      submitBtn.addEventListener("click", e => {
        if(algoName.value && algoType.value && algoRt.value &&
           algoSpace. value && code.value && notes.value){

          var index;

          if( algo_id != null ){
            index = algo_id.substring(5);

            db.ref( "code/" + firebase.auth().currentUser.uid + "/" + index ).update({

              name:    algoName.value,
              type:    algoType.value,
              runtime: algoRt.value,
              space:   algoSpace.value,
              code:    code.value,
              note:    notes.value

            });
          }
          else{
            index = Date.now();

            db.ref( "code/" + firebase.auth().currentUser.uid + "/" + index ).set({

              name:    algoName.value,
              type:    algoType.value,
              runtime: algoRt.value,
              space:   algoSpace.value,
              code:    code.value,
              note:    notes.value

            });
          }

          if(document.getElementById("algo_img").value != ""){
            var imgRef = storage.ref("image/" + index);

            var file = document.getElementById("algo_img").files[0];
            imgRef.put(file).then(function(snapshot) {
              console.log('Uploaded a file!');
            });
          }

          if (document.getElementById("home") == null) {
            sc = document.createElement("script");
            sc.setAttribute("src", "./home.js");
            sc.setAttribute("id", "home");
            document.head.appendChild(sc);
          }

          home_load();
        }
        else{
          window.alert("Please fill out all fields!");
        }
      });

      if( algo_id != null ){

        var dbHandle = db.ref("code/" + firebase.auth().currentUser.uid + "/" + algo_id.substring(5));

        dbHandle.orderByValue().on( "value", function(data) {
          data.forEach( function(data) {
            switch( data.key ){
              case "name":
                algoName.value = data.val();
                break;
              case "type":
                algoType.value = data.val();
                break;
              case "code":
                code.value = data.val();
                break;
              case "note":
                notes.value = data.val();
                break;
              case "runtime":
                algoRt.value = data.val();
                break;
              case "space":
                algoSpace.value = data.val();
            }
          });
        });
      }
    }
  });
}
