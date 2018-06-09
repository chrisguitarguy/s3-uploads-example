provider "aws" {
    region = "us-east-1"
}

variable "cors_origins" {
    type = "list"
    description = "the `origin` of cors requests"
    default = ["http://localhost:8080"]
}

resource "aws_s3_bucket" "upload" {
    bucket = "chrisguitarguy-s3-uploads-tutorial"
    cors_rule = {
        allowed_origins = ["${var.cors_origins}"]
        allowed_headers = ["*"]
        allowed_methods = ["PUT"]
        expose_headers = [
            "ETag",
            # these are useful for debugging purposes
            "x-amz-request-id",
            "x-amz-id-2"
        ]
        max_age_seconds = 3000
    }
}
