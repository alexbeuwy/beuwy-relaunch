# Film v3: Stimme, Musik (3 Abschnitte) und Effekte mischen. Zeiten = Filmzeit.
import subprocess
A='audio/'; V=A+'v3/'; M=A+'v2/musik-126.mp3'; S=A+'v2/sfx-'
DUR=88.6
VO=[('a-hook',0.2),('b-story',9.7),('c-wende',43.0),('d-offer',46.8)]
# (musik_start, film_start, dauer, lautstaerke, tiefpass, fade_in, fade_out)
MUS=[(40.0,0.0,9.6,0.55,None,0.05,0.35),
     (60.0,9.7,17.1,0.32,320,1.5,1.0),
     (0.0,25.84,62.76,0.62,None,1.0,1.0)]
SFX=[('hit',0.2,0.55,None),('whoosh',9.1,0.45,None),('tick',9.65,0.8,(0,0.35)),
     ('ping',12.92,0.5,None),('tick',21.4,0.6,(0,0.35)),('tick',28.9,0.6,(0,0.35)),
     ('whoosh',34.5,0.35,None),('riser',41.75,0.7,None),('hit',43.0,1.0,None),
     ('ping',45.5,0.45,None),('whoosh',46.2,0.45,None),('hit',60.1,0.35,None),
     ('ping',63.4,0.3,None),('ping',63.7,0.3,None),('ping',64.0,0.3,None),
     ('tick',69.8,0.5,(0,0.35)),('hit',76.75,0.8,None),('klick',86.3,0.8,None)]
inp=[]; fc=[]
def I(p,pre=()):
    inp.append((p,pre)); return len(inp)-1
lbl=[]
for k,(ms,fs,d,v,lp,fi,fo) in enumerate(MUS):
    i=I(M,('-ss',str(ms),'-t',str(d)))
    ch=f"[{i}:a]aformat=sample_rates=44100:channel_layouts=stereo"
    if lp: ch+=f",lowpass=f={lp}:poles=2,lowpass=f={lp}:poles=2"
    ch+=f",volume={v},afade=t=in:d={fi},afade=t=out:st={d-fo}:d={fo},adelay={int(fs*1000)}|{int(fs*1000)}[m{k}]"
    fc.append(ch); lbl.append(f"[m{k}]")
fc.append(''.join(lbl)+f"amix=inputs={len(lbl)}:normalize=0[mus]")
vl=[]
for k,(f,t) in enumerate(VO):
    i=I(V+f+'.mp3'); fc.append(f"[{i}:a]aformat=sample_rates=44100:channel_layouts=stereo,adelay={int(t*1000)}|{int(t*1000)}[v{k}]"); vl.append(f"[v{k}]")
fc.append(''.join(vl)+f"amix=inputs={len(vl)}:normalize=0,apad=whole_dur={DUR},asplit=2[vo][sc]")
fc.append("[mus][sc]sidechaincompress=threshold=0.025:ratio=6:attack=15:release=300:makeup=1[musd]")
sl=[]
for k,(f,t,v,tr) in enumerate(SFX):
    i=I(S+f+'.mp3'); ch=f"[{i}:a]aformat=sample_rates=44100:channel_layouts=stereo"
    if tr: ch+=f",atrim={tr[0]}:{tr[1]},asetpts=PTS-STARTPTS"
    ch+=f",volume={v},adelay={int(t*1000)}|{int(t*1000)}[s{k}]"; fc.append(ch); sl.append(f"[s{k}]")
fc.append(''.join(sl)+f"amix=inputs={len(sl)}:normalize=0[sfx]")
fc.append(f"[vo][musd][sfx]amix=inputs=3:normalize=0,atrim=0:{DUR},loudnorm=I=-15:TP=-1.5:LRA=11[out]")
cmd=['ffmpeg','-v','error','-y']
for p,pre in inp: cmd+=list(pre)+['-i',p]
cmd+=['-filter_complex',';'.join(fc),'-map','[out]','-ar','44100','-b:a','192k',V+'film-mix.mp3']
subprocess.run(cmd,check=True); print('ok')
