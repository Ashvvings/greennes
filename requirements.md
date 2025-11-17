## Supervisors

Maud Marchal, Nicolo Cavalli, and Arnaud Blouin


## Goal of the project

The global goal of this teaching module is to acquire skills related to the design, development, and evaluation of a Web user interface that handles (open) data in a societal concern (green, eco-citizenship, impairment, etc.).

**This year you will have to develop a Web application that leverages one or several open data sources in a societal concern.**



## Skills to acquire


Ability to develop a usable user interface with dedicated user interactions by using state-of-the-art usability and software engineering principles.


## Non-Goals

- You will do not develop an entire app, but focus on UI, usability aspects. For example you do not have to perform all the software engineering steps (e.g., CI/CD, software testing, security, online transactions, RGPD). There is no need to configure a CI pipeline (but you can).

- The developed app is not intended to be deployed in production mode. This is mainly a prototype. Free to use this prototype to develop a real app in your free time ;)


## Organization

- Eight practical sessions to handle the different steps. This is a project so that working beyond the sessions is required.
Sessions 1 and 2: design
Sessions 3 to 5: development 
Sessions 6 to 8: evaluation
Three students per group.

- All the code and design artifacts put on a **private** gitlab project.

- Put Arnaud Blouin (`arnaud-blouin`), Nicolo Cavalli (`ncavalli`, https://gitlab.insa-rennes.fr/ncavalli) Maud Marchal (`maud-marchal`) as `MAINTAINER` of your project.


## Technologies

- You can use either Angular, React, or VueJS to develop the front-end. You must use TypeScript within these frameworks. Ask us if you want to use another framework (that must use TypeScript).

- https://quant-ux.com

- gitlab INSA


## MVP (minimal viable product)

Your application must:
- contain at least two pages/screens.
- use one or several open data sources from https://data.rennesmetropole.fr/explore/ or other city data sources. These data sources must be JSON or XML data sources.
- be responsive to screensize (to two different screen sizes)


**Example 1**

- Data: Graffiti geolocation
- Service: Give users a way to update the list of graffiti taking in consideration the current user location

**Example 2**
- Data: Cafeteria habits in Rennes' schools
- Service: help students to book their meal


The idea is to manipulate and display data, and provide a simple service (eg., there should be a way for the user to insert new data or to do something meaningful with this data). 

## Marking

We will evaluate your project, which encompasses the three steps (design, development, evaluation).
