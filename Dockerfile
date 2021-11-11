#./Dockerfile
FROM node:14 
#기반이 될 이미지

# 작업디렉토리(default)설정
WORKDIR /usr/src/app 

## Install packages
#현재 패키지 설치 정보를 도커 이미지에 복사. package-lock.json도 복사하는 것이 안전
COPY package*.json ./
#prisma schema의 위치를 한 디렉토리 상위로 복사
COPY ./prisma/schema.prisma ./
#설치 정보를 읽어 들여서 패키지 설치
RUN npm install
#RUN npx prisma generate

## Copy all src files
#현재경로에 존재하는 모든 소스파일을 이미지에 복사
COPY . . 


## Run the application on the port 8001
#8001번 포트를 외부에 개방하도록 설정
EXPOSE 8001   

# === 도커가 이미지를 빌드할 때의 명령어
CMD ["npm", "run", "deploy"]
