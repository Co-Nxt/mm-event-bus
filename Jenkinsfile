pipeline {
  agent { 
     docker {
            image 'node:lts-bullseye-slim'
            args '-p 3000:3000'
        }
  }

  stages {
    stage('Build') {
      steps{
        echo 'Building...'
        script {
            sh 'npm install'
            }
        }
    }
}
}