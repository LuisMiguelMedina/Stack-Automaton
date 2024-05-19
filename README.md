# UADY
## Facultad de Matemáticas

### Universidad Autónoma de Yucatán
Facultad de Matemáticas

#### Licenciatura en Ingeniería de Software
Asignatura de “Teoría de la computación”

Proyecto integrador

---

#### Autores:
- José Antonio Díaz Fernández
- Luis Miguel Medina Avila

Mérida, Yucatán, México
8 de diciembre del 2023

---

### Lógica del producto

#### Clase Stack
La clase Stack representa una pila, una estructura de datos que sigue el principio de último en entrar, primero en salir (LIFO). Las operaciones básicas de una pila incluyen:
- **push(self, item)**: Añade un elemento al final de la pila.
- **pop(self)**: Elimina y devuelve el último elemento de la pila.
- **peek(self)**: Devuelve el último elemento de la pila sin eliminarlo.
- **is_empty(self)**: Comprueba si la pila está vacía.
- **reset(self)**: Limpia la pila al terminar.

#### Clase PalindromePDA (PushDownAutomaton)
La clase PalindromePDA representa un autómata de pila que verifica si una secuencia de tokens forma un palíndromo de longitud par. Este contiene:
- **Stack**: Una instancia de la clase Stack utilizada para almacenar tokens durante el proceso de verificación.
- **process_token(self, token, index, total_length)**: Procesa un token dado en una posición específica (index) de la cadena. Utiliza la longitud total de la cadena (total_length) para determinar cómo manejar el token. Si la cadena no es de longitud par o no cumple con la condición de palíndromo, establece el estado en 'rechazado'.
- **get_current_state(self)**: Devuelve el estado actual del autómata ('s', 'f' o 'rechazado').
- **get_stack_contents(self)**: Devuelve una cadena que representa los contenidos actuales de la pila.
- **finalize(self)**: Determina el estado final del autómata. Si el estado actual no es 'rechazado' y la pila está vacía, establece el estado en 'f'; de lo contrario, en 'rechazado'.

#### Clase Lexer
Este módulo contiene funciones para analizar léxicamente la cadena de entrada. También es el que tiene control de los inputs del usuario:
- **t_error(t)**: Función que maneja errores léxicos. Cambia el tipo del token a "ERROR" y retorna el token.
- **begin_lexing(string)**: Función que toma una cadena de entrada, realiza el análisis léxico y devuelve una lista de tokens y una lista de caracteres ilegales encontrados.

#### Lexer y Tokens
La configuración del lexer y los tokens define qué caracteres son válidos para el autómata (en este caso 'A' y 'B' y sus equivalentes en minúsculas).

##### Tokens
- **"A" y "B"**: Representan los caracteres válidos.

##### Reglas del Lexer
- **t_A**: Define el token para el carácter 'a'.
- **t_B**: Define el token para el carácter 'b'.
- **t_ignore**: Caracteres a ignorar (espacios y tabulaciones).
- **t_error**: Función para manejar caracteres no válidos.

#### Clase Simulator
- **simulate_pda(string)**: Toma una cadena de entrada `string`, utiliza el lexer para obtener tokens y caracteres ilegales, y luego procesa cada token a través de una instancia de PalindromePDA. Muestra el estado del autómata, los tokens restantes y el contenido de la pila en cada iteración. Finalmente, determina si la cadena es un palíndromo de longitud par o no, basado en el estado final del autómata y la presencia de caracteres ilegales.

---

### Manual de usuario

#### Manual de ejecución del programa “Automata de pila”

##### Paso 1:
Al descomprimir podemos notar múltiples archivos que mantienen la configuración web de la aplicación. Nos fijaremos en el archivo `.exe` `automata-de-pila` con la imagen de la facultad de matemáticas y lo ejecutaremos.
![Imagen1](/Assets/Imagen1.png)

##### Paso 2:
Al ejecutar el programa seremos recibidos por la presentación web-app del autómata de pila. Debemos notar que para usar el autómata de pila necesitaremos ingresar una cadena, ya sea usando la tecla ‘Enter’ o con el símbolo de flecha para mandar nuestras solicitudes.
![Imagen1](/Assets/Imagen2.png)

##### Paso 3:
Si nosotros mandamos una cadena que sea un palíndromo de longitud par y que solo utilice las letras A y B, podremos observar la etiqueta de ‘cadena aceptada’ junto con el proceso del autómata para dicha evaluación.
![Imagen1](/Assets/Imagen3.png)

##### Paso 4:
Si por el contrario mandamos una cadena que no sea un palíndromo de longitud par o que utilice letras diferentes a A y B, podremos observar la etiqueta de ‘cadena rechazada’ junto con el proceso del autómata que lo llevó a dicha evaluación. Si ingresamos caracteres diferentes a A y B también podremos observar la etiqueta ‘Caracteres ilegales:’ la cual remarcará las letras ilegales no aceptadas por el autómata.
![Imagen1](/Assets/Imagen4.png)

##### Paso 5:
Si queremos salir de la simulación bastará con cerrar la ventana en ejecución o darle click a la palabra Salir o a su icono. Esta acción detendrá el servidor en segundo plano del ejecutable de Python y detendrá la ejecución general del programa.
![Imagen1](/Assets/Imagen5.png)
