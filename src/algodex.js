var temp = document.getElementById("login_bubble");
temp.parentNode.removeChild(temp);

temp = document.getElementById("login_script");
temp.parentNode.removeChild(temp);

temp = document.getElementById("login_style");
temp.parentNode.removeChild(temp);

temp = document.createElement("link");
temp.setAttribute("href", "./style/style.css");
temp.setAttribute("rel", "stylesheet");
temp.setAttribute("type", "text/css");
document.head.appendChild(temp);

temp = null;

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
      }

      algos.addEventListener( "load", updateList() );

      document.getElementById("add_btn").addEventListener( "click", e => {
        edit_load(null);
      });

      document.editAlgorithm = function(buttonID){ edit_load(buttonID); }

      document.deleteAlgorithm = function(buttonID){
          ref = firebase.database().ref( "code/" + firebase.auth().currentUser.uid );
          buttonID = buttonID.substring(5);
          var delPromise = ref.child(buttonID).remove();

          delPromise.then( e => {
            document.getElementById(buttonID.toString()).remove();
          });

          ref = storage.ref( "image/" + buttonID );
          delPromise = ref.delete();
      }

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
            '<div style="text-align:left; margin-left:30%;">' +
              '<code id="overview">' + code.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;') + '</code><br>' +
            '</div>' +

          '<h2>Runtime Analysis</h2>' +
            '<p id="runtime">' + rt + '</p><br>' +

          '<h2>Space Complexity</h2>' +
            '<p id="space_cmplx">' + sp + '</p><br>' +

          '<h2>Notes</h2>' +
            '<p id="notes">' + note + '</p><br>' +

          '<h2 id="img_exists">Relevant Images</h2>' +

          '<img alt="" id="algo_image" src="">';

        iFrameHandle.body.setAttribute("class", "inner_body");

        var imgRef = storage.ref();
        var img = iFrameHandle.getElementById('algo_image');

        imgRef.child("image/" + buttonID.substring(5)).getDownloadURL().then(function(url) {
          img.src = url;
        });
      }
    }
  });
}

home_load();




