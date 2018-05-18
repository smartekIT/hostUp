## hostUp - A simple URL Status Checker
#### Written with MeteorJS using NOdeJS, HTML5, Javascript

To run it in Dev mode you'll need to do the following:

1. Get Meteor Installed

    Windows - There's an installer out there.
    Mac and Linux use this command:

`curl https://install.meteor.com/ | sh`

2. Clone this repo
3. cd into the cloned repo directory
4. run the command

`meteor npm install`

5. now run the command

`meteor`

If you get any errors, such as needing to install babel-runtime, or bcrypt, just use the commands provided, then run the `meteor` command again to make sure it starts. 

Once it's running you should see this in your terminal:

```
[[[[[ ~/hostUp ]]]]]

=> Started proxy.
=> Started MongoDB.

=> Started your app.

=> App running at: http://localhost:3000/
```

Or something very similar.

Now you can navigate to localhost:3000 as indicated to see the page and input your first url to check.  Please use full URLs including http or https

The menu hamburger icon in the upper left allows you to move to the input screen and back tot he monitor screen.

*Note*: this application just checks to see if the site is up or not.  This is not a wathcer for changes.

### Production Use
I'll add more instructions later on how to set this up for production use, and probably will add a script for those running it on Linux or Mac to make it pretty easy.

