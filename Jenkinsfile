pipeline {
  agent {
    label 'docker-node-agent'
  }
  stages {
    stage('Setup') {
      steps {
       script{
          jenkins.setBuildDescriptionForPipeline("<b>Branch:</b>main <br> <b> commitId:</b> 123 <br>")
       }
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