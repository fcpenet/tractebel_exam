
# TRACTEBEL EXAM
*Please note that this is for mac environment only*
* _python_ version: 3.6.3
* _node_ version: v8.7.0
* _npm_ version: 6.1.0

<br>
<br>

## Build instructions for the following items:
* Backend
* Frontend

## Backend
* First, make sure to build all necessary dependencies
> cd Backend

> npm install

* Make sure all migrations are applied:
> npm run migrate

_NOTE: On a newly cloned project, this is necessary to create tables!_

* Then, to run the backend:
> npm run start

_Note: The default port used is **3000** <br>
To run on another port, i.e 5000:_
> PORT=5000 npm run start

_This will be useful when running in parallel with the frontend_

<br>
<br>

#### Testing the backend
* To run the tests, make sure you are at the backend root directory:
> cd Backend

* Then, run using the script:
> npm run test

_NOTE: This ensures that you use the test db when testing<br>
And that all tests are run with --recursive option_

<br>
<br>

## Frontend
* Go to Frontend root directory:
> cd Frontend

* Install all dependencies:
> npm install

* Then to run the frontend:
> npm run start

_NOTE: The proxy is set to **5000** in the package.json <br>
If you wish to run the frontend in parallel with the backend <br>
**make sure that the backend is running on PORT=5000**_

<br>
<br>

## Countries -- NOT FINISHED
_This is not finished, but I've managed to start some basic test for the model_

### Initial requirements
* **It is recommended to use virtual environments so as to make sure that all requirements are met and other projects are not affected**
* I'm personally using **venv**, to install:
> pip install venv

_Note: This is for python3.6_

* Then create a virtual env:
> python -m venv virtualenv

* Activate the environment:
> source virtualenv/bin/activate

* Install all requirements listed in the *Countries/requirements* file:
> cd Countries

> pip install -r requirements

### Running the test:
* Go to Countries root directory:
> cd Countries
* Run the tests using the unittest module
> python -m unittest discover

_Discover that the tests are failing. LOL :)_



