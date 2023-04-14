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
         docker.build("konicsdev/event-bus")
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
         docker.push("konicsdev/event-bus")
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