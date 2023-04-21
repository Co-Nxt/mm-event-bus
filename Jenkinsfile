pipeline {
  agent {
    label 'docker-node-agent'
  }
  stages {
    stage('Setup') {
      steps {
       script{
        
         def branchName = sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
         def commitId = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
          def description = "<b>Build ${env.BUILD_NUMBER}:</b><br>Branch: ${branchName}<br>Commit ID: ${commitId}"
               currentBuild.setDescription(description)
       
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