node {
//   def build_tag
  def registry_addr = "harbor.pecado.com"
  def maintainer_name = "pecado"
  def image
  def version = "1.1.0"

  stage('Git Clone') {
    git branch: 'dev', credentialsId: 'github', url: 'git@github.com:batizhao/pecado-ui.git'
  }

  stage('Build Docker Image') {

    image_name = "${registry_addr}/${maintainer_name}/ui:${version}"
    image = docker.build(image_name)

  }

  stage('Push Docker Image') {
    docker.withRegistry('https://harbor.pecado.com', 'harbor-jiangsu-auth') {
      image.push()
    }
  }
}