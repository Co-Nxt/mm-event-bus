pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: 'main']], 
        userRemoteConfigs: [[url: 'https://github.com/Co-Nxt/mm-event-bus.git']]])
      }
    }
    stage('Build') {
      steps{
        echo 'Building...'
        script {
            def imageName = 'konicsdev/event-bus'
            def registryUrl = 'https://hub.docker.com/'
            def dockerfile = 'Dockerfile'

              // Build the Docker image
            docker.build(imageName, "-f ${dockerfile} .")

              // Push the Docker image to the registry
            docker.withRegistry(registryUrl) {
              docker.image(imageName).push()
            }
        }
      }
    }
    stage('Test') {
      steps {
       echo 'Testing...'
      }
    }
    stage('Push Image to Artifactory') {
      steps {
        script {
          try{
           docker.push("konicsdev/event-bus")
          }catch(err){
            echo "Failed: ${err}"
          }
        }
      }
    }
    stage('Deploy') {
      steps {
        sshagent(['my-vps']) {
          sh 'ssh -o StrictHostKeyChecking=no -p 22 root@139.180.209.94 "cd /var/www/event-bus && git pull && docker-compose up -d"'
        }
      }
    }
  }
}