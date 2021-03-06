
FROM ubuntu:18.04

RUN mkdir /home/work

WORKDIR /home/work

RUN apt-get update && apt-get install -y sudo && apt-get install -y vim && apt-get install -y curl && apt-get install -y git

RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

RUN apt-get install -y nodejs

RUN git clone https://github.com/arvincsh/stream-service-nctu.git

WORKDIR /home/work/stream-service-nctu

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get install -y tzdata && apt-get install -y libopencv-dev

RUN sudo npm install 

RUN sudo npm install forever -g 

RUN sudo npm install opencv
