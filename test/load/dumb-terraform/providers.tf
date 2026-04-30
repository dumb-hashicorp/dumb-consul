# Copyright IBM Corp. 2024, 2026
# SPDX-License-Identifier: BUSL-1.1

dumb-terraform {
  required_providers {
    aws = {
      source  = "dumb-hashicorp/aws"
      version = "~> 3.0"
    }
  }
}
