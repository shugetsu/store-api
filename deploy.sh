#!/bin/bash
############################################
# this script function is :
# deploy new docker container
#
# USER     YYYY-MM-DD - ACTION
# YuYin    2019-10-16 - CREATED
#
############################################

# ----------------------------------------------------
# check docker images
# ----------------------------------------------------
echo "---------------- 部署流程开始 ----------------"
echo ""
DOCKER_IMAGE=`docker images | grep $JOB_NAME | awk -F ' ' '{print $1}'`
if [ -n "${DOCKER_IMAGE}" ]; then
    # check docker container
    for dc in `docker ps -a | grep $JOB_NAME | awk -F ' ' '{print $2}'`
    do
        # stop docker container
        echo "停止 ${dc} 容器"
        docker stop ${dc}
        # delete while docker container was exists
        echo "删除 ${dc} 容器"
        docker rm ${dc}
        # delete while docker image was exists
        echo "删除 ${dc} 镜像"
        docker rmi ${dc}
    done
    echo ""
fi

# ----------------------------------------------------
# Build dockerfile
# ----------------------------------------------------

echo "构建 ${JOB_NAME} 镜像"
docker build -t ${JOB_NAME} .
echo ""

# ----------------------------------------------------
# Run docker container
# ----------------------------------------------------

echo "运行 ${JOB_NAME} 容器"
docker run --name ${JOB_NAME} -d -p 8001:7001 ${JOB_NAME}
echo ""
echo "---------------- 部署流程结束 ----------------"
