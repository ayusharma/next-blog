---
title: npm registry for your organization
date: "2019-03-27T22:40:32.169Z"
lastModified: "2019-03-27T22:40:32.169Z"
---

![alt](/nodejs-npm-registry.png)

Maintaining a private npm for your organization/team is very helpful when you would like to share the code only with them and not with the entire universe. You can develop and maintain all your organization specific projects and their components as node packages that can be reused.

If there are multiple teams working, each of them can upload their own reusable node modules to the private npm and other teams can use them. For example a File upload component or an organization specific module and so on. This way, when you need something all you have to do is run npm install my-module , which will download the my-module for you.

## Can I run my own private registry?

Yes!

The easiest way is to replicate the couch database, and use the same (or similar) design doc to implement the APIs.

If you set up continuous replication from the official CouchDB, and then set your internal CouchDB as the registry config, then you’ll be able to read any published packages, in addition to your private ones, and by default will only publish internally.

If you then want to publish a package for the whole world to see, you can simply override the --registry option for that publish command.

[Source - npm docs](https://docs.npmjs.com/misc/registry#can-i-run-my-own-private-registry)

## CouchDB

CouchDB is a database that completely embraces the web. Store your data with JSON documents. Access your documents with your web browser, [via HTTP](http://docs.couchdb.org/en/2.1.0/api/basics.html#api-basics). [Query](http://docs.couchdb.org/en/2.1.0/api/document/common.html#api-doc), [combine](http://docs.couchdb.org/en/2.1.0/ddocs/views/index.html#views), and [transform](http://docs.couchdb.org/en/2.1.0/ddocs/ddocs.html#listfun) your documents with [JavaScript](http://docs.couchdb.org/en/2.1.0/query-server/javascript.html#query-server-js).

You can [install couch db form here](http://docs.couchdb.org/en/2.1.0/install/index.html) according to your OS.

```bash
$ curl -X GET http://localhost:5984/
{"couchdb":"Welcome","uuid":"eea0bdc8f2cae8a46a2d4274043e694b","version":"1.6.1","vendor":{"name":"The Apache Software Foundation","version":"1.6.1"}}
```

You’ll need the following entries added in your **/usr/local/etc/couchdb/default.ini**

```
[couch_httpd_auth]
public_fields = appdotnet, avatar, avatarMedium, avatarLarge, date, email, fields, freenode, fullname, github, homepage, name, roles, twitter, type, _id, _rev
users_db_public = true
[httpd]
secure_rewrites = false
[couchdb]
delayed_commits = false
``` 

**Once you have CouchDB installed, create a new database:**

```bash
$ curl -X PUT http://localhost:5984/registry
```

## Replication
*Replication in computing involves sharing information so as to ensure consistency between redundant resources, such as software or hardware components, to improve reliability, fault-tolerance, or accessibility.* — Wikipedia

When you ask CouchDB to replicate one database to another, it will go and compare the two databases to find out which documents on the source differ from the target and then submit a batch of the changed documents to the target until all changes are transferred. Changes include new documents, changed documents, and deleted documents. Documents that already exist on the target in the same revision are not transferred; only newer revisions are.

### Continuous Replication
CouchDB will not stop after replicating all missing documents from the source to the target. It will listen on CouchDB’s `_changes` and automatically replicate over any new docs as they come into the source to the target.

**Replicating npm Mirror DB** — https://skimdb.npmjs.com/registry

```bash
$ curl -X POST http://127.0.0.1:5984/_replicate -d ‘{“source”:”https://skimdb.npmjs.com/registry", “target”:”registry”, “continuous”:true}’ -H “Content-Type: application/json”
{"ok":true,"_local_id":"856a4fb78d193cbe92215ee7b1d55ce3+continuous"}
```


## Verdaccio

![alt](/verdaccio-banner@2x.png)

https://github.com/verdaccio/verdaccio

A lightweight private npm proxy registry.

We’ll use it to manage our private packages and point our registry to get 3rd party npm packages.

It allows you to have a local npm private registry with zero configuration. You don’t have to install and replicate an entire database. Verdaccio keeps its own small database and, if a package doesn’t exist there, it asks any other registry (in our case, replicated registry) for it keeping only those packages you use.

### Installation and starting

Application will create default config in config.yaml which you can edit later.

```bash
npm install --global verdaccio
```

Run in your terminal

```bash
verdaccio
```

You would need set some npm configuration, this is optional.

```bash
$ npm set registry http://localhost:4873/
# if you use HTTPS, add an appropriate CA information
# ("null" means get CA list from OS)
$ npm set ca null
```

Now you can navigate to http://localhost:4873/ where your local packages will be listed and can be searched.

## Point replicated registry

Edit `~/.config/verdaccio/config.yaml` and change uplink to:

```yaml
uplinks:
  npmjs:
    url: <Replicated registry>
```

Now, You can start to manage your packages on your own server.

For more, visit https://verdaccio.org
