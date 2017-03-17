# AlgoDex
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

![App Example](/readme_images/home_screenshot.png)

## Application Overview
* Frontend: HTML / CSS (Vanilla) / JS (Vanilla)
* Backend: Firebase

## Performance & Design
Most of AlgoDex adheres to the Single Page Application(SPA) pattern whereby a user logs into our app
and pages are generated for an authenticated user via Javascript. This means that we are constantly manipulating the DOM of
index.html with function that are foundin src/algodex.js (algodex.min.js). The SPA pattern allows better security because a 
potential hacker cannot access a specific page by just knowing the extension for that page. Some pages do not follow SPA in our
implementation. These were the administrative pages such as the forgot password page and signup page.

## Known Issues, Bugs, & Limitation


