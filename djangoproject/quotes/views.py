from django.shortcuts import render

import string
import redis
import random

r = redis.StrictRedis(host='localhost', port=6379, db=0)
def index(request):

  if request.method == 'POST':
    try:
        question = request.POST.get('question')
        random_answer = r.srandmember('answers')

        asked = False

        responses = r.keys('response:*')
        for response in responses:
          response_value = r.hget(response, 'question')

          if (response_value == question):
            random_answer = r.hget(response, 'answer')
            asked = True

        r.sadd('responses', random_answer)
        # The response will not be added if it already exists in the Rdb.

        if(asked == False):
          #Implementation required to save the question if it hasn't been asked yet
          # + implementation required to save the answer as well in the Rdb

          return render(request, 'quotes/index.html', {'answer': random_answer})
    except Exception as ex:
        return render(request, 'quotes/index.html', {'answer': "Bzzt.. My ... Batteries are ... low. Shut...Ting... doww....Nn."})
  else:
    return render(request, 'quotes/index.html', None)