function search_load() {
  firebase.auth().onAuthStateChanged( function(user) {
    if(user){
      document.body.innerHTML =
        '<nav class="nav_bar">' +
          '<button id="home_link" class="link_button" type="button">My Algos</button>' +
          '<button id="search_link" class="link_button link_active" type="button">Search</button>' +
          '<button id="about_link" class="link_button" type="button">About</button>' +

          '<div class="logo_hover">' +
            '<img alt="AlgoDex Logo" class="top_logo" src="images/logo.png">' +
            '<div class="logo_dropdown">' +
              '<button id="home_btn" type="button">Home</button>' +
              '<button id="signout_btn" type="button">Signout</button>' +
            '</div>' +
          '</div>' +
        '</nav>' +

        '<section class="left_frame_large">' +
          '<h2>Search</h2>' +
          '<form id="search_form" action="">' +
            '<input type="text" placeholder="Name" id="name_search">' +
            '<br><br>' +
            '<select id="select_algo_type" class="drop_down">' +
              '<option value="0">Select Algorithm Type</option>' +
              '<option value="Search">Search</option>' +
              '<option value="Sort">Sort</option>' +
              '<option value="AI">AI</option>' +
              '<option value="String Manipulation">String Manipulation</option>' +
            '</select>' +
            '<br><br>' +
            '<select id="select_runtime">' +
              '<option value="0">Select Runtime</option>' +
              '<option value="Constant">Constant</option>' +
              '<option value="Linear">Linear</option>' +
              '<option value="O(n^2)">O(n^2)</option>' +
              '<option value="Greater than O(n^2)">Greater than O(n^2)</option>' +
            '</select>' +
            '<br><br>' +
            '<select id="select_space_complexity">' +
              '<option value="0">Select Space Complexity</option>' +
              '<option value="Constant">Constant</option>' +
              '<option value="Linear">Linear</option>' +
              '<option value="O(n^2)">O(n^2)</option>' +
              '<option value="Greater than O(n^2)">Greater than O(n^2)</option>' +
            '</select>' +
            '<br><br>' +
            '<label><input id="include_public_bool" type="checkbox">Include Public</label>' +
            '<br><br>' +
            '<label><input id="include_myalgos_bool" type="checkbox">Include My Algos</label>' +
            '<br><br>' +
            '<input type="number" placeholder="# of Results/Page">' +
            '<br><br>' +
            '<input type="button" value="Submit" id="submit_btn">' +
          '</form>' +
        '</section>' +
        '<iframe class="outside_content no_border" id="i_frame" src="./results.html"></iframe>';

      document.title.innerHTML = 'AlgoDex - Search Algorithms';

      document.getElementById("home_link").addEventListener("click", e => { home_load(); });
      document.getElementById("search_link").addEventListener("click", e => { search_load(); });
      document.getElementById("about_link").addEventListener("click", e => { about_load(); });

      document.getElementById("home_btn").addEventListener("click", e => {
        home_load();
      });

      document.getElementById("signout_btn").addEventListener( "click", e => {
        firebase.auth().signOut().then( function() {
            window.alert( "Signed Out" );
            window.open( "./index.html", "_self" );
          }, function( error ) {
            window.alert( "Sign Out Error" + error );
          } );
      });
      
      document.getElementById("submit_btn").onclick = function() {
        const name = document.getElementById("name_search");
        const type = document.getElementById("select_algo_type");
        const runtime = document.getElementById("select_runtime");
        const complexity = document.getElementById("select_space_complexity");
        const in_public = document.getElementById("include_public_bool");
        const in_private = document.getElementById("include_myalgos_bool");

        var iFrameHandle = document.getElementById("i_frame").contentDocument;

        const ref = firebase.database().ref( "code/" + firebase.auth().currentUser.uid + "/" );
        var algos = {};
        var matches = {};
        ref.orderByChild( "name" ).on( "child_added", function( data ) {
            algos[data.key] = { "name": data.val().name, "type": data.val().type, 
            "runtime": data.val().runtime, "space": data.val().space, "code": data.val().code, 
            "note": data.val().note };
        });

        function getMatches(algos, key, filter) {
          var matches = {};
          for(var algo in algos) { if(algos[algo][key].toLowerCase().search(filter.toLowerCase()) != -1) matches[algo] = algos[algo]; }
          return matches;
        }

        if (name_search.value != "") { algos = getMatches(algos, "name", name_search.value); }

        if (type.value != "0") { algos = getMatches(algos, "type", type.value); }
         
        if (runtime.value != "0") { algos = getMatches(algos, "runtime", runtime.value); }

        if(complexity.value != "0") { algos = getMatches(algos, "space", complexity.value); } 
        if (in_public.checked != false) { }
        if (in_private.checked != false) { }

        var newBody = "";

        for (var algo in algos) {
          newBody = newBody + 
            '<button id="' + algo + '" type="button" class="big_padding">' + 
            algos[algo]["name"] + '</button>';
        }

        if (newBody == "") {
          newBody = '<h3>No results found...</h3>';
        }
        iFrameHandle.body.innerHTML = newBody;
        iFrameHandle.body.setAttribute("id", "results");
        newBody = null;

        for (var algo in algos) {
          iFrameHandle.getElementById(algo).addEventListener("click", e => {
            iFrameHandle.body.innerHTML = 
              '<button style="position: absolute; left: 0;" type="button" id="back">Go Back to results</button>' +
              '<h1 id="algo_name"><em><u>' + algos[algo]["name"] + '</u></em></h1>' +

              '<h2 id="type">Algorithm Type - ' + algos[algo]["type"] + '</h2><br>' +

              '<h2>Overview / Code</h2>' +
              '<div style="text-align:left; margin-left:30%;">' +
                '<code id="overview">' + algos[algo]["code"].replace(/\n/g, '<br>').replace(/ /g, '&nbsp;') + '</code><br>' +
              '</div>' +

              '<h2>Runtime Analysis</h2>' +
              '<p id="runtime">' + algos[algo]["runtime"] + '</p><br>' +

              '<h2>Space Complexity</h2>' +
              '<p id="space_cmplx">' + algos[algo]["space"] + '</p><br>' +

              '<h2>Notes</h2>' +
              '<p id="notes" contenteditable="true">' + algos[algo]["note"] + '</p>';
          
            iFrameHandle.body.setAttribute("id", "view_body");
            iFrameHandle.body.setAttribute("class", "inner_body");

            iFrameHandle.getElementById("back").addEventListener("click", e => {
                document.getElementById("submit_btn").click();
                iFrameHandle.body.setAttribute("class", null);
            });
          });
        }
      }
    }
  });
}

