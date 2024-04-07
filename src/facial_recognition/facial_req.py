# import the necessary packages
from imutils.video import VideoStream
from imutils.video import FPS
import face_recognition
import importlib.util
try:
    importlib.util.find_spec('RPi.GPIO')
    import RPi.GPIO as GPIO
except ImportError:
    """
    import FakeRPi.GPIO as GPIO
    OR
    import FakeRPi.RPiO as RPiO
    """
	
    import FakeRPi.GPIO as GPIO
import imutils
import pickle
import time
import cv2
import os
import numpy as np
from pymongo_get_database import get_database
import datetime

RELAY = 18
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(RELAY, GPIO.OUT)
GPIO.output(RELAY,GPIO.HIGH)
#Initialize 'currentname' to trigger only when a new person is identified.
currentname = "unknown"
#Determine faces from encodings.pickle file model created from train_model.py
encodingsP = "encodings.pickle"

dbName = get_database()
users = dbName["peoples"]
history = dbName["histories"]

path = "dataset"
names = []
myList = os.listdir(path)
for cl in myList:
	names.append(os.path.splitext(cl)[0])

# load the known faces and embeddings along with OpenCV's Haar
# cascade for face detection
print("[INFO] loading encodings + face detector...")
data = pickle.loads(open(encodingsP, "rb").read())

# initialize the video stream and allow the camera sensor to warm up
# Set the ser to the followng
# src = 0 : for the build in single web cam, could be your laptop webcam
# src = 2 : I had to set it to 2 inorder to use the USB webcam attached to my laptop
vs = VideoStream(src=0,framerate=10).start()
#vs = VideoStream(usePiCamera=True).start()
time.sleep(2.0)


# start the FPS counter
fps = FPS().start()

prevTime = 0
doorUnlock = False
# loop over frames from the video file stream
while True:
	# grab the frame from the threaded video stream and resize it
	# to 500px (to speedup processing)
	frame = vs.read()
	frame = imutils.resize(frame, width=500)
	# Detect the fce boxes
	boxes = face_recognition.face_locations(frame)
	# compute the facial embeddings for each face bounding box
	encodings = face_recognition.face_encodings(frame, boxes)

	# loop over the facial embeddings
	for encoding, box in zip(encodings, boxes):
		# attempt to match each face in the input image to our known
		# encodings
		faceDis = face_recognition.face_distance(data["encodings"], encoding)
		print(faceDis)
		matchIndex = np.argmin(faceDis)
		print(matchIndex)
		
		if faceDis[matchIndex] < 0.40:
			name = names[matchIndex]
			prevTime = time.time()
			# to unlock the door
			if doorUnlock == False:
				GPIO.output(RELAY,GPIO.LOW)
				doorUnlock = True
				print("door unlock")
				cv2.putText(frame, "Door Unlock", (10, 10), cv2.FONT_HERSHEY_COMPLEX, 1, (0, 0, 255), 2)
				datetime_obj = datetime.datetime.now()

				found = users.find_one({'name': name})
				users.update_one({"name": name}, {"$inc": {"recog": 1}})

				history.insert_one({"name": name, "time": datetime_obj})
		else:
			name = "Unknown"

		y1 ,x2, y2, x1 = box	
		cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
		cv2.putText(frame, name, (x2, y2), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 0), 2)
	#lock the door after 5 seconds
	if doorUnlock == True and time.time() - prevTime > 5:
		doorUnlock = False
		GPIO.output(RELAY,GPIO.HIGH)
		prevTime = time.time()
		print("door lock")
		"""
		matches = face_recognition.compare_faces(data["encodings"], encoding)
		name = "Unknown" #if face is not recognized, then print Unknown

		# check to see if we have found a match
		if True in matches:
			# find the indexes of all matched faces then initialize a
			# dictionary to count the total number of times each face
			# was matched
			matchedIdxs = [i for (i, b) in enumerate(matches) if b]
			counts = {}

			# loop over the matched indexes and maintain a count for
			# each recognized face face
			for i in matchedIdxs:
				name = data["names"][i]
				counts[name] = counts.get(name, 0) + 1

			# determine the recognized face with the largest number
			# of votes (note: in the event of an unlikely tie Python
			# will select first entry in the dictionary)
			name = max(counts, key=counts.get)

			#If someone in your dataset is identified, print their name on the screen
			if currentname != name:
				currentname = name
				print(currentname)

		# update the list of names
		names.append(name)
		

	# loop over the recognized faces
	for ((top, right, bottom, left), name) in zip(boxes, names):
		# draw the predicted face name on the image - color is in BGR
		cv2.rectangle(frame, (left, top), (right, bottom),
			(0, 255, 225), 2)
		y = top - 15 if top - 15 > 15 else top + 15
		cv2.putText(frame, name, (left, y), cv2.FONT_HERSHEY_SIMPLEX,
			.8, (0, 255, 255), 2)
	"""

	# display the image to our screen
	cv2.imshow("Facial Recognition is Running", frame)
	key = cv2.waitKey(1) & 0xFF

	# quit when 'q' key is pressed
	if (key == ord("q")):
		doorUnlock = False
		GPIO.output(RELAY,GPIO.HIGH)
		print("door lock")
		break
	# quit when door lock over 10s
	if (doorUnlock == False and time.time() - prevTime > 10):
		break

	# update the FPS counter
	fps.update()

# stop the timer and display FPS information
fps.stop()
print("[INFO] elasped time: {:.2f}".format(fps.elapsed()))
print("[INFO] approx. FPS: {:.2f}".format(fps.fps()))

# do a bit of cleanup
cv2.destroyAllWindows()
vs.stop()
