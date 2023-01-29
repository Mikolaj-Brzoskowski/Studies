import paho.mqtt.client as mqtt
import time

client = mqtt.Client("10")

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT Broker!")
    else:
        print("Failed to connect, return code %d\n", rc)

client.on_connect = on_connect
    
# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")

client.on_message = on_message

def on_disconnect(client, userdata, rc):
    if rc != 0:
        print("Unexpected disconnection.")

client.on_disconnect = on_disconnect

def on_log(client, userdata, level, buf):
    print("log: ",buf)

client.on_log = on_log

client.connect("localhost", 1883)

client.subscribe("Smart Home")
client.publish("Smart Home", "Siema")

client.loop_forever()