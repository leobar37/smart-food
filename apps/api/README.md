## Handle text feature

- El usuario puede enviar activar flujos a travéz de palabras
- The user can activate flows throghoutt words
  **config:**

words : ["opciones","menu"]
caseSensitive : true // respects lowercase and uppercase
exact : true // determine if the word option must be the same as the one sent by the user

## Enpoints

https://bot.smarfood.com/webhook

## Errors

- Cuando el usuario esta en un flujo y lanza un respuesta incorrecta, el sistema ya no responde nada
  Su respuesta no es valida, ¿Desea reintentarlo? -> Si, no
- Cuando el usuario salta la selección el texto aparaece vacio, podria mostrarle "ninguno"
- Cuando ingreso una respuesta incorrecta al elegir las opciones, este me lanza al siguiente opcion, deberia decirme que me equivoque
-

##

**Input:**
senderId:
arr : []
delay :[

### Errores

- Cuando empeiza a pedir los datos de envio, debe aparacer un mensaje de dired
