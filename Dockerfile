
FROM ubuntu:18.04

RUN mkdir /home/work

WORKDIR /home/work

RUN apt update -y && apt-get update -y && apt-get install -y sudo && apt-get install -y vim && apt-get install -y curl && apt-get install -y git

RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

RUN apt-get install -y nodejs

RUN git clone https://github.com/arvincsh/zmec-stream-host-nctu.git

WORKDIR /home/work/zmec-stream-host-nctu

ENV DEBIAN_FRONTEND=noninteractive

RUN sudo apt update

RUN apt-get install -y tzdata && apt install -y libopencv-dev

RUN sudo npm install 

RUN sudo npm install forever -g 

CMD [ "forever", "server.js" ]
