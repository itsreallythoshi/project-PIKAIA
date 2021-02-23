# project-PIKAIA
Phyops SDGP group project

links for ML demonstration

emotion analysis: https://colab.research.google.com/drive/1Aw7PsLWqKct8OEZi1IDG2eoXQcoHIG80#scrollTo=sRvjve-Mg-PL

music recommender: https://colab.research.google.com/drive/12yDXZycBFAO7cvHN-UFHWmhomzNJ9atV

chatbot: https://colab.research.google.com/drive/1aMWdZRtZ0erws4oXOUdPzvliPrE8PZV8?authuser=2

## Follow these steps to do your initial commit to the repository

### setting up your git credentials
type the following commands... I have taken Shehan as an example here
```
git config --global user.name "Shehan Saverimuttu"
git config --global user.email "shehan@example.com"

#type the following to verify if it was successfully added
git config --list
```

### Doing your first commit {I will follow the simplest way to do things to get everyone started}

1. Go to a folder where you want to have your project in you PC and open the terminal there (mine is desktop). 
To do that right click on anywhere in your Explorer (file explorer).

and in the context menu you will see something like 'open with bash'. click on it and a bash terminal will open up. If you don't have that option. You probably don't have git installed in your system. (if that's the case download git from here https://git-scm.com/downloads).

2. Type the following command in the terminal. (bash) 

if you have SSH key enabled... (you can enable it anytime--follow this tutorial later https://www.youtube.com/watch?v=WgZIv5HI44o)
```
git clone git@github.com:thoshithaKaduru/project-PIKAIA.git
```
if you don't (you will have to enter your username and password each time)
```
git clone https://github.com/thoshithaKaduru/project-PIKAIA.git
```
3. then go into the folder that gets created (type this in terminal `cd project-PIKAIA`)

4. Go to the folder named 'project initiation'(type `cd project-initiation`) and Create a text file with your name (ex: shehan.txt) and add somethings to the text file. 
```
# type the following in terminal to create a file. 
touch shehan.txt
```

5. Save the file then in terminal, Type `git add .` to add the text file to the staging area

6. Type `git commit -m "Shehan's first commit"`

7. Then type `git push origin main`


#### I recommend setting up an SSH key to your computer so you don't have to enter your credentials for each commit. Refer to this link to set up you SSH (for windows) https://www.youtube.com/watch?v=WgZIv5HI44o

---
---
---
---

# Disregard the next section.{so don't use any of the commands there} We won't be using forks... so I'll have to change a few things..
### Here is a quick the workflow we'll follow through for this project. This is something I've used before... so I'll have a little demo for you guys

Whether you're trying to give back to the open source community or collaborating on your own projects, knowing how to properly fork and generate pull requests is essential. Unfortunately, it's quite easy to make mistakes or not know what you should do when you're initially learning the process. I know that I certainly had considerable initial trouble with it, and I found a lot of the information on GitHub and around the internet to be rather piecemeal and incomplete - part of the process described here, another there, common hangups in a different place, and so on.

In an attempt to coallate this information for myself and others, this short tutorial is what I've found to be fairly standard procedure for creating a fork, doing your work, issuing a pull request, and merging that pull request back into the original project.

## **Creating a Fork**

Just head over to the GitHub page and click the "Fork" button. It's just that simple. Once you've done that, you can use your favorite git client to clone your repo or just head straight to the command line:

```
# Clone your fork to your local machine
git clone git@github.com:USERNAME/FORKED-PROJECT.git
```

## **Keeping Your Fork Up to Date**

While this isn't an absolutely necessary step, if you plan on doing anything more than just a tiny quick fix, you'll want to make sure you keep your fork up to date by tracking the original "upstream" repo that you forked. To do this, you'll need to add a remote:

```dart
# Add 'upstream' repo to list of remotes
git remote add upstream https://github.com/UPSTREAM-USER/ORIGINAL-PROJECT.git
# Verify the new remote named 'upstream'
git remote -v
```

Whenever you want to update your fork with the latest upstream changes, you'll need to first fetch the upstream repo's branches and latest commits to bring them into your repository:

```dart
# Fetch from upstream remote
git fetch upstream
# View all branches, including those from upstream
git branch -va
```

Now, checkout your own master branch and merge the upstream repo's master branch:

```dart
# Checkout your master branch and merge upstream
git checkout master
git merge upstream/master
```

If there are no unique commits on the local master branch, git will simply perform a fast-forward. However, if you have been making changes on master (in the vast majority of cases you probably shouldn't be - [see the next section](https://gist.github.com/Chaser324/ce0505fbed06b947d962#doing-your-work), you may have to deal with conflicts. When doing so, be careful to respect the changes made upstream.

Now, your local master branch is up-to-date with everything modified upstream.

## **Doing Your Work**

### **Create a Branch**

Whenever you begin work on a new feature or bugfix, it's important that you create a new branch. Not only is it proper git workflow, but it also keeps your changes organized and separated from the master branch so that you can easily submit and manage multiple pull requests for every task you complete.

To create a new branch and start working on it:

```dart
# Checkout the master branch - you want your new branch to come from master
git checkout master
# Create a new branch named newfeature (give your branch its own simple informative name)
git branch newfeature
# Switch to your new branch
git checkout newfeature
```

Now, go to town hacking away and making whatever changes you want to.

## **Submitting a Pull Request**

### **Cleaning Up Your Work**

Prior to submitting your pull request, you might want to do a few things to clean up your branch and make it as simple as possible for the original repo's maintainer to test, accept, and merge your work.

If any commits have been made to the upstream master branch, you should rebase your development branch so that merging it will be a simple fast-forward that won't require any conflict resolution work.

```dart
# Fetch upstream master and merge with your repo's master branch
git fetch upstream
git checkout master
git merge upstream/master
# If there were any new commits, rebase your development branch
git checkout newfeature
git rebase master
```

Now, it may be desirable to squash some of your smaller commits down into a small number of larger more cohesive commits. You can do this with an interactive rebase:

```dart
# Rebase all commits on your development branch
git checkout
git rebase -i master
```

This will open up a text editor where you can specify which commits to squash.

### **Submitting**

Once you've committed and pushed all of your changes to GitHub, go to the page for your fork on GitHub, select your development branch, and click the pull request button. If you need to make any adjustments to your pull request, just push the updates to GitHub. Your pull request will automatically track the changes on your development branch and update.

## **Accepting and Merging a Pull Request**

Take note that unlike the previous sections which were written from the perspective of someone that created a fork and generated a pull request, this section is written from the perspective of the original repository owner who is handling an incoming pull request. Thus, where the "forker" was referring to the original repository as `upstream`, we're now looking at it as the owner of that original repository and the standard `origin` remote.

### **Checking Out and Testing Pull Requests**

Open up the `.git/config` file and add a new line under `[remote "origin"]`:

```
fetch = +refs/pull/*/head:refs/pull/origin/*
```

Now you can fetch and checkout any pull request so that you can test them:

```dart
# Fetch all pull request branches
git fetch origin
# Checkout out a given pull request branch based on its number
git checkout -b 999 pull/origin/999
```

Keep in mind that these branches will be read only and you won't be able to push any changes.

### **Automatically Merging a Pull Request**

In cases where the merge would be a simple fast-forward, you can automatically do the merge by just clicking the button on the pull request page on GitHub.

### **Manually Merging a Pull Request**

To do the merge manually, you'll need to checkout the target branch in the source repo, pull directly from the fork, and then merge and push.

```dart
# Checkout the branch you're merging to in the target repo
git checkout master
# Pull the development branch from the fork repo where the pull request development was done.
git pull https://github.com/forkuser/forkedrepo.git newfeature
# Merge the development branch
git merge newfeature
# Push master with the new feature merged into it
git push origin master
```

Now that you're done with the development branch, you're free to delete it.

```dart
git branch -d newfeature
```

