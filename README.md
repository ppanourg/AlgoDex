# AlgoDex
# Available at: https://cse134b-project-d4f0e.firebaseapp.com/
AlgoDex is a web application that allows users to keep track of the algorithms they have used in previous projects. It has a simple interface that allows the user to create, review, update, delete, and search through their algorithms. 

![App Example](/readme_images/home_screenshot.png)

## Application Overview
* Frontend: HTML / CSS (Vanilla) / JS (Vanilla)
* Backend: Firebase
* Services Used: Firebase
* Build/Task Tools: Custom Python Script
* Packaging/Porting: iOS / Android / OS X / Windows / Linux

## Error Monitoring
This feature is on our TODO list.

## Usage Monitoring & Analytics
This feature is on our TODO list

###### Mixpanel monitoring includes:
* Creating a Habit
* Editing a Habit
* Deleting a Habit
* Finishing a Habit
* User registering
* User logging in
* Sending Notification
* Improperly filled form

Tracking things like when a user improperly fills a form gives us insight into whether our forms are too complicated or unclear. If we get many events pertaining to improperly filled forms, then this may mean that our forms need to be simplified and reworked. Other statistics like Finishing a Habit and Creating a Habit tells us if our users are actually using our application.

Because we built our application using Parse, we also leveraged Parse Analytics. Parse gives us many useful statistics pertaining to users and logistics. With Parse, we are able to understand our users and keep track of how our application is handling those users.

###### Parse Analytics include:
* Daily, Weekly, Monthly active users
* API Requests
* Performance, File Storage, Database Storage
* Queries that are slowing down our Application
* Application crashes

## Minification & Bundling
We used CodeKit and KoalaApp for our compilation, minification, and bundling efforts.

###### CSS/SCSS
We compiled our SCSS into CSS, concatenated those CSS files into a single file, and finally compressed and minified that CSS file. This allowed us to make a single HTTP Request to retrieve our CSS file, greatly increasing our performance and also decreasing network requests.

###### JavaScript
With CodeKit, we were able to concatenate all of our JS files into a single, minified file (with a few exceptions). Like with our CSS files, this vastly improved our performance and decreased the size of the request contents as well. Again, this limited the number of HTTP requests we had to make to retrieve our necessary files. With our CSS and JS bundling/minification, we only needed to make two primary requests for our primary files. However, with some of the services we used, we had to include inline scripts in order to load them immediately.

## Image Spriting
Initially, we had a large mixture of PNGs, JPGs, and SVGs. After looking into possible spritesheet/bundling options, our team decided to instead include a block of inline SVGs to handle our images, which provides us with the same functionality (with better performance) as a bundled spritesheet. In our HTML, we simply include our SVG code for the following:
* Done button
* Edit button
* Delete button
* Exit button ('X' on the Add/Habit page)

With all these images declared as in-file SVGs, we were able to reduce the number of HTTP Requests. We provide the user with one default Habit icon, which is referenced as an external JPG in our img/ directory.

###### Splash Page
We created a simple splash page the user arrives at if: (1) the user just registered or (2) the user logs in and has 0 habits. This splash page was intended to provide an aesthetic and simple call to action for users to create their first habit. The background image is an external JPG with 3 different sizes. At different breakpoints, we used different resolution images to improve performance:
* \> 940px screen width: 1600px width image resolution
* < 940px screen width: 1280px width image resolution
* < 640px screen width: 960px width image resolution

By optimizing our images and removing unnecessary HTTP requests, we were able to further improve the performance of our application.

## Mobile App Proof of Concept (iOS, Android)
After looking into Ionic Framework, PhoneGap (Cordova), and creating a mobile app from scratch, our team conclusively decided on PhoneGap. With PhoneGap, we were able to port our entire app over to iOS and Android. Using Android Studio and XCode to emulate our application, we were able to port and run a working version of our app, with the exception of notifications. Notifications do not work because OneSignal is a web API that does not extend push functionality to native mobile applications.

###### iOS
Our ported iOS application can be emulated with XCode using the HelloWorld.xcodeproj located in the virtuevice-ios/platforms/ios/ directory. All of our functionality is working, with the exception of notifications.

![iOS](/public/img/ios-screenshot.png)

###### Android
Our ported Android application can be emulated using Android Studio (or another Android emulator) by building the entire project in virtuevice-android/. All of our functionality is working, with the exception of notifications. Note that this project will have to be built as a "gradle" project.

![Android](/public/img/android-screenshot.png)

## Packaging Efforts - (Mac OS X, Windows, Linux)
We used Github's Electron (previously known as Github Shell) to package our app into a desktop application. With Electron, we were able to easily port our web application into a desktop application. We were able to port our application into OS X, Windows, and Linux desktop apps.

## Testing & Usability
We used CodeKit to throw up a local server on our machines to (loosely) emulate a live web application. While we know this is limited and still provides us with a very skewed online connection, this allowed us to better test our application. Again, we tested our app on Chrome, Safari, FireFox, Internet Explorer (11, Edge), and several mobile browsers. While we experience aesthetic differences between the browsers, the application's core functionality are working on all of them (with the exception of notifications on IE, mobile Chrome, and Firefox).

## Performance & Design
* We optimized our images, used inline SVGs, bundled & minified our CSS/JS
* Provide the user with quick and seamless feedback for form validation and user events
* Deployed simple material design to help the user easily differentiate flat forms from buttons with box shadows, allowing us to create better call-to-actions


## Known Issues, Bugs, & Limitations
There are a number of issues, bugs, and limitations that we will attempt to outline.
* Timezone discrepancies: Our notifications are based on UTC-8 (PST) time and does not allow a user to use a specified timezone
* Parse server delay: Occasionally when a user performs very quick actions and does a page refresh/redirect, our app may not correctly register the actions because the request to Parse was not allowed to complete.
* Parse API request limit: Parse limits requests to 30 Requests/second. If we generate enough users, this limit may be exceeded. In order to increase the request limit, Parse charges a fee. Other possible routes (for future consideration), would be to build a custom backend or use a different service.
* Heroku sleeping: We deployed on Heroku's free tier, which limits server up-time to 18 hours every 24 hours. This means our app may *potentially* sleep for up to 6 hours each day. This presents issues when we try to reset our habits every day and send notifications. We can prevent this in the future by paying a fee to Heroku to keep our server up 24/7.
* Packaging issues: because we only scratched the surface with mobile and desktop apps, their implementations are nowhere close to completion or realistic usability. They were done to demonstrate feasibility and allowed us to explore what options were available.
* Usability & Scope: because we had very limited time and understanding of the requirements of the app, it may not be widely used.
* Edge cases: As with any app, it is not possible for our team to cover all the possible edge cases or account for every factor that could harm our app (network, hackers, etc).
* ARIA Accessibility: We are looking into making the web app ARIA accessible in the future.
