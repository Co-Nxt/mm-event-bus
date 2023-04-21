pipeline {
  agent {
    label 'docker-node-agent'
  }
  stages {
    stage('Setup') {
      steps {
        git branch: 'main',
        url: 'https://github.com/Co-Nxt/mm-event-bus'
         jenkins.setBuildDescriptionForPipeline(branch: "main", commitId: '123')

      }
    }
    stage('Build') {
      steps {
        // sh 'docker build -t konicsdev/event-bus .'
        echo'Building..'
      }
    }
    stage('Test') {
      steps {
        // sh 'docker run konicsdev/event-bus npm test'
        echo'Testing..'

      }
    }
    stage('Deploy') {
      steps {
         echo'Deploy..'
      }
    }
  }
}