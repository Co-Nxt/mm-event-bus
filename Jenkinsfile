pipeline {
  agent { 
        label "docker-slave"
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