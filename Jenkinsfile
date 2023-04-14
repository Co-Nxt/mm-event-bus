pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git branch: 'main',
        url: 'https://github.com/Co-Nxt/mm-event-bus'
      }
    }
    stage('Build') {
      steps{
        script {
         docker.build("konicsdev/event-bus")
        }
      }
    }
    stage('Test') {
      steps {
        script {
         docker.push("konicsdev/event-bus")
        }
      }
    }
    stage('Push Image to Artifactory') {
      steps {
       
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