
FROM ubuntu:18.04

RUN mkdir /home/work

WORKDIR /home/work

RUN sudo apt update -y && apt-get update -y && apt-get install -y sudo && apt-get install -y vim && apt-get install -y curl && apt-get install -y git

RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

RUN apt-get install -y nodejs

RUN git clone https://github.com/arvincsh/zmec-stream-host-server-v1.git

WORKDIR /home/work/zmec-stream-host-server-v1

ENV DEBIAN_FRONTEND=noninteractive

RUN sudo apt update

RUN apt-get install -y tzdata && apt install -y libopencv-dev

RUN sudo npm install 

CMD [ "node", "/home/work/zmec-stream-host-server-v1/server.js" ]
