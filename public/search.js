function search_load() {
  if (firebase.auth().currentUser.uid != null) {
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
        for(var algo in algos) { if(algos[algo][key].search(filter) != -1) matches[algo] = algos[algo]; }
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
            '<p id="overview">' + algos[algo]["code"] + '</p><br>' +

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

      //for (var algo in algos) alert(algos[algo]["name"]);
    }
  }
}
