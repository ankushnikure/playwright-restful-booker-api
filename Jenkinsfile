pipeline {
    agent any

    environment {
        BASE_URL = 'https://restful-booker.herokuapp.com'
        AUTH_USERNAME = 'admin'
        AUTH_PASSWORD = 'password123'
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run API Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**',
                allowEmptyArchive: true
        }
    }
}