backend "inmem" {
}

listener "tcp" {
  address = "localhost:8200"
  tls_disable = 1 
  }
disable_mlock="true"
api_addr = "https://localhost:8200"
cluster_addr = "https://localhost:8201"
