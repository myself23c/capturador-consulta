import pyautogui
import time

import os


#>>>>>> recuerda     hay que isntallar pillow, opencv-python y pyautogui

# Ruta de la imagen del botón a buscar
#boton_path = './botones/boton.png'
#boton_path = r'C:\Users\juanm\Desktop\app_nueva_capturadora_consulta\botones\boton.png'
boton_path = "./botones/boton.png"

print("Directorio actual:", os.getcwd())
print("¿Existe la imagen?", os.path.exists(boton_path), " -> Ruta:", boton_path)

# Tiempo total del bucle en segundos
tiempo_total = 100000

# Tiempo inicial
inicio = time.time()

while (time.time() - inicio) < tiempo_total:
    try:
        
        boton = pyautogui.locateOnScreen(boton_path, confidence=0.7)

        if boton:
            # Obtener las coordenadas del centro del botón
            boton_centro = pyautogui.center(boton)

            # Hacer clic en el centro del botón
            pyautogui.click(boton_centro)

            # Mover el mouse 100 píxeles a la izquierda de la posición actual
            pyautogui.moveRel(-100, +650)

    except Exception as e:
        # Si no se encuentra la imagen o hay otro error, no hace nada
        pass

    # Esperar 1 segundo antes de la siguiente iteración
    time.sleep(1)

print("El bucle ha terminado.")
