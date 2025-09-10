import time
import pyautogui

# ----- Configuración -----
# Ruta al archivo de imagen del botón
button_image = r'.\botones\boton.png'

# Tiempo de espera antes de empezar (en segundos),
# para que puedas cambiar de ventana si es necesario.
time.sleep(8)

# Intentamos localizar la imagen en pantalla con confidence=0.7
# Esto requiere tener OpenCV instalado: pip install opencv-python
location = pyautogui.locateOnScreen(button_image, confidence=0.4)

if location is not None:
    # Obtenemos el punto central de lo que encontró pyautogui
    x, y = pyautogui.center(location)
    # Hacemos clic en esas coordenadas
    pyautogui.click(x, y)
    print(f"Se hizo clic en el botón en ({x}, {y}).")
else:
    print("No se encontró el botón en pantalla.")
