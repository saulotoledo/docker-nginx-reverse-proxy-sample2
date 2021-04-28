# NGINX reverse proxy sample on Docker

The project contains a sample application in Node.js running behind an Nginx reverse proxy.

## Steps to run the application

Create network for running the containers:

```
docker network create nginx-rev-proxy-sample-net
```

Build and deploy the database:

```
docker build -t saulotoledo/node-app-course-list-db db
docker push saulotoledo/node-app-course-list-db
```

Starting the database container.

```
docker run -d \
       --name db \
       --restart=always \
       --net nginx-rev-proxy-sample-net \
       -v "nginx-rev-proxy-sample-db-vol:/var/lib/mysql" \
       saulotoledo/node-app-course-list-db
```

Build and deploy the application container (replace `saulotoledo` with your Docker Hub. You need an account in Docker Hub and must be signed up to push images. If you do not know how to do it, please follow [this instructions](https://docs.docker.com/docker-hub/)):

```
docker build -t saulotoledo/node-app-course-list node
docker push saulotoledo/node-app-course-list
```

Start the application container. Note that we are not exposing its port to the host:

```
docker run -d --name node-app --net nginx-rev-proxy-sample-net saulotoledo/node-app-course-list
```

Build and deploy the NGINX reverse proxy:

```
docker build -t saulotoledo/node-app-course-list-nginx nginx
docker push saulotoledo/node-app-course-list-nginx
```

Start the application proxy:

```
docker run -d \
       --name node-app-nginx-proxy \
       -p "8080:80" \
       --net nginx-rev-proxy-sample-net \
       saulotoledo/node-app-course-list-nginx
```

Now you can access the browser on http://localhost:8080 and see the list of courses in the database. The NGINX container is
internally forwarding the request to the node container.
