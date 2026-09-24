# Stilprobe v2: Stimme, Musik und Effekte zu einer Spur mischen (ffmpeg).
# Zeiten = Filmzeit in Sekunden, identisch mit v2-stilprobe.html.
import subprocess, sys
A = 'audio/v2/'
DUR = 36.6
VO = [('h-hook', 0.30), ('p-problem', 17.61), ('r-reveal', 27.343)]
MUSIK_OFFSET = 6.333          # Musik-Drop (17.163 s) landet auf „Bei“ (10.83 s)
LP_START, LP_END = 17.02, 27.95  # Problem-Teil: Musik gedämpft (Tiefpass)
SFX = [  # (datei, start, lautstaerke, trim)
    ('tick', -0.03, 0.8, (0, 0.35)),
    ('klick', 4.18, 0.7, None),
    ('whoosh', 4.05, 0.45, None),
    ('tick', 4.50, 0.55, (0, 0.35)),
    ('ping', 7.43, 0.5, None),
] + [('tick', t - 0.05, 0.32, (0, 0.3)) for t in [8.5, 8.67, 8.82, 8.95, 9.07, 9.17]] + [
    ('ping', 9.86, 0.6, None),
    ('hit', 10.83, 0.95, None),
    ('whoosh', 13.73, 0.45, None),
    ('ping', 25.65, 0.3, None), ('ping', 25.77, 0.3, None), ('ping', 25.89, 0.3, None),
    ('riser', 26.67, 0.6, None),
    ('hit', 27.973, 0.95, None),
    ('whoosh', 32.40, 0.45, None),
]
inp = []; fc = []
def add(path, extra=()):
    inp.extend(list(extra) + ['-i', path]); return len(inp_files) 
inp_files = []
def I(path, pre=()):
    inp_files.append((path, pre)); return len(inp_files) - 1
im = I(A + 'musik-126.mp3', ('-ss', str(MUSIK_OFFSET), '-t', str(DUR)))
ivo = [(I(A + f + '.mp3'), t) for f, t in VO]
isfx = [(I(A + 'sfx-' + f + '.mp3'), t, v, tr) for f, t, v, tr in SFX]
# Musik: voll + Tiefpass, per Hüllkurve überblendet
g_full = f"if(lt(t,{LP_START}),1,if(lt(t,{LP_START}+0.2),1-(t-{LP_START})/0.2,if(lt(t,{LP_END}),0,if(lt(t,{LP_END}+0.03),(t-{LP_END})/0.03,1))))"
g_lp = f"if(lt(t,{LP_START}),0,if(lt(t,{LP_START}+0.2),0.85*(t-{LP_START})/0.2,if(lt(t,{LP_END}),0.85,if(lt(t,{LP_END}+0.03),0.85*(1-(t-{LP_END})/0.03),0))))"
fc.append(f"[{im}:a]aformat=sample_rates=44100:channel_layouts=stereo,asplit=2[mA][mB]")
fc.append(f"[mA]volume='{g_full}':eval=frame[mF]")
fc.append(f"[mB]lowpass=f=420:poles=2,lowpass=f=420:poles=2,volume='{g_lp}':eval=frame[mL]")
fc.append(f"[mF][mL]amix=inputs=2:normalize=0,volume=0.62,afade=t=out:st={DUR-0.8}:d=0.8[mus]")
# Stimme
vo_lbl = []
for k, (i, t) in enumerate(ivo):
    ms = int(round(t * 1000))
    fc.append(f"[{i}:a]aformat=sample_rates=44100:channel_layouts=stereo,adelay={ms}|{ms}[v{k}]")
    vo_lbl.append(f"[v{k}]")
fc.append(''.join(vo_lbl) + f"amix=inputs={len(vo_lbl)}:normalize=0,apad=whole_dur={DUR},asplit=2[vo][vosc]")
fc.append("[mus][vosc]sidechaincompress=threshold=0.025:ratio=7:attack=15:release=280:makeup=1[musd]")
# Effekte
sfx_lbl = []
for k, (i, t, v, tr) in enumerate(isfx):
    chain = f"[{i}:a]aformat=sample_rates=44100:channel_layouts=stereo"
    if tr: chain += f",atrim={tr[0]}:{tr[1]},asetpts=PTS-STARTPTS"
    if t < 0:
        chain += f",atrim=start={-t},asetpts=PTS-STARTPTS"; t = 0
    ms = int(round(t * 1000))
    chain += f",volume={v},adelay={ms}|{ms}[s{k}]"
    fc.append(chain); sfx_lbl.append(f"[s{k}]")
fc.append(''.join(sfx_lbl) + f"amix=inputs={len(sfx_lbl)}:normalize=0[sfx]")
fc.append(f"[vo][musd][sfx]amix=inputs=3:normalize=0,atrim=0:{DUR},loudnorm=I=-15:TP=-1.5:LRA=11[out]")
cmd = ['ffmpeg', '-v', 'error', '-y']
for path, pre in inp_files:
    cmd += list(pre) + ['-i', path]
cmd += ['-filter_complex', ';'.join(fc), '-map', '[out]', '-ar', '44100', '-b:a', '192k', A + 'stilprobe-mix.mp3']
subprocess.run(cmd, check=True)
print('ok', A + 'stilprobe-mix.mp3')
