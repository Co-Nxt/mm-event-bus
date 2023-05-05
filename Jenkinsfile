pipeline {
  agent any
   environment {
        DOCKER_IMAGE_NAME = 'konicsdev/eventbus'
        VULTR_SERVER_IP = '149.28.159.113'
        VULTR_SERVER_USER = 'root'
        VULTR_SERVER_SSH_PORT = '22'
        CONTAINER_NAME = "eventbus"
   //test pooling
   }
  stages {
      stage('Setup') {
        steps {
            script{
            def branchName = sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
            def commitId = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
            def commitMessage = sh(returnStdout: true, script: 'git log -1 --pretty=format:"%s"').trim()
            def commitAuthor = sh(returnStdout: true, script: 'git log -1 --pretty=format:"%an"').trim()
            def description = "<br> <b>Branch: </b> ${branchName}<br> <b>Commit ID:</b> ${commitId} <br> <b>Author:</b> ${commitAuthor} <br> <b> CommitMessage: </b> ${commitMessage} <br>"
              currentBuild.setDescription(description)
          }
        }
      }
      stage('Build Docker Image') {
        parallel{
          stage('docker-build'){
            steps {
              script {
              //docker.build("konicsdev/even-bus:${env.BUILD_NUMBER}")
              sh'docker build -t ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER} .'
              echo'Building..'
              }
            }
          }
        }
      stage('Quality Testing and DevOps Scanning') {
        when{
            branch 'develop'
          }
        parallel{
          stage ('sonar-qube-scan'){
            steps {            
              withSonarQubeEnv(installationName:'SonarQube') {
                  script {
                    sh "/var/lib/jenkins/sonar-scanner/sonar-scanner-4.8.0.2856-linux/bin/sonar-scanner -Dproject.settings=sonar-project.properties"
                  }
              }
            }
          }
          //other scan
        }
      }
    
      stage('Push Image to Artifactory') {
        steps {
          sh 'docker login -u konicsdev -p konics.dev'
          sh 'docker push ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}'
          echo'Pushing..'
        }
      }
      stage('Deploy to Environment') {
        steps {
            script{
            sh "sshpass -p 'La7}_,CvuWvT]aS5' ssh -o StrictHostKeyChecking=no $VULTR_SERVER_USER@$VULTR_SERVER_IP -p $VULTR_SERVER_SSH_PORT 'docker stop $CONTAINER_NAME || true && docker rm $CONTAINER_NAME || true && docker pull $DOCKER_IMAGE_NAME:$BUILD_NUMBER && docker run -d --name $CONTAINER_NAME -p 80:80 $DOCKER_IMAGE_NAME:$BUILD_NUMBER'"
            echo'Deploy..'
            }
        }
      }
    }
  }
