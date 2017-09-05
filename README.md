# AlgoDex
# Developed by Peter Panourgias && Justin Harris
# Available at: https://cse134b-project-d4f0e.firebaseapp.com/
During the process of writing software, there are often times when certain
portions of written code could become useful in future applications. Furthermore, there
are times when certain well-known algorithms, for instance Merge Sort, would be useful
in a program but would need to be slightly modified to make such an algorithm work
within the constraints of a specific problem. AlgoDex can be used to store
algorithms for quick retrieval. Therefore, AlgoDex will be useful by programmers
that wish to be more efficient when writing code. In contrast to Git and other version control systems,
Algo-Dex’s main role is to only store portions of code; the algorithms. Therefore,
AlgoDex removes the need for a user to search all the source code of an existing
code base to find an algorithm they are looking for.

Below is a example of how our site looks when being used by a user
![App Example](/readme_images/home_screenshot.png)

Here is our login page which shows the capability of regular login and also Google login
![App Example](/readme_images/login_screenshot.png)

## Application Overview
* Frontend: HTML / CSS (Vanilla) / JS (Vanilla)
* Backend: Firebase

## Performance & Design
Most of AlgoDex adheres to the Single Page Application(SPA) pattern whereby a user logs into our app
and pages are generated for an authenticated user via Javascript. This means that we are constantly manipulating the DOM of
index.html with functions that are found in src/algodex.js (algodex.min.js). The SPA pattern allows better security because a 
potential hacker cannot access a specific page by just knowing the extension for that page. Some pages do not follow SPA in our
implementation. These were the administrative pages such as the forgot password page and signup page. In order to acheive maximum performance, we put all Javascript in one file and minified that file.

AlgoDex has a few main components which it is comprised of, these include:

* The home page where users may view and delete algorithms.
* The edit page where algorithms can be updated and added with or without images.
* The search page which employs a simple search for algorithms in a users AlgoDex.

The above components encompass the ability of the application to perform CRUD operations with the added bonus of searching.

AlgoDex is mainly a text manipulation tool since all the fields, with the exception of the image field, are text. The application works well without images and can also run efficiently with images depending on image size and network capabilities. Since we use Firebase as our backend, we removed the need to worry about the efficiency of our server side code. We were able to leverage Firebases RealTime Database or storage of code and other text fields and utilized Firebases storage capabilities for images.

In terms of database configuration, everytime a user adds an algorithm we use the Javascript Date.now() function in order to assign a unique time stamp to that algorithm. Furthermore, each user is identified by a unique token. Thus, in the database we have a setup where in order to gain access to an algorithm you must have the users token and the algorithms index, both of which are unique. The image for each algorithm is also assigned the index of the algorithm as its name in the database. This allows easy pairing of algorithm with its associated image.

## Concerns and Limitations
We are aware that our application is not entirely secure and as such a work in progress. Given more time we shall implement
more stringent security protocols. Also, we will polish the CSS and HTML and work on refining the Javascript. A framework was not 
used in developing this application. We hope that in not using a framework, we avoided unnecessary software bloat that would have slowed down our performance (but perhaps increased our coding efficiency!). Perhaps, for practice purposes and as the application increases in complexity we will use a framework to help facilitate our coding. 

A few //TODOs that we would like to implement in the future include:

* Syntax highlighting
* Language specification options
* In browser terminal to compile and run our algorithms.
* Better searching capabilities
* Cleaner UI/UX
* An algorithm "Starter kit" for new users
* In browser copy/paste
* Code parser that parses potential algorithms out of your source code that you upload

This application was a learning process for all the developers involved. In spending countless hours frustrated, yelling at our code and at each other, we went from really bad at front-end development to pretty bad at front-end development. As such, there is only one direction to go and that is up. 

