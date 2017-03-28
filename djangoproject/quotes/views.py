from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.views.decorators.csrf import csrf_exempt

import redis
import random
r = redis.StrictRedis(host='localhost', port=6379, db=0)

@route('/ask')
def read_json(rdb):
    nchoices = rdb.llen('answers')
    answers = rdb.lrange('answers', 0, nchoices - 1)
    return { 'answer': random.choice(answers) }

@route('/answers', method='POST')
def write_json(rdb):
    rdb.delete('answers')
    for answer in request.json['answers']:
        rdb.lpush('answers', answer)

run(host='0.0.0.0', port=8080, debug=True, reloader=True)
