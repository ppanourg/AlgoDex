function home_load() {
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

          '<div class="frame_element left_frame align_center" id="user_algos">' +
            '<h2>My Algos</h2> ' +
            '<ul class="frame_element" id="algo_list">' +
              '<button class="algo_button" id="add_btn" type="button">Add New Algorithm</button>' +
            '</ul>' +
          '</div>' +

          '<iframe class="outside_content no_border" id="i_frame" name="outside stuff" src="./view.html"></iframe>';

      document.body.setAttribute("class", "outer_body");
      document.title.innerHTML = 'AlgoDex - My Algorithms';

      var usersAlgoIDs = [];

      document.getElementById("home_link").addEventListener("click", e => { home_load(); });
      document.getElementById("search_link").addEventListener("click", e => { search_load(); });
      document.getElementById("about_link").addEventListener("click", e => { about_load(); });
      document.getElementById("home_btn").addEventListener("click", e => { home_load(); });

      document.getElementById("signout_btn").addEventListener( "click", e => {
        firebase.auth().signOut().then( function() {
            window.alert( "Signed Out" );
            window.open( "./index.html", "_self" );
          }, function( error ) {
            window.alert( "Sign Out Error" + error );
          } );
      });

      function algoTemplate(name, id) {
        return '<h3>' + name + '</h3>' +
          '<button class="algo_button" id="' + 'edit_' + id +
            '" onClick="editAlgorithm(this.id)" type="button">Edit</button>' +
          '<button class="algo_button" id="' + 'view_' + id +
            '" onClick="viewAlgorithm(this.id)" type="button">View</button>' +
          '<button class="algo_button" id="' + 'dele_' + id +
            '" onClick="deleteAlgorithm(this.id)" type="button">Delete</button>';
      }

      var algos = document.getElementById( "algo_list" );

      var updateList = function() {

        var ref = firebase.database().ref( "code/" + firebase.auth().currentUser.uid + "/" );

        ref.orderByChild( "name" ).on( "child_added", function( data ) {
          var li = document.createElement( 'li' )
          li.id = data.key;
          li.innerHTML = algoTemplate(data.val().name, data.key);
          algos.appendChild( li );
          usersAlgoIDs.push(data.key);
        } );

        document.getElementById("i_frame").addEventListener( "load", e => {
          if(usersAlgoIDs.length > 0){
            document.viewAlgorithm("algo_" + usersAlgoIDs[0]);
          }
        });
      }

      algos.addEventListener( "load", updateList() );

      document.getElementById("add_btn").addEventListener( "click", e => {
        edit_load(null);
      });

      document.editAlgorithm = function(buttonID){ edit_load(buttonID); }

      document.viewAlgorithm = function(buttonID){
        var iFrameHandle = document.getElementById("i_frame").contentDocument;
        var dbHandle = db.ref("code/" + firebase.auth().currentUser.uid + "/" + buttonID.substring(5));

        var name, type, code, note, rt, sp;

        dbHandle.orderByValue().on( "value", function(data) {
          data.forEach( function(data) {
            switch( data.key ){
              case "name":
                name = data.val();
                break;
              case "type":
                type = data.val();
                break;
              case "code":
                code = data.val();
                break;
              case "note":
                note = data.val();
                break;
              case "runtime":
                rt = data.val();
                break;
              case "space":
                sp = data.val();
            }
          });
        });

        iFrameHandle.body.innerHTML =   
          '<h1 id="algo_name"><em><u>' + name + '</u></em></h1>' +

          '<h2 id="type">Algorithm Type - ' + type + '</h2><br>' +

          '<h2>Overview / Code</h2>' +
            '<p id="overview">' + code + '</p><br>' +

          '<h2>Runtime Analysis</h2>' +
            '<p id="runtime">' + rt + '</p><br>' +

          '<h2>Space Complexity</h2>' +
            '<p id="space_cmplx">' + sp + '</p><br>' +

          '<h2>Notes</h2>' +
            '<p id="notes">' + note + '</p><br>' +

          '<h2 id="img_exists">Relevant Images</h2>' +

          '<img alt="" id="algo_image" src="">';

        var imgRef = storage.ref();
        var img = iFrameHandle.getElementById('algo_image');

        imgRef.child("image/" + buttonID.substring(5)).getDownloadURL().then(function(url) {
          img.src = url;
        });

      }

      document.deleteAlgorithm = function(buttonID){
        var ref = firebase.database().ref( "code/" + firebase.auth().currentUser.uid );
        buttonID = buttonID.substring(5);
        var delPromise = ref.child(buttonID).remove();

        delPromise.then( e => {
          document.getElementById(buttonID.toString()).remove();
        });

        ref = storage.ref( "image/" + buttonID );
        delPromise = ref.delete();
      }
    }
  });
}

home_load();
