## hostUp - A simple URL Status Checker for Uptime
#### Written with MeteorJS using NodeJS, HTML5, Javascript

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

Now you can navigate to localhost:3000 as indicated to see the page.  Use the Menu icon in the upper left of the screen to get to the host input screen.  Input your first url to check.  Please use full URLs including http or https.

Once you've added a URL or two to check, you can navigate back to the Host List view. The hosts you are monitoring should show in a grid, and you can see their status, the last time they were checked, and the next time they'll be checked in the view. You can edit or delete a host using the Action icons at the right of each column.

Clicking on a column will bring up the Ping data for that host.  It brings back the last 1000 ping time results in a chart.

The menu icon in the upper left allows you to move to the input screen and back to the monitor screen.

*NOTE*: this application just checks to see if the site is up or not.  This is not a watcher for changes.

### Configuration
You can setup default time in minutes for each check to occur of the entered sites as well as the max number of sites a user can have.

#### Email Setup
You can setup the system to email out a notice to a specified email for each site you are monitoring.  You must setup the SMTP send mail information and save it.

I have tested this and it does work.

##### Example
Email Username: greg
Email Password: f93kfjaldj4 59%4k3l # 4JJ
SMTP Server URL: smtp.gmail.com
SMTP Port: 587

*Note*: Gmail is a tricky little beast. If you setup Gmail on a remote server such as with Digital Ocean or some other VPS provider you'll need to set up your security in Gmail to allow it to send.

It's better to use a self-hosted email server, or something like MailGun or similar system intended for emailing out from an automated system.

### Production Use
I'll add more instructions later on how to set this up for production use, and probably will add a script for those running it on Linux or Mac to make it pretty easy.

## To Do Still
I would like to add a per URL timer setting.  I had this in originally, but found that the way I set it up it eventually created a cascading set of checks that became so frequent they could never finish before the next set was running.  

## Contribue
I'm always 100% open to contributions from anyone willing to help out, learn or otherwise.
