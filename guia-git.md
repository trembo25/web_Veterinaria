# Guía rápida de Git

Una guía simple para tener a mano con los comandos más usados.

## Antes de empezar: ¿en qué rama estoy?

```
git branch
```

El asterisco `*` te muestra la rama donde estás parado ahora mismo.

---

## Crear una rama nueva

Primero párate en la rama desde la que quieres partir (por ejemplo `develop`):

```
git checkout develop
git checkout -b nombre-de-la-rama
```

La primera línea te ubica en `develop`. La segunda crea la rama nueva a partir de ahí y te mueve a ella.

---

## Subir una rama a GitHub por primera vez

```
git push -u origin nombre-de-la-rama
```

El `-u` deja guardada la conexión entre tu rama local y la de GitHub. Después de esto, ya no necesitas escribir `origin nombre-de-la-rama` cada vez, basta con `git push` a secas.

---

## Guardar cambios (el ciclo de siempre)

```
git add .
git commit -m "tipo: descripcion corta del cambio"
git push
```

- `git add .` → marca todos los archivos modificados para el próximo commit
- `git commit -m "..."` → guarda esos cambios en el historial con un mensaje
- `git push` → sube el commit a GitHub

---

## Push vs Pull (la diferencia que más se confunde)

| Comando | Qué hace | Dirección |
|---|---|---|
| `git push` | Sube tus cambios a GitHub | Tu compu → GitHub |
| `git pull` | Trae cambios desde GitHub | GitHub → Tu compu |

Truco para recordarlo: **push** = empujar hacia afuera. **pull** = jalar hacia ti.

---

## Traer lo último de la misma rama (por si alguien más subió algo)

```
git checkout nombre-rama
git pull origin nombre-rama
```

Ejemplo real, actualizar tu develop local:

```
git checkout develop
git pull origin develop
```

---

## Traer el contenido de OTRA rama hacia la que estás parado

```
git checkout rama-destino
git merge rama-origen
```

Ejemplo, traer lo que hay en `main` hacia `develop`:

```
git checkout develop
git merge main
```

---

## Pasar cambios de develop a main (la forma correcta, con revisión)

1. Sube tu develop a GitHub:
   ```
   git checkout develop
   git push origin develop
   ```

2. En GitHub: Pull requests → New pull request → base **main** ← compare **develop**

3. Create pull request → revisa los cambios → Merge pull request → Confirm merge

4. Trae ese cambio a tu main local:
   ```
   git checkout main
   git pull origin main
   ```

---

## Clonar un repositorio (bajar una copia completa)

```
git clone https://github.com/usuario/nombre-repo.git
cd nombre-repo
```

---

## Caso hipotético: alguien más está subiendo cambios mientras tú también estás trabajando

Imagina esto: estás editando un archivo, y justo en ese momento tu compañero también está subiendo (push) sus propios cambios a la misma rama. No te preocupes, esto es súper normal cuando se trabaja en equipo, y Git está pensado justamente para manejarlo.

Lo que tienes que hacer es simple:

1. Termina tu trabajo tranquilo, sin apurarte por lo que esté haciendo la otra persona.

2. Guarda tus cambios como siempre, pero **todavía no hagas push**:
   ```
   git add .
   git commit -m "tipo: descripcion de tu cambio"
   ```

3. Antes de subir nada, trae lo que tu compañero ya subió:
   ```
   git pull origin nombre-rama
   ```

Acá pasa la parte importante. Git va a intentar juntar automáticamente tus cambios con los de tu compañero. La mayoría de las veces, si trabajaron en partes distintas del código, esto se resuelve solo y no tienes que hacer nada más.

Pero si ambos editaron exactamente las mismas líneas de un archivo, Git no va a adivinar cuál versión dejar. Ahí te va a avisar que hay un **conflicto**, y te va a marcar directo en el archivo qué partes chocan, más o menos así:

```
<<<<<<< HEAD
tu versión del código
=======
la versión de tu compañero
>>>>>>> origin/nombre-rama
```

Cuando veas eso, tienes que entrar al archivo, decidir qué parte dejar (la tuya, la de tu compañero, o una mezcla de ambas), borrar esas líneas con los símbolos `<<<<<<<`, `=======` y `>>>>>>>`, y dejar el código final como debería quedar.

Después de resolver el conflicto:

```
git add .
git commit -m "fix: resolver conflicto de merge"
git push origin nombre-rama
```

Y listo, ya quedan sincronizados los dos.

---

## Resumen mental

- **checkout** → cambiarme de rama (o crear una nueva con `-b`)
- **add** → marcar qué guardar
- **commit** → guardar el cambio con un mensaje
- **push** → mandar mis cambios a GitHub
- **pull** → traer cambios desde GitHub
- **merge** → juntar el contenido de una rama dentro de otra
