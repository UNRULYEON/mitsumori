### Submission for DigitalOcean App Platform Hackathon on DEV

[Information about the hackathon](https://dev.to/devteam/announcing-the-digitalocean-app-platform-hackathon-on-dev-2i1k)

[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/UNRULYEON/mitsumori/tree/main)

## What I built
I've build a website where you and your team can play scrum poker when you can't meet in a physical place. It used websockets for realtime communication.

### Category Submission: 
This project belongs to the **Program for the People** category.

### Screenshots
![mitsumori.app_home](https://dev-to-uploads.s3.amazonaws.com/i/mexihclzke4b5yep1yml.png)

![mitsumori.app_create_room](https://dev-to-uploads.s3.amazonaws.com/i/5f4ms01ac06trnfpyer6.png)

![mitsumori.app_user_joined](https://dev-to-uploads.s3.amazonaws.com/i/fe9ondffzwtn8u9kk4zq.png)

![mitsumori.app_voting](https://dev-to-uploads.s3.amazonaws.com/i/kcilwfehvkr9b3npge1m.png)

![mitsumori.app_voted](https://dev-to-uploads.s3.amazonaws.com/i/xozvpgw4pix46ykhzb9t.png)
   

### Description
With `mitsumori` you can play scrum poker with your team online. Simply create a room and give yourself a name or join an existing one.

If you're someone who doesn't have to participate in the voting but would like to facilitate the meeting instead, you can change to an observer.

After everyone has voted, the votes become visible and after your discussion, the round can be reset by anyone.

`mitsumori` comes standard with two decks: Fibonacci and the original Fibonacci sequence. 

### Link to Source Code
https://github.com/UNRULYEON/mitsumori

### Permissive License
`mitsumori` is licensed under the MIT license. View the license [here](https://github.com/UNRULYEON/mitsumori/blob/main/LICENSE)

## Background
During lockdown, I couldn't go to school and my team and I had to meet online. We could do most things except play scrum poker. The websites that existed required some form of signing up or were broken; we would be out of sync with who voted what after one or two rounds.

That's why I decided to build one of my one where you can quickly create a room for your team.

### How I built it
`mitsumori` is build with a React frontend and an Express backend. The communcation between the two is done via websockets. This allows for the realtime feedback from other members in the room like changing the name or casting a vote.

After I've build the app, I simply added docker support and went through the steps to create an App on DigitalOcean’s App Platform. App Platform simply recognized that I had a `Dockerfile` and used that to build the app.

### Additional Resources/Info
If you'd like, you can modify the `config.ts` to add or modify existing decks and spin up your own `mitsumori`.
