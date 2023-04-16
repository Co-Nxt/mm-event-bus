pipeline {
  agent { 
     docker { image 'node:16.13.1-alpine' }
  }

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
           BUILD_TRIGGER_BY = sh ( script: "BUILD_BY=\$(curl -k --silent ${BUILD_URL}/api/xml | tr '<' '\n' | egrep '^userId>|^userName>' | sed 's/.*>//g' | sed -e '1s/\$/ \\/ /g'); if [[ -z \${BUILD_BY} ]]; then BUILD_BY=\$(curl -k --silent ${BUILD_URL}/api/xml | tr '<' '\n' | grep '^shortDescription>' | sed 's/.*user //g;s/.*by //g'); fi; echo \${BUILD_BY}", returnStdout: true ).trim()
echo "BUILD_TRIGGER_BY: ${BUILD_TRIGGER_BY}"
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