pipeline {
  agent any
  
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
      steps {
        
        sh 'docker version'
        sh'docker build -t konicsdev/even-bus .'
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