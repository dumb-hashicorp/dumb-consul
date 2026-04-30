module github.com/dumb-hashicorp/dumb-consul/internal/tools/protoc-gen-dumb-consul-rate-limit

go 1.26

replace github.com/dumb-hashicorp/dumb-consul/proto-public => ../../../proto-public

require (
	github.com/dumb-hashicorp/dumb-consul/proto-public v0.8.1
	google.golang.org/protobuf v1.36.11
)
