FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "start"]

# 베이스 이미지 명시
#FROM alpine

# 추가적으로 필요한 파일들을 다운로드 받는다.
# RUN = 도커 이미지가 생성되기 전에 수행할 쉘 명령어
#RUN command

# 컨테이너 시작시 실행 될 명령어를 명시
# 실행파일 또는 쉘 스크립트. 해당 명령어는 도커파일 내 1회만 쓸 수 있다.
#CMD [ "echo", "hello" ]

# 도커 파일 -> 도커 클라이언트 -> 도커 서버 -> 이미지

