# docker
## local run
```shell
docker build -t whoami-client .     

docker run -p 3000:3000 whoami-client 
```

## with docker compose
```shell
docker build -t whoami-client:latest -f Dockerfile .

docker tag whoami-client:latest ghcr.io/mibrgmv/whoami-client:latest

docker push ghcr.io/mibrgmv/whoami-client:latest 

docker compose up -d           
```