function about_load() {
  if (firebase.auth().currentUser.uid != null) {
    document.body.innerHTML =
      '<div style="background-color:lightblue">' +
        '<h1 style="text-align: center">' +
          'Team AlgoDex\'s About' +
        '</h1>' +
        '<nav>' +
          '<button type="button" onclick="home_load()">Home</button>' +
        '</nav>' +
      '</div>' +
      '<div style="background-color:gold">' +
        '<h3>Team Goals and Culture</h3>' +
      '</div>' +
      '<div>' +
        '<p style="text-indent: 40px">' +
          'Team <strong>AlgoDex\'s</strong> primary goal is to develop a ' +
          '<em>robust and useful product</em> that software engineers and ' +
          'programming enthusiasts <em>love to use</em>. <strong>AlgoDex</strong> ' +
          'is meant to help engineers by storing algorithms and chunks of code for ' +
          'later use. Here at <strong>AlgoDex</strong>, we believe that making this ' +
          'process as efficient as possible for the user means that we can ' +
          'signicantly reduce development time in almost any situation. ' +
          'Other goals include the development of clean code and the development ' +
          'of code that is secure.' +
        '</p>' +
        '<p style="text-indent: 40px">' +
          'Team <strong>AlgoDex\'s</strong> culture is unique. Both members are veterans with ' +
          'beards. While being a veteran is not necessary to join team ' +
          '<strong>AlgoDex</strong>, <u>having a beard as an absolute must</u>. Our ' +
          'team is quite laid-back but we also pride ourselves on developing well-written ' +
          'code. In short, <em> we take pride in our work</em>. ' +
        '</p>' +
      '</div>' +
      '<div style="background-color:gold">' +
        '<h3>About the Developers</h3>' +
      '</div>' +
      '<div>' +
        '<img src="images/justin.jpg" height="200" width="170" alt="Nada">' +
        '<p>Name : Justin Harris</p>' +
        '<p>Email: jmh027 at ucsd.edu</p>' +
        '<p>About: Justin Harris is a Senior at UCSD and will be graduating and ' +
           'heading to industry in June. He is a Navy veteran and worked in IT ' +
           'while he was enlisted. In his spare time, he likes to look people ' +
           'in the eyes for far too long to see how they react. He also ' +
           'likes to ponder the meaning of life while he sleeps!</p>' +
      '</div>' +
      '<hr />' +
      '<div>' +
        '<img src="images/peter.png" alt="Nada">' +
        '<p>Name : Peter Panourgias</p>' +
        '<p>Email: ppanourg@ucsd.edu and peter.panourgias@gmail.com</p>' +
        '<p>About: Peter Panourgias is a Senior at UCSD. He will be graduating ' +
           'in September and then heading off to industry. He is also a Navy ' +
           'veteran of 7.5 years. Peter was an Avionics Technician in the Navy ' +
           'and worked on stuff like Radar and weapons systems for fighter jets.</p>' +
      '</div>';

    document.title.innerHTML = 'AlgoDex - About Us';
  }
}

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
          '<label>Algorithm Space Complexity</label>' +
            '<select id="algo_space">' +
              '<option value="O(1)">Constant</option>' +
              '<option value="O(n)">Linear</option>' +
              '<option value="O(n^2)">O(n^2)</option>' +
              '<option value="Greater">Greater than O(n^2)</option>' +
            '</select>' +
          '</p>' +
          '<p>' +
            '<label>Image (optional) </label>' +
            '<input type="file" id="algo_img" name="image" accept="image/*" onClick="isImageAdded()" />' +
            '<input id="cb" type="checkbox" value="unchecked" style="visibility:hidden;">' +
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

      document.isImageAdded = function() {
        document.getElementById("cb").value = "checked";
      };

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
              note:    notes.value,
              hasImg:  document.getElementById("cb").value

            });
          }
          else{
            index = Date.now();
            hasImg = document.getElementById("cb").value == "checked";
            db.ref( "code/" + firebase.auth().currentUser.uid + "/" + index ).set({

              name:    algoName.value,
              type:    algoType.value,
              runtime: algoRt.value,
              space:   algoSpace.value,
              code:    code.value,
              note:    notes.value,
              hasImg:  document.getElementById("cb").value

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
