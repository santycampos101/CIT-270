echo "Loggin in"
curl --insecure curl -v -d "@login.json" POST -H "Content-Type:application/json" https://santiagocampos.cit270.com/login

# curl -v https://dev.stedi.me/validate/e842d655-9412-4988-b32a-510a5dda91eb 