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
          'Team <strong>AlgoDex\'s</strong> primary goal is to develop a' +
          '<em>robust and useful product</em> that software engineers and' +
          'programming enthusiasts <em>love to use</em>. <strong>AlgoDex</strong>' +
          'is meant to help engineers by storing algorithms and chunks of code for' +
          'later use. Here at <strong>AlgoDex</strong>, we believe that making this' +
          'process as efficient as possible for the user means that we can' +
          'signicantly reduce development time in almost any situation.' +
          'Other goals include the development of clean code and the development' +
          'of code that is secure.' +
        '</p>' +
        '<p style="text-indent: 40px">' +
          'Team <strong>AlgoDex\'s</strong> culture is unique. Both members are veterans with' +
          'beards. While being a veteran is not necessary to join team' +
          '<strong>AlgoDex</strong>, <u>having a beard as an absolute must</u>. Our' +
          'team is quite laid-back but we also pride ourselves on developing well-written' +
          'code. In short, <em> we take pride in our work</em>.' +
        '</p>' +
      '</div>' +
      '<div style="background-color:gold">' +
        '<h3>About the Developers</h3>' +
      '</div>' +
      '<div>' +
        '<img src="images/justin.jpg" height="200" width="170" alt="Nada">' +
        '<p>Name : Justin Harris</p>' +
        '<p>Email: jmh027 at ucsd.edu</p>' +
        '<p>About: Justin Harris is a Senior at UCSD and will be graduating and' +
           'heading to industry in June. He is a Navy veteran and worked in IT' +
           'while he was enlisted. In his spare time, he likes to look people' +
           'in the eyes for far too long to see how they react. He also' +
           'likes to ponder the meaning of life while he sleeps! You know he' +
           'is in the room when you smell alcohol and despair.</p>' +
      '</div>' +
      '<hr />' +
      '<div>' +
        '<img src="images/peter.png" alt="Nada">' +
        '<p>Name : Peter Panourgias</p>' +
        '<p>Email: ppanourg@ucsd.edu and peter.panourgias@gmail.com</p>' +
        '<p>About: Peter Panourgias is a Senior at UCSD. He will be graduating' +
           'in September and then heading off to industry. He is also a Navy' +
           'veteran of 7.5 years. Peter was an Avionics Technician in the Navy' +
           'and worked on stuff like Radar and weapons systems for fighter jets.</p>' +
      '</div>';

    document.title.innerHTML = 'AlgoDex - About Us';
  }
}