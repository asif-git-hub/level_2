import boto3
import os
import json
import base64
import urllib.parse
import uuid
import time

# STEP 4
def lambda_handler(event, context):

    dynamodb = boto3.resource("dynamodb")
    table_name = os.environ["TABLE_NAME"]
    table = dynamodb.Table(table_name)

    status = 201
    decodedBody = base64.b64decode(event['body'])
    print(decodedBody)
    jsonish = urllib.parse.parse_qs(decodedBody)

    name = (jsonish.get(b'name'))[0].decode('utf-8')
    birthDate = (jsonish.get(b'birth_date'))[0].decode('utf-8')
    deathDate = (jsonish.get(b'death_date'))[0].decode('utf-8')
    imageRef = (jsonish.get(b'imageRef'))[0].decode('utf-8')
    obituaryText = (jsonish.get(b'obituaryText'))[0].decode('utf-8')
    
    response = table.put_item(Item = {
        'id': str(uuid.uuid4()),
        'name': name,
        'birthDate': birthDate,
        'deathDate': deathDate,
        'imageRef': imageRef,
        'obituaryText': obituaryText,
        'created_at': str(int(time.time()))
        })

    print(response)
    
    return json.dumps({ 
        "status": status,
    })

