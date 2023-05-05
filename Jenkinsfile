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
      steps{
        echo 'Scanning'
        // withSonarQubeEnv(intallationName:'sq1'){
        //   'sh '
        // }
        
            nodeJS(nodeJSInstallationName: 'nodejs18.6'){
              sh 'npm install'
                withSonarQubeEnv('SonarQube') {{
                  sh 'npm install sonar-scanner'
                  sh 'npm run sonar'
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