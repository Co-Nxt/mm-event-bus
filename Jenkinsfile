pipeline {
  agent {
    label 'docker-node-agent'
  }
  stages {
    stage('Checkout') {
      steps {
        git branch: 'main',
        url: 'https://github.com/Co-Nxt/mm-event-bus'
      }
    }
    stage('Build') {
      steps {
        sh 'docker build -t konicsdev/event-bus .'
      }
    }
    stage('Test') {
      steps {
        sh 'docker run konicsdev/event-bus npm test'
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