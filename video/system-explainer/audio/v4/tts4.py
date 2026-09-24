# Stimme v4: jede Zeile einzeln mit eleven_v3 und Regieanweisung, Wort-Zeitmarken.
import json,base64,urllib.request,sys,re,os
K=open('/root/.secrets/elevenlabs').read().strip(); V='fnNnyfRBMKY55SFXhZP5'
Z=json.load(open('audio/v4/zeilen.json')); nur=set(sys.argv[1:])
for zid,text,_ in Z:
    if nur and zid not in nur: continue
    body={"text":text,"model_id":"eleven_v3","voice_settings":{"stability":0.5,"similarity_boost":0.8}}
    req=urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{V}/with-timestamps?output_format=mp3_44100_128",data=json.dumps(body).encode(),headers={"xi-api-key":K,"Content-Type":"application/json"})
    r=json.load(urllib.request.urlopen(req,timeout=180))
    open(f'audio/v4/zeilen/{zid}.mp3','wb').write(base64.b64decode(r['audio_base64']))
    al=r['alignment']; words=[];cur='';st=None;tag=False
    for ch,s,e in zip(al['characters'],al['character_start_times_seconds'],al['character_end_times_seconds']):
        if ch=='[': tag=True; continue
        if ch==']': tag=False; continue
        if tag: continue
        if ch.isspace():
            if cur: words.append({"w":cur,"s":round(st,3),"e":round(pe,3)}); cur=''
            continue
        if not cur: st=s
        cur+=ch; pe=e
    if cur: words.append({"w":cur,"s":round(st,3),"e":round(pe,3)})
    json.dump({"id":zid,"dauer":round(al['character_end_times_seconds'][-1],3),"woerter":words},open(f'audio/v4/zeilen/{zid}.json','w'),ensure_ascii=False)
    print(zid,round(al['character_end_times_seconds'][-1],2),' '.join(w['w'] for w in words)[:70])
