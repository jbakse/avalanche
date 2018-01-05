# Hosted Locations

**Live 2017**
Heroku App Name: desolate-cliffs-53268
http://sketches.compform.net/
https://desolate-cliffs-53268.herokuapp.com/

**Staging**
Heroku App Name: avalanche-staging
https://avalanche-staging.herokuapp.com/


# Running Avalanche Locally
`cd avalanche`
`meteor --settings server/settings.json`


# Images hosted on Cloudinary
[Cloudinary Login](https://cloudinary.com/users/login)

# App Hosting on Heroku
[Heroku Login](https://dashboard.heroku.com)

## Creating a new Heroku App for Avalanche

- Log into Heroku
- Create an App `New->Create New App`
- Add Resource `mLab MongoDB :: Mongodb`
- Add/Set Settings > Config Variables
    - `METEOR_APP_DIR` = `avalanche`
    - `ROOT_URL` = url of app (e.g. `https://desolate-cliffs-53268.herokuapp.com`)
- Add Settings > Buildpacks
    - `https://github.com/AdmitHub/meteor-buildpack-horse.git`
- Config Heroku with local settings
    - `heroku config:add METEOR_SETTINGS="$(cat settings.json)"`


## List Heroku Apps
`heroku apps --all`

## View App Config Settings
`heroku config --app __appname__`

## Updating Heroku Config Settings
See [Heroku Config Vars Docs](https://devcenter.heroku.com/articles/config-vars)

`heroku config:add METEOR_SETTINGS="$(cat settings.json)"`

This will create a single setting named `METEOR_SETTINGS` with a value that is the JSON object in `settings.json`


## Publishing to Heroku
The app code is pushed to the Heroku via git

**2017 Live Server**

git command:
`git push heroku master` (live)

git remote:
heroku https://git.heroku.com/desolate-cliffs-53268.git

view at:
https://sketches.compform.net

***Staging Server**

git command:
`git push stage master` (staging)

git remote:
stage   https://git.heroku.com/avalanche-staging.git (fetch)

view at:
https://avalanche-staging.herokuapp.com/

