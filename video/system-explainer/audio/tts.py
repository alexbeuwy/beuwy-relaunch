import json,base64,urllib.request,os,sys
K=open('/root/.secrets/elevenlabs').read().strip()
V='fnNnyfRBMKY55SFXhZP5'
items=json.load(open('audio/vo.json'))
only=set(sys.argv[1:])
for i,it in enumerate(items):
    if only and it['id'] not in only: continue
    body={"text":it['text'],"model_id":"eleven_multilingual_v2",
      "voice_settings":{"stability":0.5,"similarity_boost":0.8,"style":0.25,"use_speaker_boost":True,"speed":1.0},
      "previous_text":items[i-1]['text'] if i>0 else None,
      "next_text":items[i+1]['text'] if i+1<len(items) else None}
    req=urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{V}/with-timestamps?output_format=mp3_44100_128",
      data=json.dumps(body).encode(),headers={"xi-api-key":K,"Content-Type":"application/json"})
    r=json.load(urllib.request.urlopen(req,timeout=120))
    open(f"audio/{it['id']}.mp3","wb").write(base64.b64decode(r['audio_base64']))
    al=r.get('alignment') or r.get('normalized_alignment')
    # Wörter aus Zeichen-Timings
    words=[];cur='';st=None
    for ch,s,e in zip(al['characters'],al['character_start_times_seconds'],al['character_end_times_seconds']):
        if ch.isspace():
            if cur: words.append({"w":cur,"s":round(st,3),"e":round(pe,3)}); cur=''
            continue
        if not cur: st=s
        cur+=ch; pe=e
    if cur: words.append({"w":cur,"s":round(st,3),"e":round(pe,3)})
    json.dump({"id":it['id'],"text":it['text'],"dauer":round(al['character_end_times_seconds'][-1],3),"woerter":words},open(f"audio/{it['id']}.json","w"),ensure_ascii=False,indent=1)
    print(it['id'],round(al['character_end_times_seconds'][-1],2),'s',len(words),'Wörter')
