#!/bin/sh

openssl genrsa -out keys/private.pem 4096
openssl rsa -in keys/private.pem -outform PEM -pubout -out keys/public.pem