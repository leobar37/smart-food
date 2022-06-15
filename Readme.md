# Welcome to Smart Food Repo

dokku builder-dockerfile:set admin dockerfile-path admin/Dockerfile
git remote add admin dokku@smartfood:admin
dokku docker-options:add admin build '--build-arg DOPPLER_TOKEN="dp.st.prd.gDE9HCIPrPhHgx9srR95eGB3n3pp1qaB3Cz0W9BWmwM"'

## Obs

- Cuando el usuario coloca `can Count` no se debe permitir ingresar el numero de stock
-
