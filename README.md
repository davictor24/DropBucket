# DropBucket

DropBucket = Dropbox + S3 Bucket :)

Serverless Cloud Storage service on AWS. Developed as the final project for the Udacity Cloud Developer Nanodegree.

It allows users to
- Sign in, for persisting their files on the Cloud.
- Upload and delete files.
- Download uploaded files.
(organising uploaded files in folders is not supported yet)

## How it works:
- All requests to Lambdas on the Cloud are proxied by an API Gateway.
- Authentication is implemented using Auth0. This gives a token in JWT form, which can be used to access Cloud resources. A Lambda verifies this token for user requests.
- After signing in, the client gets the files for the user from the `/files` endpoint. This fires a Lambda function which reads data for the user from a DynamoDB table.
- Uploading a file sends a POST request to the `/files/upload` endpoint. This fires a Lambda which returns a presigned URL for uploading the file to the S3 bucket, and the file is uploaded to this URL through a PUT request.
- Once a file is uploaded to the signed URL, a CloudWatch event triggers another Lambda which updates the DynamoDB table with the file's metadata.
- Downloading a file sends a GET request to `/files/:fileKey/download`. This triggers a Lambda which returns a signed URL for downloading the file. The client then downloads the file from the URL.
- Deleting a file sends a DELETE request to `/files/:fileKey`. This fires a Lambda which deletes the file from both the DynamoDB table and the S3 bucket.
- Logical storage partitioning is done internally, so different users can upload files with the same key.
