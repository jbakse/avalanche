# Running Meteor
`meteor --settings server/settings.json`

# Reference

[Creating a Photo Blog in Meteor](http://experimentsinmeteor.com/photo-blog-part-1/) Older tutorial.

[Discover Meteor Book](https://book.discovermeteor.com/) Out of date on some things.

[Discover Meteor 1.3 Study Plan](https://www.discovermeteor.com/blog/study-plan-meteor-1-3/)
An overview indented to bridge gap between Discover Meteor and latest version of Meteor.

[Mime Type List](https://www.sitepoint.com/web-foundations/mime-types-complete-list/)

[SCSS Cheatsheet](https://sass-cheatsheet.brunoscopelliti.com/) Using SCSS for CSS preprocessing.

## Routing
Avalanche uses `flowRouter` and `blaze-layout` from Kadira for routing.

[Meteor Guide](https://guide.meteor.com/routing.html)
[Kadira](https://kadira.io/academy/meteor-routing-guide/content/rendering-blaze-templates)

# Packages
[CollectionFS](https://github.com/CollectionFS/Meteor-CollectionFS) We used this package to deal with image upload and storage, backed on Amazon S3. **Now deprecated.**

[Meteor-Slingshot](https://github.com/CulturalMe/meteor-slingshot) Possible file upload solution w/ S3. 510 Stars

[Meteor-Files](https://github.com/VeliovGroup/Meteor-Files) Possible file upload solution w/ S3. 350 Stars

[Selectize](https://github.com/selectize/selectize.js) Upgraded &lt;select&gt; UI widget good for tagging.

[gm](https://github.com/aheckmann/gm) GraphicsMagick and ImageMagick for Node. Server side image processing.

[pluralize](https://github.com/blakeembrey/pluralize) Pluralize/unpluralize english words.

[Cloudinary Meteor Package](https://atmospherejs.com/lepozepo/cloudinary)

[meteor-useraccounts](https://github.com/meteor-useraccounts/core/blob/master/Guide.md)
[meteor-simple-schmea](https://github.com/aldeed/meteor-simple-schema#allowedvalues)
[meteor-autoform](https://github.com/aldeed/meteor-autoform#afquickfield)

[momentum](https://atmospherejs.com/percolate/momentum)


# Services

[Google Natural Language](https://cloud.google.com/natural-language/) Interesting

[Filestack](https://www.filestack.com/) File upload as service. free testing level, $49 month for starter

[Cloudinary](http://cloudinary.com/) File upload as service. Looks like free plan large enough for pilot.


# Tutorials

[Slingshot S3 @ Meteor Chef](https://themeteorchef.com/recipes/uploading-files-to-amazon-s3/)

# Snippets

[Client Side Image Resize with Slingshot](http://stackoverflow.com/questions/28515789/resize-and-save-files-to-s3-in-meteor)


# Issues
[Blaze doesn't play well with Contenteditable](https://github.com/meteor/meteor/issues/1964)


# Settings/Security
[themeteorchef Settins.json](https://themeteorchef.com/snippets/making-use-of-settings-json/)

heroku config:add METEOR_SETTINGS="$(cat settings.json)"
