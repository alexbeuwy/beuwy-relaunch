# Setzt die Zeilen hintereinander, schreibt Stimmspur + Zeitmarken (v4-cues.js).
import json,subprocess
Z=json.load(open('audio/v4/zeilen.json')); t=0.2; cues={}; parts=[]
for zid,_,pause in Z:
    d=json.load(open(f'audio/v4/zeilen/{zid}.json'))
    cues[zid]={"s":round(t,3),"d":d['dauer'],"w":[[w['w'],round(t+w['s'],3)] for w in d['woerter']]}
    parts.append((zid,t)); t+=d["dauer"]+pause*0.75
ENDE=round(t+2.2,2)
open('v4-cues.js','w').write('window.CUES='+json.dumps(cues,ensure_ascii=False)+';window.FILM_ENDE='+str(ENDE)+';\n')
inp=[];fc=[];lb=[]
for k,(zid,s) in enumerate(parts):
    inp+=['-i',f'audio/v4/zeilen/{zid}.mp3']; fc.append(f"[{k}:a]aformat=sample_rates=44100:channel_layouts=stereo,adelay={int(s*1000)}|{int(s*1000)}[a{k}]"); lb.append(f"[a{k}]")
fc.append(''.join(lb)+f"amix=inputs={len(lb)}:normalize=0,apad=whole_dur={ENDE},atrim=0:{ENDE}[o]")
subprocess.run(['ffmpeg','-v','error','-y']+inp+['-filter_complex',';'.join(fc),'-map','[o]','-ar','44100','-b:a','192k','audio/v4/stimme.mp3'],check=True)
print('Ende',ENDE,'Drop w1',cues['w1']['s'])
for k in ['h1','s1','s5','s9','s13','s14','w1','d1','o1','o8','o10','o12']: print(k,cues[k]['s'])
