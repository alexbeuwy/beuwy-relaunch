# Film v4: Musik + Effekte + Stimme. Schreibt Gesamtmix und Einzelspuren (Stems).
import json,subprocess,re
raw=open('v4-cues.js').read()
Q=json.loads(re.search(r'window.CUES=(\{.*\});window',raw).group(1)); END=float(re.search(r'FILM_ENDE=([\d.]+)',raw).group(1))
def L(i): return Q[i]['s']
def W(i,w,n=0):
    for x in Q[i]['w']:
        if re.sub('[^a-zäöüß0-9]','',x[0].lower()).startswith(w.lower()):
            if n==0: return x[1]
            n-=1
DROP=L('w1'); M='audio/v2/musik-126.mp3'; S='audio/v2/sfx-'
MUS=[(40.0,0.0,L('s1')-0.1,0.55,None,0.05,0.35),
     (60.0,L('s1'),(DROP-17.163)-L('s1')+1.0,0.32,320,1.5,1.0),
     (0.0,DROP-17.163,END-(DROP-17.163),0.6,None,1.0,1.5)]
SFX=[('hit',L('h1'),0.55,None),('hit',W('h3','verdoppeln'),0.45,None),('whoosh',L('s1')-0.65,0.4,None),
 ('tick',L('s1'),0.8,(0,0.35)),('ping',W('s2','ich'),0.5,None),('hit',W('s3','siebenhundert'),0.35,None),
 ('tick',L('s5')+0.1,0.6,(0,0.35)),('tick',L('s9')+0.1,0.6,(0,0.35)),('ping',W('s10','zehn')+0.4,0.4,None),
 ('ping',W('s10','fünfzig'),0.4,None),('whoosh',W('s11','verdammten')-0.3,0.35,None),
 ('riser',DROP-1.3,0.7,None),('hit',DROP,1.0,None),('ping',W('w2','machen'),0.45,None),
 ('whoosh',L('d1')-0.6,0.35,None),('ping',L('d2')+1.2,0.45,None),('ping',L('d3'),0.35,None),
 ('whoosh',L('o1')-0.6,0.4,None),('hit',W('o4','boden')+0.3,0.35,None),('tick',W('o8','zweitausend'),0.5,(0,0.35)),
 ('hit',W('o9','neun'),0.8,None),('klick',L('o12')+1.6,0.8,None)]
def run(parts,out,extra=''):
    inp=[];fc=[];lb=[]
    for k,(p,pre,chain) in enumerate(parts):
        inp+=list(pre)+['-i',p]; fc.append(f"[{k}:a]aformat=sample_rates=44100:channel_layouts=stereo,{chain}[a{k}]"); lb.append(f"[a{k}]")
    fc.append(''.join(lb)+f"amix=inputs={len(lb)}:normalize=0,apad=whole_dur={END},atrim=0:{END}{extra}[o]")
    subprocess.run(['ffmpeg','-v','error','-y']+inp+['-filter_complex',';'.join(fc),'-map','[o]','-ar','44100','-b:a','192k',out],check=True)
mus=[]
for ms,fs,d,v,lp,fi,fo in MUS:
    ch=(f"lowpass=f={lp}:poles=2,lowpass=f={lp}:poles=2," if lp else '')+f"volume={v},afade=t=in:d={fi},afade=t=out:st={d-fo}:d={fo},adelay={int(fs*1000)}|{int(fs*1000)}"
    mus.append((M,('-ss',str(ms),'-t',str(d)),ch))
sfx=[(S+f+'.mp3',(),(f"atrim={tr[0]}:{tr[1]},asetpts=PTS-STARTPTS," if tr else '')+f"volume={v},adelay={int(t*1000)}|{int(t*1000)}") for f,t,v,tr in SFX]
run(mus,'audio/v4/stem-musik.mp3'); run(sfx,'audio/v4/stem-effekte.mp3')
# Gesamt: Musik unter Stimme geduckt
fc="[0:a]aformat=sample_rates=44100:channel_layouts=stereo,asplit=2[vo][sc];[1:a]aformat=sample_rates=44100:channel_layouts=stereo[mu];[mu][sc]sidechaincompress=threshold=0.025:ratio=6:attack=15:release=300:makeup=1[md];[2:a]aformat=sample_rates=44100:channel_layouts=stereo[fx];[vo][md][fx]amix=inputs=3:normalize=0,loudnorm=I=-15:TP=-1.5:LRA=11[o]"
subprocess.run(['ffmpeg','-v','error','-y','-i','audio/v4/stimme.mp3','-i','audio/v4/stem-musik.mp3','-i','audio/v4/stem-effekte.mp3','-filter_complex',fc,'-map','[o]','-ar','44100','-b:a','192k','audio/v4/film-mix.mp3'],check=True)
print('ok',END,DROP)
