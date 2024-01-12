# Stage 1: Decide base image
# 決定基底映像檔
FROM alpine:latest AS builder
RUN apk add --no-cache tzdata
RUN apk add --no-cache --update nodejs npm

# Stage 2: Set Timezone
# 設定容器時區
ENV TZ=Asia/Taipei
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Stage 3: Set the working directory
# 設置目前工作目錄
WORKDIR /src

# Stage 4: Install requirements
# 複製檔案至映像檔內
COPY . .
# 安裝 Dependencies
RUN npm install -g npm@10.2.2
# 只安裝 dependencies 的套件
RUN npm install --production && npm cache clean --force
# 生成 Prisma Client
RUN npx prisma generate --schema=./prisma/schema.prisma
# 建立 log 資料夾
RUN mkdir -p /src/logs/error && mkdir -p /src/logs/info

# 把安裝好的全部移過去
FROM alpine:latest
RUN apk add --no-cache --update nodejs npm
WORKDIR /src
COPY --from=builder /src .

# Stage 5: Set container listen Port
# 設定 Docker 要開放的 Port
# restful api server
EXPOSE 3000

# Stage 6: Run app
# 啟動 Container 時要執行的指令
CMD [ "node", "app" ]