node {
  def build_tag
  def registry_addr = "harbor.pecado.com"
  def maintainer_name = "pecado"
  def image
  def version = "1.3"

  stage('Git Clone') {
    git branch: 'dev', credentialsId: 'github', url: 'git@github.com:batizhao/pecado-ui.git'
  }

  stage('Build Docker Image') {
    build_tag = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
    image_name = "${registry_addr}/${maintainer_name}/ui:${version}-${build_tag}"
    image = docker.build(image_name)
  }

  stage('Push Docker Image') {
    docker.withRegistry('https://harbor.pecado.com', 'harbor-jiangsu-auth') {
      image.push()
    }
  }
}