# Hosted Locations

**Live 2019**
Heroku App Name: compform2019
http://sketches2019.compform.net/
https://compform2019.herokuapp.com/

**Live 2018**
Heroku App Name: compform2018
http://sketches2018.compform.net/
https://compform2018.herokuapp.com/

**Live 2017**
Heroku App Name: desolate-cliffs-53268
http://sketches.compform.net/
https://desolate-cliffs-53268.herokuapp.com/

**Staging**
Heroku App Name: avalanche-staging
https://avalanche-staging.herokuapp.com/

# Running Avalanche Locally

`cd avalanche`
`meteor --settings server/[settings file].json`

# Images hosted on Cloudinary

[Cloudinary Login](https://cloudinary.com/users/login)

# App Hosting on Heroku

[Heroku Login](https://dashboard.heroku.com)

# Email SMTP sending hosted by Mailjet

https://app.mailjet.com/account/

## Creating a new Heroku App for Avalanche

- Log into Heroku
- Create an App `New->Create New App`
- Add the remote to the repo `heroku git:remote -a <app_name> -r <remote_name>` (note: you probably want to name the remote after the app)
- Add Resource add-on `mLab MongoDB :: Mongodb` -> Sandbox-Free
- Add/Set Settings > Config Variables
  - `METEOR_APP_DIR` = `avalanche`
  - `ROOT_URL` = url of app (e.g. `https://<app_name>.herokuapp.com`)
- Add Settings > Buildpacks
  - `https://github.com/AdmitHub/meteor-buildpack-horse.git`
- Config Heroku with local settings

  - `heroku config:add METEOR_SETTINGS="$(cat server/<settings file>.json)" --app <app_name>`

- Push app via git `git push <remote> master`
- Push/pull data via `./scripts`. These scripts pull data from local/staging/production to a local cache, and push the cache to local/staging/production.

Note: If you are setting up a new script for pushing data to heroku mongo, get the password from heroku/settings/config vars

## List Heroku Apps

`heroku apps --all`

## View App Config Settings

`heroku config --app __appname__`

## Updating Heroku Config Settings

See [Heroku Config Vars Docs](https://devcenter.heroku.com/articles/config-vars)

If we only had one app:
`heroku config:add METEOR_SETTINGS="$(cat settings.json)"`

But we have production and staging, so something like this:
`heroku config:add METEOR_SETTINGS="$(cat ./avalanche/server/settings.json)" --remote heroku`

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

**\*Staging Server**

git command:
`git push stage master` (staging)

git remote:
stage https://git.heroku.com/avalanche-staging.git (fetch)

view at:
https://avalanche-staging.herokuapp.com/

**\*compform2018 Server**
git command:
`git push compform2018 master`

git remote:
https://git.heroku.com/compform2018.git

view at:
https://compform2018.herokuapp.com/

## Moving Databases

The `./scripts/` folder contains scripts for copying database content between (the dev, staging, and production servers) and (a local file).

Run scripts from `/avalanche` like this `./scripts/SCRIPT.sh`

## Managing Database

I use Robo 3T/Robomongo to admin the local db.

## Nuking Local Database

`meteor reset` will delete the local mongo db starting you at 0

## Remotes

compform2018 https://git.heroku.com/compform2018.git (fetch)
compform2018 https://git.heroku.com/compform2018.git (push)
heroku https://git.heroku.com/desolate-cliffs-53268.git (fetch)
heroku https://git.heroku.com/desolate-cliffs-53268.git (push)
origin https://github.com/jbakse/avalanche.git (fetch)
origin https://github.com/jbakse/avalanche.git (push)
stage https://git.heroku.com/avalanche-staging.git (fetch)
stage https://git.heroku.com/avalanche-staging.git (push)
