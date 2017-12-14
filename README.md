# IonicStarWars


## Introduction

This application is designed to use the StarWars API(https://swapi.co/documentation) and display data
aiming at fans and newbies. The subject can be found on the repo as -name-of-th-cdc-pdf-.


So the application goals are to:
            - Attract new fans in the supposed association who's the source of this application
            - Allow new potentials fans to discover the universe of the saga easily.


# Installation

This project use Ionic in order to simply create a multi-OS application.

Those are the requirements:
  * -node.js
  * -npm
  * -Ionic


Then just clone the repo on your computer.

Before testing the application you have to update your project:

```{r, engine='bash', count_lines}
IonicStarWars$ npm update
```

In order to test the application, type:

```{r, engine='bash', count_lines}
IonicStarWars$ ionic cordova run browser
```
This will prompt you about installing project dependencies, answer yes.

Then it will launch the preview of the application on your default browser.


If you want to send the application to your phone, type :

```{r, engine='bash', count_lines}
IonicStarWars$ ionic cordova run android --livereload
```

Replace `android` by `ios` if you are working with an IPhone.

*NB: You must be working on an OS-X in order to deploy on an IPhone*
