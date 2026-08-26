import cv2
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
import os

# Caminho do modelo
model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'hand_landmarker.task')

# Configurar detector de mãos
base_options = python.BaseOptions(model_asset_path=model_path)
options = vision.HandLandmarkerOptions(base_options=base_options, num_hands=1)
detector = vision.HandLandmarker.create_from_options(options)

# Conexões da mão para desenhar
HAND_CONNECTIONS = [
    (0,1),(1,2),(2,3),(3,4),
    (0,5),(5,6),(6,7),(7,8),
    (5,9),(9,10),(10,11),(11,12),
    (9,13),(13,14),(14,15),(15,16),
    (13,17),(17,18),(18,19),(19,20),(0,17)
]

# Tentar abrir câmera
video = cv2.VideoCapture(0)
if not video.isOpened():
    video = cv2.VideoCapture(1)
if not video.isOpened():
    print("Erro: Nenhuma camera encontrada!")
    exit()

while True:
    check, img = video.read()
    if not check:
        break
    imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    h, w, _ = img.shape

    # Detectar mãos
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=imgRGB)
    results = detector.detect(mp_image)

    pontos = []
    if results.hand_landmarks:
        for hand_landmarks in results.hand_landmarks:
            # Coletar pontos
            for landmark in hand_landmarks:
                cx, cy = int(landmark.x * w), int(landmark.y * h)
                pontos.append((cx, cy))

            # Desenhar landmarks e conexões
            for idx, (cx, cy) in enumerate(pontos):
                cv2.circle(img, (cx, cy), 5, (0, 255, 0), -1)
            for conn in HAND_CONNECTIONS:
                pt1 = pontos[conn[0]]
                pt2 = pontos[conn[1]]
                cv2.line(img, pt1, pt2, (0, 255, 0), 2)

        # Contar dedos
        dedos = [8, 12, 16, 20]
        contador = 0
        if pontos:
            # Polegar - verifica lateralidade da mão
            hand_label = results.handedness[0][0].category_name
            if hand_label == "Right":
                if pontos[4][0] > pontos[2][0]:
                    contador += 1
            else:
                if pontos[4][0] < pontos[2][0]:
                    contador += 1
            # Outros dedos
            for x in dedos:
                if pontos[x][1] < pontos[x-2][1]:
                    contador += 1

        cv2.rectangle(img, (80, 10), (200, 110), (255, 0, 0), -1)
        cv2.putText(img, str(contador), (100, 100), cv2.FONT_HERSHEY_SIMPLEX, 4, (255, 255, 255), 5)

    cv2.imshow("Imagem", img)
    if cv2.waitKey(1) & 0xFF == 27:
        break

video.release()
cv2.destroyAllWindows()