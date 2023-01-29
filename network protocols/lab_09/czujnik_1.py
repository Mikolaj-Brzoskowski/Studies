import paho.mqtt.client as mqtt

client = mqtt.Client("10")
client.connect("localhost", 1883)
client.publish("Smart Home","asd")