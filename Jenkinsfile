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
       sh 'echo ${commitMessage}'
       }
      }
    }
    stage('Build Docker Image') {
      steps {
        //docker.build("konicsdev/even-bus:${env.BUILD_NUMBER}")
        sh'docker build -t ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER} .'
        echo'Building..'
      }
    }
    stage('Test') {
      steps {
        // sh 'docker run konicsdev/event-bus npm test'
        echo'Testing..'

      }
    }
    stage ('SonarQube analysis'){
      when{
        branch 'develop'
      }
   steps {
      echo 'Scanning'
    
        withSonarQubeEnv(installationName:'SonarQube') {
            script {
                // sh 'docker run --rm \
                //     -e SONAR_HOST_URL=http://localhost:9000 \
                //     -e SONAR_LOGIN={AQAAABAAAAAwG25KPwoCEGoAoUfYvkFhSsUsg6rKNY1wjcTF4e3mzZSos0sTrr+/UWr+oECyC9Ldj7lJpbwHIVHBXDDsCccB0w==} \
                //     "${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}" ./node_modules/sonarqube-scanner/src/bin/sonar-scanner -Dproject.settings=sonar-project.properties'
              
              sh "/home/jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/sonarqubescanner/bin/sonar-scanner -Dsonar.host.url=http://localhost:9000 -Dsonar.projectName=meanstackapp -Dsonar.projectVersion=1.0 -Dsonar.projectKey=meanstack:app -Dsonar.sources=. -Dsonar.projectBaseDir=/home/jenkins/workspace/HHA_develop"
                // sh 'docker run --rm -e SONAR_HOST_URL=http://host.docker.internal:9000 -v "$(pwd):/mm-event-bus" sonarqube-article'

              // sh './node_modules/.bin/sonar-scanner -Dproject.settings=sonar-project.properties'
            }
        }
   }
    }
    stage('Push to Dockerhub') {
      steps {
        sh 'docker login -u konicsdev -p konics.dev'
        sh 'docker push ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}'
        //sh'docker build -t konicsdev/even-bus .'
        echo'Pushing..'
      }
    }
    stage('Deploy') {
      steps {
         sh "sshpass -p 'La7}_,CvuWvT]aS5' ssh -o StrictHostKeyChecking=no $VULTR_SERVER_USER@$VULTR_SERVER_IP -p $VULTR_SERVER_SSH_PORT 'docker stop $CONTAINER_NAME || true && docker rm $CONTAINER_NAME || true && docker pull $DOCKER_IMAGE_NAME:$BUILD_NUMBER && docker run -d --name $CONTAINER_NAME -p 80:80 $DOCKER_IMAGE_NAME:$BUILD_NUMBER'"
         echo'Deploy..'
      }
    }
  }
}